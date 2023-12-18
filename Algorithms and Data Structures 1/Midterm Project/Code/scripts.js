function getRhymePattern(word) {
    word = word.toLowerCase();
    const vowels = "aeiou";
    let lastVowelIndex = -1;
    let isLastCharVowel = false;

    // Iterate from the end of the word to find the last significant vowel
    for (let i = word.length - 1; i >= 0; i--) {
        if (vowels.includes(word[i])) {
            if (i === word.length - 1) {
                isLastCharVowel = true; // Mark if the last character is a vowel
                continue; // Skip to the next iteration to find the previous vowel
            }
            // Check for consecutive vowels and get the first one in the sequence
            while (i > 0 && vowels.includes(word[i - 1])) {
                i--;
            }
            lastVowelIndex = i;
            break; // Break out of the loop once the first vowel in a sequence is found
        }
    }

    // Handle edge cases based on the vowel positions
    if (lastVowelIndex === -1) {
        return ""; // Return an empty string if no vowel is found
    } else if (isLastCharVowel && lastVowelIndex === word.length - 1) {
        // If the only vowel is the last character, return the word itself
        return word;
    } else {
        // Return the substring from the last significant vowel to the end of the word
        return word.substring(lastVowelIndex);
    }
}

// Function to display rhymes on the page
function displayRhymes(rhymes) {
    const resultsElement = document.getElementById("rhymeResults");
    resultsElement.innerHTML = ""; // Clear previous results
    if (rhymes.length === 0) {
        resultsElement.innerHTML = "No rhymes found.";
        return;
    }
    const list = document.createElement("ul");
    rhymes.forEach((rhyme) => {
        const listItem = document.createElement("li");
        listItem.textContent = rhyme;
        list.appendChild(listItem);
    });
    resultsElement.appendChild(list);
}

// Initialize the rhyme dictionary on page load
let rhymeDictionary = {};
fetch("wordList.json")
    .then((response) => response.json())
    .then((wordList) => {
        // Preprocess the word list into a hash table with the appropriate rhyme patterns
        wordList.forEach((word) => {
            const pattern = getRhymePattern(word);
            if (pattern) {
                rhymeDictionary[pattern] = rhymeDictionary[pattern] ?? [];
                rhymeDictionary[pattern].push(word);
            }
        });
    })
    .catch((error) => {
        console.error("There was a problem fetching the word list:", error);
    });

// Event listener for the "Find Rhymes" button click
document.getElementById("findRhymesBtn").addEventListener("click", () => {
    const inputWord = document.getElementById("wordInput").value.trim();
    const rhymes = rhymeDictionary[getRhymePattern(inputWord)] ?? [];
    displayRhymes(rhymes);
});
