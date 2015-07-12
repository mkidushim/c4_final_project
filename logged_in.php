<?php
session_start();
require('mysql_connect.php');
$userid = addslashes($_SESSION['user_id']);
$log = addslashes($_SESSION['loggedin']);
if(isset($_SESSION['user_id'])){
	$output['success']= true;
	$query = "SELECT * FROM users WHERE user_id = $userid";
	$result = mysqli_query($con, $query);
	$output['userinfo'] = mysqli_fetch_assoc($result);
	$output['user_id'] = $_SESSION['user_id'];

}

else {
	$output['success']= false;
	$output['errors'] = "No User Saved";

}

$output_s = json_encode($output);
print_r($output_s);
?>