<?php 
	session_start();
	include("conex.php"); 
	$link=Conectarse(); 
	$user=$_POST['user']; 
	$passw=$_POST['passw'];

	//verificamos que no exista el usuario
	$sql = "select * from usuarios where user = '".$user."'";
	$result = mysqli_query($link, $sql);

	if( mysqli_num_rows($result) > 0){
		echo 0;
	}else{
		$sql = "INSERT into usuarios (user, password)values('$user','$passw')";
		mysqli_query($link, $sql);
		mysqli_close($link);

		echo 1;
	}


?>

