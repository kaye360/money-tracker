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
    $post_data = json_decode( file_get_contents("php://input") );

    $users = new Users;
    $user = $users->getUserById($post_data->userId);

    
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