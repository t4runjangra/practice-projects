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

    let currentIndex = 0
    let score = 0
    let questionNumber = 1
    let marks = 0
    let totalMarks = 0
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
        questionNumberDisplay.classList.remove("hidden")
        questionNumberDisplay.textContent = ` - ${questionNumber}/${questions.length}`
        questionNumber++
        nextBtn.classList.add("hidden")

        totalMarks += questions[currentIndex].marks

        questionText.innerHTML = `${questions[currentIndex].question} 
        <p class="eachMarks">${questions[currentIndex].marks} marks* </p>`


        choicesList.innerHTML = ""
        questions[currentIndex].choices.forEach((choice, index) => {
            const li = document.createElement("li")
            li.textContent = choice
            li.addEventListener("click", () => ( (selectAnswer(index)) , li.style.background="#918f8fff"))
            choicesList.appendChild(li)

        })
        function selectAnswer(index) {
            nextBtn.classList.remove("hidden")
            if (index === questions[currentIndex].answer) {
                marks += questions[currentIndex].marks
                score++;
            }
        }
    }

    function showResult() {
        resultContainer.classList.remove("hidden");
        questionContainer.classList.add("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
        marksDisplay.textContent = `${marks} out of ${totalMarks}`;

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
            messageEl.textContent = "🙁 Oops! You need at least 30 marks to pass. Better luck next time!";

        }
    }


    restartBtn.addEventListener("click", () => {
        currentIndex = 0
        score = 0
        questionNumber = 1
        startQuiz()
    })

})