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
    app.shuffleArray = _.shuffle(app.traits); // shuffle our traits each time
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
    loadButtons();
    $('.final').hide();
    }

    function loadButtons() {
    for (var item = 0; item < app.shuffleArray.length; item++) {
          //  console.log('load Buttons', app.shuffleArray[item]);
            $('.traits').append("<button class='traitsButton "+app.shuffleArray[item].type+"' id=" + item + ">" + app.shuffleArray[item].name + "</button>");
        }
    }

    function getIdSelection(Id) {
        // get the id of the currently selected button
        // when clicked find matching item in array and change selected to true
        // match id with app.name
        var current = 0;
        var shuffleArray = app.shuffleArray;
        _.forEach(shuffleArray, function(value, key) {
            //key = index
            // value = each object
            if (key == Id) {
                current = Id;
                // console.log("current key", current);
                // console.log("selected State current key", shuffleArray[current].selected);
            }
        });


        // toggle selection
        shuffleArray[current].selected = !shuffleArray[current].selected;
        console.log("when clicked", shuffleArray[current].name + ': ' + shuffleArray[current].selected);
        // toggle classes on click
        traitToggle(shuffleArray[current].selected, Id, shuffleArray[current].type);

        // checks if any traits are selected or not
        if (masculine == 0 && feminine == 0) {
            selected = false;
        } else {
            selected = true;
        }
        
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
        if (trait === 'masculine' && masculine > 0) {
            masculine -= 1;
            console.log('masculine', masculine);
            return masculine;
        } else if (trait === 'feminine' && feminine > 0) {
            feminine -= 1;
        } else {
            console.log("no trait type");
        }
    }

    function finish() {
        if (selected == true) {
            $('.final').show();
            $('.traits').hide();
            // chart
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Masculine", "Feminine"],
                datasets: [{
                    label: '# of Votes',
                    data: [masculine, feminine],
                    backgroundColor: [
                        'rgba(27, 31, 78, 1)',
                        'rgba(170, 12, 233, 1)'
                    ],
                    borderColor: [
                        'rgba(255,255,255,1)',
                        'rgba(255, 255, 255, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: false,
                gridLines: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Conventional Attributes Results'
                },
                hover: {
                    mode: 'label'
                }
            }
        });

        } else {
            alert("Please select a trait");

        }
    }


});
