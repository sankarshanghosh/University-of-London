function getRhymePattern(word) {
    // Convert the word to lower case to standardize the input, ensuring that
    // the algorithm is case-insensitive.
    word = word.toLowerCase();
    
    // Define a string containing all the vowels for later comparison.
    // This string is used to check whether a character is a vowel.
    const vowels = 'aeiou';
    
    // Initialize a variable to store the index of the last significant vowel found.
    // It starts at -1, which typically signifies "not found" in many search operations.
    let lastVowelIndex = -1;
    
    // A flag to mark if the last character of the word is a vowel.
    let isLastCharVowel = false;

    // Iterate backward through the word from the last character to the first.
    // The loop aims to find the last vowel that contributes to the rhyme.
    for (let i = word.length - 1; i >= 0; i--) {
        // Check if the current character is a vowel by seeing if it's included
        // in the 'vowels' string.
        if (vowels.includes(word[i])) {
            // If the current character is the last character of the word and it's a vowel,
            // set the flag to true. However, do not break the loop as we need to find
            // the previous vowel to determine the rhyme pattern.
            if (i === word.length - 1) {
                isLastCharVowel = true;
                continue;
            }
            
            // If we encounter consecutive vowels, we walk backward until we find
            // the first vowel in the sequence. This is because, in many cases,
            // the first vowel of a sequence determines the rhyme sound.
            while (i > 0 && vowels.includes(word[i - 1])) {
                i--;
            }
            
            // Once the first vowel of the sequence or a single vowel is found,
            // update the lastVowelIndex and exit the loop as we've found the
            // vowel that determines the rhyme pattern.
            lastVowelIndex = i;
            break;
        }
    }

    // After the loop, determine the appropriate substring to return based on the
    // position of the last significant vowel.
    if (lastVowelIndex === -1) {
        // If no vowel is found in the word, return an empty string.
        // This case handles words without vowels, which typically do not rhyme.
        return '';
    } else if (isLastCharVowel && lastVowelIndex === word.length - 1) {
        // If the only vowel in the word is the last character, return the entire word.
        // This handles words like 'be' or 'we' where the vowel itself is the rhyme.
        return word;
    } else {
        // Otherwise, return the substring from the last significant vowel to the end
        // of the word. This is the typical case for most rhyming words.
        return word.substring(lastVowelIndex);
    }
}
// The getRhymePattern function is designed to identify the rhyming segment of an English word,
// which is typically the last vowel and any following letters. This is essential for a rhyme-assistant tool,
// as it processes each word to determine its rhyming pattern. Here's how the function operates:

// 1. Standardizes the case of the input word to ensure consistent matching.
// 2. Searches from the end of the word to find the last vowel that influences the rhyme.
// 3. If the last character is a vowel, it's noted, but the search continues for the preceding vowel to find the rhyme pattern.
// 4. In the case of consecutive vowels, the function identifies the first vowel of the sequence.
// 5. Returns the segment of the word from the last significant vowel to the end as the rhyme pattern.

// This algorithm is well-suited for common English rhyming structures, providing a balance between
// linguistic accuracy and algorithmic simplicity. It aims to match words that rhyme by their terminal vowel sounds
// and any consonants that follow, which is a typical characteristic of English rhymes.
