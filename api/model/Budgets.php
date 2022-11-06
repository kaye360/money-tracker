<?php

class Budgets {

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
  
  



  public function add() {

    // Format Data
    $post_data = json_decode( file_get_contents("php://input") );

    $users = new Users;
    $user = $users->getUserById($post_data->userId);

    $current_budgets = json_decode($user['budgets'], true);
    $new_budgets = $current_budgets + [ $post_data->name => $post_data->amount ];

    // If budget already exists in JSON, return an error
    if( array_key_exists( $post_data->name, $current_budgets) ) {
      return ['error' => 'You already have this budget'];
    }
    
    // Prepare Statment
    $this->stmt = $this->dbh->prepare('UPDATE users SET budgets = :budgets WHERE user_id = :user_id');
    $this->stmt->bindValue(':user_id', $user['user_id']);
    $this->stmt->bindValue(':budgets', json_encode($new_budgets) );

    // Execute!
    if( $this->stmt->execute() ) {
      return $new_budgets;
    } else {
      return ['error' => 'Failed to execute'];
    }
  }

  



  public function get($userId) {

    // Format Inputs
    $userId = rtrim($userId);
    $userId = filter_var($userId, FILTER_SANITIZE_URL);
    $users = new Users;
    $user = $users->getUserById($userId);
    $budgets = json_decode( $user['budgets'] );

    if($budgets == null) {
      return ['error' => 'You don\'t have any budgets yet'];
    } else {
      return $budgets;
    }
  }





  public function edit() {
    // POST
  }





  public function delete($params) {

    // Format params
    $params = rtrim($params);
    $params = filter_var($params, FILTER_SANITIZE_URL);
    $params = explode(':', $params);

    // Check if both params are set
    if( (!isset($params[0])) || (!isset($params[1])) ) return ['error' => 'Delete requires 2 params (UserId, BudgetName)'];

    $userId = $params[0];
    $budgetToDelete = $params[1] ;

    // Get User Budgets
    $users = new Users;
    $user = $users->getUserById($userId);
    $budgets = json_decode($user['budgets'], true);
    
    // Check if budget to delete is in
    if( !array_key_exists($budgetToDelete, $budgets) ) return ['error' => 'Cannot delete. Budget does not exist'];
    
    // Find budget to delete and remove
    unset($budgets[$budgetToDelete]);

    // Prepare Statment
    $this->stmt = $this->dbh->prepare('UPDATE users SET budgets = :budgets WHERE user_id = :user_id');
    $this->stmt->bindValue(':user_id', $user['user_id']);
    $this->stmt->bindValue(':budgets', json_encode($budgets) );

    // Execute
    if( $this->stmt->execute() ) {
      return $budgets;
    } else {
      return ['error' => 'Failed to execute'];
    }
  }
  
  
}