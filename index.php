<?php 
    session_start();
    if( isset($_SESSION["usuario"])){
        echo "<script> location.href = 'index.php';</script>";
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Cine - Ingreso</title>
</head>
<body style="background-image: url('./assets/img/strip.jpg');">
    <header>
        <h1>Login</h1>
    </header>
    <section class="book-entry">
        <h2>Ingresar al Sistema</h2>
        <form  method="post">
            <label for="user">Usuario:</label>
            <input type="text" id="user" name="user">

            <label for="passw">Contraseña:</label>
            <input type="password" id="passw" name="passw">

            <button type="submit" id="btnenviar">Ingresar</button>
        </form>
        <br>
        <h2>Si aun no esta registrado <a href="registro.php"><button type="submit" >Ingresar aqui</button></a></h2>
        <br>
        <h2 id="salida" style="color: red;"></h2>
    </section>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script>
        
        $(document).ready(function() {
            $("#btnenviar").on("click", function(event) {
                event.preventDefault(); // Evita que la página se recargue
                var datos = {
                    user: $("#user").val(),
                    passw: $("#passw").val(),

                };

                //verificamos que el usuario no sea vacio
                if( $("#user").val().length > 1){
                    //verificamos la contraseña
                    if( $("#passw").val().length > 0 ){
                        $.ajax({
                            type: "POST", // Método de la petición (POST o GET)
                            url: "php/ingresar.php", // Ruta al archivo PHP
                            data: datos, // Datos que deseas enviar al servidor
                            success: function(respuesta) {
                                if( respuesta == 1){
                                    location.href = 'index.html';
                                }else{
                                    $("#salida").html("DATOS DE INGRESO INCORRECTOS!!!");
                                }
                                
                            },
                            error: function(xhr, status, error) {
                                // Maneja los errores de la petición aquí
                                console.error("Error en la petición AJAX: " + status + " - " + error);
                            }
                        });
                    }else{
                        $("#salida").html("DEBE INGRESAR UNA CONTRASEÑA!!!");
                    }
                }else{
                    $("#salida").html("DEBE INGRESAR SU USUARIO!!!");
                }
            });
        });
    </script>
</body>
</html>
