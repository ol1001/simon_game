MySimon.gameHandlers = function () {

    var handleSwitch = function (e) {
        var el = e.target.id;

        if (el.toLocaleUpperCase() == SIMON_GAME_ON) {
            switchElClasses('on', 'off');

        } else {
            switchElClasses('off', 'on');
            MySimon.gameEngine.stopGame();
        }
    };

    var handleStrict = function (e) {
        // TO-DO
    };

    var handleStart = function (e) {

        if (MySimon.gameStatus === SIMON_GAME_ON && MySimon.compSequence.length == 0) {

            MySimon.gameEngine.startGame();
            MySimon.gameStatus = SIMON_GAME_RUNNING;
        }
    };

    var handleGameButton = function (e) {

        if (MySimon.whoMove === USER_MOVE) {
            MySimon.gameEngine.checkUser(e.target.id);
        }

    };

    function switchElClasses(toActive, toPassive) {
        $('#' + toActive).removeClass('switch-passive').addClass('switch-active');
        $('#' + toPassive).removeClass('switch-active').addClass('switch-passive');

        switchGameStatus.call(MySimon, toActive.toUpperCase());
        turnGameCounter.call(MySimon, toActive.toUpperCase());
    }

    function switchGameStatus(activeSwitch) {
        this.gameStatus = (activeSwitch === SIMON_GAME_ON) ? SIMON_GAME_ON : SIMON_GAME_OFF;
    }

    function turnGameCounter(gameStatus) {
        var counterElement = $(".count-field");

        if (this.gameStatus === SIMON_GAME_OFF) {
            counterElement.text("");
        } else {
            counterElement.text("--");
        }
    }

    return {
        handleSwitch: handleSwitch,
        handleStrict: handleStrict,
        handleStart: handleStart,
        handleGameButton: handleGameButton
    }
}();
