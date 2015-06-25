<?php 
session_start();
require('mysql_connect.php');
$username = mysql_real_escape_string($_POST['username']);
$password = mysql_real_escape_string(sha1($_POST['password']));
$query= "SELECT * FROM `users` WHERE username = '$username' AND password = '$password'";
$result = mysqli_query($con, $query);
$output = [];
  		if (mysqli_num_rows($result) > 0){
  			$all = mysqli_fetch_assoc($result);
  				$_SESSION['user_id']= $all['user_id'];
  				$output['success']= true;
			}
		else{
			$output['errors']= "username or password invalid";
			
		}
$output_string = json_encode($all);
print_r($output_string);
?>