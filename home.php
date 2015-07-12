<?php 
session_start();
require('mysql_connect.php');
$username = addslashes($_POST['username']);
$password = addslashes(sha1($_POST['password']));
$query= "SELECT * FROM `users` WHERE username = '$username' AND password = '$password'";
$result = mysqli_query($con, $query);
$output = [];
  		if (mysqli_num_rows($result) > 0){
  			$all = mysqli_fetch_assoc($result);
  				$_SESSION['user_id']= $all['user_id'];
  				$_SESSION['loggedin'] = true;
  				$all['success']= true;
  				$output_string = json_encode($all);
				
			}
		else{
			$output['success'] = false;
			$output['errors']= "username or password invalid";
			$output_string = json_encode($output);
			
		}

			print_r($output_string);
?>