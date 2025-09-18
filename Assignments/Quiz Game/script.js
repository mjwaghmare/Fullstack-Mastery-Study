const questions = [
  {
    question: "What's full-form of HTML?",
    options: [
      "High Text Markup Language",
      "High Text Machine Language",
      "Hyper Text Markup Language",
      "Hyper Text Machine Language",
    ],
    correct: 2,
  },
  {
    question: "What's fullform of CSS?",
    options: [
      "Cascading Style Sheet",
      "Cascading Style State",
      "Cascading Sheet Style",
      "Cascading Style Shadow",
    ],
    correct: 0,
  },
  {
    question: "What's full-form of JS?",
    options: ["JavaScript", "Java", "Java Script", "JavaScript"],
    correct: 0,
  },
  {
    question: "What's full-form of SQL?",
    options: [
      "Structured Question Language",
      "Structured Query Language",
      "Structured Query Letter",
      "Structured Quality Language",
    ],
    correct: 1,
  }
];

let currentQuestion = 0; // Which question we're on (starts at 0)
let selectedAnswer = null; // Stores which answer was clicked
let score = 0; // Keep track of correct answers

// Function to load the current question and its options
function loadQuestion() {
  // Get the current question object from the questions array
  const question = questions[currentQuestion];
  
  // Update the text content of the question element with the current question
  document.getElementById('question').textContent = question.question;
  
  // Get all answer button elements
  const buttons = document.querySelectorAll('.answer-btn');
  
  // Loop through each answer button and update its text content with the corresponding option
  buttons.forEach((button, index) => {
    // Update the text content of the button with the current option
    button.textContent = question.options[index];
    
    // Remove the 'selected' class from the button (in case it was previously selected)
    button.classList.remove('selected');
  });
  
  // Reset the selected answer variable to null
  selectedAnswer = null;
  
  // Get the next button element
  const nextBtn = document.getElementById('next-btn');
  
  // Disable the next button (until an answer is selected)
  nextBtn.disabled = true;
  
  // Update the text content of the next button to 'Check Answer'
  nextBtn.textContent = 'Check Answer';
  
  // Set the onclick event handler of the next button to the checkAnswer function
  nextBtn.onclick = checkAnswer; // Reset to checkAnswer function
}

// Function to handle the selection of an answer

function selectAnswer(answerIndex) {
  // Log a debug message to the console with the selected answer index
  console.log('selectAnswer called with index:', answerIndex); // Debug line
  
  // Get all answer button elements
  const buttons = document.querySelectorAll('.answer-btn');
  
  // Loop through each answer button and update its class list
  buttons.forEach((button, index) => {
    // If the current button is the selected answer, add the 'selected' class
    if (index === answerIndex) {
      button.classList.add('selected');
    } 
    // Otherwise, remove the 'selected' class from the button
    else {
      button.classList.remove('selected');
    }
  });
  
  // Store the selected answer index in the selectedAnswer variable
  selectedAnswer = answerIndex;
  
  // Get the next button element
  const nextBtn = document.getElementById('next-btn');
  
  // Enable the "Check Answer" button
  nextBtn.disabled = false;
  
  // Log a debug message to the console with the selected answer
  console.log('Selected answer set to:', selectedAnswer); // Debug line
}

// Function to check the answer
function checkAnswer() {
  // Check if an answer has been selected
  if (selectedAnswer === null) {
    // If no answer has been selected, display an alert message
    alert('Please select an answer!');
    // Return from the function without doing anything else
    return;
  }
  
  // Get the current question data from the questions array
  const currentQuestionData = questions[currentQuestion];
  
  // Check if the selected answer is correct
  if (selectedAnswer === currentQuestionData.correct) {
    // If the answer is correct, display a "Correct!" alert message
    alert('Correct!');
    // Increment the score
    score++;
  } else {
    // If the answer is incorrect, get the text of the correct answer
    const correctAnswerText = currentQuestionData.options[currentQuestionData.correct];
    // Display an alert message with the correct answer
    alert(`Wrong! The correct answer was: ${correctAnswerText}`);
  }
  
  // Call the nextQuestion function to move to the next question
  nextQuestion();
}

// Function to move to the next question or show the final score
function nextQuestion() {
  // Move to the next question
  currentQuestion++;
  
  // Check if there are more questions left
  if (currentQuestion < questions.length) {
    // More questions left - load the next question
    loadQuestion();
  } else {
    // Quiz finished - display the final score
    alert(`Quiz finished! Your score: ${score}/${questions.length}`);
    
    // Reset the quiz
    currentQuestion = 0;
    score = 0;
    // Load the first question again
    loadQuestion();
  }
}

// Start the quiz when page loads
loadQuestion();
