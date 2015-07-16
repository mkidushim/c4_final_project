<?php
session_start();
require('mysql_connect.php');
$id = $_SESSION['user_id'];
$query = "SELECT * FROM `users` WHERE user_id = '$id'";
$result = mysqli_query($con, $query);
?>
<h4 class="col-md-5 col-md-offset-2">Account Info</h4>
<p onclick="login_check()" class='logout col-xs-3 col-md-1 col-md-offset-1'>Home</p>
<p onclick="nav_lunch()" class='logout col-xs-3 col-md-1 col-md-offset-1'>Lunch</p>
<p id="edit" onclick="nav_edit()" class="logout col-xs-3 col-md-1 col-md-offset-1">Account</p>

<p id="logout" onclick="logout()" class="logout col-xs-3 col-md-1 col-md-offset-1">Logout</p>
<!--<p onclick="nav_lunch()" class='lunch logout col-xs-6 col-md-1 col-md-offset-1'>Lunch</p>
 <nav class='col-xs-11 col-xs-offset-1 col-md-3 col-md-offset-9'>
    <li onclick="login_check()" class='home col-xs-3'>Home</li>
    <li onclick="nav_lunch()" class='lunch col-xs-6 col-xs-offset-3'> Go to Lunch</li>
</nav> -->

<?php

while ($row = mysqli_fetch_assoc($result)) {
	$first_n = $row['first_name'];
	$last_n = $row['last_name'];
	$email = $row['email'];
	$user = $row['username'];
	$user_id= $row['user_id'];
	echo "<p class='col-xs-12 col-md-12'>Username: ".$user."</p><br><p class='col-xs-12 col-md-12'> ID Number: ". $user_id."</p><br><p class='col-xs-12 col-md-12'>First Name: ".$first_n."</p><br><p class='col-xs-12 col-md-12'>Last Name: ".$last_n."</p><br/><p class='col-xs-12 col-md-12'>E-mail: ".$email."</p>";
	echo "<form> <input class='user col-md-7 col-md-offset-2' value='".$user."'></input><br><input class='name col-md-7 col-md-offset-2' value='".$first_n."'><input class='last col-md-7 col-md-offset-2' value='".$last_n."'></input><br/><input class='email col-md-7 col-md-offset-2' value='".$email."'></input>";
}

?>
<button type="button" onclick="edit_click()">submit</button>
</form>