<?php
session_start();
require("mysql_connect.php");
$firstname = addslashes($_POST['firstname']);
$lastname = addslashes($_POST['lastname']);
$email = addslashes($_POST['email']);
$password = addslashes(sha1($_POST['password']));
$user = addslashes($_POST['username']);
$user_id = addslashes($_SESSION['user_id']);
$sess_user = addslashes($_SESSION['username']);
$check = "SELECT * FROM users WHERE username = '$user'";
$user_check = mysqli_query($con, $check);
if (mysqli_num_rows($user_check) > 0 ) {
	$output['user_fail']= true;
	$final = json_encode($output);
	
}
if(empty($lastname) or empty($email) or empty($firstname)){
	$output['filled_out'] = false;
	$final = json_encode($output);

}
if (mysqli_num_rows($user_check) == 0) {
$sql = "UPDATE `users` SET first_name ='$firstname', last_name = '$lastname', email = '$email', username = '$user' WHERE user_id = $user_id";
$result = mysqli_query($con, $sql);
if(empty($lastname) or empty($email) or empty($firstname)){
	$output['success'] = false;
	$final = json_encode($output);

}
else if ($result) {
	$output['success'] = true;
	$row = mysqli_fetch_assoc($result);
	$output['info'] = $row;
	$final = json_encode($output);
}
}
print_r($final);
?>