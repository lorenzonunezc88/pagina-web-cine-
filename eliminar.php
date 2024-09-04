
<?php 
    session_start();
    include("php/conex.php");
    $link=Conectarse();

    if( isset($_SESSION["usuario"])){
        //verificamos si la variable id esta definida
        if( !empty($_GET["id"])){
            //realizamos la consulta a la base de datos
            $id = $_GET["id"];
            $comentarios = mysqli_query($link, "select * from comentarios where id = '".$id."' and user = '".$_SESSION["usuario"]."'");

            //verificamos que exista el comentarios
            if( mysqli_num_rows($comentarios) > 0){
                mysqli_query($link, "DELETE FROM comentarios WHERE id= '".$id."'");
                echo "<h1 class='error'> EL COMENTARIO  HA SIDO ELIMINADO</h1>";
            }else{
                echo "<h1 class='error'> NO TIENE PERMISOS PARA ELIMINAR EL COMENTARIO!!</h1>";
            }
        }
    }else{
        echo "<script> location.href = 'index.php';</script>";
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Sistema de Criticas</title>
</head>
<body>
    <header>
        <h1>Sistema de Criticas</h1>
    </header>
    <nav>
        <!-- Menú de navegación -->
        <ul>
            <li><a href="index.php">Inicio</a></li>
            <li><a href="listar.php">Listar</a></li>
            <li><a href="buscar.php">Buscar</a></li>
        </ul>
    </nav>
    
</body>
</html>
