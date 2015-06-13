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


}
$(document).ready(function(){
	$('form').on('click', '#login', function(){
		ajax_call();
		console.log('button worked')
	})
})