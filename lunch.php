<?php
session_start();
require('mysql_connect.php');
$friends= addslashes($_POST['friends']);
$user = addslashes($_POST['name']);
$food = addslashes($_POST['food']);
$rest = addslashes($_POST['restaurant']);
$range = addslashes($_POST['range']);
$userid = addslashes($_SESSION['user_id']);
$query = "INSERT INTO `history` (user_id, friends, range_miles, food, restaurant, winner) 
 			      VALUES 			($userid, '$friends', $range,  '$food', '$rest', '$user')";
$out = mysqli_query($con, $query);
if($out){
	$output = json_encode($user);
	print_r($output);
}else if (!$out){
	$output = json_encode($_POST);
	print_r($output);
}
?>