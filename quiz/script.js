document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const nextBtn = document.getElementById("next-btn");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");
    const restartBtn = document.getElementById("restart-btn");

    const questions = [
        {
            question: "What does HTML stand for?",
            choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
            answer: 0
        },
        {
            question: "Which language is used for styling web pages?",
            choices: ["HTML", "JQuery", "CSS", "XML"],
            answer: 2
        },
        {
            question: "Which is not a JavaScript framework?",
            choices: ["Python Script", "JQuery", "Django", "NodeJS"],
            answer: 2
        }
    ];

    let currentIndex = 0
    let score = 0
    startBtn.addEventListener("click", startQuiz)

    nextBtn.addEventListener("click", () => {
        currentIndex++

        if (currentIndex < questions.length) {
            showQuestion()
        } else {
            showResult()
        }
    })
    function startQuiz() {
        startBtn.classList.add("hidden")
        resultContainer.classList.add("hidden")
        questionContainer.classList.remove("hidden")
        showQuestion();
    }
    function showQuestion() {
        nextBtn.classList.add("hidden")
        questionText.innerHTML = questions[currentIndex].question
        choicesList.innerHTML = ""
        questions[currentIndex].choices.forEach((choice, index) => {
            const li = document.createElement("li")
            li.textContent = choice
            li.addEventListener("click", () => selectAnswer(choice, index))
            choicesList.appendChild(li)

        })
        function selectAnswer(choice, index) {
            nextBtn.classList.remove("hidden")

            if (index === questions[currentIndex].answer) {
                score++;
            }
        }
    }

    function showResult() {
        resultContainer.classList.remove("hidden")
        questionContainer.classList.add("hidden")
        scoreDisplay.textContent = `${score}/${questions.length}`

    }

    restartBtn.addEventListener("click",()=>{
        currentIndex = 0
        score = 0
        startQuiz()
    })

})