<?php
session_start();
require('mysql_connect.php');
$id = $_SESSION['user_id'];
$query = "SELECT * FROM `users` WHERE user_id = '$id'";
$result = mysqli_query($con, $query);
while ($row = mysqli_fetch_assoc($result)) {
	$first_n = $row['first_name'];
	$last_n = $row['last_name'];
	$email = $row['email'];
	$user = $row['username'];
	$user_id= $row['user_id'];
	echo "<h2>Username: ".$user." - ID Number:". $user_id."</h2><br><h2>Name: ".$first_n.$last_n."</h2><br/><h4>".$email."</h4>";
}

?>