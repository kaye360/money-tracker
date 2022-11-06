<?php

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
    
    // Verify Password, echo results
    return password_verify($loginPostData['password'], $user->password)
      ? [$user->username, $user->user_id]
      : ['error' => 'User and password don\'t match'];
  } 
  




  public function logOut() {
    // Place holder until I figure out how to use php sessions with react. It shouldn't be that hard...
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
  




}