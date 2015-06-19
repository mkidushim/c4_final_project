var map_o;
var infowindow;
var service;

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
            types: ['cafe','meal_takeaway'||'meal_delivery'||"food"||"restaurant"],
            keyword: "lunch",
            sortby: "distance"
        };
        var cont_string =
      '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Latitude and Longitude</h1>'+
      '<div id="bodyContent">'+
      '<p>Longitude: '+ Math.round(position.coords.longitude) + 'Latitude: ' +Math.round(position.coords.latitude) +'</p>';
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
    window.results= results;
        console.log(results)
        console.log(status)
        window.place_name = results;
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);

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
var marker_content = "<h3>"+ place.name+"</h3><p> Rating: "+ place.rating + " </p>"
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker_content);
        infowindow.open(map_o, marker);
    });
}



function get_location() {
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map_new = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        marker_user = new google.maps.Marker({
            map: map_new,
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            title: "You are Here!"

        });
        google.maps.event.addListener(marker_user, 'click', function() {
            infowindow.setContent(marker_user.title);
            infowindow.open(map_new, this);
        });

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

function to_landing() {
    $.ajax({
        url: 'landing.html',
        method: 'POST',
        dataType: 'html',
        success: function(response) {
            if (response) {
                initialize();
                var user = $('<h3>', {
                    text: php_response['username'],
                    class: 'col-md-4 col-md-offset-3'
                })
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
            $('body').on('click', '#add', function() {
                console.log('button works');
                add_input();
            })

        }
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

function add_input() {
    var input_name = $('<input>', {
        placeholder: "name",
        name: 'name',
        type: 'text',
        class: 'col-md-2'
    })
    var input_rest = $('<input>', {
        placeholder: "Food Type",
        name: 'food',
        type: 'text',
        class: 'col-md-2'
    })
    var input_rest1 = $('<input>', {
        placeholder: "Food Type",
        name: 'food',
        type: 'text',
        class: 'col-md-2'
    })
    var input_rest2 = $('<input>', {
        placeholder: "Food Type",
        name: 'food',
        type: 'text',
        class: 'col-md-2'
    })
    var input_range = $('<input>', {
        placeholder: "Miles away",
        name: 'range',
        type: 'text',
        class: 'col-md-2'
    })
    var form = $('<form>', {
        class: 'col-md-12',
        id: 'form_2',
        action: 'lunch.php',
        method: 'POST'
    })
    var btn = $('<button>', {
        class: 'col-md-1',
        id: 'submit',
        text: 'submit friend'
    })
    var btn2 = $('<button>', {
        class: 'col-md-1',
        text: 'add input',
        type: 'button'
    })
    $('.main_content').append(form);
    $('#form_2').append(input_name);
    $('#form_2').append(input_rest);
    $('#form_2').append(input_rest1);
    $('#form_2').append(input_rest2);
    $('#form_2').append(input_range);
    $('#form_2').append(btn);
    $('#form_2').append(btn2);
    console.log(input_range);
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
