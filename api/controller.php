<?php


function controller() {

  // Check/Filter/Get URL
  if( !isset($_GET['url']) ) throw new Exception('No Url Param');
  $url = rtrim($_GET['url'], " \n\r\t\v\x00/");
  $url = filter_var($url, FILTER_SANITIZE_URL);
  $url = explode('/', $url);
  
  // Check/Get Class
  if( !file_exists('./model/' . $url[0] . '.php')) throw new Exception('File doesn\'t exist');
  $class = new $url[0];
  unset($url[0]);

  // Check/Get Method
  if ( !isset($url[1])) throw new Exception('No method specified');
  $method = $url[1];
  if ( !method_exists($class, $method)) throw new Exception('Method doesn\'t exist');
  unset($url[1]);

  // Check/Get Params. Params set to false on POST request
  if( !isset($url[2]) && $_SERVER['REQUEST_METHOD'] == 'GET') throw new Exception('No Params specified on Get Rquest');
  $params = $_SERVER['REQUEST_METHOD'] == 'GET' ? $url[2] : false;

  // Call class method with params
  return call_user_func(array($class, $method), $params);
}