"""
Fix phone mockup - it has 0 transparent pixels.
The phone has a dark but non-transparent background (checkered pattern = transparent
but PNG RGBA has near-black values instead of 0 alpha).
We need to check what's actually in the alpha channel and also the RGB values.
"""
from PIL import Image
import numpy as np

brain = r'C:\Users\timot\.gemini\antigravity\brain\55fcc914-4a0d-453f-ace2-f901087d3b34\.tempmediaStorage'
pub   = r'C:\Users\timot\OneDrive\Desktop\TSS Studio\CLIENTS\Winity\winity-website\public'

# Load the phone image
phone_src = f'{brain}\\media_55fcc914-4a0d-453f-ace2-f901087d3b34_1778132098087.png'
img = Image.open(phone_src).convert('RGBA')
arr = np.array(img)
r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]

print(f"Image size: {img.size}")
print(f"Alpha stats: min={a.min()}, max={a.max()}, mean={a.mean():.1f}")
print(f"Alpha distribution:")
for threshold in [0, 10, 50, 127, 200, 240, 255]:
    count = (a < threshold).sum() if threshold > 0 else 0
    print(f"  < {threshold}: {count} px ({count / a.size * 100:.1f}%)")

# Check corner pixels (should be background)
print(f"\nCorner pixels (r,g,b,a):")
print(f"  Top-left:     {arr[0,0]}")
print(f"  Top-right:    {arr[0,-1]}")
print(f"  Bottom-left:  {arr[-1,0]}")
print(f"  Bottom-right: {arr[-1,-1]}")

# Check if corners are the checkerboard gray (127/128 gray = transparent in viewer)
corners = [arr[0,0], arr[0,-1], arr[-1,0], arr[-1,-1]]
for c in corners:
    print(f"    RGB: ({c[0]},{c[1]},{c[2]}) Alpha: {c[3]}")

# The checkerboard colors are typically around 191 and 128 (light/dark gray)
# Let's find what the background color actually is
# Sample a 5x5 block from top-left corner
sample = arr[:5, :5]
print(f"\nTop-left 5x5 sample:")
for row in sample:
    print([f"({p[0]},{p[1]},{p[2]},{p[3]})" for p in row])

# Try to identify background
# Method: The phone has a dark frame, so background might be a specific gray
unique_top_left = arr[:20, :20].reshape(-1, 4)
print(f"\nMost common colors in top-left 20x20:")
unique, counts = np.unique(unique_top_left.tolist(), axis=0, return_counts=True)
idx = counts.argsort()[-5:][::-1]
for i in idx:
    print(f"  {unique[i]} x {counts[i]}")
