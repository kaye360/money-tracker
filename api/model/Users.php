<?php


// Class Users
// Methods relating to user actions

// Methods:

// signUp
// logIn
// logOut
// getUserById
// getUserByUsername
// getUserIncome

class Users {

  private $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
  private $dbh;
  private $stmt;




  
  public function __construct() {

    // Set Connection Options
    $options = array(
      PDO::ATTR_PERSISTENT => true,
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    );

    // Connect to DB
    try {
      $this->dbh = new PDO($this->dsn, DB_USER, DB_PASS, $options);
    } catch(PDOException $err ) {
      return $err->getMessage();
    }
  }
  
  



  public function signUp() {

    // Get POST data and hash password
    $newUser = json_decode( file_get_contents("php://input"), true );
    $newUser['password'] = password_hash($newUser['password'], PASSWORD_DEFAULT);

    // Add to DB
    $this->stmt = $this->dbh->prepare('INSERT INTO users (username, password) VALUES (:username, :password)');

    return $this->stmt->execute($newUser) ? $newUser : ['error' => 'Error Executing DB Query'];
  } 
  




  public function logIn() {

    // Get Post data
    $loginPostData = json_decode( file_get_contents("php://input"), true );

    // Query DB
    $this->stmt = $this->dbh->prepare('SELECT * FROM users WHERE username = :username');
    $this->stmt->execute(['username' => $loginPostData['username']]);
    $user = $this->stmt->fetch(PDO::FETCH_OBJ);

    // Check if User exists
    if ( empty($user) ) {
      return ['error' => 'User Not Found'];
    }

    // Verify Password
    if (!password_verify($loginPostData['password'], $user->password)) {
      return ['error' => 'User and password don\'t match'];
    }

    // Set Token
    $sql = 'UPDATE users SET login_token = :loginToken WHERE username = :username';
    $this->stmt = $this->dbh->prepare($sql);
    $this->stmt->bindValue(':loginToken', $loginPostData['token']);
    $this->stmt->bindValue(':username', $loginPostData['username']);
    $this->stmt->execute();
    
    // Return Username and ID
    return [$user->username, $user->user_id];
  } 
  




  public function logOut() {

    // Get/Check post data
    $post_data = json_decode( file_get_contents("php://input"), true );
    if (empty($post_data['username'])) return ['error' => 'No username specified'];

    // Prep statement
    $this->stmt = $this->dbh->prepare("UPDATE users SET login_token = '' WHERE username = :username");
    $this->stmt->bindValue(':username', $post_data['username']);

    return $this->stmt->execute()
      ? ['username' => $post_data['username']]
      : ['error' => 'Error logging out'];
  } 





  public function getUserById($id) {

    // Format Data
    $id = rtrim($id);
    $id = filter_var($id, FILTER_SANITIZE_URL);

    // Prepare stmt
    $this->stmt = $this->dbh->prepare('SELECT user_id, username, budgets, email FROM users where user_id = :id');
    $this->stmt->execute(['id' => $id]);

    $user = $this->stmt->fetch(PDO::FETCH_ASSOC);

    // Return user data or error
    return !empty($user) ? $user : ['error' => 'User not found'];
  } 





  public function getUserByUsername($username) {

    // Format Data
    $username = rtrim($username);
    $username = filter_var($username, FILTER_SANITIZE_URL);

    // Prepare stmt, execute
    $this->stmt = $this->dbh->prepare('SELECT user_id, username, budgets, email FROM users where username= :username');
    $this->stmt->execute(['username' => $username]);
    $user = $this->stmt->fetch(PDO::FETCH_OBJ);

    // Return user or error
    return !empty($user) ? $user : ['error' => 'User not found'];
  } 
  




  public function getUserIncome($id) {

    // Format data
    $id = rtrim($id);
    $id = filter_var($id, FILTER_SANITIZE_URL); 
    $error = ['error' => 'No Income found'];

    // Prepare stmt
    $this->stmt = $this->dbh->prepare('SELECT income FROM users WHERE user_id = :user_id');
    $this->stmt->bindValue(':user_id', $id);

    // Execute and return
    if( $this->stmt->execute() ) {
      $income = $this->stmt->fetch(PDO::FETCH_ASSOC);
      return !empty($income) ? $income : $error; 
    } else {
      return $error;
    }

  }





  public function setUserIncome() {

    // Get Post data
    // $post_data[userId, amount]
    $post_data = json_decode( file_get_contents("php://input"), true );

    $this->stmt = $this->dbh->prepare('UPDATE users SET income = :income WHERE user_id = :user_id');
    $this->stmt->bindValue(':income', $post_data['amount']);
    $this->stmt->bindValue(':user_id', $post_data['userId']);

    // Execute and return stmt
    return $this->stmt->execute()
     ? ['income' => $post_data['amount'] ]
     : ['error' => 'Error executing fetch'];
  }

}