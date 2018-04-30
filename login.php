<!DOCTYPE html>
<html>
<head>
<title>UACraig - Login</title>
<script src='script.js'></script>
<script src='postpage.js'></script>
<link rel='stylesheet' href='styles.css'>
<link href="https://fonts.googleapis.com/css?family=Raleway:200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Tajawal:200" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
    <?php
    include('controller.php');
    ?>
    <div id='pagecontainer'>
    <script>
    getTopBanner();
    </script>
        <div class='userformdiv'>
            <form class='userform' action='controller.php' method="post">
                <input name='action' value='login' type='hidden'>
                <span class='userrow'>Username: <input name='username' class='userinput'></span>
                <span class='userrow'>Password: <input type='password' name='password' class='userinput'></span>
                <span class='userrow'><input type='submit' value='Login'></span>
            </form>
        </div>
    </div>

    
</body>
</html>
