// Conventional Traits Custom interaction
// 6/2016

// Get our data
var app = {}; // define globally
$.getJSON("data/data.json", function(data) {
    app = data;


    init(); // defaults

    // reload app 
    $('.reload').click(function() {
        location.reload();
    });

    // help menu will show
    $('.help').click(function() {
        showHelpMenu();
        $('.help_Button').html("Close");
    });

    // close help menu
    $('.help_Button').click(function() {
        closeHelpMenu();
    });

    $('.traitsButton').click(function() {
        findChosen($(this).attr('id'));
        //  selectedTrait();
    });

    function init() {
        showAllTraits();
    }

    function showAllTraits() {
        for (var item = 0; item < app.traits.length; item++) {
            $('.traits').append("<button class='traitsButton' id=" + item + "><i class='fa fa-check-square-o'></i>&nbsp;" + app.traits[item].name + "</button>");
        }
        return item;
    }

    function findChosen(id) {
        // when clicked find matching item in array and change selected to true
        // match id with app.name
        // make selected toggle value
        // once chosen is set to true push into array
        // if chose is unselected pop from array
        _.forEach(app.traits, function(value, key) {
            if(id == value){
                console.log(value);
            }
            return value;
        });
    }

    function selectedTrait() {
        var selectedButton = _.filter(app.traits, { 'selected': true });
        console.log('selected', selectedButton);
    }

});
