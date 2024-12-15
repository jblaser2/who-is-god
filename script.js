// Retrieve and display stored words when the page loads
window.onload = function() {
  const savedWords = JSON.parse(localStorage.getItem('words')) || [];
  savedWords.forEach(displayWord);
};

// Function to add a word to the display and store it
function addWord() {
  const input = document.getElementById('wordInput');
  const word = input.value.trim();
  if (word) {
    // Random color for each word
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    
    // Create a word object with text and color
    const wordObj = { text: word, color: color };
    
    // Add word to local storage
    const words = JSON.parse(localStorage.getItem('words')) || [];
    words.push(wordObj);
    localStorage.setItem('words', JSON.stringify(words));
    
    // Display the word on the page
    displayWord(wordObj);
    
    // Clear the input box
    input.value = '';
  }
}

// Function to display a word with delete functionality
function displayWord(wordObj) {
  const displayDiv = document.getElementById('display');
  const wordElement = document.createElement('span');
  wordElement.textContent = wordObj.text;
  wordElement.className = 'word';
  wordElement.style.color = wordObj.color;
  
  // Add click event to delete individual word
  wordElement.onclick = function() {
    deleteWord(wordObj);
    displayDiv.removeChild(wordElement);
  };
  
  displayDiv.appendChild(wordElement);
}

// Function to delete a specific word from localStorage
function deleteWord(wordObj) {
  const words = JSON.parse(localStorage.getItem('words')) || [];
  const updatedWords = words.filter(word => word.text !== wordObj.text || word.color !== wordObj.color);
  localStorage.setItem('words', JSON.stringify(updatedWords));
}

// Function to clear all words
function clearAllWords() {
  localStorage.removeItem('words'); // Clear words from localStorage
  document.getElementById('display').innerHTML = ''; // Clear words from display
}
function checkEnter(event) {
  // Check if the key pressed is "Enter" (key code 13 or 'Enter' for modern browsers)
  if (event.key === "Enter") {
    addWord(); // Call the function to add the response
  }
}
