<?php 
    //PARA GUARDAR LOS DATOS DE LOS COMENTARIOS A BUSCAR
    session_start();

    if( isset($_SESSION["usuario"])){
        include("php/conex.php");
        $link=Conectarse();
        $comentarios = mysqli_query($link, "select * from comentarios"); 
        
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
            <li><a href="php/cerrarsesion.php">Cerrar sesion</a></li>
            
        </ul>
    </nav>
    <section class="book-entry">
        
        <form  method="get">
            <h2>Ingrese el criterio de busqueda</h2>
            <select id="criterio">
                <option value="1">Nombre de lugar o usuario</option>
                <option value="2">Fecha(año-mes-dia)</option>
                <option value="3">Estrellas</option>

            </select>
            <br>
            <label for="busqueda">BUSQUEDA:</label>
            <input type="text" id="busqueda" name="busqueda">
        </form>
        <h2 id="salida"></h2>
    </section>
    <?php 

        if( mysqli_num_rows($comentarios) > 0){

    ?>
    <section class="book-list">
        <h2>Listado de comentarios</h2>
        <ul id="book-list">
            <!-- Aquí se mostrarán los comentarios -->
            <li></li>
            <?php 

               while($row = mysqli_fetch_array($comentarios)){
                        printf("<li>
                                <strong> ID(%s) %s</strong>  <strong class='star' style='margin-left: %d%%'><strong style='padding: 10px;'>%s </strong></strong>                             
                                <br>
                                <strong>%s</strong>
                                <br> 
                                <br> 
                                
                                </li>"  ,$row['id'],$row['lugar'],5,$row["estrellas"],$row["comentario"],$row['id'],$row['id']);
                    }
            ?>
        </ul>
    </section>
    <?php 

        }else{
            echo "<h1> NO HAY COMENTARIOS DISPONIBLES.!</h1>";
        }

    ?>
</body>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script>
        
        $(document).ready(function() {
            $("#busqueda").on("input", function() {
                var texto = $("#busqueda").val();
                var datos = {
                    texto: $("#busqueda").val(),
                    criterio: $("#criterio").val(),

                };
                
                $.ajax({
                    type: "POST", // Método de la petición (POST o GET)
                    url: "php/busqueda.php", // Ruta al archivo PHP
                    data: datos, // Datos que deseas enviar al servidor
                    success: function(respuesta) {
                        // Maneja la respuesta del servidor aquí
                        $("#book-list").html(respuesta);
                    },
                    error: function(xhr, status, error) {
                        // Maneja los errores de la petición aquí
                        console.error("Error en la petición AJAX: " + status + " - " + error);
                    }
                });
            });

        });
         
    </script>

</html>
