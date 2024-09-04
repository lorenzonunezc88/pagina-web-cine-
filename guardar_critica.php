<?php
// Verificar si se han enviado datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión a la base de datos
    $mysqli = new mysqli("localhost", "root", "", "calificacion");

    // Verificar la conexión
    if ($mysqli->connect_error) {
        die("Error en la conexión: " . $mysqli->connect_error);
    } else {
        echo "Conexión exitosa<br>"; // Para verificar que la conexión se ha establecido correctamente
    }

    // Recibir datos del formulario y sanitizarlos
    $pelicula = $mysqli->real_escape_string($_POST['pelicula']);
    $comentario = $mysqli->real_escape_string($_POST['comentario']);
    $calificacion = intval($_POST['calificacion']); // Convertir a entero

    // Verificar si hay datos del formulario
    if (empty($pelicula) || empty($comentario) || empty($calificacion)) {
        echo "Todos los campos son requeridos.";
    } else {
        // Preparar la consulta SQL utilizando una sentencia preparada
        $sql = "INSERT INTO criticas (pelicula, comentario, calificacion) VALUES (?, ?, ?)";

        // Preparar la sentencia
        if ($stmt = $mysqli->prepare($sql)) {
            // Vincular parámetros
            $stmt->bind_param("ssi", $pelicula, $comentario, $calificacion);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                echo "Crítica guardada exitosamente.";
            } else {
                echo "Error al ejecutar la consulta: " . $stmt->error;
            }

            // Cerrar la sentencia
            $stmt->close();
        } else {
            echo "Error al preparar la consulta: " . $mysqli->error;
        }
    }

    // Cerrar la conexión
    $mysqli->close();
} else {
    // Si no se envió el formulario mediante POST, redirigir a la página del formulario
    header("Location: formulario.html");
    exit();
}
?>
