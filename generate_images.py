# -*- coding: utf-8 -*-
"""
Winity Life - AI Lifestyle Asset Generator
Philosophy: Emerald Noir | Framework: Nano Banana Pro
Using: OpenAI DALL-E 3 (gpt-image-1 / dall-e-3)
"""

import sys, os, json, urllib.request

if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

OPENAI_KEY = os.environ.get("OPENAI_API_KEY", "YOUR_OPENAI_KEY_HERE")
OUTPUT_DIR = r"C:\Users\timot\OneDrive\Desktop\TSS Studio\CLIENTS\Winity\winity-website\public"

# Winity brand context injected into every prompt (per tss-google-ai-suite Phase 0)
BRAND_PREFIX = (
    "Photorealistic editorial lifestyle photography for Winity Life, a premium global payments brand. "
    "Revolut-level human aesthetic. Aspirational but authentic. "
    "NO blockchain imagery, NO crypto coins, NO generic fintech tropes, NO dark moody backgrounds. "
    "YES: cosmopolitan lifestyle, warm editorial light, premium but relatable human moments. "
)

IMAGES = [
    {
        "filename": "winity_lifestyle_city.jpg",
        "size": "1792x1024",
        "prompt": BRAND_PREFIX + (
            "A stylish young woman in her late 20s with dark hair wearing a tailored beige blazer "
            "tapping a sleek contactless card reader at a modern espresso bar counter in Singapore CBD, "
            "medium shot slightly elevated, 50mm lens at f/2.0, "
            "warm golden afternoon light through floor-to-ceiling windows, "
            "city skyline softly blurred in background, "
            "authentic candid moment, cosmopolitan premium energy"
        ),
    },
    {
        "filename": "winity_lifestyle_lounge.jpg",
        "size": "1792x1024",
        "prompt": BRAND_PREFIX + (
            "A confident well-dressed man in his 40s in a white linen shirt "
            "relaxing in a premium international airport lounge in Dubai, "
            "floor-to-ceiling windows showing aircraft on tarmac at golden sunset, "
            "checking phone while lounging in a designer chair, leather carry-on bag beside him, "
            "wide environmental shot at eye level, 35mm lens at f/3.5, "
            "warm amber ambient lighting with natural sunset glow, luxury travel lifestyle editorial"
        ),
    },
    {
        "filename": "winity_lifestyle_travel.jpg",
        "size": "1792x1024",
        "prompt": BRAND_PREFIX + (
            "A stylish woman in her early 30s with a sleek minimal travel bag "
            "walking confidently through a grand European train station with arched glass ceiling, "
            "streaming natural light, subtle motion blur on background travelers, "
            "she is sharp and centered, modern minimal outfit in neutral tones, "
            "tracking shot at eye level, 35mm lens at f/4, "
            "cinematic documentary style, soft diffused daylight, global traveler energy"
        ),
    },
    {
        "filename": "winity_lifestyle_dining.jpg",
        "size": "1024x1024",
        "prompt": BRAND_PREFIX + (
            "Close-up of elegant hands with minimal gold jewellery "
            "holding a premium dark Visa-style payment card "
            "over a beautifully set restaurant table in Hong Kong, "
            "shallow depth of field, warm candlelight bokeh in background, "
            "85mm lens at f/1.8, warm amber interior lighting, "
            "luxury editorial dining scene, tactile and aspirational, "
            "no text visible on card, intimate premium atmosphere"
        ),
    },
    {
        "filename": "winity_lifestyle_pay.jpg",
        "size": "1024x1024",
        "prompt": BRAND_PREFIX + (
            "A young professional man in his early 30s in smart casual style "
            "using his phone to tap for contactless payment "
            "at a premium minimalist retail store in Tokyo, "
            "medium shot slightly elevated, 50mm lens at f/2.8, "
            "soft clean store lighting with warm undertones, "
            "modern minimal retail interior blurred in background, "
            "candid lifestyle moment, authentic and aspirational"
        ),
    },
]

def generate(item: dict) -> None:
    filename = item["filename"]
    out_path = os.path.join(OUTPUT_DIR, filename)

    print(f"\nGenerating: {filename} ({item['size']})")

    headers = {
        "Authorization": f"Bearer {OPENAI_KEY}",
        "Content-Type": "application/json",
    }
    body = json.dumps({
        "model": "dall-e-3",
        "prompt": item["prompt"],
        "n": 1,
        "size": item["size"],
        "quality": "hd",
        "response_format": "url",
    }).encode()

    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=body, headers=headers, method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read().decode())
            img_url = result["data"][0]["url"]
            # Download the image
            with urllib.request.urlopen(img_url, timeout=60) as img_resp:
                img_bytes = img_resp.read()
            with open(out_path, "wb") as f:
                f.write(img_bytes)
            size_kb = len(img_bytes) // 1024
            print(f"  SAVED: {filename} ({size_kb} KB)")
    except Exception as e:
        print(f"  ERROR: {e}")

if __name__ == "__main__":
    print("=" * 60)
    print("WINITY LIFE - Lifestyle Image Generator")
    print("DALL-E 3 HD | Emerald Noir | Nano Banana Pro")
    print("=" * 60)

    for item in IMAGES:
        generate(item)

    print("\nDone. Check public/ for generated assets.")
