var map_o;
var infowindow;
var service;
var lunch_array = [];
var place_id_holder;
var lunch_appoint_array = [];
var winner_array = [];
var friend_array = [];
var friend_list = "";
var lunch_object;
var user_info = {};
var colors = ["#B8D430", "#3AB745", "#029990", "#3501CB",
    "#2E2C75", "#673A7E", "#CC0071", "#F80120",
    "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"
];
var startAngle = 0;
var arc = Math.PI / 3;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;
var first_add = true;
var save_on = true;
var placesList;
var rest_on = false;

function send_food_request() {
    //taking out dynamic values inputing static to test
    var name = winner_array[0].name;
    var range = winner_array[0].range;
    var food = winner_array[0].food;
    range = range * 1609;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map_o = new google.maps.Map(document.getElementById('map-canvas2'), {
                center: center,
                zoom: 10,

            });

            var request = {
                location: center,
                radius: range,
                types: ('cafe' | 'meal_takeaway' | 'meal_delivery' | 'food' | 'restaurant'),
                query: food,

            };
            placesList = document.getElementById('places');
            var cont_string =
                '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h4 id="firstHeading" class="firstHeading">You are Here!</h4>';
            //'<div id="bodyContent">' +
            //'<p>Longitude: ' + Math.round(position.coords.longitude) + 'Latitude: ' + Math.round(position.coords.latitude) + '</p>';
            infowindow = new google.maps.InfoWindow({
                content: cont_string,
                maxWidth: 120
            });
            var service = new google.maps.places.PlacesService(map_o);
            service.textSearch(request, callback_l);

            marker_user = new google.maps.Marker({
                map: map_o,
                position: center,
                title: "You are Here!",
                icon: 'images/star.png',
            });
            google.maps.event.addListener(marker_user, 'click', function() {
                infowindow.setContent(cont_string);
                infowindow.open(map_o, marker_user);
            });
            google.maps.event.addListenerOnce(map_o, 'idle', function() {
                draw();
                $('#save').after('<button type="button" class="edit col-md-2 col-md-offset-1" onclick="spin();" style="float: left;">Spin</button');

                spin();
                $('#results').show();
            });
        })
    } else {
        console.log('geolocation is not supported or is turned off in your browser')
    }
}

function send_food_request_m() {
    //taking out dynamic values inputing static to test
    var name = winner_array[0].name_m;
    var range = winner_array[0].range_m;
    var food = winner_array[0].food_m;
    range = range * 1609;
    navigator.geolocation.getCurrentPosition(function(position) {
        var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map_o = new google.maps.Map(document.getElementById('map-canvas2_m'), {
            center: center,
            zoom: 10,

        });

        var request = {
            location: center,
            radius: range,
            types: ('cafe' | 'meal_takeaway' | 'meal_delivery' | 'food' | 'restaurant'),
            query: food,

        };
        placesList = document.getElementById('places');
        var cont_string =
            '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h4 id="firstHeading" class="firstHeading">You are Here!</h4>';
        //'<div id="bodyContent">' +
        //'<p>Longitude: ' + Math.round(position.coords.longitude) + 'Latitude: ' + Math.round(position.coords.latitude) + '</p>';
        infowindow = new google.maps.InfoWindow({
            content: cont_string,
            maxWidth: 120
        });
        var service = new google.maps.places.PlacesService(map_o);
        service.textSearch(request, callback_l);

        marker_user = new google.maps.Marker({
            map: map_o,
            position: center,
            title: "You are Here!",
            icon: 'images/star.png',
        });
        google.maps.event.addListener(marker_user, 'click', function() {
            infowindow.setContent(cont_string);
            infowindow.open(map_o, marker_user);
        });
        google.maps.event.addListenerOnce(map_o, 'idle', function() {
            // google.maps.event.addListenerOnce(map_o, 'tilesloaded', function() {
            //      var rest = $(
            //     "<li>", {
            //         text: "Restaurant: " + winner_array[0].restaurant,
            //         class: "list-group-item list-group-item-success text-center"
            //     });
            // $('#info_m').append(rest);
            // draw_m();
            // $('#wheelcanvas_m').before('<button type="button" class="col-md-3" onclick="spin_m();" style="float: left;">spin</button>');
            // spin_m();
            // });
            // winner_array[0].restaurant = lunch_array[Math.floor(Math.random() * lunch_array.length)];


            draw_m();
            $('#wheelcanvas_m').before('<button type="button" class="edit col-xs-3" onclick="spin_m();" style="float: left;">spin</button>');
            spin_m();
            // var rest = $(
            //     "<li>", {
            //         text: "Restaurant: " + winner_array[0].restaurant,
            //         class: "list-group-item list-group-item-success text-center"
            //     });
            // $('#info_m').append(rest);
            // $('#results').show();
        });
    })
}

