<?php

class Forecast {

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
  // Add a Forecast Entry for a User
  //
  // POST REQUEST
  // 
  // Forecast Entry Data:
  // $post_data = obj [ userId, name, amount, type, repeat, date ]
  //
  // Returns new Forecast Entry info
  //
  public function add() {

    $valid_repeat = ['monthly', 'bimonthly', 'weekly', 'biweekly'];
    $valid_type = ['bill', 'paycheck'];
    $post_data = json_decode( file_get_contents('php://input'), true );
    
    if( !in_array($post_data['type'], $valid_type) ) {
      return ['error' => 'Type field is not valid.'];
    }

    if(!in_array($post_data['repeat'], $valid_repeat) ){
      return ['error' => 'Repeat field is not valid'];
    }
    
    $post_data['name'] = trim($post_data['name']);
    $post_data['amount'] = number_format( trim($post_data['amount']), 2 );

    $sql = 'INSERT INTO forecast (user_id, name, amount, type, repeat_amount, starting_date) VALUES (:user_id, :name, :amount, :type, :repeat_amount, :starting_date)'; 
    $this->stmt = $this->dbh->prepare($sql);
    $this->stmt->bindValue(':user_id', $post_data['userId']);
    $this->stmt->bindValue(':name', $post_data['name']);
    $this->stmt->bindValue(':amount', $post_data['amount']);
    $this->stmt->bindValue(':type', $post_data['type']);
    $this->stmt->bindValue(':repeat_amount', $post_data['repeat']);
    $this->stmt->bindValue(':starting_date', $post_data['date']);

    
    return $this->stmt->execute() 
      ? ['name' => $post_data['name']] 
      : ['error' => 'Error adding entry to DB'];
  }

  // 
  // Get Users forecast entries
  // 
  // GET REQUEST  
  // /api/Forecast/get/userId
  // 
  // return users forecasts (ASSOC ARRAY) or error array
  // 
  public function get($userId) {

   $userId = trim($userId);

   $this->stmt = $this->dbh->prepare('SELECT * FROM forecast WHERE user_id = :user_id ');
   $this->stmt->bindValue(':user_id', $userId);

   if ($this->stmt->execute()) {

    $forecast = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

    return count($forecast) != 0
      ? $forecast
      : ['error' => 'No Forecast entries found'];

   } else {
    return ['error' => 'Error getting forecast entries'];
   }

  }

}