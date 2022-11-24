<?php

class Transactions {

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
  // Add a user transaction
  //
  // POST REQUEST
  // $post_data = { userId, name, amount, budget }
  //
  // Return newly added transactio (ASSOC ARRAY) or Error Array
  //
  public function add() {

    $post_data = json_decode( file_get_contents("php://input"), true );
    $post_data['name'] = trim($post_data['name']);
    $post_data['amount'] = trim($post_data['amount']);
    $post_data['amount'] = number_format($post_data['amount'], 2);

    $this->stmt = $this->dbh->prepare('
      INSERT INTO transactions (user_id, name, budget, amount) 
      VALUES (:user_id, :name, :budget, :amount) ');    
    $this->stmt->bindValue(':user_id', $post_data['userId']);
    $this->stmt->bindValue(':name', $post_data['name']);
    $this->stmt->bindValue(':budget', $post_data['budget']);
    $this->stmt->bindValue(':amount', $post_data['amount']);

    if( $this->stmt->execute() ) {

      $new_transaction_id = $this->dbh->lastInsertId();
      $this->stmt = $this->dbh->prepare('SELECT * FROM transactions where transaction_id = :transaction_id');
      $this->stmt->bindValue(':transaction_id', $new_transaction_id);
      $this->stmt->execute();
      return $this->stmt->fetch(PDO::FETCH_ASSOC);

    } else {
      return ['error' => 'Failed to execute'];
    }
  }

  //
  // Edit User Transaction
  //
  // POST REQUEST
  // $post_data = { name, budget, amount, date, transactionId }
  //
  // Update transaction with new values
  //
  // return Transaction or error Array
  //
  public function edit() {

    // Get post data
    $post_data = json_decode( file_get_contents('php://input'), true );

    // Prepare statmenet
    $this->stmt = $this->dbh->prepare('
      UPDATE transactions 
      SET name = :name,
          budget = :budget,
          amount = :amount,
          date = :date
      WHERE 
        transaction_id = :transaction_id');

    $this->stmt->bindValue(':name', $post_data['name']);
    $this->stmt->bindValue(':budget', $post_data['budget']);
    $this->stmt->bindValue(':amount', $post_data['amount']);
    $this->stmt->bindValue(':date', $post_data['date']);
    $this->stmt->bindValue(':transaction_id', $post_data['transactionId']);

    return $this->stmt->execute() 
      ? $this->getOne( $post_data['transactionId'] ) 
      : ['error' => 'Failed to execute'];
  }

  //
  // Delete user transaction
  //
  // GET REQUEST ****NEED TO CHANGE TO POST REQ****
  //
  // return deleted transaction id or error array
  //
  public function delete($transaction_id) {

    $transaction_id = rtrim($transaction_id);
    $transaction_id = filter_var($transaction_id);

    $this->stmt = $this->dbh->prepare('DELETE FROM transactions WHERE transaction_id = :transaction_id');
    $this->stmt->bindValue(':transaction_id', $transaction_id);

    return $this->stmt->execute() ? ['transaction_id' => $transaction_id] : ['error' => 'Failed to delete from database'];
  }

  //
  // Get users transactions in one specified month
  //
  // GET REQUEST
  // /api/Transactions/getMonth/userId
  //
  // return Budgets in 1 month (ASSOC ARRAY) or error array
  //
  public function getMonth($userId) {

    if( !isset($_GET['url']) ) throw new Exception('No Url Param');
    $url = rtrim($_GET['url'], " \n\r\t\v\x00/");
    $url = filter_var($url, FILTER_SANITIZE_URL);
    $url = explode('/', $url);

    $date = isset($url[3]) ? $url[3] : false;
    $date = explode('-', $date);

    $userId = rtrim($userId);
    $userId = filter_var($userId, FILTER_SANITIZE_URL);

    $sql = 'SELECT * FROM transactions WHERE user_id = :user_id AND YEAR(date) = :year AND MONTH(date) = :month ORDER BY date DESC';
    $this->stmt = $this->dbh->prepare($sql);
    $this->stmt->bindValue(':user_id', $userId);
    $this->stmt->bindValue(':year', $date[0]);
    $this->stmt->bindValue(':month', $date[1]);

    return $this->stmt->execute() ? $this->stmt->fetchAll(PDO::FETCH_ASSOC) : ['error' => 'Error getting transactions'];

  }

  //
  // Get all user transactions
  //
  // GET REQUEST
  // /api/transactions/getAll/userId
  //
  // return all user transactions or error array
  //
  public function getAll($userId) {

    $userId = rtrim($userId);
    $userId = filter_var($userId, FILTER_SANITIZE_URL);

    $sql = 'SELECT * FROM transactions WHERE user_id = :user_id ORDER BY date DESC';
    $this->stmt = $this->dbh->prepare($sql);
    $this->stmt->bindValue(':user_id', $userId);
    
    if( $this->stmt->execute() ) {
      $transactions = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
      return count($transactions) != 0 ? $transactions : ['error' => 'No transactions found'];
    } else {
      return ['error' => 'Error getting transactions'];
    }
  }

  //
  // Get one transaction
  //
  // GET REQUEST
  // /api/transactions/getOne/transaction_id
  //
  // return single transaction (ASSOC ARRAY) or error array
  //
  public function getOne($transaction_id) {

    $transaction_id = rtrim($transaction_id);
    $transaction_id = filter_var($transaction_id, FILTER_SANITIZE_URL);

    $this->stmt = $this->dbh->prepare('SELECT * FROM transactions WHERE transaction_id = :transaction_id');
    $this->stmt->bindValue(':transaction_id', $transaction_id);
    
    if( $this->stmt->execute() ) {
      $transaction = $this->stmt->fetch(PDO::FETCH_ASSOC);
      return !empty($transaction) ? $transaction : ['error' => 'No transactions found'];
    } else {
      return ['error' => 'Error getting transactions'];
    }
  }

  //
  // Get date range of all user transactions
  //
  // GET REQUEST
  // /api/transactions/getDateRange/userId
  //
  // Return range of dates (ASSOC ARRAY) or error array
  //
  public function getDateRange($user_id) {
    
    $user_id = rtrim($user_id);
    $user_id = filter_var($user_id, FILTER_SANITIZE_URL);
    
    $sql = 'SELECT MIN(date) AS min, MAX(date) AS max FROM transactions WHERE user_id = :user_id';
    $this->stmt = $this->dbh->prepare($sql);
    $this->stmt->bindValue(':user_id', $user_id);
    
    if( $this->stmt->execute() ) {
      $transaction = $this->stmt->fetch(PDO::FETCH_ASSOC);
      return !empty($transaction) ? $transaction : ['error' => 'No transactions found'];
    } else {
      return ['error' => 'Error getting transactions'];
    }
  }
}