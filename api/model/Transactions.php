<?php

class Transactions {

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
    $post_data = json_decode( file_get_contents("php://input"), true );
    $post_data['name'] = rtrim($post_data['name']);
    $post_data['amount'] = rtrim($post_data['amount']);
    $post_data['amount'] = number_format($post_data['amount'], 2);

    // Prepare Statement
    $this->stmt = $this->dbh->prepare('
      INSERT INTO transactions (user_id, name, budget, amount) 
      VALUES (:user_id, :name, :budget, :amount) ');    
    $this->stmt->bindValue(':user_id', $post_data['userId']);
    $this->stmt->bindValue(':name', $post_data['name']);
    $this->stmt->bindValue(':budget', $post_data['budget']);
    $this->stmt->bindValue(':amount', $post_data['amount']);

    // Execute and return newly added DB Row
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





  public function edit() {
    // Post
  }





  public function delete($transaction_id) {

    // Format Inputs
    $transaction_id = rtrim($transaction_id);
    $transaction_id = filter_var($transaction_id);

    // Prepare Statement
    $this->stmt = $this->dbh->prepare('DELETE FROM transactions WHERE transaction_id = :transaction_id');
    $this->stmt->bindValue(':transaction_id', $transaction_id);

    // Execute and return
    return $this->stmt->execute() ? ['transaction_id' => $transaction_id] : ['error' => 'Failed to delete from database'];
  }





  public function getMonth($userId, $date) {

  }





  public function getAll($userId) {

    // Format Inputs
    $userId = rtrim($userId);
    $userId = filter_var($userId, FILTER_SANITIZE_URL);

    // Prepare stmt
    $sql = 'SELECT * FROM transactions WHERE user_id = :user_id ORDER BY date DESC';
    $this->stmt = $this->dbh->prepare($sql);
    $this->stmt->bindValue(':user_id', $userId);
    
    // Get transactions
    if( $this->stmt->execute() ) {
      $transactions = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
      return count($transactions) != 0 ? $transactions : ['error' => 'No transactions found'];
    } else {
      return ['error' => 'Error getting transactions'];
    }
  }
  
}