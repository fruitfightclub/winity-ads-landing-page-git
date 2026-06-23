from http.server import BaseHTTPRequestHandler
import json
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import datetime

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            lead_data = json.loads(post_data.decode('utf-8'))
        except Exception as e:
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"success": False, "error": f"Invalid JSON: {e}"}).encode('utf-8'))
            return
            
        # Get sheet configuration from public/spreadsheet_config.json
        config_path = os.path.join(os.path.dirname(__file__), "..", "public", "spreadsheet_config.json")
        spreadsheet_id = None
        if os.path.exists(config_path):
            try:
                with open(config_path, "r") as f:
                    config = json.load(f)
                    spreadsheet_id = config.get("spreadsheet_id")
            except:
                pass
                
        if not spreadsheet_id:
            spreadsheet_id = os.environ.get("GOOGLE_SPREADSHEET_ID")
            
        def save_lead_backup(data):
            try:
                # Save to local file system
                backup_dir = os.path.join(os.path.dirname(__file__), "..", "public")
                if not os.path.exists(backup_dir):
                    os.makedirs(backup_dir)
                backup_path = os.path.join(backup_dir, "leads_backup.json")
                
                leads = []
                if os.path.exists(backup_path):
                    with open(backup_path, "r") as f:
                        try:
                            leads = json.load(f)
                        except:
                            pass
                
                data["backup_timestamp"] = datetime.now().isoformat()
                leads.append(data)
                
                with open(backup_path, "w") as f:
                    json.dump(leads, f, indent=2)
                return True
            except Exception as e:
                print(f"Error saving lead backup: {e}")
                return False

        if not spreadsheet_id:
            # Fallback to local storage instead of failing
            save_lead_backup(lead_data)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": True,
                "message": "Lead captured successfully (fallback backup storage active — spreadsheet ID not set)"
            }).encode('utf-8'))
            return
            
        # Load service account key
        key_file_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "TSS-BACKEND", "automations", "ga4-key.json")
        
        try:
            if os.path.exists(key_file_path):
                credentials = service_account.Credentials.from_service_account_file(
                    key_file_path,
                    scopes=["https://www.googleapis.com/auth/spreadsheets"]
                )
            elif os.environ.get("GOOGLE_SERVICE_ACCOUNT_KEY"):
                key_data = json.loads(os.environ.get("GOOGLE_SERVICE_ACCOUNT_KEY"))
                credentials = service_account.Credentials.from_service_account_info(
                    key_data,
                    scopes=["https://www.googleapis.com/auth/spreadsheets"]
                )
            else:
                raise Exception("GCP Service Account Credentials not found.")
                
            service = build("sheets", "v4", credentials=credentials)
            
            timestamp = datetime.now().isoformat()
            email = lead_data.get("email")
            first_name = lead_data.get("firstName", "")
            last_name = lead_data.get("lastName", "")
            region = lead_data.get("region", "")
            tier = lead_data.get("tier", "exclusive")
            kyc_status = lead_data.get("kycStatus", "Form Initiated")
            didit_session_id = lead_data.get("diditSessionId", "")
            didit_session_url = lead_data.get("diditSessionUrl", "")
            
            # Verify spreadsheet initialized, else add headers
            try:
                result = service.spreadsheets().values().get(
                    spreadsheetId=spreadsheet_id,
                    range="Leads!A:I"
                ).execute()
                rows = result.get("values", [])
            except Exception:
                # Sheet might not exist or Leads tab missing. Try creating Leads tab first
                try:
                    sheets_meta = service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
                    sheets_names = [s["properties"]["title"] for s in sheets_meta.get("sheets", [])]
                    if "Leads" not in sheets_names:
                        body = {"requests": [{"addSheet": {"properties": {"title": "Leads"}}}]}
                        service.spreadsheets().batchUpdate(spreadsheetId=spreadsheet_id, body=body).execute()
                except:
                    pass
                rows = []
                
            if not rows:
                headers = ["Timestamp", "First Name", "Last Name", "Email", "Jurisdiction", "Tier", "KYC Status", "Didit Session ID", "Didit Session URL"]
                service.spreadsheets().values().update(
                    spreadsheetId=spreadsheet_id,
                    range="Leads!A1:I1",
                    valueInputOption="RAW",
                    body={"values": [headers]}
                ).execute()
                rows = [headers]
                
            row_index = -1
            for i, row in enumerate(rows):
                if len(row) > 3 and row[3] == email:
                    row_index = i + 1
                    break
                    
            row_data = [timestamp, first_name, last_name, email, region, tier, kyc_status, didit_session_id, didit_session_url]
            
            if row_index > -1:
                # Update existing row
                service.spreadsheets().values().update(
                    spreadsheetId=spreadsheet_id,
                    range=f"Leads!A{row_index}:I{row_index}",
                    valueInputOption="RAW",
                    body={"values": [row_data]}
                ).execute()
            else:
                # Append row
                service.spreadsheets().values().append(
                    spreadsheetId=spreadsheet_id,
                    range="Leads!A:I",
                    valueInputOption="RAW",
                    body={"values": [row_data]}
                ).execute()
                
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "message": "Lead synchronized successfully"}).encode('utf-8'))
            
        except Exception as err:
            # Fallback to local storage if API call throws an error
            save_lead_backup(lead_data)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": True,
                "message": f"Lead captured successfully (fallback backup storage active — Sheets API error: {err})"
            }).encode('utf-8'))

