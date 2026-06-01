from PIL import Image

def analyze_and_crop(filename):
    img = Image.open(filename)
    print(f"{filename}: size={img.size}, mode={img.mode}")
    bbox = img.getbbox()
    if bbox:
        print(f"  bbox={bbox}")
        cropped = img.crop(bbox)
        out_name = filename.replace(".png", "_cropped_auto.png")
        cropped.save(out_name)
        print(f"  Saved to {out_name} with size {cropped.size}")
    else:
        print("  No bbox found")

analyze_and_crop("public/hero_card_executive.png")
analyze_and_crop("public/hero_card_exclusive.png")
