"""
Fix hero assets - remove near-white backgrounds using PIL
"""
from PIL import Image
import numpy as np

pub = 'C:/Users/timot/OneDrive/Desktop/TSS Studio/CLIENTS/Winity/winity-website/public'
latest = f'{pub}/latest_assets'

def remove_white_bg(src_path, dest_path, tolerance=20, label=''):
    img = Image.open(src_path).convert('RGBA')
    arr = np.array(img, dtype=np.uint8)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    
    # Count existing transparency
    existing_transparent = (a < 10).sum()
    print(f"[{label}] size: {img.size}, existing transparent: {existing_transparent}")
    
    if existing_transparent > 1000:
        # Already has good alpha - just save with crop
        result = img.crop(img.getbbox())
        result.save(dest_path, 'PNG')
        print(f"  -> Kept existing alpha, cropped to {result.size}")
        return
    
    # Remove near-white background
    bg_mask = (r > (255-tolerance)) & (g > (255-tolerance)) & (b > (255-tolerance))
    arr[:,:,3] = np.where(bg_mask, 0, 255)
    
    result = Image.fromarray(arr, 'RGBA')
    bbox = result.getbbox()
    result = result.crop(bbox)
    result.save(dest_path, 'PNG')
    
    alpha_check = np.array(result)[:,:,3]
    print(f"  -> Removed bg, saved {result.size} | transparent: {(alpha_check==0).sum()}")

# Process blue card (currently has white halo)
remove_white_bg(
    f'{latest}/media__1778123405871.png',
    f'{pub}/hero_card_blue.png',
    tolerance=22,
    label='BLUE CARD'
)

# Process dark card - keep original dark bg, just ensure it's RGBA  
dark = Image.open(f'{latest}/media__1778123405708.png').convert('RGBA')
print(f"\n[DARK CARD] size: {dark.size}")
arr = np.array(dark, dtype=np.uint8)
alpha = arr[:,:,3]
print(f"  Transparent px: {(alpha==0).sum()}, Opaque: {(alpha==255).sum()}")

# Dark card - background is not white, it's dark. Just keep as is.
dark.crop(dark.getbbox()).save(f'{pub}/hero_card_dark.png', 'PNG')
print(f"  -> Saved hero_card_dark.png")

print("\nDone!")
