<?php
session_start();
require('mysql_connect.php');
$user = addslashes($_SESSION['user_id']);
$lunch_sugg = "SELECT * FROM `history` WHERE `user_id` = $user ORDER BY post_id DESC";
$result = mysqli_query($con, $lunch_sugg);
$all = [];

while ($row = mysqli_fetch_assoc($result)) {
$all['$row'] = $row;
}
$output = json_encode($all);
print_r($output);

?>