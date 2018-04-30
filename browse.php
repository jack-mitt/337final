<!DOCTYPE html>
<html>
<head>
<title>UACraig</title>

<link rel='stylesheet' href='styles.css'>
<link rel='stylesheet' href='indexstyles.css'>
<link href="https://fonts.googleapis.com/css?family=Raleway:200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Tajawal:200" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src='script.js'></script> 
</head>
<body>
    <div id='pagecontainer'>
    <script>
    getTopBanner();
    </script>    
    <div class='content' id='content'>
        <div class='sidebar' id='sidebar'>
            <?php
                include('controller.php');
                getSideBar();
            ?>
        </div>
        <div class='frontpage' id='browsepage'>
            <?php
                if(isset($_GET['category'])){
                    getBrowsePage($_GET['category']);                   
                }
                else{
                    getBrowsePage('ALL CATEGORIES');
                }

            ?>
        </div>
    </div>
    </div>

</body>
</html>