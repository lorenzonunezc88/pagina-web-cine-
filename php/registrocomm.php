<?php 
	session_start();
	include("conex.php"); 
	$link=Conectarse(); 
	$lugar=$_POST['lugar']; 
	$valoracion=$_POST['valoracion'];
	$comentario=$_POST['comentario'];

	$fecha = date("Y-m-d");
	$hora = date("H:i:s");

	$sql = "INSERT into comentarios (user, comentario, lugar, fecha, hora, estrellas)values('".$_SESSION["usuario"]."','$comentario','$lugar','$fecha','$hora','$valoracion')";
	mysqli_query($link, $sql);
	mysqli_close($link);

	echo 1;
	
?>

