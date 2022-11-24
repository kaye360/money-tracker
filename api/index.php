<?php
/*
Index.php - the starting point of the API
*/

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once './config/config.php';

require_once './controller.php';

spl_autoload_register( function($class) {
  require_once './model/' . $class . '.php';
});


try{

  // Render JSON
  $controller = new Controller;
  echo json_encode( $controller->render(), JSON_PRETTY_PRINT );

} catch(Exception $error) {
  
  // Render Error
  echo json_encode( ['error' => $error->getMessage()], JSON_PRETTY_PRINT);

}

?>