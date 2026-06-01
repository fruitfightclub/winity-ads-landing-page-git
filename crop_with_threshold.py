from PIL import Image

def crop_with_alpha_threshold(filename, threshold=10):
    img = Image.open(filename)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Get alpha channel
    alpha = img.split()[3]
    
    # Find bounding box where alpha > threshold
    width, height = img.size
    left, top, right, bottom = width, height, 0, 0
    
    pixels = alpha.load()
    for y in range(height):
        for x in range(width):
            if pixels[x, y] > threshold:
                if x < left:
                    left = x
                if x > right:
                    right = x
                if y < top:
                    top = y
                if y > bottom:
                    bottom = y
                    
    if left < right and top < bottom:
        bbox = (left, top, right + 1, bottom + 1)
        print(f"{filename}: threshold={threshold}, bbox={bbox}")
        cropped = img.crop(bbox)
        out_name = filename.replace(".png", "_cropped_auto.png")
        cropped.save(out_name)
        print(f"  Saved to {out_name} with size {cropped.size}")
    else:
        print(f"{filename}: No pixels found above threshold {threshold}")

crop_with_alpha_threshold("public/hero_card_executive.png", threshold=15)
crop_with_alpha_threshold("public/hero_card_exclusive.png", threshold=15)
