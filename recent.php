<?php
require('mysql_connect.php');
$lunch_sugg = "SELECT * FROM history ORDER BY post_id";
$result = mysqli_query($con, $lunch_sugg);
 $row = mysqli_fetch_assoc($result);
// while ($row = mysqli_fetch_assoc($result) ) {
// 	$output = json_encode($row);
// 	// print_r($output);
// }
$output = json_encode($row);
print_r($output);
?>