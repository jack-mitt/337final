<?php
class DatabaseAdaptor {
    private $DB;    
    public function __construct() {
        $db = 'mysql:dbname=azcraig; host=127.0.0.1; charset=utf8';
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
        $stmt = $this->DB->prepare("")
    }
    
    public function getAllPosts(){
        
    }
    
    public function getPostsByCategory(){
        
    }
    


} // End class DatabaseAdaptor

?>

