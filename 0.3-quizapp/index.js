const questions = [
    {
        question: "What is my favorite food?",
        answers: [
            {text: "Pasta", correct: false},
            {text: "French fries & eggs", correct: true},
            {text: "Seafood", correct: false},
            {text: "Wings", correct: false},
        ]
    },
    {
        question: "What is my shoe size?",
        answers: [
            {text: "10", correct: false},
            {text: "10 1/2", correct: false},
            {text: "12", correct: false},
            {text: "11 1/2", correct: true},
        ]
    },
    {
        question: "Where is my favortie artist from?",
        answers: [
            {text: "Atlanta", correct: false},
            {text: "Los Angeles", correct: false},
            {text: "Brooklyn", correct: false},
            {text: "Toronto", correct: true},
        ]
    },
    {
        question: "A",
        answers: [
            {text: "Correct", correct: true},
            {text: "Wrong", correct: false},
            {text: "Wrong", correct: false},
            {text: "Wrong", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion()
}

const showQuestion = () => {
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

const resetState = () => {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    }else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}

const showScore = () => {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

const handleNextButton = () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion()
    }else {
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
})

startQuiz();