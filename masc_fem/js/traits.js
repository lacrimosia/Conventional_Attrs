// Conventional Traits Custom interaction
// 6/2016

// Get our data
var app = {}; // define globally
var masculine = 0; // gather all masculine selected traits
var feminine = 0; // gather all feminine traits
var ctx = document.getElementById("graph");
var selected = false;


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

    //show results
    $('.finish').click(function() {
        finish();
    });

    $('.traitsButton').click(function() {
        getIdSelection($(this).attr('id'));
    });

    function init() {
        showAllTraits();
      //  $('#graph').hide();
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
            if (key == Id) {
                current = Id;
                console.log("current", current);
            }
        });

        
        // toggle selection
        app.traits[current].selected = !app.traits[current].selected;
        // toggle classes on click
        traitToggle(app.traits[current].selected, Id, app.traits[current].type);

        // checks if any traits are selected or not
        if(masculine == 0 && feminine == 0){
            selected = false;
        }else{
            selected = true;
        }
        // chart
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Masculine", "Feminine"],
                datasets: [{
                    label: '# of Votes',
                    data: [masculine, feminine],
                    backgroundColor: [
                        'rgba(212, 0, 29, 1)',
                        'rgba(170, 12, 233, 1)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                gridLines: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Conventional Attributes Results'
                }
            }
        });
        return current;
    }

    function traitToggle(selection, ob, trait) {
        // selection - the current selected key
        // True - element selected, False - element not selected
        // ob - the selected element       
        // if selected add class green, if button is unselcted add class red
        if (selection == true) {
            $('#' + ob).addClass('green'); // add class green
            selectedTraits(trait);
            if ($('#' + ob).hasClass('red')) {
                $('#' + ob).removeClass('red'); // remove class red if already added
            }

        } else {
            $('#' + ob).addClass('red'); // add class red
            unselectedTraits(trait);
            if ($('#' + ob).hasClass('green')) {
                $('#' + ob).removeClass('green'); // remove class green if already added
            }
        }
    }

    function selectedTraits(trait) {
        // check type of trait selected and push into proper array
        if (trait === 'masculine') {
            masculine += 1;
            console.log('masculine', masculine);
            return masculine;
        } else if (trait === 'feminine') {
            feminine += 1;
        } else {
            console.log("no trait type");
        }
    }

    function unselectedTraits(trait) {
        // check type of trait selected and push into proper array
        if (trait === 'masculine') {
            masculine -= 1;
            console.log('masculine', masculine);
            return masculine;
        } else if (trait === 'feminine') {
            feminine -= 1;
        } else {
            console.log("no trait type");
        }
    }

    function finish() {
        if (selected == true) {
            $('.final').show();
            $('.traits').hide();
        } else {
            alert("Please select a trait");

        }
    }


});
