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

    function getUserInfo(){
        if(isset($_SESSION['username']) && isset($_SESSION['user_id'])){
            $DB = new DatabaseAdaptor();
            $userInfoStr = '<h3 class="frontpageheader">' . $_SESSION['username'] . "</h3>" ;
            $userPosts = $DB->getPostsByUser($_SESSION['user_id']);
            foreach($userPosts as $post){
                $userInfoStr .= '<div class="post">' . $post['name'] . '<br>' . $post['location'] . '<br>$' . $post['price'] . '</div>';
            }
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



$categories = array(
  "Jobs"=>0,
  "Services"=>1,
  "Cars"=>2,
  "School Supplies"=>3,
  "Pets"=>4,
  "Electronics"=>5
);

if(isset($_POST['title'])){
  //needs code for user ID
    $DB = new DatabaseAdaptor;
    $DB->createListing($categories[$_POST['category']], $_POST['title'], $_POST['desc'], $_POST['location'], $_POST['price']);
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
  //echo $_GET['search'];
  $DB = new DatabaseAdaptor;
  echo json_encode($DB->findSearch($_GET['search'], $_GET['catagory']));
}
?>
