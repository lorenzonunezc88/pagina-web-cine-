<?php 
    session_start();
    if( isset($_SESSION["usuario"])){
        echo "<script> location.href = 'listar.php';</script>";
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Sistema de Criticas - Registro</title>
</head>
<body style="background-image: url('./assets/img/strip.jpg');">

    <header>
        <h1>Unete a nosotros..</h1>
    </header>
    <section class="book-entry">
        <h2>Registrarse en el Sistema</h2>
        <form  method="post">
            <label for="user">Usuario:</label>
            <input type="text" id="user" name="user">

            <label for="passw">Contraseña:</label>
            <input type="text" id="passw" name="passw">

            <button type="submit" id="btnenviar">Registrarme</button>
        </form>
        <br>
        <h2>Si ya esta registrado <a href="index.php"><button type="submit" >Ingresar aqui</button></a></h2>
        <br>
        <h2 id="salida" style="color: red;"></h2>
    </section>

</body>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script>
        
        $(document).ready(function() {
            $("#btnenviar").on("click", function(event) {
                event.preventDefault(); // Evita que la página se recargue
                var datos = {
                    user: $("#user").val(),
                    passw: $("#passw").val(),

                };

                //verificamos que el rango del usuario sea correcto
                if( $("#user").val().length >= 5 && $("#user").val().length <= 10 ){
                    //verificamos la contraseña que no este vacio
                    if( $("#passw").val().length > 0 ){
                        const tieneCaracterEspecial = /[!@#$%^&*(){}\[\]:;<>,.?/\\~`_+=|-]/.test($("#passw").val());
                        //que tenga un caracter especial
                        if(tieneCaracterEspecial){
                            const tieneNumero = /\d/.test($("#passw").val());
                            if( tieneNumero){
                                const tieneMayuscula = /[A-Z]/.test($("#passw").val());

                                if (tieneMayuscula) {
                                    $.ajax({
                                        type: "POST", // Método de la petición (POST o GET)
                                        url: "php/registrar.php", // Ruta al archivo PHP
                                        data: datos, // Datos que deseas enviar al servidor
                                        success: function(respuesta) {
                                            
                                            if( respuesta == 1){
                                                $("#user").val("");
                                                $("#passw").val("");
                                                $("#salida").html("EL REGISTRO SE HA REALIZADO CORRECTAMENTE!!!");      
                                            }else{
                                                $("#salida").html("USUARIO YA REGISTRADO, INICIE SESION!!!");  
                                            }                                      
                                            
                                        },
                                        error: function(xhr, status, error) {
                                            // Maneja los errores de la petición aquí
                                            console.error("Error en la petición AJAX: " + status + " - " + error);
                                        }
                                    });
                                }else{
                                    $("#salida").html("LA CONTRASEÑA DEBE TENER MINIMO UNA MAYUSCULA!!!");
                                }
                            }else{
                                 $("#salida").html("LA CONTRASEÑA DEBE TENER MINIMO UN NUMEROL!!!");
                            }
                        }else{
                            $("#salida").html("LA CONTRASEÑA DEBE TENER MINIMO UN CARACTER ESPECIAL!!!");
                        }
              
                    }else{
                        $("#salida").html("DEBE INGRESAR UNA CONTRASEÑA!!!");
                    }
                }else{
                    $("#salida").html("DEBE INGRESAR SU USUARIO!!!");
                }
            });
        });
    </script>
</html>
