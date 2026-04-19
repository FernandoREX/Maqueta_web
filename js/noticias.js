// Función para cargar y mostrar los tweets
async function cargarTweets() {
  // Mostrar un indicador de carga
  const contenedorTweets = document.getElementById("x-timeline-container");
  if (!contenedorTweets) return;
  contenedorTweets.innerHTML =
    '<div class="cargando">Cargando noticias...</div>';

  try {
    // Hacer la petición a nuestro propio backend PHP
    const respuesta = await fetch("/api/tweets.php");

    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    }

    const data = await respuesta.json();

    // Limpiar el contenedor y verificar si hay datos
    contenedorTweets.innerHTML = "";
    if (!data.data || data.data.length === 0) {
      contenedorTweets.innerHTML = "<p>No se encontraron tweets recientes.</p>";
      return;
    }

    // Iterar sobre los tweets y crear elementos HTML para mostrarlos
    data.data.forEach((tweet) => {
      const fecha = new Date(tweet.created_at);
      const fechaFormateada = fecha.toLocaleDateString("es-MX");

      const tweetElement = document.createElement("div");
      tweetElement.classList.add("tweet-item");
      tweetElement.innerHTML = `
                <div class="tweet-fecha">${fechaFormateada}</div>
                <div class="tweet-texto">${escapeHTML(tweet.text)}</div>
                <div class="tweet-metricas">
                    👍 ${tweet.public_metrics.like_count || 0} 
                    🔁 ${tweet.public_metrics.retweet_count || 0}
                </div>
            `;
      contenedorTweets.appendChild(tweetElement);
    });
  } catch (error) {
    console.error("Error al cargar los tweets:", error);
    contenedorTweets.innerHTML =
      '<p class="error">Hubo un problema al cargar las noticias. Por favor, intenta de nuevo más tarde.</p>';
  }
}

// Función de seguridad para evitar inyección de código (XSS)
function escapeHTML(str) {
  return str.replace(/[&<>]/g, function (m) {
    if (m === "&") return "&amp;";
    if (m === "<") return "&lt;";
    if (m === ">") return "&gt;";
    return m;
  });
}

// Cargar los tweets cuando la página esté lista
document.addEventListener("DOMContentLoaded", cargarTweets);
