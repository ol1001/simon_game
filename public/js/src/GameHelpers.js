MySimon.gameHelpers = function () {
    var gameSequenceLength = 20;

    var blinkButton = function (elementID) {
        console.log(elementID);
        var el = $("#"+elementID);
        var elColor = el.css("background-color");

        el.css("background-color", lightenColor(elementID));

        var colorTimer = setTimeout(function () {
         el.css("background-color", elColor);
         clearInterval(colorTimer);
         }, 100);
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
