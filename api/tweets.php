<?php
// api/tweets.php

// Configuración de la API de X
$bearerToken = "AAAAAAAAAAAAAAAAAAAAAAdZ9AEAAAAAyub%2B7EeUcgiFcUNKyq9cT6u19go%3DZXLqfAu73YHnGDAwiixPerik7lcY4cbejMesdybIHYX2j1AqFl"; // ¡Reemplázalo con tu token real!
$userId = "1516891231749517312";    // ¡Reemplázalo con el ID que obtuviste!

// La URL del endpoint para obtener los posts de un usuario
$url = "https://api.x.com/2/users/{$userId}/tweets?max_results=10&tweet.fields=created_at,public_metrics&exclude=retweets,replies";

// Inicializar cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $bearerToken,
    'Content-Type: application/json',
]);

// Ejecutar la solicitud y obtener la respuesta
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Configurar el tipo de contenido de la respuesta como JSON
header('Content-Type: application/json');

// Verificar si hubo un error en la solicitud
if ($httpCode !== 200) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener datos de X API', 'details' => $response]);
    exit;
}

// Si todo está bien, devolver los datos
echo $response;
?>