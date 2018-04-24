<?php
class DatabaseAdaptor {
    private $DB;
    public function __construct() {
        $db = 'mysql:dbname=az_craig; host=127.0.0.1; charset=utf8';
        $user = 'root';
        $password = ''; // an empty string
        try {
          $this->DB = new PDO ( $db, $user, $password );
          $this->DB->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        } catch ( PDOException $e ) {
          echo ('Error establishing Connection');
          exit ();
        }
    }

    public function getAllCategories() {
        $stmt = $this->DB->prepare("SELECT * FROM categories");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAllPosts(){
        $stmt = $this->DB->prepare("SELECT * FROM posts");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPostsByCategory($categoryId){
        $stmt = $this->DB->prepare("SELECT posts.name, posts.price FROM posts JOIN categories WHERE category_id='" .$categoryId ."'");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createListing($categoryID, $title, $desc, $location, $price){
      //needs code for user ID
      $stmt = $this->DB->prepare("INSERT INTO posts (name, description, location, price, category_id)
       VALUES (" . $title . ", " . $desc . ", " . $location . ", " . $price . ", " . $categoryID . ")");
      $stmt->execute(); 
      header('Location: index.php');
    }


} // End class DatabaseAdaptor

?>
