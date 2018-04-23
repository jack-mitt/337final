<?php
    include('DatabaseAdaptor.php');

    function getSideBar(){

    }

    function getFrontPage(){

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
