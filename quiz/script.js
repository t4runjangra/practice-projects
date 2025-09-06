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
    const createQuizBtn = document.getElementById("create-quiz-btn")
    const createQuizForm = document.getElementById("create-quiz-form")
    const quizContainer = document.getElementById("container")
    const quizQuestionContainer = document.getElementById("quiz-container")
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
    const categoryContainer = document.getElementById("category-container")
    const categoryBtns = document.querySelectorAll(".category-btn")
    const randomQuiz = document.getElementById("random-category")
    const htmlQuizBtn = document.querySelector("#html-quiz")
    const cssQuizBtn = document.querySelector("#css-quiz")
    const jsQuizBtn = document.querySelector("#js-quiz")


    let currentIndex = 0
    let score = 0
    let questionNumber = 1
    let marks = 0
    let totalMarks = 0
    let nextQue = 1
    let userQuestions = []

    let currentQuestion = []

    const htmlQuestions = [
        {
            question: "What does HTML stand for?",
            choices: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language",
                "Highlevel Machine Language"
            ],
            answer: 0,
            marks: 2
        },
        {
            question: "Who is the primary author of HTML?",
            choices: [
                "Brendan Eich",
                "Tim Berners-Lee",
                "Elon Musk",
                "James Gosling"
            ],
            answer: 1,
            marks: 2
        },
        {
            question: "Which is the correct HTML tag for inserting a line break?",
            choices: [
                "<break>",
                "<lb>",
                "<br>",
                "<b>"
            ],
            answer: 2,
            marks: 1
        },
        {
            question: "Which HTML tag is used to display a picture on a web page?",
            choices: [
                "<image>",
                "<pic>",
                "<img>",
                "<picture>"
            ],
            answer: 2,
            marks: 1
        },
        {
            question: "What is the correct HTML tag for making text bold?",
            choices: [
                "<bold>",
                "<b>",
                "<strong>",
                "<important>"
            ],
            answer: 1,
            marks: 1
        },
        {
            question: "Which tag is used to define a table header?",
            choices: [
                "<theader>",
                "<header>",
                "<th>",
                "<head>"
            ],
            answer: 2,
            marks: 2
        },
        {
            question: "What is the purpose of the 'alt' attribute on an <img> tag?",
            choices: [
                "To define image alignment",
                "To provide alternative text for the image",
                "To link to another image",
                "To style the image"
            ],
            answer: 1,
            marks: 2
        },
        {
            question: "How can you open a link in a new tab/browser window?",
            choices: [
                "target='open'",
                "target='_blank'",
                "newwindow=1",
                "href='new'"
            ],
            answer: 1,
            marks: 3
        },
        {
            question: "Which tag is used for creating an unordered list?",
            choices: [
                "<ol>",
                "<ul>",
                "<list>",
                "<li>"
            ],
            answer: 1,
            marks: 2
        },
        {
            question: "Which HTML element defines the document title that is shown in the browser's title bar?",
            choices: [
                "<meta>",
                "<header>",
                "<title>",
                "<head>"
            ],
            answer: 2,
            marks: 4
        }
    ];

    const cssQuestions = [
        {
            question: "What does CSS stand for?",
            choices: [
                "Computer Style Sheets",
                "Cascading Style Sheets",
                "Creative Style Sheets",
                "Colorful Style Sheets"
            ],
            answer: 1,
            marks: 2
        },
        {
            question: "Which HTML tag is used to link an external CSS file?",
            choices: [
                "<css>",
                "<style>",
                "<link>",
                "<script>"
            ],
            answer: 2,
            marks: 3
        },
        {
            question: "Which property sets the background color of an element?",
            choices: [
                "bgcolor",
                "background",
                "background-color",
                "color-background"
            ],
            answer: 2,
            marks: 1
        },
        {
            question: "How do you select an element with the class name 'intro'?",
            choices: [
                "#intro",
                ".intro",
                "*intro",
                "intro"
            ],
            answer: 1,
            marks: 1
        },
        {
            question: "Which CSS property controls the text size?",
            choices: [
                "font-style",
                "text-size",
                "font-size",
                "text-style"
            ],
            answer: 2,
            marks: 2
        },
        {
            question: "What does the z-index property control?",
            choices: [
                "Element's font size",
                "Element's stacking order",
                "Element's opacity",
                "Element's margin"
            ],
            answer: 1,
            marks: 3
        },
        {
            question: "How do you add a comment in a CSS file?",
            choices: [
                "// this is a comment",
                "/* this is a comment */",
                "' this is a comment",
                "-- this is a comment --"
            ],
            answer: 1,
            marks: 1
        },
        {
            question: "Which of these is used to create a flex container?",
            choices: [
                "display: block;",
                "display: flex;",
                "display: inline;",
                "position: flex;"
            ],
            answer: 1,
            marks: 4
        },
        {
            question: "What is the default value of the position property?",
            choices: [
                "absolute",
                "fixed",
                "relative",
                "static"
            ],
            answer: 3,
            marks: 2
        },
        {
            question: "Which property is used for responsive design to set different rules for different screen sizes?",
            choices: [
                "@media",
                "@import",
                "@keyframes",
                "@font-face"
            ],
            answer: 0,
            marks: 5
        }
    ];
    const jsQuestions = [
        {
            question: "What is the correct syntax to print a message in the browser console?",
            choices: [
                "console.print('Hello')",
                "print('Hello')",
                "log.console('Hello')",
                "console.log('Hello')"
            ],
            answer: 3,
            marks: 1
        },
        {
            question: "Which symbol is used for single-line comments in JavaScript?",
            choices: [
                "#",
                "//",
                "<!-- -->",
                "/* */"
            ],
            answer: 1,
            marks: 1
        },
        {
            question: "What is the correct JavaScript syntax to change the content of an HTML element with id 'demo'?",
            choices: [
                "document.getElementById('demo').text = 'Hello';",
                "document.getElement('demo').innerHTML = 'Hello';",
                "document.getElementById('demo').innerHTML = 'Hello';",
                "#demo.innerHTML = 'Hello';"
            ],
            answer: 2,
            marks: 2
        },
        {
            question: "How do you declare a JavaScript variable?",
            choices: [
                "var name;",
                "variable name;",
                "v name;",
                "dim name;"
            ],
            answer: 0,
            marks: 1
        },
        {
            question: "Which keyword is used to define a constant in JavaScript?",
            choices: [
                "var",
                "let",
                "const",
                "final"
            ],
            answer: 2,
            marks: 2
        },
        {
            question: "Which method can be used to convert a string to an integer?",
            choices: [
                "parseInt()",
                "toInteger()",
                "int()",
                "Number()"
            ],
            answer: 0,
            marks: 2
        },
        {
            question: "What is the output of 'typeof []' in JavaScript?",
            choices: [
                "'object'",
                "'array'",
                "'list'",
                "'undefined'"
            ],
            answer: 0,
            marks: 3
        },
        {
            question: "What is a correct way to write an array in JavaScript?",
            choices: [
                "var colors = (1:'red', 2:'green', 3:'blue')",
                "var colors = ['red', 'green', 'blue']",
                "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
                "var colors = 'red', 'green', 'blue'"
            ],
            answer: 1,
            marks: 1
        },
        {
            question: "Which method removes the last element from an array?",
            choices: [
                "pop()",
                "push()",
                "removeLast()",
                "delete()"
            ],
            answer: 0,
            marks: 2
        },
        {
            question: "Which of the following is a strict equality comparison?",
            choices: [
                "x = y",
                "x == y",
                "x === y",
                "x := y"
            ],
            answer: 2,
            marks: 4
        }
    ];

    const questions = [
        {
            question: "What does HTML stand for?",
            choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Haryanvi Tau Moti Laal"],
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

    createQuizBtn.addEventListener("click", () => {
        createQuizBtn.classList.add("hidden")
        createQuizForm.classList.remove("hidden")
        quizContainer.classList.add("hidden")
        mainWrapper.style.flexDirection = "column";
        quizCreateContainer.style.maxWidth = "680px"
        quizCreateContainer.style.height = "1500px"
        mainWrapper.style.Width = "70vw"
        createQuizForm.style.width = "80%"

    })

    createQuizForm.addEventListener("submit", (e) => {
        e.preventDefault()
    })

    addQuestionBtn.addEventListener("click", () => {
        let userQuestionInput = questionInput.value.trim()
        let userChoice1 = choice1.value.trim()
        let userChoice2 = choice2.value.trim()
        let userChoice3 = choice3.value.trim()
        let userChoice4 = choice4.value.trim()
        let userMarksFromInput = Number(userMarks.value)
        let userAnswer = correctAnswerInput.value

        let newQuestion = {
            question: userQuestionInput,
            choices: [userChoice1, userChoice2, userChoice3, userChoice4],
            answer: Number(userAnswer),
            marks: Number(userMarksFromInput)
        }
        nextQue++
        update()
        userQuestions.push(newQuestion)
        questionInput.value = ""
        choice1.value = ""
        choice2.value = ""
        choice3.value = ""
        choice4.value = ""
        correctAnswerInput.value = ""
    })



    startQuizBtn.classList.add("hidden");
    function update() {
        if (nextQue >= 3) {
            startQuizBtn.classList.remove("hidden");
            startQuizBtn.onclick = () => {
                quizCreateContainer.classList.add("hidden");
                quizContainer.classList.remove("hidden");
                currentQuestion = userQuestions;
            };
        } else {
            startQuizBtn.classList.add("hidden");
            startQuizBtn.onclick = null;
        }
    }

    startBtn.addEventListener("click", category)

    nextBtn.addEventListener("click", () => {
        currentIndex++

        if (currentIndex < currentQuestion.length) {
            showQuestion()
        } else {
            showResult()
        }
    })

    function category() {
        quizCreateContainer.classList.add("hidden")
        questionNumberDisplay.classList.add("hidden")
        categoryContainer.classList.remove("hidden")
        questionContainer.classList.add("hidden")
        quizQuestionContainer.classList.add("hidden")
        selectCategory()
    }

    function selectCategory() {
        const buttons = [randomQuiz, htmlQuizBtn, cssQuizBtn, jsQuizBtn];
        buttons.forEach(button => {
            button.addEventListener("click", (e) => {
                let value = e.target.value               
                switch (value) {
                    case "1":
                        currentQuestion = questions
                        startQuiz()
                        break;
                    case "2":
                        currentQuestion = htmlQuestions
                        startQuiz()
                        break;
                    case "3":
                        currentQuestion = cssQuestions
                        startQuiz()
                        break;
                    case "4":
                        currentQuestion = jsQuestions
                        startQuiz()
                        break;

                    default:
                        currentQuestion = questions
                        break;
                }
            })
        })

    }
    function startQuiz() {
        categoryContainer.classList.add("hidden")
        startBtn.classList.add("hidden")
        quizQuestionContainer.classList.remove("hidden")
        resultContainer.classList.add("hidden")
        questionContainer.classList.remove("hidden")
        quizCreateContainer.classList.add("hidden")
        questionNumberDisplay.classList.add("hidden")
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
            li.addEventListener("click", () => ((selectAnswer(index)), li.style.background = "rgba(50, 122, 255, 0.65)"))
            choicesList.appendChild(li)

        })

        function selectAnswer(index) {

            nextBtn.classList.remove("hidden")
            if (index == currentQuestion[currentIndex].answer) {
                marks += currentQuestion[currentIndex].marks
                score++;
            }
            const lis = choicesList.querySelectorAll("li");
            lis.forEach(li => {
                li.style.pointerEvents = "none";
            })
        }
    }

    function showResult() {
        resultContainer.classList.remove("hidden");
        questionContainer.classList.add("hidden");
        scoreDisplay.textContent = `${score} out of ${currentQuestion.length}`;
        marksDisplay.textContent = `${marks} out of ${totalMarks}`;

        let messageEl = document.getElementById("result-message");
        if (!messageEl) {
            messageEl = document.createElement("div");
            messageEl.id = "result-message";
            resultContainer.appendChild(messageEl);
        }
        messageEl.textContent = "";

        if (marks === totalMarks || marks >= totalMarks * 0.33) {
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
        else if (marks < totalMarks * 0.33) {
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