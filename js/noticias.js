// Lista de IDs de tweets (puedes obtenerlos de la URL del tweet)
// Ejemplo: https://twitter.com/ConsAbogaciaMEX/status/1835521852539621576 -> ID = 1835521852539621576
const tweetsIds = [
  "1725238602941059377", // Tweet 1
  "1669757800845651982", // Tweet 2
  "1697721419570823314", // Tweet 3
  "1750661347665207651", // Tweet 4
  "1689034507242856448", // Tweet 5
  // Agrega más IDs aquí, en el orden que quieras que aparezcan
];

// Función para cargar todos los tweets dinámicamente
async function cargarTweetsDinamicos() {
  const container = document.getElementById("tweets-container");
  if (!container) return;

  // Limpiar contenedor (por si acaso)
  container.innerHTML = "";

  // Esperar a que el widget de X esté listo
  if (typeof twttr === "undefined") {
    console.error(
      "El widget de X no se ha cargado. Asegúrate de incluir el script widgets.js",
    );
    container.innerHTML =
      '<p class="error">Error al cargar los tweets. Intenta de nuevo más tarde.</p>';
    return;
  }

  // Usamos Promise.all para esperar que todos los tweets se inserten
  const promesas = tweetsIds.map((tweetId) => {
    return new Promise((resolve, reject) => {
      // Crear un contenedor individual para cada tweet
      const tweetDiv = document.createElement("div");
      tweetDiv.className = "tweet-wrapper";
      container.appendChild(tweetDiv);

      // Usar la API oficial de X para crear el tweet
      twttr.widgets
        .createTweet(tweetId, tweetDiv, {
          align: "center", // Opcional: center, left, right
          lang: "es", // Idioma
          dnt: true, // No rastrear (Do Not Track)
          conversation: "none", // Oculta la conversación (opcional)
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.error(`Error al cargar tweet ${tweetId}:`, error);
          tweetDiv.innerHTML = `<p class="error">No se pudo cargar este tweet. <a href="https://x.com/ConsAbogaciaMEX/status/${tweetId}" target="_blank">Ver en X</a></p>`;
          resolve(); // Resolvemos igual para que no se detenga la carga de los demás
        });
    });
  });

  await Promise.all(promesas);
  console.log("Todos los tweets cargados");
}

// Ejecutar cuando el DOM esté listo Y el widget de X esté disponible
document.addEventListener("DOMContentLoaded", () => {
  // Si el widget ya está cargado, ejecutamos directamente
  if (typeof twttr !== "undefined" && twttr.widgets) {
    cargarTweetsDinamicos();
  } else {
    // Esperar a que el script widgets.js cargue y ejecute su callback
    window.twttr = (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
      t._e = [];
      t.ready = function (f) {
        t._e.push(f);
      };
      return t;
    })(document, "script", "twitter-wjs");

    twttr.ready(() => {
      cargarTweetsDinamicos();
    });
  }
});
