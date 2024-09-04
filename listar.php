<?php 
session_start();
include("php/conex.php");
$link = Conectarse();

if (isset($_SESSION["usuario"])) {
    $result = mysqli_query($link, "SELECT * FROM comentarios WHERE user = '".$_SESSION["usuario"]."'");
} else {
    echo "<script> location.href = 'index.php';</script>";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Sistema de Críticas</title>
   
</head>
<body style="background-image: url('./assets/img/strip.jpg');">
    <header>
        
    </header>
    <nav>
        <!-- Menú de navegación -->
        <ul>
            <li><a href="index.html">Ir a películas</a></li>
            <li><a href="ingresar.php">Comentar</a></li>
        </ul>
    </nav>

    <section class="book-list">
        <h2>Listado de comentarios realizados</h2>
        <ul id="book-list">
            <?php 
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_array($result)) {
                        printf("<li>
                                <strong>ID(%s) %s</strong>  <strong class='star' style='margin-left: %d%%'><strong style='padding: 10px;'>%s </strong></strong>                             
                                <br>
                                <strong>%s</strong>
                                <br> <button class='eliminar-comentario' data-id='%s'>Eliminar</button> - <a href='actualizar.php?id=%s'>Actualizar</a>
                                <br> 
                                </li>", $row['id'], $row['lugar'], 5, $row["estrellas"], $row["comentario"], $row['id'], $row['id']);
                    }
                } else {
                    echo "<h2>Aún no ha realizado comentarios!!!</h2>";
                }
            ?>
        </ul>
    </section>

    <script>
        // Escucha el clic en los botones de eliminar comentario
        document.querySelectorAll('.eliminar-comentario').forEach(button => {
            button.addEventListener('click', function() {
                const comentarioId = this.getAttribute('data-id');
                if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
                    // Realizar una solicitud de eliminación asíncrona
                    fetch('eliminar.php?id=' + comentarioId, {
                        method: 'GET'
                    }).then(response => {
                        // Verificar si la eliminación fue exitosa
                        if (response.ok) {
                            // Recargar la página actual después de 1 segundo
                            setTimeout(() => {
                                location.reload();
                            }, 1000);
                        } else {
                            alert('Hubo un error al intentar eliminar el comentario.');
                        }
                    }).catch(error => {
                        console.error('Error al realizar la solicitud de eliminación:', error);
                        alert('Hubo un error al intentar eliminar el comentario.');
                    });
                }
            });
        });
    </script>

</body>
</html>
