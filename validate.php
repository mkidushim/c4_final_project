<?php
$firstname = addslashes($_POST['firstname']);
$lastname = addslashes($_POST['lastname']);
$email = addslashes($_POST['email']);
$password = addslashes($_POST['password']);
$user = addslashes($_POST['username']);
$sql = "INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `username`)
VALUES ('$firstname', '$lastname', '$email', '$password', '$user')";
if (mysqli_query($con, $sql)) {
    $output = json_encode($sql);
    print_r($output);
}
else {
	$output = json_encode($user);
	print_r($output)
}


?>