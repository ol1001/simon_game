var MySimon = MySimon || {};

const SIMON_GAME_ON = "ON";
const SIMON_GAME_OFF = "OFF";
const SIMON_GAME_RUNNING = "RUN";
const COMP_MOVE = "COMP";
const USER_MOVE = "USER";

MySimon = (function () {
    return {
        gameStatus: SIMON_GAME_OFF,
        gameButtonsMap: ["green", "red", "yellow", "blue"],
        compSequence: [],
        userSequence: [],
        gameSequenceLength:20
    };
})();

MySimon.gameEngine = function () {
    var currentUserMove = undefined;
    var userMoveNumber = 0;

    var gameInit = function (sequence) {
        sequence.forEach(function (el) {
            MySimon.compSequence.push(MySimon.gameButtonsMap[el]);
        });
        this.gameRound = 0;
        this.whoMove = COMP_MOVE;
    };

    var runGame = function () {
        if (MySimon.compSequence.length) {

            // add recursive setTimeout for controlled game loop
            runComp.call(MySimon);
        }
    };
    var startGame = function () {
        gameInit.call(MySimon, MySimon.gameHelpers.setGameSequence());
        runGame();
    };

    var stopGame = function () {
        MySimon.gameStatus = SIMON_GAME_OFF;
        MySimon.gameRound = 0;
        MySimon.compSequence = [];
        MySimon.userSequence = [];
        MySimon.whoMove = COMP_MOVE;
        // clear timers
        clearTimers.call(MySimon);
    };

    function clearTimers() {
        clearTimeout(this.compTimer);
        clearTimeout(this.gameTimer);
    }

    var runComp = function () {
        var that = this;
        console.log(that.compSequence);

        if (that.whoMove === COMP_MOVE) {
            var i = 0;
            MySimon.compTimer = setTimeout(function runSequence() {
                if (i <= that.gameRound) {
                    MySimon.gameHelpers.blinkButton(that.compSequence[i++]);
                    MySimon.compTimer = setTimeout(runSequence, 800);
                } else {
                    clearTimeout(MySimon.compTimer);

                    // run user
                    MySimon.whoMove = USER_MOVE;

                    /* setTimeout(function(){
                     // check if user run
                     },2000);*/
                }
            }, 800);
        }
    };


    var isUserRight = function (userMoveNumber) {
        return MySimon.compSequence[userMoveNumber] === MySimon.userSequence[userMoveNumber];
    };

    var checkUser = function (userMove) {
        MySimon.userSequence.push(userMove);

        if (isUserRight(MySimon.userSequence.length - 1)) {

            // if user is right
            MySimon.gameHelpers.blinkButton(userMove);
            checkIfNextRoundNeeded(MySimon.userSequence.length - 1);

        } else {

            // if user is wrong
            MySimon.gameHelpers.playSound('wrong');
            MySimon.userSequence = [];
            MySimon.whoMove = COMP_MOVE;
            MySimon.gameTimer = setTimeout(function () {
                runComp.call(MySimon);
                clearTimeout(MySimon.gameTimer);
            }, 1500);
        }

    };

    function checkIfNextRoundNeeded(userRound) {
        checkIfUserWin(userRound+1);

        if (userRound == MySimon.gameRound) {
            MySimon.gameRound++;
            MySimon.userSequence = [];
            MySimon.whoMove = COMP_MOVE;

            MySimon.gameTimer = setTimeout(function () {
                runComp.call(MySimon);
                clearTimeout(MySimon.gameTimer);
            }, 800);
        }
    }

    function checkIfUserWin(userSequenceLength) {
        console.log(userSequenceLength);
        console.log(MySimon.compSequence.length);
        if (userSequenceLength == MySimon.compSequence.length) {
            alert("You are win!");
            stopGame();
        }
    }

    return {
        startGame: startGame,
        stopGame: stopGame,
        checkUser: checkUser
    }
}();