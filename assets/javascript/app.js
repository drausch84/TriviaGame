$(document).ready(function() {
    
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
    

    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  
        clickSound.play();
        generateHTML();
    
        timerWrapper();
    
    }); 
    
    $("body").on("click", ".answer", function(event){
        
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  //  change to 4000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  //  change to 4000 or other amount
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); //  change to 4000 or other amount
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Finished, let's see if you BROKE bad, or if you're just bad!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }
    
    var startScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = ["From what type of beans does Walt create ricin?", "What was the name of Walt's first lab partner, while working for Gustavo Fring?", "What type of acid was used to dispose of Krazy-8's cousin, Emilio?", "What is the name of the plant Walt uses to poison Brock?", "What was Walt's main vehicle throughout the series?", "What color ribbons did people wear to commemorate the Wayfarer 515 air crash??", "What type of pizza does Walt throw on the roof of his house in a fit of rage?", "What is the name of the restaurant Jessie buys his first gun from?"];
    var answerArray = [["Kidney", "Castor", "Calabar", "Malus Domestica"], ["Jessie","Hector","Gale","Ted"], ["Hydrochloric", "Nitric", "Sulfuric", "Hydrofluoric"], ["Foxgloves","Abrus Preatorius","Lily of the Valley","Cicuta"], ["Toyota Tercel", "Honda Civic", "Chrysler PT Cruiser", "Pontiac Aztek"], ["Blue","Yellow","Orange","Blue and Orange"], ["Supreme", "Cheese", "Pepperoni", "Hawaiian"], ["Fajitas Locas","Dog House","Denny's","IHOP"]];
    var imageArray = ["<img class='center-block img-right' src='./assets/images/ricin.jpg'>", "<img class='center-block img-right' src='./assets/images/gale.gif'>", "<img class='center-block img-right' src='./assets/images/acid.png'>", "<img class='center-block img-right' src='./assets/images/lily-of-the-valley.png'>", "<img class='center-block img-right' src='./assets/images/pontiac-aztek.jpg'>", "<img class='center-block img-right' src='./assets/images/ribbon-color.jpg'>", "<img class='center-block img-right' src='./assets/images/pizza.gif'>", "<img class='center-block img-right' src='./assets/images/dog-house.jpg'>"];
    var correctAnswers = ["B. Castor", "C. Gale", "D. Hydrofluoric", "C. Lily of the Valley", "D. Pontiac Aztek", "D. Blue and Orange", "C. Pepperoni", "B. Dog House"];
    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("./assets/sounds/youre-goddamn-right.mp3");