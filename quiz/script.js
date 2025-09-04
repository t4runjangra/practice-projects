document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const nextBtn = document.getElementById("next-btn");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");
    const marksDisplay = document.getElementById("marks");
    const restartBtn = document.getElementById("restart-btn");
    const questionNumberDisplay = document.getElementById("question-number")
    const mainWrapper = document.querySelector(".main-wrapper")
    const createQuizBtn= document.getElementById("create-quiz-btn")
    const createQuizForm= document.getElementById("create-quiz-form")
    const quizContainer = document.getElementById("container")
    const quizCreateContainer = document.querySelector(".quiz-creator")
    const questionInput = document.querySelector("#question-input")
    const choice1 = document.querySelector("#choice1")
    const choice2 = document.querySelector("#choice2")
    const choice3 = document.querySelector("#choice3")
    const choice4 = document.querySelector("#choice4")
    const correctAnswerInput = document.querySelector("#correct-answer")
    const addQuestionBtn = document.getElementById("add-question-btn")
    const startQuizBtn = document.getElementById("startQuizBtn")
    const userMarks = document.getElementById("Marks")
    let userQuestions = []
    
    let currentQuestion = []
   
    const questions = [
        {
            question: "What does HTML stand for?",
            choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language","Haryanvi Tau Moti Laal"],
            answer: 0,
            marks: 5
        },
        {
            question: "Which language is used for styling web pages?",
            choices: ["HTML", "JQuery", "CSS", "XML"],
            answer: 2,
            marks: 7
        },
        {
            question: "Which is not a JavaScript framework?",
            choices: ["Python Script", "JQuery", "Django", "NodeJS"],
            answer: 2,
            marks: 3
        },
        {
            question: "Inside which HTML element do we put JavaScript?",
            choices: ["<js>", "<script>", "<scripting>", "<javascript>"],
            answer: 1,
            marks: 8
        },
        {
            question: "Which company developed JavaScript?",
            choices: ["Netscape", "Google", "Microsoft", "Oracle"],
            answer: 0,
            marks: 6
        },
        {
            question: "Which CSS property controls the text size?",
            choices: ["font-style", "text-size", "font-size", "text-style"],
            answer: 2,
            marks: 4
        },
        {
            question: "Which HTML attribute is used to define inline styles?",
            choices: ["font", "style", "styles", "class"],
            answer: 1,
            marks: 10
        },
        {
            question: "Which symbol is used for single-line comments in JavaScript?",
            choices: ["<!-- -->", "//", "/* */", "##"],
            answer: 1,
            marks: 2
        },
        {
            question: "What is the correct file extension for JavaScript files?",
            choices: [".java", ".js", ".jsx", ".javascript"],
            answer: 1,
            marks: 9
        },
        {
            question: "Which HTML attribute specifies an alternate text for an image?",
            choices: ["alt", "title", "src", "longdesc"],
            answer: 0,
            marks: 6
        }
    ];

    currentQuestion = questions
    createQuizBtn.addEventListener("click",()=>{
        createQuizBtn.classList.add("hidden")
        createQuizForm.classList.remove("hidden")
        quizContainer.classList.add("hidden")
        mainWrapper.style.flexDirection = "column";
        quizCreateContainer.style.maxWidth = "680px"
        mainWrapper.style.Width = "70vw"

    })
    
    createQuizForm.addEventListener("submit",(e)=>{
        e.preventDefault()
    })

    addQuestionBtn.addEventListener("click",()=>{
        let userQuestionInput = questionInput.value.trim()
        let userChoice1 = choice1.value.trim()
        let userChoice2 = choice2.value.trim()
        let userChoice3 = choice3.value.trim()
        let userChoice4 = choice4.value.trim()
        let userMarksFromInput = Number(userMarks.value)
        let userAnswer = correctAnswerInput.value
        console.log(typeof userMarksFromInput);
        console.log(userMarksFromInput);
        
        let newQuestion ={
            question: userQuestionInput ,
            choices: [userChoice1, userChoice2, userChoice3, userChoice4],
            answer: Number(userAnswer) ,
            marks: Number(userMarksFromInput)          
        }
        
        userQuestions.push(newQuestion)
        questionInput.value = ""
        choice1.value = ""
        choice2.value = ""
        choice3.value = ""
        choice4.value = ""
        correctAnswerInput.value = ""
    })

    startQuizBtn.addEventListener("click",()=>{
            quizCreateContainer.classList.add("hidden")
            quizContainer.classList.remove("hidden")
            currentQuestion = userQuestions
    })

    let currentIndex = 0
    let score = 0
    let questionNumber = 1
    let marks = 0
    let totalMarks = 0
    startBtn.addEventListener("click", startQuiz)

    nextBtn.addEventListener("click", () => {
        currentIndex++

        if (currentIndex < currentQuestion.length) {
            showQuestion()
        } else {
            showResult()
        }
    })
    function startQuiz() {
        startBtn.classList.add("hidden")
        resultContainer.classList.add("hidden")
        questionContainer.classList.remove("hidden")
        quizCreateContainer.classList.add("hidden")
        showQuestion();
    }
    function showQuestion() {
        questionNumberDisplay.classList.remove("hidden")
        questionNumberDisplay.textContent = ` - ${questionNumber}/${currentQuestion.length}`
        questionNumber++
        nextBtn.classList.add("hidden")

        totalMarks += currentQuestion[currentIndex].marks

        questionText.innerHTML = `${currentQuestion[currentIndex].question} 
        <p class="eachMarks">${currentQuestion[currentIndex].marks} marks* </p>`


        choicesList.innerHTML = ""
        currentQuestion[currentIndex].choices.forEach((choice, index) => {
            const li = document.createElement("li")
            li.textContent = choice
            li.addEventListener("click", () => ( (selectAnswer(index)) , li.style.background="rgba(50, 122, 255, 0.65)"))
            choicesList.appendChild(li)

        })
        console.log(currentQuestion);
        
        function selectAnswer(index) {
            console.log(index);
            console.log(currentIndex);
            console.log(currentQuestion[currentIndex].answer);
            console.log(currentQuestion[currentIndex].marks);
            
            nextBtn.classList.remove("hidden")
            if (index == currentQuestion[currentIndex].answer) {
                marks += currentQuestion[currentIndex].marks
                score++;
                
            }
        }
    }

    function showResult() {
        resultContainer.classList.remove("hidden");
        questionContainer.classList.add("hidden");
        scoreDisplay.textContent = `${score} out of ${currentQuestion.length}`;
        marksDisplay.textContent = `${marks} out of ${totalMarks}`;
        console.log(totalMarks, marks);
        

        let messageEl = document.getElementById("result-message");
        if (!messageEl) {
            messageEl = document.createElement("div");
            messageEl.id = "result-message";
            resultContainer.appendChild(messageEl);
        }
        messageEl.textContent = "";

        if (marks === totalMarks || marks >= 30) {
            party.confetti(resultContainer, {
                count: party.variation.range(40, 60)
            });
            const passMessages = [
                "🎉 Awesome! You crushed it!",
                "👏 Bravo, you passed!",
                "🌟 Fantastic job—keep it up!",
                "🥳 You did it! Well done!",
                "🏅 Way to go, superstar!"
            ];
            messageEl.textContent = passMessages[Math.floor(Math.random() * passMessages.length)];
        }
        else if (marks < 30) {
            resultContainer.classList.add("shake");
            setTimeout(() => resultContainer.classList.remove("shake"), 450);
            messageEl.textContent = "🙁 Oops! You need at least 30% marks to pass. Better luck next time!";

        }
    }


    restartBtn.addEventListener("click", () => {
        currentIndex = 0
        score = 0
        questionNumber = 1
        marks = 0
        totalMarks = 0
        startQuiz()
    })

})