MySimon.gameHelpers = function () {

    var blinkButton = function (elementID) {
        var el = $("#" + elementID);
        var elColor = el.css("background-color");

        el.css("background-color", lightenColor(elementID));
        playSound(elementID);

        var blinkTimer = setTimeout(function () {
            el.css("background-color", elColor);
            clearTimeout(blinkTimer);
        }, 100);

    };

    var playSound = function (sound) {
        var soundsMap = {
            'blue': 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
            'green': 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
            'red': 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
            'yellow': 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
            'wrong': 'http://www.soundjay.com/button/beep-10.mp3'
        };

        var path = soundsMap[sound];
        var audioElement = document.createElement('audio');

        audioElement.setAttribute('src', path);
        audioElement.play();
    };

    var setGameSequence = function () {
        var gameSequence = [];
        for (var i = 0; i < MySimon.gameSequenceLength; i++) {
            gameSequence.push(getRandomInt(0, 4));
        }
        return gameSequence;
    };

    var lightenColor = function (color) {
        var colorMap = {
            "red": "#FF4832",
            "blue": "#3CE9FF",
            "yellow": "#FFF99C",
            "green": "#B3E000"
        };

        return colorMap[color];
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return {
        setGameSequence: setGameSequence,
        blinkButton: blinkButton,
        playSound: playSound
    }
}();
