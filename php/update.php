<?php 
	session_start();
	include("conex.php"); 
	$link=Conectarse(); 
	$lugar=$_POST['lugar']; 
	$id=$_POST['id']; 
	$valoracion=$_POST['valoracion'];
	$comentario=$_POST['comentario'];
	$sql = "UPDATE comentarios set comentario = '$comentario', lugar = '$lugar', estrellas = '$valoracion' where id = '".$id."'";
	mysqli_query($link, $sql);
	mysqli_close($link);

	echo 1;
?>