function initialize() {

    navigator.geolocation.getCurrentPosition(function(position) {
        var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map_o = new google.maps.Map(document.getElementById('map-canvas'), {
            center: center,
            zoom: 13,

        });

        var request = {
            location: center,
            radius: 10000,
            types: ['cafe', 'meal_takeaway', 'meal_delivery', 'food', 'restaurant'],
            query: "lunch",
            sortby: "distance"
        };
        var cont_string =
            '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h4 id="firstHeading" class="firstHeading">You are Here!</h4>';
        // '<div id="bodyContent">' +
        // '<p>Longitude: ' + Math.round(position.coords.longitude) + 'Latitude: ' + Math.round(position.coords.latitude) + '</p>';
        infowindow = new google.maps.InfoWindow({
            content: cont_string
        });
        // var service = new google.maps.places.PlacesService(map_o);
        // service.nearbySearch(request, callback);
        marker_user = new google.maps.Marker({
            map: map_o,
            position: center,
            title: "You are Here!",
            icon: 'images/star.png',
            maxWidth: 100,
        });
        google.maps.event.addListener(marker_user, 'click', function() {
            infowindow.setContent(cont_string);
            infowindow.open(map_o, marker_user);
        });
    })
}

function callback(results, status) {
    console.log('results', results);
    console.log('status', status)
        // if (status == google.maps.places.PlacesServiceStatus.OK) {
        //     for (var i = 0; i < results.length; i++) {
        //         createMarker(results[i]);

    //     }
    // }
}

function callback_l(results, status, pagination) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < 6; i++) {
            createMarker_l(results[i]);

        }
    }
}

// function createMarker(place) {
//     console.log(place);
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//         map: map_o,
//         position: place.geometry.location,
//         icon: "images/rest.png",
//     });
//     var marker_content = "<h4>" + place.name + "</h4><p> Rating: " + place.rating + " </p>"
//     google.maps.event.addListener(marker, 'click', function() {
//         infowindow.setContent(marker_content);
//         infowindow.open(map_o, marker);
//     });
// }

function createMarker_l(place) {
    console.log(place);
    lunch_array.push(place.name);
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map_o,
        position: place.geometry.location,
        icon: "images/rest.png",

    });
    placesList.innerHTML += "<li>" + place.name + "</li>";
    console.log(place.formatted_address);
    place_id_holder = place.place_id;
    var marker_content = "<h4>" + place.name + "</h4><p> Address: " + place.formatted_address;
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker_content);
        infowindow.open(map_o, marker);
    });
}

function ajax_call() {
    $.ajax({
        url: 'home.php',
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        },
        method: 'POST',
        dataType: 'JSON',
        success: function(response) {
            if (response.success == true) {
                console.log('User information:  ', response)
                to_landing();
                user_info = response.first_name;
            } else if (response.success == false) {
                $("#dialog-message").dialog({
                    modal: true,
                    draggable: false,
                    resizable: false,
                    width: 350,
                    title: "Errors",
                    open: function() {
                        $(this).html(response.errors)
                    },
                    dialogClass: 'ui-dialog-osx',
                });
                console.log(response.errors)
            }
        }
    });
}

