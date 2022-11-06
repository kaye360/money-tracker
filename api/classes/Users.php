<?php

class Users {

  private $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
  private $dbh;
  private $stmt;




  
  public function __construct() {

    $options = array(
      PDO::ATTR_PERSISTENT => true,
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    );

    try {
      $this->dbh = new PDO($this->dsn, DB_USER, DB_PASS, $options);
    } catch(PDOException $err ) {
      echo $err->getMessage();
    }
  }
  
  



  public function signUp() {
    // Get POST data and hash password
    $newUser = json_decode( file_get_contents("php://input"), true );
    $newUser['password'] = password_hash($newUser['password'], PASSWORD_DEFAULT);

    // Add to DB
    $this->stmt = $this->dbh->prepare('INSERT INTO users (username, password) VALUES (:username, :password)');
    if( $this->stmt->execute($newUser) ) {
      echo json_encode($newUser, JSON_PRETTY_PRINT);
    } else {
      echo json_encode(['error' => 'Error Executing DB Query'], JSON_PRETTY_PRINT);
    }
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
      echo json_encode(['error' => 'User Not Found'], JSON_PRETTY_PRINT);
      return;
    }
    
    // Verify Password, echo results
    if( password_verify($loginPostData['password'], $user->password) ) {
      echo json_encode([$user->username, $user->user_id], JSON_PRETTY_PRINT);
    } else {
      echo json_encode(['error' => 'User and password don\'t match'], JSON_PRETTY_PRINT);
    }

  } 
  




  public function logOut() {
    // Place holder until I figure out how to use php sessions with react. It shouldn't be that hard...
  } 





  public function getUserById($id) {
    $this->stmt = $this->dbh->prepare('SELECT user_id, username, budgets, email FROM users where user_id = :id');
    $this->stmt->execute(['id' => $id]);

    $user = $this->stmt->fetch(PDO::FETCH_OBJ);

    if( empty($user)) {
      echo json_encode(['error' => 'User not found'], JSON_PRETTY_PRINT);
    } else {
      echo json_encode( $user, JSON_PRETTY_PRINT);
    }
  } 





  public function getUserByUsername($username) {
    $this->stmt = $this->dbh->prepare('SELECT user_id, username, budgets, email FROM users where username= :username');
    $this->stmt->execute(['username' => $username]);

    $user = $this->stmt->fetch(PDO::FETCH_OBJ);

    if( empty($user)) {
      echo json_encode(['error' => 'User not found'], JSON_PRETTY_PRINT);
    } else {
      echo json_encode( $user, JSON_PRETTY_PRINT);
    }
  } 
  




}