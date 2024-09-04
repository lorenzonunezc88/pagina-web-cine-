
<?php 
    //PARA GUARDAR LOS DATOS DEL COMENTARIO A BUSCAR
    session_start();

    if( isset($_SESSION["usuario"])){
        include("php/conex.php");
        $link=Conectarse();
        //verificao si la variable id esta definida
        if( !empty($_GET["id"])){
            //realizamos la consulta a la base de datos
            $id = $_GET["id"];
            $comentarios = mysqli_query($link, "select * from comentarios where id = '".$id."' and user = '".$_SESSION["usuario"]."'");

            //verificamos que exista el comentarios
            if( mysqli_num_rows($comentarios) == 0){
                echo "<script> location.href = 'listar.php';</script>";
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
    <title>COMENTARIOS</title>
</head>
<body>
    <header>
        
    </header>
    <nav>
        <!-- Menú de navegación -->
        <ul>
            <li><a href="listar.php">Ver comentarios</a></li>
            <li><a href="index.html">Ir a peliculas</a></li>
            
            
        </ul>
    </nav>
    <?php 

        if( mysqli_num_rows($comentarios) > 0){
            $row = mysqli_fetch_array($comentarios)

    ?>
    <section class="book-entry">
        <h2>DATOS DEL COMENTARIO A ACTUALIZAR</h2>
        <form  method="post">
            <label for="idcomm">ID COMENTARIO:</label>
            <input type="text" id="idcomm" name="idcomm" value="<?php echo $row['id']; ?>" readonly>
            <label for="lugar">Pelicula:</label>
            <input type="text" id="lugar" name="lugar" value="<?php echo $row['lugar']; ?>">

            <label for="valoracion">Valoracion:</label>
            <input type="number" id="valoracion" name="valoracion" min="1" max="5" value="<?php echo $row['estrellas']; ?>">


            <label for="resumen">Comentario:</label>
            <textarea id="resumen" name="resumen" rows="8" cols="50" maxlength="255"><?php echo $row['comentario']; ?></textarea>

            <button type="submit" id="btnenviar">Actualizar Comentario</button>
        </form>
        <h2 id="salida" class="error"></h2>
    </section>
    <?php 

        }

    ?>
</body>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script>
        
        $(document).ready(function() {
            $("#btnenviar").on("click", function(event) {
                event.preventDefault(); // Evita que la página se recargue
                var datos = {
                    id: $("#idcomm").val(),
                    lugar: $("#lugar").val(),
                    valoracion: parseInt($("#valoracion").val()),
                    comentario: $("#resumen").val(),

                };

                //verificamos que el lugar no sea vacio
                if( $("#lugar").val().length > 1){
                    //verificamos la valoraion
                    if( $("#valoracion").val().length > 0 ){
                        //verificamos que el rango saa de 1 a 5
                        if( parseInt($("#valoracion").val()) >= 1 &&  parseInt($("#valoracion").val()) <= 5){
                            //verificamos que se ingrese un comentario
                            if( $("#resumen").val().length > 0 ){
                                $.ajax({
                                    type: "POST", // Método de la petición (POST o GET)
                                    url: "php/update.php", // Ruta al archivo PHP
                                    data: datos, // Datos que deseas enviar al servidor
                                    success: function(respuesta) {
                                        // Maneja la respuesta del servidor aquí
                                        $("#salida").html("Comentario actualizado con exitoso");
                                    },
                                    error: function(xhr, status, error) {
                                        // Maneja los errores de la petición aquí
                                        console.error("Error en la petición AJAX: " + status + " - " + error);
                                    }
                                });
                            }else{
                                $("#salida").html("INGRESE UN COMENTARIO!!!");
                            }
                        }else{
                            $("#salida").html("LA VALORACION DEBE ESTAR ENTRE 1 Y 5!!!");
                        }
                    }else{
                        $("#salida").html("DEBE INGRESAR UNA VALORACION!!!");
                    }
                }else{
                    $("#salida").html("DEBE INGRESAR UN LUGAR!!!");
                }
            });
        });
    </script>
</html>
