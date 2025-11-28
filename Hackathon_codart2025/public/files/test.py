import base64
import hashlib

def transform(s):
    # Step 1: reverse string
    s = s[::-1]

    # Step 2: shift each character by +3 (ASCII Caesar shift)
    shifted = ''.join(chr(ord(c) + 3) for c in s)

    # Step 3: Base64 encode
    encoded = base64.b64encode(shifted.encode()).decode()

    # Step 4: Hash the result with SHA256
    return hashlib.sha256(encoded.encode()).hexdigest()


# This hash corresponds to the correct transformed flag
TARGET = "6a5b73617b8c00d6cc6a05a8e6f5d64f184e6317dfb3c1b434393790136160d6"

user = input("Enter the flag: ").strip()

if transform(user) == TARGET:
    print("Correct!")
else:
    print("Wrong flag!")
