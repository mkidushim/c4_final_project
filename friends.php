<?php
require('mysql_connect_aws.php');
$freind_sugg = "SELECT * FROM users ORDER BY user_id";
$result = mysqli_query($con, $freind_sugg);
// $row = mysqli_fetch_assoc($result);
echo "<table><tr><td>First</td><td>Last</td><td>email</td></tr>";
while ($row = mysqli_fetch_assoc($result) ) {
	print_r("<tr><td>".$row['first_name']."</td><td>".$row['last_name']."</td><td>".$row['email']."</td></tr>");
}
echo "</table>";
// print_r($row['first_name']);
?>