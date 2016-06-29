// Conventional Traits Custom interaction
// 6/2016

// Get our data
var app = {}; // define globally
var masculine = 0; // gather all masculine selected traits
var feminine = 0; // gather all feminine traits
var ctx = document.getElementById("graph");
var selected = false;
// keyboard shortcuts for accessibility
var current = 0; // set the current to first slide
var enabled = false; // hide intro screen
var disableKey = true; // disable keyboard until intro screen is hidden
var showHelp = false; // show help when clicked or key is pressed
var openHelp = false; // whether help menu is open or closed
var userSelect = []; // this pushes the selected traits

$(document).ready(function() {
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
            $('#0').focus();
        }

        function loadButtons() {
            for (var item = 0; item < app.shuffleArray.length; item++) {
                $('.traits').append("<div class='sele " + (item + 1) + "'><button class='traitsButton " + app.shuffleArray[item].type + "' id='" + item + "' tabindex='" + (item + 1) + "'><i class='fa fa-times-circle'></i></button><span for='" + item + "'>" + app.shuffleArray[item].name + "</span></div>");
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
            //  console.log("when clicked", shuffleArray[current].name + ': ' + shuffleArray[current].selected);
            // toggle classes on click
            traitToggle(shuffleArray[current].selected, Id, shuffleArray[current].type, shuffleArray[current].name);

            // checks if any traits are selected or not
            if (masculine == 0 && feminine == 0) {
                selected = false;
            } else {
                selected = true;
            }

            return current;
        }

        function traitToggle(selection, ob, trait, name) {
            // selection - the current selected key
            // True - element selected, False - element not selected
            // ob - the selected element       
            // if selected add class green, if button is unselcted add class red
            if (selection == true) {
                $('#' + ob).addClass('green'); // add class green
                $('#' + ob).html('<i class="fa fa-check-circle"></i>');
                selectedTraits(trait);

                // push user selected traits to show later
                userSelect.push({
                    choice: name,
                    type: trait
                });
                //  console.log('userSelect', userSelect);

                if ($('#' + ob).hasClass('red')) {
                    $('#' + ob).removeClass('red'); // remove class red if already added
                }

            } else {
                $('#' + ob).addClass('red'); // add class red
                $('#' + ob).html('<i class="fa fa-times-circle"></i>');
                unselectedTraits(trait);
                // find unselected trait and remove from list
                // var findRemoveTrait = _.findIndex(userSelect, {'choice': name, 'type': trait});

                var removeElement = _.reject(userSelect, { 'choice': name, 'type': trait });
                // var sortedListSelected = _.orderBy(removeElement, ['choice', name]);
                //  console.log('removeElement', removeElement);
                userSelect = removeElement;

                console.log('removed userSelect', userSelect);

                if ($('#' + ob).hasClass('green')) {
                    $('#' + ob).removeClass('green'); // remove class green if already added
                }
                return userSelect;
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
                //  $('.traits').hide();
                $('.sele').hide();
                $('.finish').hide();
                $('.selTraitEmerge').text('').fadeIn();
                displayListFinal();
                displayResults();
                Chart.defaults.global.defaultFontColor = '#C1C1C1'; // font color 
                Chart.defaults.global.title.fontSize = 14; // chart font size

                // chart
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ["Masculine", "Feminine"],
                        datasets: [{
                            label: '# of Votes',
                            data: [masculine, feminine],
                            backgroundColor: [
                                'rgba(212, 0, 29, 0.9)',
                                'rgba(239, 151, 25, 0.9)'
                            ],
                            borderColor: [
                                'rgba(212, 0, 29, 1)',
                                'rgba(239, 151, 25, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: true,
                                    color: "rgba(255, 255, 255, 0.4)",
                                    lineWidth: 1
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: true,
                                    color: "rgba(255, 255, 255, 0.4)",
                                    lineWidth: 1
                                }
                            }]
                        },
                        responsive: false,
                        showTooltip: true,
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
                //  alert("Please select a trait");
                // $('.finish').prop('disabled');
                $('.selTraitEmerge').text('Please select a trait').fadeIn();
            }
        }

        $('#returnButton').click(function() {
            $('.help_Menu').hide();
        });

        /* selected array, selected item */
        function showTally(trait, name) {
            userSelect.push({
                choice: name,
                type: trait
            });
            console.log('userSelect', userSelect);
        }

        function displayResults() {
            var total = parseInt(masculine) + parseInt(feminine);
            var m = Math.round((masculine/total)*100);
            var f = Math.round((feminine/total)*100);
            $('.percentage').html("<div class='percentM'>Masculine Traits<br/><span>"+m+"%</span></div><div class='percentF'>Feminine Traits <br/><span>"+f+"%</span></div>");

            if (masculine > feminine) {
                // masculine text
                $('.tally h3').text("Your Results: "+app.responses.masculine.heading);
                $('.tally p').text(app.responses.masculine.statement);
                $('.tally h3').css('color','#D4001D');
                
            } else if (feminine > masculine) {
                // feminine
                $('.tally h3').text("Your Results: "+app.responses.feminine.heading);
                $('.tally p').text(app.responses.feminine.statement);
                $('.tally h3').css('color','#EF9719');
            } else if (feminine == masculine) {
                // Both 
                $('.tally h3').text("Your Results: "+app.responses.both.heading);
                $('.tally p').text(app.responses.both.statement);
            } else {
                // Special
                $('.tally h3').text("Your Selected Traits: You are special");
            }
        }

        function displayListFinal() {
            $('.theTraits').html("<h4>Your Selected Traits</h4>");
            for (var t = 0; t < userSelect.length; t++) {
                $('.theTraits').append('<div class="uselect u' + userSelect[t].type + '">' + userSelect[t].choice + '<i class="fa fa-thumbs-up i' + userSelect[t].type + '" style="float: right !important;"></i></div>');
            }
        }

        $(document).bind('keyup', function(e) {
            key = e.keyCode;

            if (key == 82) {
                location.reload(); //reload app - r key
            } else if (key == 83) {
                intro(); //Start App - s key
            } else if (key == 70 && disableKey == false) {
                finish(); //FINISH APP - f key
            } else if (key == 9 && disableKey == false) {
                e.preventDefault();
                // tab key
                var tabIndex = $('.traitsButton:focus').attr('tabindex');
                var totalSize = $('.traitsButton').size();
                console.log(tabIndex);

                if (tabIndex == undefined) {
                    //   console.log('total', totalSize);
                    //  tabIndex = $('.traitsButton:focus').attr('tabindex', 1);
                    $('#0').focus();
                    //  console.log('end', tabIndex);
                } else {
                    tabIndex = $('.traitsButton:focus').attr('tabindex');
                    $('.sele ' + parseInt(tabIndex)).css('background-color', 'yellow !important');
                    //  console.log('pink area', tabIndex);
                    totalSize = $('.traitsButton').size();
                }

            } else if (key == 72 && disableKey == false) {
                // H key - Help Menu
                // toggles sound and changes icon based on whether sound is on or off
                openHelp = !openHelp;
                if (openHelp == true) {
                    showHelpMenu();
                    $('.help_Button').html("Close <i class='fa fa-times'></i>");
                } else if (key == 32 && disableKey == false) {
                    e.preventDefault();
                    // space to select button
                    getIdSelection($('sele.traitsButton').attr('tabindex'));
                    // if($('sele.traitsButton').attr('tabindex') == app.shuffleArray.length + parseInt(1)){
                    // }
                } else {
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
            $('.help_Menu').hide();;
            enabled = true;
            disableKey = false;
        }

    });

});
