var map_o;
var infowindow;
var service;
var lunch_array = [];
var place_id_holder;
var lunch_appoint_array = [];
var colors = ["#B8D430", "#3AB745", "#029990", "#3501CB",
    "#2E2C75", "#673A7E", "#CC0071", "#F80120",
    "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"
];
var restaraunts = ["Wendy's", "McDonalds", "Chick-fil-a", "Five Guys",
    "Gold Star", "La Mexicana", "Chipotle", "Tazza Mia",
    "Panera", "Just Crepes", "Arby's", "Indian"
];
var startAngle = 0;
var arc = Math.PI / 6;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;
var winner_array = [];

function send_food_request() {
    var name = $('.name').val();
    var range = $('.range').val();
    var food = winner_array[0].food1;
    range = range * 1609;
    navigator.geolocation.getCurrentPosition(function(position) {
        var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map_o = new google.maps.Map(document.getElementById('map-canvas2'), {
            center: center,
            zoom: 12,

        });

        var request = {
            location: center,
            radius: range,
            types: ('cafe' | 'meal_takeaway' | 'meal_delivery' | 'food' | 'restaurant'),
            query: food,

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
        service.textSearch(request, callback_l);
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

function initialize() {

    navigator.geolocation.getCurrentPosition(function(position) {
        var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map_o = new google.maps.Map(document.getElementById('map-canvas'), {
            center: center,
            zoom: 12,

        });

        var request = {
            location: center,
            radius: 10000,
            types: ['cafe', 'meal_takeaway', 'meal_delivery', 'food', 'restaurant'],
            keyword: "lunch",
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
    window.results = results;
    console.log(results)
    console.log(status)
    window.place_name = results;
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);

        }
    }
}

function callback_l(results, status) {
    window.results = results;
    console.log(results)
    console.log(status)
    window.place_name = results;
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker_l(results[i]);

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
    console.log(place.place_id);
    place_id_holder = place.place_id;
    var marker_content = "<h4>" + place.name + "</h4><p> Rating: " + place.rating;
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker_content);
        infowindow.open(map_o, marker);
    });
}

// function get_location() {
//     if (!navigator.geolocation) {
//         output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
//         return;
//     }
//     navigator.geolocation.getCurrentPosition(function(position) {
//         var mapOptions = {
//             zoom: 15,
//             center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
//             mapTypeId: google.maps.MapTypeId.ROADMAP
//         }
//         var map_new = new google.maps.Map(document.getElementById('map-canvas'),
//             mapOptions);
//         marker_user = new google.maps.Marker({
//             map: map_new,
//             position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
//             title: "You are Here!"

//         });
//         google.maps.event.addListener(marker_user, 'click', function() {
//             infowindow.setContent(marker_user.title);
//             infowindow.open(map_new, this);
//         });

//     });
// }

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

                window.php_response = response;
                if (response) {
                    // console.log('result is true', response)


                    to_landing();
                } else {

                    $('.main_content').html('error: ' + response);

                }

            }
        });
    }
    // commented out google maps during developement already working
function to_landing() {
    $.ajax({
        url: 'landing.html',
        method: 'POST',
        dataType: 'html',
        success: function(response) {
            if (response) {
                initialize();
                var user = $('<h3>', {
                    text: "Welcome " + php_response['first_name'] + " " + php_response['last_name'] + "!",
                    class: 'col-md-5 col-md-offset-1'
                })
                console.log(php_response)
                $('body').on('click', '#locate', function() {
                    get_location();
                })
                $('.main_content').html(user).append(response);

                $('nav').on('click', 'home', function() {
                    nav_home();
                })
                $('nav').on('click', '.lunch', function() {
                    nav_lunch();
                })
                $('nav').on('click', '.friends', function() {
                    nav_friends();
                })
            } else {
                console.log('error no page');

            }

        }
    });
}

function nav_home() {
    $.ajax({
        url: 'landing.html',
        method: 'POST',
        dataType: 'html',
        success: function(response) {
            to_landing();

            $('nav').on('click', '.home', function() {
                nav_home();
            })
            $('nav').on('click', '.lunch', function() {
                nav_lunch();
            })
            $('nav').on('click', '.friends', function() {
                nav_friends();
            })

        }
    });
}

