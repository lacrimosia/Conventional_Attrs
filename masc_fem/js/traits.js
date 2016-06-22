// Conventional Traits Custom interaction
// 6/2016

// Get our data
var app = {}; // define globally
var masculine = [];  // gather all masculine selected traits
var feminine = [];   // gather all feminine traits

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
            $('.traits').append("<button class='traitsButton' id=" + item + ">" + app.traits[item].name + "</button>");
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
        traitToggle(app.traits[current].selected, Id, app.traits[current].type);
        return current;
    }

    function traitToggle(selection, ob, trait) {
        // selection - the current selected key
        // True - element selected, False - element not selected
        // ob - the selected element       
        // if selected add class green, if button is unselcted add class red
        if(selection == true){
            $('#'+ob).addClass('green'); // add class green
            checkType(trait);
            if($('#'+ob).hasClass('red')){
                $('#'+ob).removeClass('red'); // remove class red if already added
            }

        }else{
            $('#'+ob).addClass('red');  // add class red
            if($('#'+ob).hasClass('green')){
                $('#'+ob).removeClass('green'); // remove class green if already added
            }
        }
    }

    function checkType(trait){
        // check type of trait selected and push into proper array
        if(trait === 'masculine'){
            masculine.push(trait);
        }else if(trait === 'feminine'){
            feminine.push(trait);
        }else{
            console.log("no trait type");
        }
       // console.log('masculine', masculine);
    }

});