function edit_click() {

    $.ajax({
        url: 'edit.php',
        method: 'POST',
        data: {
            firstname: $('.name').val(),
            lastname: $('.last').val(),
            email: $('.email').val(),

        },
        crossDomain: true,
        dataType: 'JSON',
        cache: false,
        success: function(response) {
            console.log(response);
            if (response.filled_out == false) {
                $('#dialog-message').dialog({
                    modal: true,
                    draggable: false,
                    resizable: false,
                    width: 400,
                    title: "Errors",
                    open: function() {
                        $(this).html(response.info)
                    }
                })
            } else if (response.success == true) {
                $('#dialog-message').dialog({
                    modal: true,
                    draggable: false,
                    resizable: false,
                    width: 250,
                    title: "Errors",
                    open: function() {
                        $(this).html('User Info Update successful')
                    },
                    dialogClass: 'ui-dialog-osx',
                })
            } else if (response.success == false) {
                $('#dialog-message').dialog({
                    modal: true,
                    draggable: false,
                    resizable: false,
                    width: 250,
                    title: "Errors",
                    open: function() {
                        $(this).html('User Info Update Failed')
                    },
                    dialogClass: 'ui-dialog-osx'
                })
            }

        }

    })

}

function login_check() {
    $.ajax({
        url: 'logged_in.php',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        success: function(response) {
            if (response.success == true) {
                to_landing();
                console.log("login check working: ", response);
                user_info = response.first_name;
                $('#name').val(user_info);
                $('#name_m').val(user_info);
            } else if (response.errors == true) {
                console.log("login check errors: ", response)
            }
        }
    });
}
// commented out google maps api on landing page 
function to_landing() {
    $.ajax({
        url: 'lunch2.0.html',
        method: 'POST',
        dataType: 'html',
        cache: false,
        success: function(response) {
            $('body').html(response);
            initialize();
            $('#name').val(user_info);
            $('#name_m').val(user_info);
        }

    });
}

function recent_lunches() {
    $.ajax({
        url: 'recent.php',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        crossDomain: true,
        success: function(response) {
            console.log(response)

        }
    });
}

function nav_friends() {
    $.ajax({
        url: 'friends.html',
        method: 'POST',
        dataType: 'html',
        cache: false,
        success: function(response) {
            $('.main_content').html(response);
        }
    });
}

function nav_edit() {
    $.ajax({
        url: 'account2.0.php',
        method: 'POST',
        dataType: 'html',
        cache: false,
        success: function(response) {
            $('body').html(response);
        }
    });
}

function nav_lunch() {
    $.ajax({
        url: 'lunch2.0.html',
        method: 'POST',
        dataType: 'html',
        cache: false,
        success: function(response) {
            $('body').html(response);
            initialize();
            $('#name').val(user_info);
            $('#name_m').val(user_info);
        }
    });
}

function logout_ajax() {
    $.ajax({
        url: 'login.html',
        method: "POST",
        type: "html",
        crossDomain: true,
        success: function(response) {
            $('body').html(response);
            $('form').on('click', '#login', function() {
                ajax_call();
                console.log('button worked')
            });
        }
    })
}

function logout() {
    $.ajax({
        url: 'logout.php',
        method: "POST",
        crossDomain: true,
        success: function(response) {
            console.log('logout successful')
            logout_ajax();
        }
    });
}

function save() {
    $.ajax({
        url: 'lunch.php',
        data: {
            name: winner_array[0].name,
            restaurant: winner_array[0].restaurant,
            food: winner_array[0].food,
            range: parseInt(winner_array[0].range),
            friends: winner_array[0].friend
        },
        method: "POST",
        dataType: 'JSON',
        crossDomain: true,
        success: function(response) {
            if (response) {

                // var string = $('<li>', {
                //     text: "Restaurant: " + winner_array[0].restaurant,
                //     class: "list-group-item list-group-item-success text-center"
                // })
                // $('#info').append(string);
                $("#dialog-message").dialog({
                    modal: true,
                    draggable: false,
                    resizable: false,
                    width: 250,
                    title: "Status Update",
                    open: function() {
                        $(this).html(response)
                    },
                    dialogClass: 'ui-dialog-osx',
                });
                console.log('Save: ', response)
            } else if (!response) {
                $("#dialog-message").dialog({
                    modal: true,
                    draggable: false,
                    resizable: false,
                    width: 250,
                    title: "Error",
                    open: function() {
                        $(this).html(response)
                    },
                    dialogClass: 'ui-dialog-osx',
                });
                console.log('save error: ', response)

            }
        }
    });
}

