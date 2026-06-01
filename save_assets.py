"""
Process and copy all new assets to public/ for the hero section.
Assets from the latest user upload:
  - New phone mockup (transparent, best quality): _1778129529434.png
  - Blue card (needs white bg removal): _1778129559456.png  
  - Dark card (new clean version from user upload): from the user's attachment
  - Arch background (full): from the user's attachment
"""
import shutil, os
from PIL import Image
import numpy as np

brain  = r'C:\Users\timot\.gemini\antigravity\brain\55fcc914-4a0d-453f-ace2-f901087d3b34\.tempmediaStorage'
pub    = r'C:\Users\timot\OneDrive\Desktop\TSS Studio\CLIENTS\Winity\winity-website\public'

# ─── 1. New phone mockup ─────────────────────────────────────────────────────
phone_src = os.path.join(brain, 'media_55fcc914-4a0d-453f-ace2-f901087d3b34_1778129529434.png')
img = Image.open(phone_src).convert('RGBA')
arr = np.array(img, dtype=np.uint8)
alpha = arr[:,:,3]
existing_transparent = (alpha < 10).sum()
print(f"Phone: {img.size}, existing transparent px: {existing_transparent}")

# If already transparent, just crop
if existing_transparent > 5000:
    result = img.crop(img.getbbox())
    result.save(f'{pub}/phone_mockup.png', 'PNG')
    print(f"  -> Saved phone (pre-transparent) {result.size}")
else:
    # Remove near-white bg
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
    tol = 18
    bg = (r > 255-tol) & (g > 255-tol) & (b > 255-tol)
    arr[:,:,3] = np.where(bg, 0, 255)
    result = Image.fromarray(arr).crop(Image.fromarray(arr).getbbox())
    result.save(f'{pub}/phone_mockup.png', 'PNG')
    print(f"  -> Saved phone (bg removed) {result.size}")

# ─── 2. Blue card — remove white halo ────────────────────────────────────────
blue_src = os.path.join(brain, 'media_55fcc914-4a0d-453f-ace2-f901087d3b34_1778129559456.png')
img = Image.open(blue_src).convert('RGBA')
arr = np.array(img, dtype=np.uint8)
alpha = arr[:,:,3]
existing_transparent = (alpha < 10).sum()
print(f"\nBlue card: {img.size}, existing transparent px: {existing_transparent}")

if existing_transparent > 5000:
    result = img.crop(img.getbbox())
    result.save(f'{pub}/hero_card_blue.png', 'PNG')
    print(f"  -> Saved blue card (pre-transparent) {result.size}")
else:
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
    tol = 22
    bg = (r > 255-tol) & (g > 255-tol) & (b > 255-tol)
    arr[:,:,3] = np.where(bg, 0, 255)
    result = Image.fromarray(arr)
    bbox = result.getbbox()
    result = result.crop(bbox)
    result.save(f'{pub}/hero_card_blue.png', 'PNG')
    print(f"  -> Saved blue card (bg removed) {result.size}")

# ─── 3. Arch background — save as full background ────────────────────────────
# The arch JPG is the newest media__1778123405818.jpg — that's the one in latest_assets
arch_src = r'C:\Users\timot\OneDrive\Desktop\TSS Studio\CLIENTS\Winity\winity-website\public\latest_assets\media__1778123405818.jpg'
if os.path.exists(arch_src):
    shutil.copy(arch_src, f'{pub}/hero_bg_arch.jpg')
    print(f"\nArch bg copied: hero_bg_arch.jpg")

# Also check if the user sent a new arch JPG from their current session attachments
# The arch image with teal background + copper ring was in the user's message
# Let's look at all jpg/png from current session in brain
print("\nAll media files in brain (checking for arch):")
for f in sorted(os.listdir(brain)):
    fp = os.path.join(brain, f)
    size = os.path.getsize(fp)
    if size > 100*1024:  # > 100KB
        img_check = Image.open(fp)
        print(f"  {f}: {img_check.size} {img_check.mode} ({size//1024}KB)")

print("\nDone!")
