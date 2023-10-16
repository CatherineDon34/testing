 const questions = [  //An array of 10 quiz questions, each with multiple choice answers 
    { 
    question: "Which country has the most lakes in the world?", //Question 1
    answers: [
        { text: "China", correct: false },
        { text: "Canada", correct: true }, //Correct answer (out of the 4 answer choices)
        { text: "Egypt", correct: false },
        { text: "Russia", correct: false },
    ]
    },   
    {
        question: "Who became the youngest ever person appointed as a UNICEF Goodwill Ambassador?",
        answers: [
            { text: "Jackie Chan", correct: false },
            { text: "Priyanka Chopra", correct: false },
            { text: "Malala Yousafzai", correct: false },
            { text: "Millie Bobby Brown", correct: true }, //Correct Answer
        ]    
    },
    {
        question: "Out of the following who has the most Instagram followers?",
        answers: [
            { text: "Billie Eilish", correct: false },
            { text: "Kylie Jenner", correct: false },
            { text: "Taylor Swift", correct: false },
            { text: "Cristiano Ronaldo", correct: true }, //Correct Answer
        ]
    },
    {
        question: "Which playground game used to be an Olympic sport up until 1920?",
        answers: [
            { text: "Tug of war", correct: true }, //Correct Answer
            { text: "Competitive Seasaw riding", correct: false },
            { text: "Monkey Bar Racing", correct: false },
            { text: "Tag", correct: false },
        ]
    },
    {
        question: "Which country, on average, has the tallest males?",
        answers: [
            { text: "Australia", correct: false },
            { text: "Netherlands", correct: true }, //Correct Answer
            { text: "Italy", correct: false },
            { text: "Wales", correct: false },
        ]
    },
    {
        question: "Who was the youngest artist since Justin Bieber to have a Number One selling album?",
        answers: [
            { text: "Shawn Mendes", correct: true }, //Correct Answer
            { text: "Olivia Rodrigo", correct: false },
            { text: "Selena Gomez", correct: false },
            { text: "Billie Eilish", correct: false },
        ]
    },
    {
        question: "Which of these languages is NOT an official Indian language?",
        answers: [
            { text: "English", correct: false },
            { text: "Hindi", correct: false },
            { text: "Indian Sign Language", correct: true }, //Correct Answer
            
        ]
    },
    {
        question: "What special Item does McDonald’s serve in the Philippines?",
        answers: [
            { text: "Fish Fingers", correct: false },
            { text: "Adobo Burger", correct: false },
            { text: "Spaghetti", correct: true }, //Correct Answer
            { text: "Cassava Cake", correct: false },
        ]
    },
    {
        question: "How many words in the English language end in “dous”?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true }, //Correct Answer
            { text: "5", correct: false },
            { text: "8", correct: false },
        ]
    },
    {
        question: "Generation Z kids are the first group to grow up with what?",
        answers: [
            { text: "The Internet", correct: true }, //Correct Answer
            { text: "Television", correct: false },
            { text: "Video Games", correct: false },
            { text: "Computers", correct: false },
        ]
    },

 ];

//Getting references to HTML elements 
 const questionElement = document.getElementById("question"); //Defining the "questionElement" variable.  
 const answerButtons = document.getElementById("answer-buttons"); //Defining the "answerButtons" variable. 
 const nextButton = document.getElementById("next-button"); //Defining the "nextButton" variable. 
 
 let currentQuestionIndex = 0; //Initializing the current question index  
 let score = 0; //Initializing the score to begin with

 //Declaring the "startQuiz" function to start the quiz
 function startQuiz() {
    currentQuestionIndex = 0; //Reset the current question Index
    score = 0; //Reset the score
    nextButton.innerHTML = "Next"  //Setting up the "Next" button
    showQuestion(); 
 }

 //Declaring the "showQuestion" function to display the current question and it's answer choices 
 function showQuestion() {
    resetState(); //Different function that clears previous question state
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; //Calculate the current question number
   
    questionElement.innerHTML = questionNo + "." + currentQuestion.question; 
    //Displays the current question with the question number before it. Eg: 1. (Insert question no.1)

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); //Create buttons for the answer choices
        button.innerHTML = answer.text;
        button.classList.add("button")
        answerButtons.appendChild(button);
        
        if(answer.correct) {
            button.dataset.correct = answer.correct; //Setting dataset to mark correct answers
        }
        button.addEventListener("click", selectAnswer); //Executes "selectAnswer" function when the button is clicked
    });
 }

 //Declaring "resetState" function which resets the user interface state between questions, clears previous question state
 function resetState() { 
    nextButton.style.display = "none"; //Hides the "Next" button
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); //Clears previous answer choices
    }
 }

 //Declaring "selectAnswer" function which handles the user's selected (clicked on) answer choice (answer button) in response to a question
 function selectAnswer(e) { 
    const selectedButton = e.target
    const isCorrect = selectedButton.dataset.correct === "true"; //Checking if the user's selected answer is correct
    if(isCorrect) {
        selectedButton.classList.add("correct"); //If correct, marking selected answer as correct
        score++; //Increases socre by 1
    } 
    else {
        selectedButton.classList.add("incorrect"); //If incorrect, marking selected answer as incorrect
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){ 
            button.classList.add("correct"); //Marks the correct answer if user selects the incorrect answer
        }
        button.disabled = false; //Disables the use of answer choice buttons after the user has selected an answer choice
    });
    nextButton.style.display = "block"; //Displays the "Next" button after answer selection
 }

 //Declaring "showScore" function which displays final score
function showScore() {
    resetState();
    questionElement.innerHTML = score + "/10 is your final score!" //Displays final score
}

//Declaring "handleNextButton" function which handles the "Next" button
 function handleNextButton() {
    currentQuestionIndex++; //Increases question index to move to next question
    if(currentQuestionIndex < questions.length) { 
        showQuestion();
    } 
    else {
        showScore(); //If all questions have been answered, displays final score
    }
 }

//Handles "Next" button when clicked
 nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }
 })

 startQuiz(); //Starts quiz when page loads
