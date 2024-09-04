
<?php 
    //PARA GUARDAR LOS DATOS DEL COMENTARIO A BUSCAR
    session_start();

    if( !isset($_SESSION["usuario"])){      
        echo "<script> location.href = 'index.php';</script>";
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Comentarios</title>
</head>
<body style="background-image: url('./assets/img/strip.jpg');">
    
    <nav>
        <!-- Menú de navegación -->
        <ul>
           <li><a href="listar.php">Ver comentarios</a></li>
            <li><a href="index.html">Ir a peliculas</a></li>
            
            
        </ul>
    </nav>
    <section class="book-entry">
        <h2>Ingrese su comentario</h2>
        <form  method="post">
            <label for="lugar">Pelicula:</label>
            <input type="text" id="lugar" name="lugar">

            <label for="valoracion">Valoracion:</label>
            <input type="number" id="valoracion" name="valoracion" min="1" max="5">


            <label for="resumen">Comentario:</label>
            <textarea id="resumen" name="resumen" rows="8" cols="50" maxlength="255"></textarea>

            <button type="submit" id="btnenviar">Agregar Comentario</button>
        </form>
        <br>
        <h2 id="salida" style="color: red;"></h2>
    </section>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script>
        
        $(document).ready(function() {
            $("#btnenviar").on("click", function(event) {
                event.preventDefault(); // Evita que la página se recargue
                var datos = {
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
                                    url: "php/registrocomm.php", // Ruta al archivo PHP
                                    data: datos, // Datos que deseas enviar al servidor
                                    success: function(respuesta) {
                                        // Maneja la respuesta del servidor aquí
                                        $("#lugar").val("");
                                        $("#valoracion").val("");
                                        $("#resumen").val("");
                                        $("#salida").html("Comentario agregado con exitoso");
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
</body>
</html>
