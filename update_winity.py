import re

with open('public/winity_singapore_gulf_campaign_flow.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove old marketing plan section
content = re.sub(r'<!-- -- MARKETING PLAN & NEXT STEPS -- -->.*?<!-- -- FOOTER — with real logo -- -->', '<!-- -- FOOTER — with real logo -- -->', content, flags=re.DOTALL)

# 2. Add Left Menu Button
nav_replacement = '''      </button>
      <button class="sb-item" onclick="showTab('tab-marketing-plan')" id="nav-marketing-plan">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        Marketing & PR Plan
      </button>
    </nav>'''
content = content.replace('      </button>\n    </nav>', nav_replacement)

# 3. Add new Tab Content
new_tab = '''    </div><!-- /tab-guide -->

    <!-- TAB 5 — MARKETING PLAN -->
    <div id="tab-marketing-plan" class="tab-section">
      <div class="content-wrapper" style="padding: 3rem clamp(1.5rem, 5vw, 4rem); max-width: 1200px; margin: 0 auto;">
        
        <h1 style="font-size: clamp(24px, 3.5vw, 42px); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 0.5rem; background: linear-gradient(135deg, #F4F7F6 30%, #21E6A7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          V7 Creative System & Full-Spectrum Growth Engine
        </h1>
        <p style="color: var(--muted); margin-bottom: 3rem; max-width: 720px; line-height: 1.6;">
          An aggressive, fully-integrated roadmap for the next 30 days. Leveraging the TSS ecosystem—Paid Media, Answer Engine Optimization (AEO), and Lead Intelligence—to acquire 500 high-LTV users while dominating organic visibility in the Gulf, Singapore, and Europe.
        </p>

        <!-- What is V7? -->
        <div class="card highlight" style="margin-bottom: 2rem; background: rgba(33, 230, 167, 0.03); border: 1px solid rgba(33, 230, 167, 0.1);">
          <div class="card-tag" style="color: #21E6A7;">Core Framework</div>
          <h3 style="margin-bottom: 1rem;">What is the V7 Creative System?</h3>
          <p style="color: #8FA3A0; line-height: 1.6;">
            The <strong>V7 Creative System</strong> is our proprietary, high-velocity social asset engine. It replaces generic marketing with museum-grade visual fidelity tailored to the Emerald Noir philosophy. By standardizing compliance (REAP) and format specifications (e.g., native 9:16 vertical video for TikTok/Reels), V7 allows us to deploy, test, and iterate on campaigns instantly without sacrificing the premium aesthetic.
          </p>
        </div>

        <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
          
          <!-- Pillar 1: Paid Ads -->
          <div class="card" style="background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
            <div class="card-tag" style="color: #F4F7F6; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1rem;">tss-paid-ads</div>
            <h3 style="margin-bottom: 1rem;">Precision Media Architecture</h3>
            <p style="color: #8FA3A0; line-height: 1.6; margin-bottom: 1rem; font-size: 0.9rem;">
              <strong style="color:#F4F7F6;">Meta (FB/IG):</strong> CBO Broad targeting to Gulf Expats. Utilizing the V7 System's <em>Lifestyle Editorial</em> creatives. Strict adherence to the 20% budget scaling rule ensures CPA stability.<br><br>
              <strong style="color:#F4F7F6;">Google Search:</strong> Intent-capture for high-intent keywords like "USDT debit card Dubai" using Exact & Phrase match. Target CPA bidding once 30+ conversions trigger.<br><br>
              <strong style="color:#F4F7F6;">TikTok:</strong> Organic-style UGC videos (9:16) mimicking the Winity lifestyle. Focusing on the hook (0-3s) to capture digital nomads in Europe.
            </p>
          </div>

          <!-- Pillar 2: AEO -->
          <div class="card" style="background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
            <div class="card-tag" style="color: #F4F7F6; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1rem;">tss-aeo-optimizer</div>
            <h3 style="margin-bottom: 1rem;">Answer Engine Optimization</h3>
            <p style="color: #8FA3A0; line-height: 1.6; margin-bottom: 1rem; font-size: 0.9rem;">
              Ranking in Google is not enough; we must be the <em>cited source</em> in ChatGPT, Perplexity, and Gemini.<br><br>
              <strong style="color:#F4F7F6;">Phase 1:</strong> Restructuring existing blog/guide content with "Answer Capsules" (40-60 words) at the top of every page.<br><br>
              <strong style="color:#F4F7F6;">Phase 2:</strong> Heavy injection of FAQPage and Article JSON-LD schema across the Winity domain. <br><br>
              <strong style="color:#F4F7F6;">Action:</strong> Launching a localized AEO cluster: <em>"How to use crypto cards in Singapore/Dubai"</em>.
            </p>
          </div>

          <!-- Pillar 3: Outbound Intel -->
          <div class="card" style="background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
            <div class="card-tag" style="color: #F4F7F6; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1rem;">tss-lead-researcher</div>
            <h3 style="margin-bottom: 1rem;">B2B Outreach & Partnerships</h3>
            <p style="color: #8FA3A0; line-height: 1.6; margin-bottom: 1rem; font-size: 0.9rem;">
              Acquiring VIP members (Winity Executive) requires precision outreach.<br><br>
              <strong style="color:#F4F7F6;">Targeting:</strong> Family offices, high-net-worth expat communities, and Web3 executive networks.<br><br>
              <strong style="color:#F4F7F6;">The Offer:</strong> We approach with an "Honest Observation" email showcasing the immediate utility of Winity over traditional banking.<br><br>
              <strong style="color:#F4F7F6;">PR Strategy:</strong> Distributing thought leadership on the future of sovereign wealth to Tech publications (CoinTelegraph, Sifted) for high DA backlinks.
            </p>
          </div>
          
        </div>
        
        <!-- Walkthrough & Timelines -->
        <div style="margin-top: 3rem;">
          <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem;">30-Day Execution Walkthrough</h3>
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="padding: 1.5rem; background: rgba(255,255,255,0.01); border-left: 2px solid #21E6A7; border-radius: 0 8px 8px 0;">
              <h4 style="margin-bottom: 0.5rem; color:#F4F7F6;">Week 1: Infrastructure & Testing</h4>
              <p style="color: #8FA3A0; font-size: 0.95rem; line-height: 1.6;">Deploy V7 ad variants (Meta & TikTok). Finalize AEO baseline assessments for all current web pages. Setup Playwright monitoring for tracking pixel integrity.</p>
            </div>
            
            <div style="padding: 1.5rem; background: rgba(255,255,255,0.01); border-left: 2px solid #21E6A7; border-radius: 0 8px 8px 0;">
              <h4 style="margin-bottom: 0.5rem; color:#F4F7F6;">Week 2: The Content Flywheel</h4>
              <p style="color: #8FA3A0; font-size: 0.95rem; line-height: 1.6;">Launch the first 5 AEO-optimized articles targeting Gulf & Europe. Initiate cold outreach sequences to top 20 VIP targets using Lead Researcher frameworks.</p>
            </div>
            
            <div style="padding: 1.5rem; background: rgba(255,255,255,0.01); border-left: 2px solid #21E6A7; border-radius: 0 8px 8px 0;">
              <h4 style="margin-bottom: 0.5rem; color:#F4F7F6;">Week 3: Algorithmic Scaling</h4>
              <p style="color: #8FA3A0; font-size: 0.95rem; line-height: 1.6;">Audit CPA performance. Scale winning ad-sets by exactly 20%. Exclude underperforming demographics. Publish PR articles to CoinTelegraph and Sifted.</p>
            </div>
            
            <div style="padding: 1.5rem; background: rgba(255,255,255,0.01); border-left: 2px solid #21E6A7; border-radius: 0 8px 8px 0;">
              <h4 style="margin-bottom: 0.5rem; color:#F4F7F6;">Week 4: Optimization & Retention</h4>
              <p style="color: #8FA3A0; font-size: 0.95rem; line-height: 1.6;">Activate the "Culture Stamps" referral triggers for the first wave of acquired users to lower blended CAC. Generate Month 1 performance report for stakeholders.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
'''
content = content.replace('    </div><!-- /tab-guide -->', new_tab)

with open('public/winity_singapore_gulf_campaign_flow.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
