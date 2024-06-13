#include <iostream>
#include <string>

using namespace std;

// Function to convert a character to its corresponding numeric value
int charToNum(char c) {
    return c - 'A';
}

// Function to convert a numeric value to its corresponding character
char numToChar(int n) {
    // Ensure the result is positive by adding 26 and taking modulo 26
    return 'A' + ((n + 26) % 26);
}

// Function to decrypt the cipher text using the key
string decrypt(const string& cipher, const string& key) {
    string plaintext = "";
    for (int i = 0; i < cipher.length(); ++i) {
        int cipherVal = charToNum(cipher[i]);     // Convert cipher character to number
        int keyVal = charToNum(key[i]);           // Convert key character to number
        int plainVal = (cipherVal - keyVal) % 26; // Subtract and mod 26
        plaintext += numToChar(plainVal);         // Convert back to character and append to plaintext
    }
    return plaintext;
}

int main() {
    // Inputs: example cipher text and key
    string cipher = "LHVCIJSUEK"; // got this by running the previous program
    string key = "THISISANEXAMPLEKEYINCOMPUTERSECURITYEXAM";

    // Decrypt the cipher text
    string plaintext = decrypt(cipher, key);

    // Output the results
    cout << "Cipher: " << cipher << endl;
    cout << "Key: " << key.substr(0, cipher.length()) << endl; // Show only the part of the key used
    cout << "Plaintext: " << plaintext << endl;

    return 0;
}
