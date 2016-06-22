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
       // findChosen($(this).attr('id'));
        //  selectedTrait();
        getIdSelection($(this).attr('id'));
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

    function getIdSelection(Id) {  
    // get the id of the currently selected button
    // when clicked find matching item in array and change selected to true
        // match id with app.name
        var current = 0; 
        _.forEach(app.traits, function(value, key) {
          //key = index
          // value = each object
            if(key == Id){
                current = Id;
                console.log("current", current);
            }
        });
        // toggle selection
        app.traits[current].selected = !app.traits[current].selected;
        // toggle classes on click
        traitToggle(app.traits[current].selected, Id);
        return current;
    }

    function traitToggle(selection, ob) {
        // selection - the current selected key
        // ob - the selected element       
        // if selected add class green, if button is unselcted add class red
        if(selection == true){
            $('#'+ob).addClass('green');
            console.log($('#'+ob));
            if($('#'+ob).hasClass('red')){
                $('#'+ob).removeClass('red');
            }
        }else{
            $('#'+ob).addClass('red');
            if($('#'+ob).hasClass('green')){
                $('#'+ob).removeClass('green');
            }
        }
    }

});
