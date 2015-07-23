<?php
session_start();
require("mysql_connect.php");
$firstname = addslashes($_POST['firstname']);
$lastname = addslashes($_POST['lastname']);
$email = addslashes($_POST['email']);
$password = addslashes(sha1($_POST['password']));

$user_id = addslashes($_SESSION['user_id']);
$sess_user = addslashes($_SESSION['username']);



 if(empty($lastname) or empty($email) or empty($firstname)){
	$output['filled_out'] = false;
	$output['success']= false;
	$output['info']= 'Still need to fill out part of the form';
	$final = json_encode($output);

}
else {
	$sql = "UPDATE `users` SET first_name ='$firstname', last_name = '$lastname', email = '$email' WHERE user_id = $user_id";
	$result = mysqli_query($con, $sql);
	if ($result) {
	$output['success'] = true;
	$row = mysqli_fetch_assoc($result);
	$output['info'] = $sess_user;
	$final = json_encode($output);
	}
}
print_r($final);
?>