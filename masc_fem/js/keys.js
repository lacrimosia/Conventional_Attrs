// keyboard shortcuts for accessibility
var current = 0; // set the current to first slide
var enabled = false; // hide intro screen
var disableKey = true; // disable keyboard until intro screen is hidden
var showHelp = false; // show help when clicked or key is pressed
var openHelp = false; // whether help menu is open or closed

$(document).bind('keyup', function(e) {
    key = e.keyCode;

    if (key == 82) {
        location.reload(); //reload app - r key
    } else if (key == 83) {
        intro(); //Start App - s key
    }else if (key == 72 && disableKey == false) {
        // H key - Help Menu
        // toggles sound and changes icon based on whether sound is on or off
        openHelp = !openHelp;
        if (openHelp == true) {
            showHelpMenu();
            $('.help_Button').html("Close <i class='fa fa-times'></i>");
        }else{
            closeHelpMenu();
        }
    }
});



function showHelpMenu() {
    $('.help_Menu').show();
}

function closeHelpMenu() {
    $('.help_Menu').hide();
}

function intro() {
    $('.help_Menu').hide();
    ;
    enabled = true;
    disableKey = false;
}