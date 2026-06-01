import os
from PIL import Image

def crop_transparent(img_path, out_path):
    img = Image.open(img_path)
    if img.mode != 'RGBA':
        img.save(out_path)
        return
    bbox = img.getbbox()
    if bbox:
        img.crop(bbox).save(out_path)
    else:
        img.save(out_path)

src = 'C:/Users/timot/OneDrive/Desktop/TSS Studio/CLIENTS/Winity/winity-website/public/latest_assets'
dest = 'C:/Users/timot/OneDrive/Desktop/TSS Studio/CLIENTS/Winity/winity-website/public'

crop_transparent(f'{src}/media__1778122850887.png', f'{dest}/hero_arch.png')
crop_transparent(f'{src}/media__1778123405272.png', f'{dest}/phone_mockup.png')
crop_transparent(f'{src}/media__1778123405708.png', f'{dest}/hero_card1.png')
crop_transparent(f'{src}/media__1778123405871.png', f'{dest}/hero_card2.png')

print('Images cropped and copied successfully.')
