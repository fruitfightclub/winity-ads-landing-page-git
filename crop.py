from PIL import Image
import os
import glob

def crop_transparent(img_path, out_path):
    img = Image.open(img_path).convert('RGBA')
    bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
    diff = Image.new('L', img.size, 0)
    
    # Try using alpha channel for bounding box if transparent
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop(bbox)
        cropped.save(out_path)
        print(f"Cropped {img_path} to {bbox}")
    else:
        print(f"No transparent bbox found for {img_path}")

for f in glob.glob('public/new_assets/*.png'):
    crop_transparent(f, f.replace('.png', '_cropped.png'))
