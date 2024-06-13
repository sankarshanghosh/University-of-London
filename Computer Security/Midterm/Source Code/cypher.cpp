#include <iostream>
#include <string>

using namespace std;

// Function to convert a character to its corresponding numeric value
int charToNum(char c) {
    return c - 'A';
}

// Function to convert a numeric value to its corresponding character
char numToChar(int n) {
    return 'A' + (n % 26);
}

// Function to encrypt the plaintext using the key
string encrypt(const string& plaintext, const string& key) {
    string cipher = "";
    for (int i = 0; i < plaintext.length(); ++i) {
        int ptVal = charToNum(plaintext[i]);      // Convert plaintext character to number
        int keyVal = charToNum(key[i]);           // Convert key character to number
        int cipherVal = (ptVal + keyVal) % 26;    // Add and mod 26
        cipher += numToChar(cipherVal);           // Convert back to character and append to cipher text
    }
    return cipher;
}

int main() {
    // Inputs
    string plaintext = "SANKARSHAN";
    string key = "THISISANEXAMPLEKEYINCOMPUTERSECURITYEXAM";

    // Ensure the key length is at least equal to the plaintext length
    if (key.length() < plaintext.length()) {
        cout << "Error: Key length must be greater than or equal to the plaintext length." << endl;
        return 1;
    }

    // Encrypt the plaintext
    string cipher = encrypt(plaintext, key);

    // Output the result
    cout << "Plaintext: " << plaintext << endl;
    cout << "Key: " << key.substr(0, plaintext.length()) << endl; // Show only the part of the key used
    cout << "Cipher: " << cipher << endl;

    return 0;
}
