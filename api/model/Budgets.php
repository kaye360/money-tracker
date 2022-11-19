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

  


  public function getMonthlySpendingTotals($userId) {

    // Format Inputs
    $userId = rtrim($userId);
    $userId = filter_var($userId, FILTER_SANITIZE_URL);

    // Check/Filter/Get URL
    if( !isset($_GET['url']) ) throw new Exception('No Url Param');
    $url = rtrim($_GET['url'], " \n\r\t\v\x00/");
    $url = filter_var($url, FILTER_SANITIZE_URL);
    $url = explode('/', $url);

    $month = isset($url[3]) ? $url[3] : false;
    $month = explode('-', $month);

    // Get list of user budgets
    $budget_totals = [];
    $budgets = $this->get($userId);

    // For each budget, get the total amount spent in $month
    foreach( $budgets as $name => $value ) {

      // Prepare Statment
      $sql ='SELECT SUM(amount) as total FROM transactions WHERE budget = :budget AND YEAR(date) = :year AND MONTH(date) = :month';
      $this->stmt = $this->dbh->prepare($sql);
      $this->stmt->bindValue(':budget', $name);
      $this->stmt->bindValue(':year', $month[0]);
      $this->stmt->bindValue(':month', $month[1]);

      //Execute
      $this->stmt->execute();

      // Transactions in $budget in $month
      $transactions = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

      $total = !empty($transactions[0]['total']) ? $transactions[0]['total'] : 0;
      $budget_totals[$name] = $total;
    }

    // Return an ASSOC array of budget => amount spent
    return $budget_totals;
  }



  public function get($userId) {

    // Format Inputs
    $userId = rtrim($userId);
    $userId = filter_var($userId, FILTER_SANITIZE_URL);

    // Get User's budgets
    $users = new Users;
    $user = $users->getUserById($userId);
    if ( isset($user['error']) ) return ['error' => $user['error']];
    $budgets = isset($user['budgets']) ? json_decode( $user['budgets'] ) : null;

    // Return budgets or error
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

    $post_data = json_decode( file_get_contents("php://input"), true );

    // Check/set post inputs
    if( (!isset($post_data['userId'])) || (!isset($post_data['budgetName'])) ) {
      return ['error' => 'Delete requires 2 post inputs (UserId, BudgetName)'];
    }

    $userId = $post_data['userId'];
    $budgetToDelete = $post_data['budgetName'] ;

    // Get User Budgets
    $users = new Users;
    $user = $users->getUserById($userId);
    $budgets = json_decode($user['budgets'], true);
    
    // Check if budget to delete is in budgets and remove
    if( !array_key_exists($budgetToDelete, $budgets) ) {
      return ['error' => 'Cannot delete. Budget does not exist'];
    }
    unset($budgets[$budgetToDelete]);

    // Prepare Statment
    $this->stmt = $this->dbh->prepare('UPDATE users SET budgets = :budgets WHERE user_id = :user_id');
    $this->stmt->bindValue(':user_id', $user['user_id']);
    $this->stmt->bindValue(':budgets', json_encode($budgets) );

    // Execute
    return $this->stmt->execute() ? $budgets : ['error' => 'Failed to execute'];
  }
  
  
}