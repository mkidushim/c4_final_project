<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	 <meta charset="utf-8">
	 <script src="https://maps.googleapis.com/maps/api/js"></script>
	 <link rel="stylesheet" type="text/css" href="final.css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
	<script src="final.js"></script>
</head>
<body>
<div class="main_content">
<h1 class="text-center">Go to Lunch</h1>
<form>
	<input type="text" class="col-md-4 col-md-offset-4" id="username" name="username">
	<input type="password" class="col-md-4 col-md-offset-4" id="password" name="password">
	<button type="button" class="col-md-2 col-md-offset-5" id="login">login</button>
	<button type="button" class="col-md-2 col-md-offset-5" id="logout">logout</button>
</form>

</div>
</body>
</html>