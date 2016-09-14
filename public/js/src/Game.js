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
        compSequence: []
    };
})();

MySimon.gameEngine = function () {
    var currentUserMove = undefined;
    var userMoveNumber = 0;

    var gameInit = function (sequence) {
        sequence.forEach(function (el) {
            MySimon.compSequence.push(MySimon.gameButtonsMap[el]);
        });
            this.gameCounter = 3;
            this.whoMove = COMP_MOVE;
    };

    var runGame = function () {
        if (MySimon.compSequence.length) {
            runComp.call(MySimon);
        }
    };
    var startGame = function(){
        gameInit.call(MySimon, MySimon.gameHelpers.setGameSequence());
        runGame();
    };

    var stopGame = function () {
        MySimon.gameStatus = SIMON_GAME_OFF;
        MySimon.gameCounter = 0;
        MySimon.compSequence = [];
        MySimon.userSequence = [];
        MySimon.whoMove = COMP_MOVE;
        // to-do: clear timers
        clearTimers.call(MySimon);
    };

    function clearTimers() {
        console.log(this.compTimer);
        clearTimeout(this.compTimer);
    }

    var runComp = function () {
        var that = this;
        console.log(that.compSequence);

        if (that.whoMove === COMP_MOVE) {
            var i = 0;
            MySimon.compTimer = setTimeout(function runSequence() {
                if (i <= that.gameCounter) {
                    MySimon.gameHelpers.blinkButton(that.compSequence[i++]);
                    console.log(i);
                    MySimon.compTimer = setTimeout(runSequence, 800);
                } else {
                    console.log("clear timeout");
                    clearTimeout(MySimon.compTimer);
                }
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
        startGame: startGame,
        stopGame: stopGame
    }
}();