function save_m() {
    $.ajax({
        url: 'lunch.php',
        data: {
            name: winner_array[0].name_m,
            restaurant: winner_array[0].restaurant,
            food: winner_array[0].food_m,
            range: parseInt(winner_array[0].range_m),
            friends: winner_array[0].friend
        },
        method: "POST",
        dataType: 'JSON',
        crossDomain: true,
        success: function(response) {
            if (response) {

                // var string = $('<li>', {
                //     text: "Restaurant: " + winner_array[0].restaurant,
                //     class: "list-group-item list-group-item-success text-center"
                // })
                // $('#info_m').append(string);
                $("#dialog-message").dialog({
                    modal: true,
                    draggable: false,
                    resizable: false,
                    width: 250,
                    title: "Status Update",
                    open: function() {
                        $(this).html(response)
                    },
                    dialogClass: 'ui-dialog-osx',
                });
                console.log('Save: ', response)
            } else if (!response) {
                $("#dialog-message").dialog({
                    modal: true,
                    draggable: false,
                    resizable: false,
                    width: 250,
                    title: "Error",
                    open: function() {
                        $(this).html(response)
                    },
                    dialogClass: 'ui-dialog-osx',
                });
                console.log('save error: ', response)

            }
        }
    });
}

function add_person_object_m() {
    lunch_object = {};
    $('#lunch_mobile > input').each(function(index, element) {
        if (index < 4) {

            lunch_object[element.id] = element.value;
            console.log(element.id + " : " + element.value)
        }

    });

    lunch_appoint_array.push(lunch_object);

    console.log("lunch object", lunch_object);


};

function add_person_object() {
    lunch_object = {};
    $('#lunch > input').each(function(index, element) {
        if (index < 4) {

            lunch_object[element.id] = element.value;
            console.log(element.id + " : " + element.value)
        }

    });

    lunch_appoint_array.push(lunch_object);

    console.log("lunch object", lunch_object);


};

function add_person_DOM_m() {

    if (first_add) {
        $('#lunch_bm').after('<button id="add_all_m" class="edit col-xs-7 col-xs-offset-1 col-md-4 col-md-offset-3" type="button">Random</button>')
        first_add = false;
    }
    console.log("add_person_DOM called");
    var name = $('#name_m').val();
    var food = $('#food_m').val();
    var range = parseInt($('#range_m').val());

    console.log(lunch.name)
    var append_name = $(
        "<li>", {
            text: "Name: " + name,
            class: "list-group-item list-group-item-info"
        });
    var append_food_response = $(
        "<li>", {
            text: "Food: " + food,
            class: "list-group-item list-group-item-info"
        });
    var append_range = $(
        "<li>", {
            text: "Range: " + range,
            class: "list-group-item list-group-item-info"
        });
    var line = $("<br/>")
    $('#info_m').append(append_name).append(append_food_response).append(append_range).append(line);
    add_person_object_m();

}

function add_person_DOM() {
    console.log("add_person_DOM called");
    var name = $('#name').val();
    var food = $('#food').val();
    var range = parseInt($('#range').val());

    console.log(lunch.name)
    var append_name = $(
        "<li>", {
            text: "Name: " + name,
            class: "list-group-item list-group-item-info"
        });
    var append_food_response = $(
        "<li>", {
            text: "Food: " + food,
            class: "list-group-item list-group-item-info"
        });
    var append_range = $(
        "<li>", {
            text: "Range: " + range,
            class: "list-group-item list-group-item-info"
        });
    var line = $("<br/>")
    if (food === "" && name === "" && $('#range').val() === "") {
        $("#dialog-message").dialog({
            modal: true,
            draggable: false,
            resizable: false,
            width: 250,
            title: "Error",
            open: function() {
                $(this).html("Form Empty: Please Enter All Fields")
            },
            dialogClass: 'ui-dialog-osx',
        });
    } else if (food === "") {
        $("#dialog-message").dialog({
            modal: true,
            draggable: false,
            resizable: false,
            width: 250,
            title: "Error",
            open: function() {
                $(this).html("Food Input Empty: Please enter the type of food or name of the restaurant.")
            },
            dialogClass: 'ui-dialog-osx',
        });
        console.log("no food entered");
        return
    } else if (name === "") {
        $("#dialog-message").dialog({
            modal: true,
            draggable: false,
            resizable: false,
            width: 250,
            title: "Error",
            open: function() {
                $(this).html("Name Input Empty: Please enter your name or the name of a friend.")
            },
            dialogClass: 'ui-dialog-osx',
        });
    }else if ($('#range').val() === "") {
        $("#dialog-message").dialog({
            modal: true,
            draggable: false,
            resizable: false,
            width: 250,
            title: "Error",
            open: function() {
                $(this).html("Range Input Empty: Please enter the radius in miles.")
            },
            dialogClass: 'ui-dialog-osx',
        });
    } 
    else {
        if (first_add) {
            $('#lunch_b').after('<button id="add_all" class="col-md-1" type="button">Random</button>')
            first_add = false;
        }
        $('#info').append(append_name).append(append_food_response).append(append_range).append(line);
        add_person_object();
    }
}

