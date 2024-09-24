// array which holds all the multiple choice questions
const mulitpleQuestionArray = [
    "What is a group of unicorns called?",
    "How many brains and hearts do octopus have??",
    "What is the deadliest animal in the world?",
    "What is the most commonly spoken language in the world?",
    "In what country do more than half of people believe in elves?"
];

// This object holds all the answers, correct answers and images from the multiple choice question
// the number to which the answers and images are linked is the same index of the corresponding question in the question array
const multipleAnswerObject = {
    0 : {
        "AnswerA" : "A herd",
        "AnswerB" : "A parliament",
        "AnswerC" : "A blessing",
        "AnswerD" : "A clowder",
        "CorrectAnswer" : "A blessing",
        "img" : "Images/unicorns.png"
    },
    1 : {
        "AnswerA" : "9 brains and 3 hearts",
        "AnswerB" : "4 brains and 8 hearts",
        "AnswerC" : "1 heart and 3 brains",
        "AnswerD" : "5 hearts and 5 brains",
        "CorrectAnswer" : "9 brains and 3 hearts",
        "img" : "Images/Octopus.png"
    },
    2 : {
        "AnswerA" : "A lion",
        "AnswerB" : "A snake",
        "AnswerC" : "A mosquito",
        "AnswerD" : "A crocodile",
        "CorrectAnswer" : "A mosquito",
        "img" : "Images/deadly.png"
    },
    3 : {
        "AnswerA" : "English",
        "AnswerB" : "French",
        "AnswerC" : "Spanish",
        "AnswerD" : "Mandarin Chinese",
        "CorrectAnswer" : "Mandarin Chinese",
        "img" : "Images/language.png"
    },
    4 : {
        "AnswerA" : "Ireland",
        "AnswerB" : "Iceland",
        "AnswerC" : "Finland",
        "AnswerD" : "Norway",
        "CorrectAnswer" : "Iceland",
        "img" : "Images/elves.png"
    }
};

const score = []

// this object holds the "open" questions with the correct answer
const openQuestionObject = {
    "How many bones does a shark have?": "0",
    "How many times is the f-word used in the Wolf of Wall Street?": "569",
    "What percentage of the world is allergic to cats?": "10%",
    "How many days did the longest game of Monopoly last?": "70",
    "How many colours can you find in a regular bag of M&M's?": "6"
};

// these variables get the text in which the multiple answers to the multiple choice questions will be displayed
const displayAnswerA = document.getElementById("answerAText");
const displayAnswerB = document.getElementById("answerBText");
const displayAnswerC = document.getElementById("answerCText");
const displayAnswerD = document.getElementById("answerDText");

// this variable gets the heading in which the questions will be displayed
const questionDisplay = document.getElementById("questionHeader");
// the following two variables will hold the index of the question that will be displayed, the empty array will later on hold the order of the questions
let numberOfQuestion = 0;
const numberOfQuestionArray = [];

// with these variables the correct answers will be displayed in the correct order and in the correct text positions
const answerArray = [displayAnswerA, displayAnswerB, displayAnswerC, displayAnswerD];
const differentAnswerArray = ["AnswerA", "AnswerB", "AnswerC", "AnswerD"];

// this variable gets the answer buttons which will be used to decide whether someone has given the correct answer
const allAnswerButtons = document.querySelectorAll('.allAnswers');

const buttonA = document.getElementById('AnswerA');
const buttonB = document.getElementById('AnswerB');
const buttonC = document.getElementById('AnswerC');
const buttonD = document.getElementById('AnswerD');

// this variable gets the div in which all the images of the questions will be displayed
const imageDiv = document.getElementById('questionImage');

// this variable gets the button which will allow the user to go to the next question
const nextQuestionButton = document.getElementById('nextQuestion');

// variable which tells the next question button whether the question has been answered or not
let questionAnswered = false;

// this function will set the order of the questions into the previously empty numberOfQuestionArray
function setQuestionOrder () {
    const randomNumber = Math.floor(Math.random() * mulitpleQuestionArray.length);
    if (numberOfQuestionArray.includes(randomNumber)) {
        setQuestionOrder();
    } else {
        numberOfQuestionArray.push(randomNumber);
        if (numberOfQuestionArray.length === 5) {
            displayQuestion();
        } else {
            setQuestionOrder();
        };
    };
};

