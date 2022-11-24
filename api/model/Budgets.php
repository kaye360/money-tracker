<?php

class Budgets {

  //
  // DB connection vars
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

  //
  // Add a Budget for a User
  //
  // POST REQUEST
  // 
  // Budget Data:
  // $post_data = obj { userId, name, amount } 
  //
  // Returns new Budget array with new budget appended
  //
  public function add() {

    $post_data = json_decode( file_get_contents("php://input") );

    $users = new Users;
    $user = $users->getUserById($post_data->userId);

    $current_budgets = json_decode($user['budgets'], true);
    $current_budgets = $current_budgets == null ? [] : $current_budgets;
    $new_budgets = $current_budgets + [ ucwords($post_data->name) => $post_data->amount ];

    if( array_key_exists( $post_data->name, $current_budgets) ) {
      return ['error' => 'You already have this budget'];
    }
    
    $this->stmt = $this->dbh->prepare('UPDATE users SET budgets = :budgets WHERE user_id = :user_id');
    $this->stmt->bindValue(':user_id', $user['user_id']);
    $this->stmt->bindValue(':budgets', json_encode($new_budgets) );

    return $this->stmt->execute() ? $new_budgets : ['error' => 'Failed to execute'];
  }

  //
  // Get Monthly Spending Totals for a user in a given month
  //
  // GET REQUEST /api/Budgets/getMonthlySpendingTotals/userId/YYYY-MM
  //
  // Parse URL to extract YYYY-MM
  // Get budgets for User and get total spent per month for each budget
  //
  // Return an ASSOC array of budget => amount spent
  //
  public function getMonthlySpendingTotals($userId) {

    $userId = rtrim($userId);
    $userId = filter_var($userId, FILTER_SANITIZE_URL);

    if( !isset($_GET['url']) ) throw new Exception('No Url Param');
    $url = rtrim($_GET['url'], " \n\r\t\v\x00/");
    $url = filter_var($url, FILTER_SANITIZE_URL);
    $url = explode('/', $url);

    $month = isset($url[3]) ? $url[3] : false;
    $month = explode('-', $month);

    $budget_totals = [];
    $budgets = $this->get($userId);

    foreach( $budgets as $name => $value ) {

      $sql ='SELECT SUM(amount) as total FROM transactions WHERE budget = :budget AND YEAR(date) = :year AND MONTH(date) = :month';
      $this->stmt = $this->dbh->prepare($sql);
      $this->stmt->bindValue(':budget', $name);
      $this->stmt->bindValue(':year', $month[0]);
      $this->stmt->bindValue(':month', $month[1]);

      $this->stmt->execute();

      $transactions = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

      $total = !empty($transactions[0]['total']) ? $transactions[0]['total'] : 0;
      $budget_totals[$name] = $total;
    }

    return $budget_totals;
  }

  //
  // Get User Budgets
  // 
  // GET REQUEST /api/Budgets/get/userId
  //
  // Returns budgets Object or Error Array
  // 
  public function get($userId) {

    $userId = rtrim($userId);
    $userId = filter_var($userId, FILTER_SANITIZE_URL);

    $users = new Users;
    $user = $users->getUserById($userId);
    if ( isset($user['error']) ) return ['error' => $user['error']];
    $budgets = isset($user['budgets']) ? json_decode( $user['budgets'] ) : null;

    return $budgets == null ? ['error' => 'You don\'t have any budgets yet'] : $budgets;
  }

  //
  // Edit User Budgets
  //
  // POST REQUEST
  // $post_data = { userId, oldName, newName, newAmount }
  //
  // get existing budget list, replace budget[oldName] with budget[newName] => budget[newAmount]
  //
  // Return new Budget List or Error array
  //
  public function edit() {
    
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
    
    $users = new Users;
    $user = $users->getUserById($userId);
    $budgets = json_decode( $user['budgets'], true );

    unset($budgets[$oldName]);
    $budgets[$newName] = $newAmount;

    $this->stmt = $this->dbh->prepare('UPDATE users SET budgets = :budgets WHERE user_id = :user_id');
    $this->stmt->bindValue(':budgets', json_encode($budgets) );
    $this->stmt->bindValue(':user_id', $userId);

    return $this->stmt->execute() ? $budgets : ['error' => 'Error updating DB'];
  }

  // 
  // Delete a Users Budget
  //
  // POST REQUEST
  // $post_data = { userId, budgetName }
  //
  // Get users budgets, remove $post_data['budgetName']
  //
  // Return new budget list or Error Array
  //
  public function delete() {

    $post_data = json_decode( file_get_contents("php://input"), true );

    if( (!isset($post_data['userId'])) || (!isset($post_data['budgetName'])) ) {
      return ['error' => 'Delete requires 2 post inputs (UserId, BudgetName)'];
    }

    $userId = $post_data['userId'];
    $budgetToDelete = $post_data['budgetName'] ;

    $users = new Users;
    $user = $users->getUserById($userId);
    $budgets = json_decode($user['budgets'], true);
    
    if( !array_key_exists($budgetToDelete, $budgets) ) {
      return ['error' => 'Cannot delete. Budget does not exist'];
    }
    unset($budgets[$budgetToDelete]);

    $this->stmt = $this->dbh->prepare('UPDATE users SET budgets = :budgets WHERE user_id = :user_id');
    $this->stmt->bindValue(':user_id', $user['user_id']);
    $this->stmt->bindValue(':budgets', json_encode($budgets) );

    return $this->stmt->execute() ? $budgets : ['error' => 'Failed to execute'];
  }
  
  
}