function random_select() {
    $('#info > li').remove();
    var rand = lunch_appoint_array[Math.floor(Math.random() * lunch_appoint_array.length)];
    winner_array.push(rand);
    var append_name = $(
        "<li>", {
            text: "Winner: " + rand.name,
            class: "list-group-item list-group-item-success text-center"
        });
    var append_food = $(
        "<li>", {
            text: "Food: " + rand.food,
            class: "list-group-item list-group-item-success text-center"
        });
    var append_range = $(
        "<li>", {
            text: "Range: " + rand.range,
            class: "list-group-item list-group-item-success text-center"
        });
    for (var i = 0; i < lunch_appoint_array.length; i++) {
        if (lunch_appoint_array[i].name == rand.name) {
            console.log(lunch_appoint_array[i])

        } else {
            console.log(lunch_appoint_array[i].name)
            friend_list += lunch_appoint_array[i].name + " ";
            winner_array[0].friend = friend_list

        }

    }
    var append_friends = $(
        "<li>", {
            text: "Friends: " + friend_list,
            class: "list-group-item list-group-item-success text-center"
        });

    $('#info').append(append_friends);

    console.log('winner', rand);
    var save_btn = $("<button onclick='save()' id='save' class='col-md-4 col-md-offset-4 edit'>Save</button>")
    $('#info').append(append_name).append(append_food).append(append_range);
    if (save_on == true) {
        $('.clearfix').after(save_btn);
        save_on = false;
    }

}

function random_select_m() {
    $('#info_m > li').remove();
    var rand = lunch_appoint_array[Math.floor(Math.random() * lunch_appoint_array.length)];

    winner_array.push(rand);
    var append_name = $(
        "<li>", {
            text: "Winner: " + rand.name_m,
            class: "list-group-item list-group-item-success text-center"
        });
    var append_food = $(
        "<li>", {
            text: "Food: " + rand.food_m,
            class: "list-group-item list-group-item-success text-center"
        });
    var append_range = $(
        "<li>", {
            text: "Range: " + rand.range_m,
            class: "list-group-item list-group-item-success text-center"
        });
    for (var i = 0; i < lunch_appoint_array.length; i++) {
        if (lunch_appoint_array[i].name_m === rand.name_m) {
            console.log(lunch_appoint_array[i])

        } else {
            console.log(lunch_appoint_array[i].name_m)
            friend_list += lunch_appoint_array[i].name_m + " ";
            winner_array[0].friend = friend_list

        }

    }
    var append_friends = $(
        "<li>", {
            text: "Friends: " + friend_list,
            class: "list-group-item list-group-item-success text-center"
        });

    $('#info_m').append(append_friends);

    console.log('winner', rand);
    var save_btn = $("<button onclick='save_m()' class='col-xs-5 col-xs-offset-3 edit'>Save</button>")
    $('#info_m').append(append_name).append(append_food).append(append_range);
    if (save_on == true) {
        $('.clearfix').after(save_btn);
        save_on = false;
    }

}

function draw() {
    drawRouletteWheel();
}

function draw_m() {
    drawRouletteWheel_m();
}

function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
        var outsideRadius = 120;
        var textRadius = 130;
        var insideRadius = 80;
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.font = 'bold 10px segoe UI';
        for (var i = 0; i < 6; i++) {
            var angle = startAngle + i * arc;
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            // ctx.shadowColor = "black";
            ctx.fillStyle = "black";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            var text = lunch_array[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }
        //Draw Arrow
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
    }
}

