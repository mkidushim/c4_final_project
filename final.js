function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(33, -117),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}

function get_location() {


    navigator.geolocation.getCurrentPosition(function(position) {
        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);


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
            console.log(response);
            window.php_response = response;
            if (response) {
                console.log('result is true', response)
                console.log(response)

                to_landing();
            } else {
                console.log('error: ', response)
                $('.main_content').html('error: ' + response);

            }

        }
    });
}

function to_landing() {
    $.ajax({
        url: 'landing.php',
        method: 'POST',
        dataType: 'html',
        success: function(response) {
            if (response) {
                console.log(response);
                var user = $('<h3>', {
                    text: php_response['username'],
                    class: 'col-md-4 col-md-offset-3'
                })
                $('.main_content').html(user).append(response);
                initialize();
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
        url: 'landing.php',
        method: 'POST',
        dataType: 'html',
        success: function(response) {
            to_landing();
            console.log('home');
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
            console.log('friends', response);
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

        }
    });
}
function get_friend_list(){
	$.ajax({
        url: 'friends.php',
        method: 'POST',
        dataType: 'html',
        success: function(response) {
            console.log(response);
            $('.friend_list_sugg').html(response);
       

        }
    });
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
    $('body').on('click','#btn_friend', function(){
    	get_friend_list();
    })
})
