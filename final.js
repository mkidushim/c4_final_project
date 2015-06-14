function initialize() {
	//  var pos = navigator.geolocation.getCurrentPosition();
	// var lat = position.coords.latitude;
	// var longitude = position.coords.longitude;
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(lat, longitude),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);
}
function get_location(){


	navigator.geolocation.getCurrentPosition(function(position) {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);


});
}

function ajax_call() {
	$.ajax({
			url: 'index.php',
			data: {
				username: $('#username').val(),
				password: $('#password').val()
			},
			method: 'POST',
			dataType: 'JSON',
			success: function(response){
				console.log(response);
				window.php_response= response;
				if(response){
					console.log('result is true',response)
					console.log(response)
					
					to_landing();
				}
				else {
					console.log('error: ', response)
					$('#main_content').html('error: '+ response);
					
				}
				
			}
		});
}
function to_landing (){
$.ajax({
			url: 'landing.html',
			method: 'POST',
			dataType: 'html',
			success: function(response){
				if (response){
				console.log(response);
				var user = $('<h3>',{
					text: 'username:'+php_response['username'],
					class: 'col-md-7'
				})
				$('.main_content').html(user).append(response);
				initialize();	
				}
				else{
					console.log('error no page');

				}
				
			}
		});

}
$(document).ready(function(){
	$('form').on('click', '#login', function(){
		ajax_call();
		console.log('button worked')
	})
})