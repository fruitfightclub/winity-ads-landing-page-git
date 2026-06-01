"""
Remove white background from phone mockup using:
1. Flood-fill from corners to find the background region
2. Remove with tolerance
"""
from PIL import Image
import numpy as np

brain = r'C:\Users\timot\.gemini\antigravity\brain\55fcc914-4a0d-453f-ace2-f901087d3b34\.tempmediaStorage'
pub   = r'C:\Users\timot\OneDrive\Desktop\TSS Studio\CLIENTS\Winity\winity-website\public'

def remove_white_bg(img_path, out_path, tolerance=18):
    """Remove near-white background using tolerance-based alpha masking."""
    img = Image.open(img_path).convert('RGBA')
    arr = np.array(img, dtype=np.float32)
    
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
    
    # White background: R, G, B all close to 255
    # Use distance from white: pixels very close to white = background
    dist_from_white = np.sqrt((255-r)**2 + (255-g)**2 + (255-b)**2)
    
    # Create alpha: 0 for background (near-white), 255 for foreground
    alpha = np.clip((dist_from_white / tolerance) * 255, 0, 255).astype(np.uint8)
    
    # Strong threshold: below tolerance/3 = fully transparent
    # Between tolerance/3 and tolerance = semi-transparent (anti-aliasing)
    hard_bg = dist_from_white < (tolerance * 0.4)
    alpha = np.where(hard_bg, 0, alpha)
    
    # Cap at 255
    alpha = np.minimum(alpha, 255)
    
    arr_out = arr.copy()
    arr_out[:,:,3] = alpha
    
    result = Image.fromarray(arr_out.astype(np.uint8), 'RGBA')
    
    # Crop to content
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)
    
    result.save(out_path, 'PNG')
    print(f"Saved: {out_path} {result.size}")
    transparent_px = (alpha < 10).sum()
    print(f"  Transparent pixels: {transparent_px} ({transparent_px/alpha.size*100:.1f}%)")
    return result

# Process phone
phone_src = f'{brain}\\media_55fcc914-4a0d-453f-ace2-f901087d3b34_1778132098087.png'
remove_white_bg(phone_src, f'{pub}/phone_mockup.png', tolerance=22)

# Process blue card (double-check the halo)
card_src = f'{brain}\\media_55fcc914-4a0d-453f-ace2-f901087d3b34_1778132097904.png'
remove_white_bg(card_src, f'{pub}/hero_card_blue.png', tolerance=20)

# Process dark card (it's the one from latest_assets)
dark_src = r'C:\Users\timot\OneDrive\Desktop\TSS Studio\CLIENTS\Winity\winity-website\public\latest_assets\media__1778123405708.png'
remove_white_bg(dark_src, f'{pub}/hero_card_dark.png', tolerance=22)

print("\nDone!")
