MySimon.gameHelpers = function () {
    var gameSequenceLength = 20;

    var blinkButton = function (elementID) {
        console.log(elementID);
        var el = $("#"+elementID);
        var elColor = el.css("background-color");

        el.css("background-color", lightenColor(elementID));

        var blinkTimer = setTimeout(function () {
         el.css("background-color", elColor);
         playSound(elementID);
         clearInterval(blinkTimer);
         }, 200);
    };

    var playSound = function (currentButton) {
        var soundsMap = {
            'blue':'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
            'green':'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
            'red':'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
            'yellow':'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
        };

        //console.log(soundsMap[currentButton]);

        var path = soundsMap[currentButton];
        var audioElement = document.createElement('audio');

        audioElement.setAttribute('src', path);
        audioElement.play();
    };

    var setGameSequence = function () {
        var gameSequence = [];
        for (var i = 0; i < gameSequenceLength; i++) {
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
        blinkButton: blinkButton
    }
}();
