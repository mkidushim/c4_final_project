<?php
session_start();
require("mysql_connect.php");
print_r($_POST);
$firstname = addslashes($_POST['firstname']);
$lastname = addslashes($_POST['lastname']);
$email = addslashes($_POST['email']);
$password = addslashes(sha1($_POST['password']));
$user = addslashes($_POST['username']);
$user_id = addslashes($_SESSION['user_id']);
$sql = "UPDATE `users` SET first_name ='$firstname', last_name = '$lastname', email = '$email', username = '$user' WHERE user_id = $user_id";
$result = mysqli_query($con, $sql);
if(empty($lastname)){
	$output['success'] = false;
	$final = json_encode($output);

}
else if ($result) {
	$output['success'] = true;
	$output['info'] = $results;
	$final = json_encode($output);
}
print_r($final);
?>