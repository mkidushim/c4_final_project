<h1>Friends</h1>
<nav class="col-md-5">
    <li class="home">Home</li>
    <li class="friends">Friends</li>
    <li class="lunch">Make Lunch Appointment</li>
</nav>

<?php
require('mysql_connect.php');
$freind_sugg = "SELECT * FROM users";
$result = mysqli_query($con, $freind_sugg);
$row = mysqli_fetch_assoc($con, $result);
print_r($row);
echo "<tr>";
echo "<td>" . $row['username'] . "</td>";
echo "<td>" . $row['email'] . "</td>";
echo "</tr>";
?>
