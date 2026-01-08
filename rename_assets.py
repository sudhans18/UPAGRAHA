
import os
import re

path = 'c:/MyCareer/UPAGRAHA/assets/frames/'
files = [f for f in os.listdir(path) if f.endswith('.webp')]

# Sort files to ensure 00 -> 01 -> ... -> 89 order is preserved
# The current names are frame_00_... so simple string sort works, but better to extract number
def get_num(f):
    match = re.search(r'frame_(\d+)_', f)
    if match:
        return int(match.group(1))
    return -1

files.sort(key=get_num)

print(f"Found {len(files)} files to rename.")
for i, f in enumerate(files):
    # Mapping 0 -> frame_001.webp
    # Mapping 89 -> frame_090.webp
    new_name = f"frame_{str(i+1).zfill(3)}.webp"
    old_path = os.path.join(path, f)
    new_path = os.path.join(path, new_name)
    print(f"Renaming {f} -> {new_name}")
    os.rename(old_path, new_path)

print("Renaming complete.")