// this function will display the correct question in the question heading with the order that has previously been set in the setQuestionOrder function
function displayQuestion () {
    questionAnswered = false;
    numberOfQuestion = numberOfQuestionArray[0];
    const whichQuestion = mulitpleQuestionArray[numberOfQuestion];
    questionDisplay.innerText = whichQuestion;
};

// this function will set the text inside the answer buttons
function changeAnswerText () {
    for (let i = 0; i < answerArray.length; i++) {
        const changeThisAnswer = answerArray[i];
        const whichAnswer = differentAnswerArray[i];
        changeThisAnswer.innerText = `${multipleAnswerObject[numberOfQuestion][whichAnswer]}`;
    };
};

// this function adds a click event listener to all the answer buttons, when the button is clicked it will grab the id of that button and sends it to the checkAnswer function
function addClickOnAnswers () {
    allAnswerButtons.forEach(function(button) {
        button.addEventListener("click", function(){
            const buttonID = button.id;
            checkAnswers(buttonID);
        });
    });
};

// this function checks whether the previously clicked answer button is the correct answer to the question or not
// whether it's the correct or the wrong answer, it will give feedback to the user so they know which one it was
function checkAnswers (whichButton) {
    const givenAnswer = multipleAnswerObject[numberOfQuestion][whichButton];
    const correctAnswer = multipleAnswerObject[numberOfQuestion]["CorrectAnswer"];
    const yourAnswer = document.getElementById(whichButton);
    if (givenAnswer === correctAnswer) {
        yourAnswer.className = 'correctAnswer';
        score.push(1)
    } else {
        score.push(0)
        Object.keys(multipleAnswerObject[numberOfQuestion]).forEach(key => {
            if (multipleAnswerObject[numberOfQuestion][key] === correctAnswer) {
                const rightAnswer = document.getElementById(key);
                rightAnswer.className = 'correctAnswer';
            };
        });
        yourAnswer.className = 'wrongAnswer';
    };
    questionAnswered = true;
    buttonA.setAttribute('disabled', 'true');
    buttonB.setAttribute('disabled', 'true');
    buttonC.setAttribute('disabled', 'true');
    buttonD.setAttribute('disabled', 'true');
};

// this function changes the image inside the image div to the correct image which corresponds with the displayed question
function changeImg () {
    const imageSrc = multipleAnswerObject[numberOfQuestion]["img"];
    imageDiv.src = imageSrc;
};

// checks if the user clicks on the next question button and checks if the user has given an answer or not
// if the user has given an answer it will check if there's another question to be asked or if it should display the score of the player
function enableNextQuestion () {
    nextQuestionButton.addEventListener("click", function() {
        if (questionAnswered === true) {
            numberOfQuestionArray.shift();
            if (numberOfQuestionArray.length === 0) {
                // fill stuff to jump to open questions
                console.log('finished all questions');
                displayScore();
            } else {
                displayQuestion();
                changeImg();
                changeAnswerText();
                buttonA.className = 'allAnswers';
                buttonB.className = 'allAnswers';
                buttonC.className = 'allAnswers';
                buttonD.className = 'allAnswers';
                buttonA.removeAttribute('disabled');
                buttonB.removeAttribute('disabled');
                buttonC.removeAttribute('disabled');
                buttonD.removeAttribute('disabled');                
            };
        } else {
            alert('give me an answer plz');
        };
    });
};

// function to display the score after the questions have been answered
function displayScore () {
    totalScore = 0
    for (let i = 0; i < score.length; i++) {
        totalScore += score[i]
    };
    document.getElementById("answerDiv").innerHTML = "";
    const imgDiv = document.getElementById("imgDiv");
    imgDiv.innerHTML = "";
    questionDisplay.innerText = "Your score is:"
    imgDiv.appendChild(document.createElement("h1")).innerText = totalScore;
};

setQuestionOrder();

changeAnswerText();

addClickOnAnswers();

changeImg ();

enableNextQuestion();
