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
        gameCounter: 0,
        compSequence: [],
        userSequence: [],
        whoMove: COMP_MOVE
    };
})();

MySimon.gameEngine = function () {
    var currentUserMove = undefined;
    var userMoveNumber = 0;

    var gameInit = function (sequence) {
        sequence.forEach(function (el) {
            MySimon.compSequence.push(MySimon.gameButtonsMap[el]);
        });

        runGame.call(MySimon);
    };

    var runGame = function () {
        console.log(this.compSequence);

        if (this.compSequence.length) {
            MySimon.gameHelpers.blinkButton(this.compSequence[this.gameCounter]);

        }
    };

    var stopGame = function(){
        MySimon.gameStatus = SIMON_GAME_OFF;
        MySimon.gameCounter = 0;
        MySimon.compSequence = [];
        MySimon.userSequence = [];
        MySimon.whoMove = COMP_MOVE;
    };

    var runComp = function () {
        console.log(whoMove);
        if (whoMove === COMP_MOVE) {
            var i = 0;
            var compTimer = setTimeout(function runSequence() {
                if (i < gameRoundCounter) {
                    MySimon.gameHelpers.blinkButton(compSequence[i++]);
                } else {
                    clearTimeout(compTimer);
                    whoMove = USER_MOVE;
                }
                compTimer = setTimeout(runSequence, 800);
            }, 800);
        }
    };

    var runUser = function (userMove) {
        console.log(whoMove);
        if (whoMove === USER_MOVE) {
            currentUserMove = userMove;

            if (userSequence.length < gameRoundCounter) {
                checkUser(isUserRight(currentUserMove, userMoveNumber));
            } else {
                whoMove = COMP_MOVE;
                console.log("round is over");
            }
        }
    };

    var isUserRight = function (userMove, userMoveNumber) {
        return compSequence[userMoveNumber] === userMove;
    };

    var checkUser = function (isUserRight) {
        if (isUserRight) {
            console.log(userMoveNumber);
            userSequence.push(currentUserMove);
            console.log(userSequence);
            MySimon.gameHelpers.blinkButton(currentUserMove);
            userMoveNumber++;
        } else {
            // if user sequence incorrect - repeat compSequence
            whoMove = COMP_MOVE;
            runComp();
        }
    };

    return {
        gameInit: gameInit,
        runUser: runUser,
        stopGame: stopGame
    }
}();