<?php
session_start();
$name1 = $_POST['name'];
print_r($_POST);
print_r($_SESSION['user_id']);

?>