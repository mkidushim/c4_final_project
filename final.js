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
					$('#response').html('error: '+ response);
					
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