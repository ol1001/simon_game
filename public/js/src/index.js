$(document).ready(function () {

    var simonSwitch = $('li#on, li#off');
    var simonStrict = $('.strict-button');
    var simonStart = $('.start-button');
    var simonGameButton = $(".simon-game-button");

    simonSwitch.unbind(MySimon.gameHandlers.handleSwitch).click(MySimon.gameHandlers.handleSwitch);
    simonStrict.unbind(MySimon.gameHandlers.handleStrict).click(MySimon.gameHandlers.handleStrict);
    simonStart.unbind(MySimon.gameHandlers.handleStart).click(MySimon.gameHandlers.handleStart);
    simonGameButton.unbind(MySimon.gameHandlers.handleGameButton).click(MySimon.gameHandlers.handleGameButton);

});