<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once './config/config.php';

require_once './controller.php';

require_once './model/Users.php';
require_once './model/Transactions.php';
require_once './model/Budgets.php';
require_once './model/Savings.php';



try{

  $data = controller();
  echo json_encode( $data, JSON_PRETTY_PRINT );

} catch(Exception $error) {
  
  echo json_encode( ['error' => $error->getMessage()], JSON_PRETTY_PRINT);

}

?>