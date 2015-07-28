<?php
session_start();
require('mysql_connect.php');
$id = $_SESSION['user_id'];
$query = "SELECT * FROM `users` WHERE user_id = '$id'";
$result = mysqli_query($con, $query);
?>
    <div class="brand">Get Lunch</div>
    <div class="address-bar"></div>
    <!-- Navigation -->
    <nav class="navbar navbar-default" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <!-- navbar-brand is hidden on larger screens, but visible when the menu is collapsed -->
                <a class="home navbar-brand">Get Lunch</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a class="home">Home</a>
                    </li>
                    <li>
                        <a class="lunch">Lunch</a>
                    </li>
                    <li>
                        <a class="account">Account</a>
                    </li>
                    <li>
                        <a class="logout">Logout</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    <div class="container">
        <div class="row">
            <div class="box">
                <div class="col-lg-6">
                    <hr>
                    <h2 class="intro-text text-center">Account Info
                        <strong></strong>
                    </h2>
                    <hr>
                    <div class="text-center">
                        <?php

                    while ($row = mysqli_fetch_assoc($result)) {
                        $first_n = $row['first_name'];
                        $last_n = $row['last_name'];
                        $email = $row['email'];
                        $user = $row['username'];
                        $user_id= $row['user_id'];
                        echo "<p>Username: ".$user."</p><p> ID Number: ". $user_id."</p><p class='col-xs-12 col-md-12'>First Name: ".$first_n."</p><br><p class='col-xs-12 col-md-12'>Last Name: ".$last_n."</p><br/><p class='col-xs-12 col-md-12'>E-mail: ".$email."</p></div></div>";
                        echo "<div class='col-lg-6 text-center'><hr><h2 class='intro-text text-center'>Edit Account Info</h2><hr><form><input class='name col-md-5 col-md-offset-4' value='".$first_n."'><input class='last col-md-5 col-md-offset-4' value='".$last_n."'></input><br/><input class='email col-md-5 col-md-offset-4' value='".$email."'></input>";
                    }

                    ?>
                            <button class="edit col-md-3 col-md-offset-4" type="button" onclick="edit_click()">submit</button>
                            </form>
                </div>
            </div>
        </div>
    </div>
    <!-- /.container -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <p>Copyright &copy; Get Luch 2015</p>
                </div>
            </div>
        </div>
    </footer>
   <div id='dialog-message' class="col-xs-6 col-sm-10 col-md-5 col-lg-5"></div>
    <!-- Bootstrap Core JavaScript -->
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>