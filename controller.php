<?php
    include('DatabaseAdaptor.php');

    function getSideBar(){

    }

    function getFrontPage(){
        $frontPageStr = '';
        $DB = new DatabaseAdaptor;
        $allCategories = $DB->getAllCategories();
        $categoryCount = count($allCategories);
        $featuredCategories = array();
        while(count($featuredCategories)<4){
            $randIndex = rand(0 , $categoryCount -1);
            if(!in_array($allCategories[$randIndex], $featuredCategories)){
                array_push($featuredCategories, $allCategories[$randIndex]);
            }
        }
        foreach($allCategories as $category){
            $categoryName = str_replace("_", " ", $category['name']);
            $frontPageStr .= "<div class='featuredcategory' id='" . $category['name'] . "'>";
            $frontPageStr .= "<h3 class='featuredheader'>" . $categoryName . "</h3>";
            for($i = 0; $i < 3; $i++){
                $
            }
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
$DB = new DatabaseAdaptor;
if(isset($_POST['title'])){
  //needs code for user ID
  $DB->createListing($categories[$_POST['category']], $_POST['title'], $_POST['desc'], $_POST['location'], $_POST['price']);
}
?>