function nav_friends() {
    $.ajax({
        url: 'friends.html',
        method: 'POST',
        dataType: 'html',
        success: function(response) {
            $('.main_content').html(response);

            $('nav').on('click', '.home', function() {
                nav_home();
            })
            $('nav').on('click', '.lunch', function() {
                nav_lunch();
            })
            $('nav').on('click', '.friends', function() {
                nav_friends();
            })

        }
    });
}

function nav_lunch() {
    $.ajax({
        url: 'lunch.html',
        method: 'POST',
        dataType: 'html',
        success: function(response) {

            $('.main_content').html(response);
            $('nav').on('click', '.home', function() {
                nav_home();
            })
            $('nav').on('click', '.lunch', function() {
                nav_lunch();
            })
            $('nav').on('click', '.friends', function() {
                nav_friends();
            })
            $('body').on('click', '#lunch_b', function() {
                add_person_DOM();
                add_person_object();
                
            })
            $('body').on('click', '#add_all', function() {
                console.log('button works');
                random_select();
                send_food_request();
            })
            $('body').on('click', '#add_map', function() {
                send_food_request();
                draw();
                $('body').append('<input type="button" value="spin" onclick="spin();" style="float: left;">')
            })
            $('body').on('click', '#add_rest_names', function() {
                draw();
                $('body').append('<input type="button" value="spin" onclick="spin();" style="float: left;">')
            })
        },
        // complete: function(response) {
        //     draw();
        // }
    });
}

function get_friend_list() {
        $.ajax({
            url: 'friends.php',
            method: 'POST',
            dataType: 'html',
            success: function(response) {

                $('.friend_list_sugg').html(response);


            }
        });
    }
    //Not using function add_input anymore
function add_person_object() {
    var forms = {};
    $('form').each(function(i) {
        forms[i] = {};
        $(this).children('input').each(function() {
            forms[i][$(this).attr('name')] = $(this).val();
        });
        lunch_appoint_array.push(forms[i])
    });
    console.log(forms)
    return forms;
}

function add_person_DOM() {
    var name = $('.name').val();
    var food = $('.food').val();
    var range = $('.range').val();
    var append_name = $(
        "<li>", {
            text: "Name: " + name,
            class: "list-group-item"
        });
    var append_food_response = $(
        "<li>", {
            text: "Food: " + food,
            class: "list-group-item"
        });
    var append_range = $(
        "<li>", {
            text: "Range: " + range,
            class: "list-group-item"
        });
    $('#info').append(append_name).append(append_food_response).append(append_range)
}

function random_select() {
    $('#info > li').remove();
    var rand = lunch_appoint_array[Math.floor(Math.random() * lunch_appoint_array.length)];
    winner_array.push(rand);
    var append_name = $(
        "<li>", {
            text: "Name: " + rand.name,
            class: "list-group-item-success text-center"
        });
    var append_food = $(
        "<li>", {
            text: "Food: " + rand.food1,
            class: "list-group-item-success text-center"
        });
    var append_range = $(
        "<li>", {
            text: "Range: " + rand.range,
            class: "list-group-item-success text-center"
        });
    for (var i = 0; i < lunch_appoint_array.length; i++) {
        // if (lunch_appoint_array[i].name == rand.name) {
        //     return
        // } else {
        if (lunch_appoint_array[i].name == rand.name) {
            console.log(lunch_appoint_array[i])

        } else {
            console.log(lunch_appoint_array[i])
            var append_friends = $(
                "<li>", {
                    text: "Friends: " + lunch_appoint_array[i].name,
                    class: "list-group-item-success text-center"
                });

            $('#info').append(append_friends);
        }
    }


    console.log(rand.food1);

    $('#info').append(append_name).append(append_food).append(append_range);

}

function draw() {
    drawRouletteWheel();
}

function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
        var outsideRadius = 200;
        var textRadius = 160;
        var insideRadius = 125;
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.font = 'bold 9px sans-serif';
        for (var i = 0; i < 12; i++) {
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
            ctx.fillStyle = "#6B6B6B";
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
    ctx.font = '20px sans-serif';
    var text = lunch_array[index]
     winner_array[0].restaurant = lunch_array[index];
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
}

function easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}
$(document).ready(function() {
    $('form').on('click', '#login', function() {
        ajax_call();
        console.log('button worked')
    })
    $('nav').on('click', '.home', function() {
        console.log('button')
        nav_home();
    })
    $('nav').on('click', '.lunch', function() {
        nav_lunch();
    })
    $('nav').on('click', '.friends', function() {
        nav_friends();
    })
    $('body').on('click', '#btn_friend', function() {
        get_friend_list();
    })

})
