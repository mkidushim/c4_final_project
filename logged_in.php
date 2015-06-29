<?php
session_start();
require('mysql_connect.php');
$userid = addslashes($_SESSION['user_id']);
if(isset($userid)){
	$output['success']= True;
	$query = "SELECT * FROM users WHERE user_id = $userid";
	$result = mysqli_query($con, $query);
	$output['userinfo'] = mysqli_fetch_assoc($result);
	
}

else {
	$output['success']= false;
	$output['errors'] = "No User Saved";
}
$output['user_id'] = $_SESSION['user_id'];
$output_s = json_encode($output);
print_r($output_s);
?>