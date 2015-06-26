<?php
session_start();
if(isset($_SESSION['user_id'])){
	$output['success']= True;

}

else {
	$output['success']= false;
	$output['errors'] = "No User Saved";
}
$output['user_id'] = $_SESSION['user_id'];
$output_s = json_encode($output);
print_r($output_s);
?>