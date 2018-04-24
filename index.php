<!DOCTYPE html>
<html>
<head>
<title>UACraig</title>
<script src='script.js'></script>
<link rel='stylesheet' href='styles.css'>
<link rel='stylesheet' href='indexstyles.css'>
<link href="https://fonts.googleapis.com/css?family=Raleway:200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Tajawal:200" rel="stylesheet">
</head>
<body>
    <div id='pagecontainer'>
    
    <div class='content' id='content'>
        <div class='sidebar' id='sidebar'>
            <?php
                include('controller.php');
                getSideBar();
            ?>
        </div>
        <div class='frontpage' id='frontpage'>
            <?php
                getFrontPage();
            ?>
        </div>
    </div>
    </div>
    <script>
    getTopBanner();
    </script>
</body>
</html>