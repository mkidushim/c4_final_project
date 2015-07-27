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
var user_info;
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
var placesList;
function send_food_request() {
   
    var name = winner_array[0].name;
    var range = winner_array[0].range;
    var food = winner_array[0].food;
    range = range * 1609;
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
            '<h4 id="firstHeading" class="firstHeading">You are Here!</h4>' ;
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
            $('#wheelcanvas').before('<input type="button" value="spin again" class="col-md-3" onclick="spin();" style="float: left;">');
            spin();
            $('#results').show();
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
            '<h4 id="firstHeading" class="firstHeading">You are Here!</h4>' +
            '<div id="bodyContent">' +
            '<p>Longitude: ' + Math.round(position.coords.longitude) + 'Latitude: ' + Math.round(position.coords.latitude) + '</p>';
        infowindow = new google.maps.InfoWindow({
            content: cont_string
        });
        var service = new google.maps.places.PlacesService(map_o);
        service.nearbySearch(request, callback);
        marker_user = new google.maps.Marker({
            map: map_o,
            position: center,
            title: "You are Here!",
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
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);

        }
    }
}

function callback_l(results, status, pagination) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < 11; i++) {
            createMarker_l(results[i]);

        }
        if (pagination.hasNextPage) {
      var moreButton = document.getElementById('more');

      moreButton.disabled = true;

      google.maps.event.addDomListenerOnce(moreButton, 'click',
          function() {
        moreButton.disabled = true;
        pagination.nextPage();
      });
    }
    }
}

function createMarker(place) {
    console.log(place);
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map_o,
        position: place.geometry.location,
        icon: "images/rest.png",
    });
    var marker_content = "<h4>" + place.name + "</h4><p> Rating: " + place.rating + " </p>"
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker_content);
        infowindow.open(map_o, marker);
    });
}

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
    console.log(place.place_id);
    place_id_holder = place.place_id;
    var marker_content = "<h4>" + place.name + "</h4><p> Rating: " + place.rating;
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
                user_info = response;
            } else if (response.success == false) {
                $("#dialog-message").dialog({
                    modal: true,
                    draggable: false,
                    resizable: false,
                    position: ['center', 'top'],
                    width: 400,
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
                    width: 400,
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
                    width: 400,
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
                user_info = response.userinfo;
            } else if (response.errors == true) {
                console.log("login check errors: ", response)
            }
        }
    });
}
// commented out google maps api on landing page 
function to_landing() {
    $.ajax({
        url: 'index2.0_templ.html',
        method: 'POST',
        dataType: 'html',
        cache: false,
        success: function(response) {

            var user = $('<h4>', {
                text: "Welcome " + user_info.first_name + " " + user_info.last_name + "!",
                class: 'col-md-5 col-md-offset-2'
            });
            $('body').html(response);
            $('body').on('touchstart click', '.lunch', function() {
                nav_lunch();
            })
            $('body').on('touchstart click', '.friends', function() {
                nav_friends();
            })
            $('body').on('touchstart click', '#logout', function() {
                console.log('logout btn')
                logout();
            })
            initialize();
            recent_lunches();
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

            $('nav').on('click', '.home', function() {
                login_check();
                //to_landing();
            })
            $('nav').on('click', '.lunch', function() {
                nav_lunch();
            })
            $('nav').on('click', '.friends', function() {
                nav_friends();
            })
            $('body').on('click', '#logout', function() {
                console.log('logout btn')
                logout();
            })

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

            // $('nav').on('click', '.home', function() {
            //     login_check();
            //     //to_landing();
            // })
            // $('nav').on('click', '.lunch', function() {
            //     nav_lunch();
            // })
            // $('nav').on('click', '.friends', function() {
            //     nav_friends();
            // })
            // $('body').on('click', '#logout', function() {
            //     console.log('logout btn')
            //     logout();
            // })

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
                $('body').on('touchstart click', '.home', function() {

                    login_check();
                    lunch_appoint_array = [];
                    winner_array = [];
                })

                $('body').on('click', '.lunch', function() {
                    nav_lunch();
                })
                $('body').on('click', '.account', function() {
                    nav_edit();
                })
                $('body').on('click', '#logout', function() {
                    console.log('logout btn')
                    logout();
                })
            }
            // complete: function(response) {
            //     draw();
            // }
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
                $("#dialog-message").dialog({
                    modal: true,
                    draggable: false,
                    resizable: false,
                    width: 400,
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
                    width: 400,
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
//not using get friends for now
// function get_friend_list() {
//         $.ajax({
//             url: 'friends.php',
//             method: 'POST',
//             dataType: 'html',
//             success: function(response) {

//                 $('.friend_list_sugg').html(response);


//             }
//         });
//     }
function add_person_object() {
    lunch_object = {};
    $(':text').each(function(index, element) {
        if (index < 4) {

            lunch_object[element.id] = element.value;
            console.log(element.id + " : " + element.value)
        }

    });

    lunch_appoint_array.push(lunch_object);

    console.log("lunch object", lunch_object);


};

function add_person_DOM() {
    console.log("add_person_DOM called");
    var name = $('#name').val();
    var food = $('#food').val();
    var range = $('#range').val();

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
    $('#info').append(append_name).append(append_food_response).append(append_range).append(line);
    add_person_object();
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

    $('#info').append(append_name).append(append_food).append(append_range);

}

function draw() {
    drawRouletteWheel();
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
                var div = $('<div>').addClass('alert alert-success col-md-12').html("Account Created Successfuly procceed to login page or hit refresh");
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
    ctx.font = '14px segoe UI';
    var text = lunch_array[index]
    winner_array[0].restaurant = lunch_array[index];
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
    save();
}

function easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}
$(document).ready(function() {

    // logout_ajax();
    // $('body').on('click','#edit', function(){
    //     nav_edit();
    // })
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
    $('body').on('click', '#new_user', function() {
        console.log('new user');
        new_user();
    })
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


    $('body').on('click', '#lunch_b', function() {
        add_person_DOM();
        if (first_add) {
            $('#lunch_b').after('<button id="add_all" class="col-xs-4 col-md-3 col-md-offset-1" type="button">Random</button>')
            first_add = false;
        }

    });
    $('body').on('click', '#add_all', function() {
        console.log('button works');
        random_select();
        send_food_request();

    })
    $('body').on('click', '#add_map', function() {

        draw();
        $('#main_content').append('<input type="button" value="spin" onclick="spin();" style="float: left;">');
    })
    $('body').on('click', '#add_rest_names', function() {
        save();
    })
    $('body').on('click', '.logout', function() {
            console.log('logout btn')
            logout();
        })
        // $('nav').on('click', '.home', function() {
        //     console.log('button')
        //     nav_home();
        // })
        // $('nav').on('click', '.lunch', function() {
        //     nav_lunch();
        // })
        // $('nav').on('click', '.friends', function() {
        //     nav_friends();
        // })
        // $('body').on('click', '#btn_friend', function() {
        //     get_friend_list();
        // })

})
