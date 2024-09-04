<?php 
	session_start();
	include("conex.php"); 
	$link=Conectarse(); 
	$user=$_POST['user'];
	$passw=$_POST['passw'];

	$sql = "select * from usuarios where user = '".$user."' and password = '".$passw."'";
	$result = mysqli_query($link, $sql);

	if( mysqli_num_rows($result) > 0){

		$_SESSION["usuario"] = $user;
		echo 1;
	}else{
		echo 0;
	}
	mysqli_close($link);
?>
