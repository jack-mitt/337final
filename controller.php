<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    include('DatabaseAdaptor.php');

    function getSideBar(){
        
        $sidebarStr = "<h3 class='sidebarheader'>CATEGORIES</h3>";

        $DB = new DatabaseAdaptor();
        $allCategories = $DB->getAllCategories();
        $categoryCount = count($allCategories);
        foreach($allCategories as $category){
            if($category['parent_id'] == NULL){
                $sidebarStr .= "<a class='category' href='browse.php?category=" . $category['name'] . "'>" . strtoupper($category['name']) . "</a>";
                $catId = $category['id'];
                $subcategories = $DB->getChildrenOf($catId);
                foreach($subcategories as $subcat){
                    $sidebarStr .= "<a class='subcategory' href='browse.php?category=" . $subcat['name'] . "'> • " . strtoupper($subcat['name']) . "</a>";
                }
                $sidebarStr .= "<br>";
            }
        }
        echo $sidebarStr;
    }

    function getFrontPage(){
        $frontPageStr = "<h2 class='frontpageheader'>FEATURED ITEMS</h2>";
        $DB = new DatabaseAdaptor();
        $allCategories = $DB->getAllCategories();
        $categoryCount = count($allCategories);
        $featuredCategories = array();
        while(count($featuredCategories)<4){
            $randIndex = rand(0 , $categoryCount -1);
            if(!in_array($allCategories[$randIndex], $featuredCategories)){
                array_push($featuredCategories, $allCategories[$randIndex]);
            }
        }
        foreach($featuredCategories as $category){
            $categoryName = str_replace("_", " ", $category['name']);
            $categoryName = strtoupper($categoryName);
            $frontPageStr .= "<div class='featuredcategory' id='" . $category['name'] . "'>";
            $frontPageStr .= "<h3 class='featuredheader'>" . $categoryName . "</h3>";
            // INNER DIVS
            //for($i = 0; $i < 3; $i+){
              //  $
            //}
            $frontPageStr .= "</div>";
        }
        echo $frontPageStr;
    }

    function getBrowsePage($category){
         $browsePageStr = "<h2 class='frontpageheader'>" .strtoupper($category). "</h2>"; 
        $DB = new DatabaseAdaptor();
        if($category == "ALL CATEGORIES"){
            $posts = $DB->getAllPosts();
        }
        else{
            $posts = $DB->getPostsByCategoryName($category);
        }
        foreach($posts as $post){
            $browsePageStr .= "<div class='searchpost' id='" .$post['id']. "' onclick='showPost(this.id)'>";
            $browsePageStr .= "<h5 class='searchposttitle'>" .$post['postname'] . "</h5>";
            $browsePageStr .= "<h5 class='searchpostlocation'>" .$post['location'] . "</h5>";
            $browsePageStr .= "<h5 class='searchpostprice'>$" .$post['price'] . "</h5>";
            $browsePageStr .= "<div class='searchpostthumbnaildiv'><img class='searchpostthumbnail' alt='".$post['name']."' src='images/posts/" . $post['id'] . ".jpg'></div></div>";
        }
        echo $browsePageStr;
    }

    function getUserInfo(){
        if(isset($_SESSION['username']) && isset($_SESSION['user_id'])){
            $DB = new DatabaseAdaptor();
            $userInfoStr = '<div class="userinfodiv"><h3 class="frontpageheader">' . $_SESSION['username'] . " - POSTS</h3><hr>" ;
            $userPosts = $DB->getPostsByUser($_SESSION['user_id']);
            foreach($userPosts as $post){
                $userInfoStr .= "<div class='searchpost' id='" .$post['id']. "' onclick='showPost(this.id)'>";
                $userInfoStr .= "<h5 class='searchposttitle'>" .$post['postname'] . "</h5>";
                $userInfoStr .= "<h5 class='searchpostlocation'>" .$post['location'] . "</h5>";
                $userInfoStr .= "<h5 class='searchpostprice'>$" .$post['price'] . "</h5>";
                $userInfoStr .= "<div class='searchpostthumbnaildiv'><img class='searchpostthumbnail' alt='".$post['name']."' src='images/posts/" . $post['id'] . ".jpg'></div></div>";
            }
            $userInfoStr .= '</div>';
            return $userInfoStr;
        }
        else{
            return 'error getting user info';
        }
    }

    function login($username, $password){
        $DB = new DatabaseAdaptor();
        if($DB->loginUser($username, $password)){
            header('Location: index.php');
        }
        else{
            header('Location: loginError.php');
        }
        return;
    }

    function logout(){
        if(isset($_SESSION['username'])){
            unset($_SESSION['username']);
            header('Location: index.php');
        }
        else{
            header('Location: index.php');
        }
        return;
    }

    function register($username, $password, $email){
        $DB = new DatabaseAdaptor();
        if($DB->registerUser($username, $password, $email)){
            header('Location: index.php');
        }
        else{
            header('Location: registerError.php');
        }
        return;
    }

    function getLoginStatus(){
        if(isset($_SESSION['username'])){
            return $_SESSION['username'];
        }
        else{
            return null;
        }
    }

if(isset($_POST['title'])){
  //needs code for user ID
    $DB = new DatabaseAdaptor;
    $DB->createListing($_POST['category'], $_POST['title'], $_POST['desc'], $_POST['location'], $_POST['price']);
    $postId = $DB->getPostCount();
        $target_file = "./images/posts/" . basename($_FILES["image"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
            $check = getimagesize($_FILES["image"]["tmp_name"]);
            if($check !== false) {
                //echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }
        }
        // Check if file already exists
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
        // Check file size
        if ($_FILES["image"]["size"] > 3000000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
        // Allow certain file formats
        if($imageFileType != "jpg") {
            echo "Sorry, only JPG files are allowed.";
            $uploadOk = 0;
        }
        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                //echo "The file ". basename( $_FILES["image". $i]["name"]). " has been uploaded.";
                rename($target_file, './images/posts/' . $postId . "." . $imageFileType );
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
}

if(isset($_POST['action'])){
    if($_POST['action'] == 'login'){
        login($_POST['username'], $_POST['password']);
    }
    if($_POST['action'] == 'register'){
        register($_POST['username'], $_POST['password'], $_POST['email']);
    }
}

if(isset($_GET['request'])){
  if ($_GET['request'] == 'getCategories'){
    $DB = new DatabaseAdaptor;
    echo json_encode($DB->getAllCategories());
  }
  if ($_GET['request'] == 'loginInfo'){
    echo getLoginStatus();
  }
  if($_GET['request'] == 'logout'){
        logout();
  }
}

if(isset($_GET['search'])){ 
  $DB = new DatabaseAdaptor;
  echo json_encode($DB->findSearch($_GET['search'], $_GET['catagory']));
}
?>
