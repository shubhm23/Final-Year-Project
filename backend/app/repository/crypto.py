from cryptography.fernet import Fernet


def encrypt_image(image_url: str):
    with open("./secret.ket", "rb") as file:
        key = file.read()
    fernet = Fernet(key)
    with open(image_url, "rb") as file:
        original = file.read()
    encrypted = fernet.encrypt(original)
    return encrypted


def decrypt_image(encrypted):
    with open("./secret.ket", "rb") as file:
        key = file.read()
    fernet = Fernet(key)
    original = fernet.encrypt(encrypted)
    return original


if __name__ == "__main__":
    key = Fernet.generate_key()

    with open("secret.ket", "wb") as file:
        file.write(key)