function drawRouletteWheel_m() {
    var canvas = document.getElementById("wheelcanvas_m");
    if (canvas.getContext) {
        var outsideRadius = 120;
        var textRadius = 130;
        var insideRadius = 80;
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.font = 'bold 10px segoe UI';
        for (var i = 0; i < 6; i++) {
            var angle = startAngle + i * arc;
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            // ctx.shadowColor = "black";
            ctx.fillStyle = "black";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            var text = lunch_array[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }
        //Draw Arrow
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
    }
}

function new_user() {
    $.ajax({
        url: 'account_create.html',
        method: "POST",
        dataType: 'html',
        crossDomain: true,
        success: function(response) {
            // $('body').on('click', '#validate',function(){
            //     validation();
            // })
            $('.main_content').html(response);
        }
    });
}

function validation() {
    var user_email = $('#N_user_email').val();
    $.ajax({
        url: 'validate.php',
        method: "POST",
        data: {
            username: $('#N_user_name').val(),
            email: user_email,
            firstname: $('#N_first_name').val(),
            lastname: $('#N_last_name').val(),
            password: $('#N_password1').val(),

        },
        dataType: 'JSON',
        crossDomain: true,
        success: function(response) {
            if (response.success == true) {
                var div = $('<div>').addClass('alert alert-success col-md-12').html("Account Created Successfuly please login.");
                $('body').append(div);
                console.log('validation: ', response);
            } else if (response.errors == true) {
                var div = $('<div>').addClass('alert alert-danger col-md-12').html("Username already in use!");
                $('body').append(div);
                console.log('validation failed:', response)
            }

        }
    });
}

function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = '20px segoe UI bold';
    var text = lunch_array[index]
    winner_array[0].restaurant = lunch_array[index];
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 420);
    ctx.restore();
    var rest = $(
        "<li>", {
            text: "Restaurant: " + winner_array[0].restaurant,
            class: "list-group-item list-group-item-success text-center"
        });
    if (rest_on = false) {
        $('#info').append(rest);
        rest_on = true;
    }
}

function easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

function spin_m() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel_m();
}

function rotateWheel_m() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel_m();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel_m();
    spinTimeout = setTimeout('rotateWheel_m()', 30);
}

function stopRotateWheel_m() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = '14px segoe UI';
    var text = lunch_array[index]
    winner_array[0].restaurant = lunch_array[index];
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
    var rest = $(
        "<li>", {
            text: "Restaurant: " + winner_array[0].restaurant,
            class: "list-group-item list-group-item-success text-center"
        });
    if (rest_on = false) {
        $('#info_m').append(rest);
        rest_on = true;
    }
}

function easeOut_m(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}
$(document).ready(function() {

    $('body').on('click', '#login_page', function() {
        $('.alert.alert-danger').remove();
        $('.alert.alert-success').remove();
        logout_ajax();
    })
    $('body').on('click', '#validate', function() {
            $('.alert.alert-danger').remove();
            validation();
            console.log('validate')
        })
        // $('body').on('click', '#new_user', function() {
        //     console.log('new user');
        //     new_user();
        // })
    $('body').on('touchstart click', '.home', function() {

        login_check();
        lunch_appoint_array = [];
        winner_array = [];
    })
    $('body').on('touchstart click', '.lunch', function() {
        nav_lunch();
    })
    $('body').on('touchstart click', '.account', function() {
        nav_edit();
    })
    $('form').on('click', '#login', function() {
        ajax_call();
        console.log('button worked')
    });
    login_check();
    if (document.getElementById('map-canvas')) {
        initialize();

    }

    $('body').on('touchstart click', '#add_all', function() {
        console.log('button works');
        $('#map-canvas').remove();
        $('#results').before($("<div id='map-canvas2'></div>"))
        random_select();
        send_food_request();
    })
    $('body').on('click', '#add_all_m', function() {
        console.log('button works');
        // $('#map-canvas_m').remove();
        // $('#results').before($("<div id='map-canvas2_m'></div>"))
        random_select_m();
        send_food_request_m();
    })
    $('body').on('click', '#add_map', function() {
        draw();
        $('#main_content').append('<input type="button" value="spin" onclick="spin();" style="float: left;">');
    })
    $('body').on('click', '#add_rest_names', function() {
        save();
    })
    $('body').on('touchstart click', '.logout', function() {
        console.log('logout btn')
        logout();
    })
})
