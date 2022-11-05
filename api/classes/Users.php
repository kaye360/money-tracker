<?php

class Users {


  public function __construct() {
  }
  
  
  public function signUp($params) {

  } 
  
  public function logIn() {
    // Get Post Data
  } 
  
  public function logOut() {
    // Get Post Data
  } 

  public function getUserById($params) {
    echo json_encode( $params, JSON_PRETTY_PRINT);
  } 
  
  public function getUserSettings($params) {
    echo json_encode( $params, JSON_PRETTY_PRINT);
  } 
  
  public function setUserSettings($params) {
    // Get Post Data    
  } 

}