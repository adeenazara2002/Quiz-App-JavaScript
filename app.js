const progressBar = document.querySelector(".progress-bar"),
progressText = document.querySelector(".progress-text");

const progress = (value) => {
    const percentage = (value / time) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML = `${value}`;
};

let questions = [],
time = 30,
score = 0,
currentQuestion,
timer;

const startBtn = document.querySelector(".start"),
numQuestions = document.querySelector("#num-questions");
category = document.querySelector("#category");
difficulty = document.querySelector("#difficulty");
timePerQuestion = document.querySelector("#time");
quiz = document.querySelector(".quiz");
startscreen = document.querySelector(".start-screen");

const startQuiz = () => {
    const num = numQuestions.value;
    cat = category.value;
    diff = difficulty.value;

    loadingAnimation();
    const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;

    fetch(url).then((res) => res.json())
    .then((data) => {
        questions=data.results;
        startscreen.classList.add("hide");
        quiz.classList.remove("hide");
        currentQuestion = 1;
        showQuestion(questions[0]);

    });
};

startBtn.addEventListener("click" , startQuiz);

const submitBtn = document.querySelector(".submit"),
nextBtn = document.querySelector(".next");
const showQuestion = (question) => {
    const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper"),
    questionNumber = document.querySelector(".number");
    questionText.innerHTML = question.question;

    const answers = [...question.incorrect_answers, question.correct_answer.toString(),
    ];

    answers.sort(() => Math.random() - 0.5);
    answersWrapper.innerHTML = "";
    answers.forEach((answer) => {
        answersWrapper.innerHTML += `
        <div class="answer ">
                <span class="text">${answer}</span>
                <span class="checkbox">
                  <span class="icon">✓</span>
                </span>
              </div>
        `
    });

    questionNumber.innerHTML = `
    Question <span class="current">${questions.indexOf(question) +1

    }</span><span class="total">/${questions.length}</span>
    `;

    // add event listener on answers

    const answersDiv =document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
        answer.addEventListener("click", () =>{
           if (!answer.classList.contains("checked")) {
             answersDiv.forEach((answer) => {
                answer.classList.remove("selected")
             });

             answer.classList.add("selected");
             submitBtn.disabled = false;

           }
        });
    });

    time = timePerQuestion.value;
    startTimer(time);
};

const startTimer = (time) => {
    timer = setInterval(() => {
       if (timer > 0) {
         progress(time);
         time--;
       }else{
        checkAnswer();
       }
    }, 1000);
};

submitBtn.addEventListener("click" , () => {
    checkAnswer();
});



const checkAnswer = () => {
   clearInterval(timer);

   const selectedAnswer = document.querySelector(".answer.selected");
   if (selectedAnswer) {
     const answer = selectedAnswer.querySelector(".text");
   }
}







