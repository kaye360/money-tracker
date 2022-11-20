<?php

//
// Class Users
// Methods relating to user actions
//
// Methods:
//
// signUp
// logIn
// logOut
// getUserById
// getUserByUsername
// getUserIncome

class Users {

  //
  // DB variables
  //
  private $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
  private $dbh;
  private $stmt;

  //
  // Constructor
  //
  // Make DB connection
  //
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

  //
  // Sign up user
  // Add user to DB
  //
  // POST REQUEST
  // $post_data = [ username, password ]
  //
  // Return newly added user (ASSOC ARRAY) or Error Array
  //
  public function signUp() {

    $post_data = json_decode( file_get_contents("php://input"), true );
    $post_data['password'] = password_hash($post_data['password'], PASSWORD_DEFAULT);

    $this->stmt = $this->dbh->prepare('INSERT INTO users (username, password) VALUES (:username, :password)');

    return $this->stmt->execute($post_data) ? $post_data : ['error' => 'Error Executing DB Query'];
  } 
  
  //
  // Log in User
  // Check credentials and create login session Token
  //
  // POST REQUEST
  // $post_data = [ username, password ]
  // 
  // Return [username, userId] or error array
  // 
  public function logIn() {

    $post_data = json_decode( file_get_contents("php://input"), true );

    $this->stmt = $this->dbh->prepare('SELECT * FROM users WHERE username = :username');
    $this->stmt->execute(['username' => $post_data['username']]);
    $user = $this->stmt->fetch(PDO::FETCH_OBJ);

    if ( empty($user) ) {
      return ['error' => 'User Not Found'];
    }

    if (!password_verify($post_data['password'], $user->password)) {
      return ['error' => 'User and password don\'t match'];
    }

    $sql = 'UPDATE users SET login_token = :loginToken WHERE username = :username';
    $this->stmt = $this->dbh->prepare($sql);
    $this->stmt->bindValue(':loginToken', $post_data['token']);
    $this->stmt->bindValue(':username', $post_data['username']);
    $this->stmt->execute();
    
    return [$user->username, $user->user_id];
  } 
  
  //
  // Log out a user
  // Clear login session token
  //
  // POST REQUEST
  // $post_data = [ username ]
  //  
  // Return [ username ] or Error Array
  // 
  public function logOut() {

    $post_data = json_decode( file_get_contents("php://input"), true );
    if (empty($post_data['username'])) return ['error' => 'No username specified'];

    $sql = "UPDATE users SET login_token = '' WHERE username = :username";
    $this->stmt = $this->dbh->prepare($sql);
    $this->stmt->bindValue(':username', $post_data['username']);

    return $this->stmt->execute()
      ? ['username' => $post_data['username']]
      : ['error' => 'Error logging out'];
  } 

  // 
  // Get Users Login token
  // 
  // POST REQUEST
  // $post_data = [ userId ]
  //
  // Return [ login_token ]
  //
  public function getLoginToken() {

    $post_data = json_decode( file_get_contents("php://input"), true );
    if (empty($post_data['userId'])) return ['error' => 'No user id specified'];

    $this->stmt = $this->dbh->prepare('SELECT login_token from users WHERE user_id = :user_id');
    $this->stmt->bindValue(':user_id', $post_data['userId']);
    $this->stmt->execute();

    return $this->stmt->fetch(PDO::FETCH_ASSOC);
  }

  //
  // Get User data by User ID
  //
  // GET REQUEST
  // /api/Users/getUserById/userId
  //
  // Return user data (ASSOC ARRAY) or Error array
  //
  public function getUserById($id) {

    $id = rtrim($id);
    $id = filter_var($id, FILTER_SANITIZE_URL);

    $sql = 'SELECT user_id, username, budgets, email FROM users where user_id = :id';
    $this->stmt = $this->dbh->prepare($sql);
    $this->stmt->execute(['id' => $id]);

    $user = $this->stmt->fetch(PDO::FETCH_ASSOC);
    return !empty($user) ? $user : ['error' => 'User not found'];
  } 

  //
  // Get User data by Username
  //
  // GET REQUEST
  // /api/Users/getUserByUsername/username
  //
  // return user data (ASSOC ARRAY) or error array
  //
  public function getUserByUsername($username) {

    $username = rtrim($username);
    $username = filter_var($username, FILTER_SANITIZE_URL);

    $this->stmt = $this->dbh->prepare('SELECT user_id, username, budgets, email FROM users where username= :username');
    $this->stmt->execute(['username' => $username]);
    $user = $this->stmt->fetch(PDO::FETCH_ASSOC);

    return !empty($user) ? $user : ['error' => 'User not found'];
  } 
  
  // 
  // Get User Income
  // 
  // GET REQUEST
  // /api/Users/getUserIncome/id
  // 
  // return user income or (ASSOC ARRAY) or error array
  // 
  public function getUserIncome($id) {

    $id = rtrim($id);
    $id = filter_var($id, FILTER_SANITIZE_URL); 
    $error = ['error' => 'No Income found'];

    $this->stmt = $this->dbh->prepare('SELECT income FROM users WHERE user_id = :user_id');
    $this->stmt->bindValue(':user_id', $id);

    if( $this->stmt->execute() ) {
      $income = $this->stmt->fetch(PDO::FETCH_ASSOC);
      return !empty($income) ? $income : $error; 
    } else {
      return $error;
    }

  }

  // 
  // Set User Income
  // 
  // POST REQUEST
  // $post_data = [ userId, amount ]
  // 
  // return new amount (ASSOC ARRAY) or error array
  // 
  public function setUserIncome() {

    $post_data = json_decode( file_get_contents("php://input"), true );

    $this->stmt = $this->dbh->prepare('UPDATE users SET income = :income WHERE user_id = :user_id');
    $this->stmt->bindValue(':income', $post_data['amount']);
    $this->stmt->bindValue(':user_id', $post_data['userId']);

    return $this->stmt->execute()
     ? ['income' => $post_data['amount'] ]
     : ['error' => 'Error executing fetch'];
  }

}