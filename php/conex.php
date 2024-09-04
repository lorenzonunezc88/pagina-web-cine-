<?php 
error_reporting(E_ALL);
function Conectarse() 
{ 
  if (!($link=mysqli_connect("localhost","root","", "criticas")))
 
   { 
      echo "Error conectando a la base de datos."; 
      exit(); 
   } 
   // if (!mysqli_select_db("test",$link)) //nombre de la base de , en este caso test
   // { 
      // echo "Error seleccionando la base de datos."; 
      // exit(); 
   // } 
  return $link; 
} 

?>

