<?php 
	session_start();
	include("conex.php"); 
	$link=Conectarse(); 
	$texto=$_POST['texto'];
	$criterio=$_POST['criterio'];

	//verificamos el criterio para realizar la busqueda
	if( $criterio == 1){

		$comentarios = mysqli_query($link, "SELECT * FROM comentarios WHERE lugar LIKE '%$texto%' OR user LIKE '%$texto%'");
	}else if( $criterio == 2){

		$comentarios = mysqli_query($link, "SELECT * FROM comentarios WHERE fecha LIKE '%$texto%'");
	}else{
		$comentarios = mysqli_query($link, "SELECT * FROM comentarios WHERE estrellas LIKE '%$texto%'");

	}
	$salida = "<li></li>";
	if( mysqli_num_rows( $comentarios) == 0){
		$salida = "No se han encontrado comentarios....";
	}
	while($row = mysqli_fetch_array($comentarios)){
         $salida = $salida."<li>
                                <strong> ID(".$row['id'].") ".$row['lugar']."</strong>  <strong class='star' style='margin-left: 5%'><strong style='padding: 10px;'>".$row['estrellas']." </strong></strong>                             
                                <br>
                                <strong>".$row['comentario']."</strong>
                                <br> 
                                <br> 
                                
                                </li>"  ;
    }
	mysqli_close($link);

	echo $salida;
?>
