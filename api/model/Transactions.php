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

    // Execute
    return $this->stmt->execute() ? $post_data : ['error' => 'Failed to execute'];
  }

  public function edit() {
    // Post
  }

  public function delete($params) {

  }

  public function getMonth($params) {

  }

  public function getAll($params) {

  }
  
}