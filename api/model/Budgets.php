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
    $current_budgets = $current_budgets == null ? [] : $current_budgets;
    $new_budgets = $current_budgets + [ ucwords($post_data->name) => $post_data->amount ];

    // If budget already exists in JSON, return an error
    if( array_key_exists( $post_data->name, $current_budgets) ) {
      return ['error' => 'You already have this budget'];
    }
    
    // Prepare Statment
    $this->stmt = $this->dbh->prepare('UPDATE users SET budgets = :budgets WHERE user_id = :user_id');
    $this->stmt->bindValue(':user_id', $user['user_id']);
    $this->stmt->bindValue(':budgets', json_encode($new_budgets) );

    // Execute
    return $this->stmt->execute() ? $new_budgets : ['error' => 'Failed to execute'];
  }

  



  public function get($userId) {

    // Format Inputs
    $userId = rtrim($userId);
    $userId = filter_var($userId, FILTER_SANITIZE_URL);

    // Get User's budgets
    $users = new Users;
    $user = $users->getUserById($userId);
    $budgets = json_decode( $user['budgets'] );

    return $budgets == null ? ['error' => 'You don\'t have any budgets yet'] : $budgets;
  }





  public function edit() {
    
    // Get/Format Post data
    $post_data = json_decode( file_get_contents("php://input"), true );
    
    [
      'userId' => $userId, 
      'oldName' => $oldName,
      'newName' => $newName, 
      'newAmount' => $newAmount
    ] = $post_data;
      
    $newName = rtrim($newName);
    $newName = ucwords($newName);
    $newAmount = ucwords($newAmount);
    
    // Get User's budgets
    $users = new Users;
    $user = $users->getUserById($userId);
    $budgets = json_decode( $user['budgets'], true );

    // Replace single budget with new values
    unset($budgets[$oldName]);
    $budgets[$newName] = $newAmount;

    // Prepare PDO
    $this->stmt = $this->dbh->prepare('UPDATE users SET budgets = :budgets WHERE user_id = :user_id');
    $this->stmt->bindValue(':budgets', json_encode($budgets) );
    $this->stmt->bindValue(':user_id', $userId);

    // Execute
    return $this->stmt->execute() ? $budgets : ['error' => 'Error updating DB'];
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
    
    // Check if budget to delete is in budgets
    if( !array_key_exists($budgetToDelete, $budgets) ) return ['error' => 'Cannot delete. Budget does not exist'];
    
    // Find budget to delete and remove
    unset($budgets[$budgetToDelete]);

    // Prepare Statment
    $this->stmt = $this->dbh->prepare('UPDATE users SET budgets = :budgets WHERE user_id = :user_id');
    $this->stmt->bindValue(':user_id', $user['user_id']);
    $this->stmt->bindValue(':budgets', json_encode($budgets) );

    // Execute
    return $this->stmt->execute() ? $budgets : ['error' => 'Failed to execute'];
  }
  
  
}