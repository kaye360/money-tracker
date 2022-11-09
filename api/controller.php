<?php


class Controller {

  private $url;
  private $class;
  private $method;
  private $params;

  public function __construct() {

    // Current page URL
    $this->url = $this->getURL();
    
    // Check/Get Class
    if( !file_exists('./model/' . $this->url[0] . '.php')) throw new Exception('File/Class doesn\'t exist');
    $this->class = new $this->url[0];

    // Check/Get Method
    if ( !isset($this->url[1])) throw new Exception('No method specified');
    $this->method = $this->url[1];

    if ( !method_exists($this->class, $this->method)) throw new Exception('Method doesn\'t exist');
    
    // Check/Get Params. Params set to false on POST request
    if( !isset($this->url[2]) && $_SERVER['REQUEST_METHOD'] == 'GET') throw new Exception('No Params specified on Get Rquest');
    $this->params = $_SERVER['REQUEST_METHOD'] == 'GET' ? $this->url[2] : false;
  
  }
  
  
  public function render() {

    // Call class method with params
    return call_user_func(array($this->class, $this->method), $this->params);

  }


  public function getURL() {
    
    // Check/Filter/Get URL
    if( !isset($_GET['url']) ) throw new Exception('No Url Param');
    $url = rtrim($_GET['url'], " \n\r\t\v\x00/");
    $url = filter_var($url, FILTER_SANITIZE_URL);
    $url = explode('/', $url);
    return $url;

  }

}