"""
Copy the newest assets from the brain to public/
- phone_mockup.png: latest phone (509x1024 RGBA, _1778132098087)
- hero_card_blue.png: blue card (_1778132097904, 713x416)
- hero_bg_arch.jpg: keep existing arch bg
"""
import shutil, os
from PIL import Image
import numpy as np

brain  = r'C:\Users\timot\.gemini\antigravity\brain\55fcc914-4a0d-453f-ace2-f901087d3b34\.tempmediaStorage'
pub    = r'C:\Users\timot\OneDrive\Desktop\TSS Studio\CLIENTS\Winity\winity-website\public'

# ─── 1. Phone — latest version (transparent RGBA)
phone_src = os.path.join(brain, 'media_55fcc914-4a0d-453f-ace2-f901087d3b34_1778132098087.png')
img = Image.open(phone_src).convert('RGBA')
arr = np.array(img, dtype=np.uint8)
alpha = arr[:,:,3]
transparent_px = (alpha < 10).sum()
print(f"Phone: {img.size}, transparent: {transparent_px}")
# Already transparent — just save
img.save(f'{pub}/phone_mockup.png', 'PNG')
print(f"  -> phone_mockup.png saved")

# ─── 2. Blue card — remove white shadow/halo using alpha trim
card_src = os.path.join(brain, 'media_55fcc914-4a0d-453f-ace2-f901087d3b34_1778132097904.png')
img = Image.open(card_src).convert('RGBA')
arr = np.array(img, dtype=np.uint8)
r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
existing_transparent = (a < 10).sum()
print(f"\nBlue card: {img.size}, existing transparent: {existing_transparent}")

if existing_transparent > 5000:
    # Already has transparency — check if halo still exists
    # White pixels with high alpha = halo → make them transparent
    is_near_white = (r > 220) & (g > 220) & (b > 220)
    # Also fade edges based on lightness
    halo = is_near_white & (a > 30)
    arr[:,:,3] = np.where(halo, 0, a)
    result = Image.fromarray(arr)
    bbox = result.getbbox()
    result = result.crop(bbox)
    result.save(f'{pub}/hero_card_blue.png', 'PNG')
    print(f"  -> hero_card_blue.png (halo removed) {result.size}")
else:
    # No transparency — remove white bg
    is_white = (r > 235) & (g > 235) & (b > 235)
    arr[:,:,3] = np.where(is_white, 0, 255)
    result = Image.fromarray(arr)
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)
    result.save(f'{pub}/hero_card_blue.png', 'PNG')
    print(f"  -> hero_card_blue.png (bg removed) {result.size}")

# ─── 3. Dark card — use the 509x1024 version which is the phone with card view
# Actually the dark card is in latest_assets: media__1778123405708.png
# Let's check what we have and use the best one
dark_card_path = r'C:\Users\timot\OneDrive\Desktop\TSS Studio\CLIENTS\Winity\winity-website\public\latest_assets\media__1778123405708.png'
if os.path.exists(dark_card_path):
    img = Image.open(dark_card_path).convert('RGBA')
    arr = np.array(img, dtype=np.uint8)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    # Remove near-white pixels
    is_near_white = (r > 220) & (g > 220) & (b > 220)
    arr[:,:,3] = np.where(is_near_white, 0, a)
    result = Image.fromarray(arr)
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)
    result.save(f'{pub}/hero_card_dark.png', 'PNG')
    print(f"\nDark card saved: {result.size}")

# ─── 4. Use the user's new arch/bg for the hero 
# The _1778126390497.png is 1920x1080 RGB — this is the hero reference image
# The actual arch bg should be the copper JPG
arch_src = r'C:\Users\timot\OneDrive\Desktop\TSS Studio\CLIENTS\Winity\winity-website\public\latest_assets\media__1778123405818.jpg'
if os.path.exists(arch_src):
    shutil.copy(arch_src, f'{pub}/hero_bg_arch.jpg')
    img = Image.open(arch_src)
    print(f"\nArch bg: {img.size}")

print("\n=== All assets processed ===")
print("Files in public/:")
for f in sorted(os.listdir(pub)):
    fp = os.path.join(pub, f)
    if os.path.isfile(fp):
        size = os.path.getsize(fp)
        print(f"  {f}: {size//1024}KB")
