<?php
require('mysql_connect.php');
$firstname = addslashes($_POST['firstname']);
$lastname = addslashes($_POST['lastname']);
$email = addslashes($_POST['email']);
$password = addslashes(sha1($_POST['password']));
$user = addslashes($_POST['username']);
$check = "SELECT * FROM users WHERE username = '$user'";
$user_check = mysqli_query($con, $check);
if (mysqli_num_rows($user_check) > 0) {
	$output['errors']= true;
	$end = json_encode($output);
	print_r($end);
}
if (mysqli_num_rows($user_check) == 0) {
$sql = "INSERT INTO `users` (first_name, last_name, email, password, username)
VALUES ('$firstname', '$lastname', '$email', '$password', '$user')";
$result = mysqli_query($con, $sql);
if ($result) {
	$output['success']= true;
	$output['info']= $_POST;
    $end = json_encode($output);
    print_r($end);
}

else if (!result) {
	$output['errors'] = true;
	$end = json_encode($output);
	print_r($end);

}
}




?>