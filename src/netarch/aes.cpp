#include <iostream>
#include <cryptlib.h>
#include <aes.h>
#include <modes.h>
#include <filters.h>
#include <hex.h>
#include <osrng.h>

using namespace CryptoPP;

void AES_Encrypt(const std::string& plain, const SecByteBlock& key, std::string& cipher) {
    AutoSeededRandomPool rng;
    byte iv[AES::BLOCKSIZE];
    rng.GenerateBlock(iv, sizeof(iv));

    cipher.clear();
    cipher.append((char*)iv, sizeof(iv)); // Prepend IV

    // Encrypt
    CBC_Mode<AES>::Encryption encryption(key, key.size(), iv);
    StringSource(plain, true,
        new StreamTransformationFilter(encryption,
            new StringSink(cipher)
        )
    );
}

void AES_Decrypt(const std::string& cipher, const SecByteBlock& key, std::string& plain) {
    byte iv[AES::BLOCKSIZE];
    memcpy(iv, cipher.data(), AES::BLOCKSIZE); // Extract IV

    // Decrypt
    CBC_Mode<AES>::Decryption decryption(key, key.size(), iv);
    StringSource(cipher.substr(AES::BLOCKSIZE), true,
        new StreamTransformationFilter(decryption,
            new StringSink(plain)
        )
    );
}

int main() {
    AutoSeededRandomPool rng;
    SecByteBlock key(AES::DEFAULT_KEYLENGTH);
    rng.GenerateBlock(key, key.size());

    std::string plain = "Hello, World!";
    std::string cipher;
    AES_Encrypt(plain, key, cipher);
    std::cout << "Encrypted: " << cipher << std::endl;

    std::string decrypted;
    AES_Decrypt(cipher, key, decrypted);
    std::cout << "Decrypted: " << decrypted << std::endl;

    return 0;
}