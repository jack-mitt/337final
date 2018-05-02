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
    
    public function getPostCount(){
        $stmt = $this->DB->prepare("SELECT * FROM posts");
        $stmt->execute();
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return count($posts);
    }
    
    public function getChildrenOf($categoryId){
        $categoryId = htmlspecialchars($categoryId);
        $stmt = $this->DB->prepare("SELECT * FROM categories where parent_id= :categoryId");
        $stmt->bindParam(':categoryId', $categoryId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAllPosts(){
        $stmt = $this->DB->prepare("SELECT * FROM posts");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPostsByCategory($categoryId){
        $categoryId = htmlspecialchars($categoryId);
        $stmt = $this->DB->prepare("SELECT posts.id, posts.location, posts.postname, posts.price, categories.name FROM posts JOIN categories WHERE posts.category_id=:categoryId");
        $stmt->bindParam(':categoryId', $categoryId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getPostsByCategoryName($categoryName){
        $categoryName = htmlspecialchars($categoryId);
        $stmt = $this->DB->prepare("SELECT posts.id, posts.postname, posts.location, posts.price, categories.name FROM posts JOIN categories WHERE posts.category_id=categories.id AND categories.name=:categoryName");
        $stmt->execute();
        $stmt->bindParam(':categoryName', $categoryName);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);        
    }

    public function getPostsByUser($userId){
        $userId = htmlspecialchars($userId);
        $stmt = $this->DB->prepare("SELECT posts.id, posts.postname, posts.price, posts.location, users.username FROM posts JOIN users WHERE posts.user_id=:userId");
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createListing($categoryID, $title, $desc, $location, $price){
        $categoryId = htmlspecialchars($categoryId);
        $title = htmlspecialchars($title);
        $desc = htmlspecialchars($desc);
        $location = htmlspecialchars($location);
        $price = htmlspecialchars($price);
      //needs code for user ID  
      if(isset($_SESSION['user_id'])){
        $stmt = $this->DB->prepare("INSERT INTO posts (postname, description, location, price, category_id, user_id)
       VALUES (:title, :desc, :location, :price, :categoryID , :userId)");  
          $stmt->bindParam(':title', $title);
          $stmt->bindParam(':desc', $desc);
          $stmt->bindParam(':location', $location);
          $stmt->bindParam(':price', $price);
          $stmt->bindParam(':categoryID', $categoryID);
          $stmt->bindParam(':userId', $_SESSION['user_id']);
      }
      else{
      $stmt = $this->DB->prepare("INSERT INTO posts (name, description, location, price, category_id)
       VALUES (:title, :desc, :location, :price, :categoryID)");
          $stmt->bindParam(':title', $title);
          $stmt->bindParam(':desc', $desc);
          $stmt->bindParam(':location', $location);
          $stmt->bindParam(':price', $price);
          $stmt->bindParam(':categoryID', $categoryID);
      }
      $stmt->execute();

      //header('Location: index.php');
        return;
    }

    public function findSearch($search, $catagory_id){
        $search = htmlspecialchars($search);
        $catagory_id =htmlspecialchars($catagory_id);
        
      //echo 'here';
      if($catagory_id > 0){
        $stmt = $this->DB->prepare("SELECT * FROM posts WHERE postname LIKE '%:search%' AND  category_id=:catagory_id");
          $stmt->bindParam(':search', $search);
          $stmt->bindParam(':catagory_id', $catagory_id);
      } else{
        $stmt = $this->DB->prepare("SELECT * FROM posts WHERE postname LIKE '%:search%'");
          $stmt->bindParam(':search', $search);
      }
      //AND posts.category_id = " . $category_id);
      $stmt->execute();
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function registerUser($username, $password, $email){
        $username = htmlspecialchars($username);
        $password = htmlspecialchars($password);
        $email = htmlspecialchars($email);
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $this->DB->prepare("INSERT INTO users (username, hash, email) values (:username, :hash, :email)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':hash', $hash);
        $stmt->bindParam(':email', $email);
        return $stmt->execute();
    }

    public function loginUser($username, $password){
        $username = htmlspecialchars($username);
        $password = htmlspecialchars($password);

        $stmt = $this->DB->prepare("SELECT * FROM users;");
        if($stmt->execute()){
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach($users as $user){
                if($user['username'] == $username){
                    if(password_verify($password, $user['hash'])){
                        $_SESSION['username'] = $username;
                        $_SESSION['user_id'] = $user['id'];
                        return 1;
                    }
                }
            }
            return 0;
        }
        else{
            echo "error getting info from users table";
            return 0;
        }
    }
} // End class DatabaseAdaptor

?>
