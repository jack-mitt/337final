<!DOCTYPE html>
<html>
<head>
<title>UACraig</title>
<script src='script.js'></script>
<link rel='stylesheet' href='styles.css'>
<link href="https://fonts.googleapis.com/css?family=Raleway:200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Tajawal:200" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
    <div id='pagecontainer'>
    <script>
    getTopBanner();
    </script>
        <div id='userinfo'>
            <?php
                include('controller.php');
                echo getUserInfo();
            ?>
        </div>
    </div>

    
</body>
</html>
