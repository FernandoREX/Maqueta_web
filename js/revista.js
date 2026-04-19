// Lista de artículos de la revista
const articulos = [
  {
    id: 1,
    titulo: "Test_1",
    pdfUrl: "assets/pdfs/Test_1.pdf",
    miniatura: "assets/img/revista/Test_1.webp",
  },
  {
    id: 2,
    titulo: "Test_1",
    pdfUrl: "assets/pdfs/Test_1.pdf",
    miniatura: "assets/img/revista/Test_1.webp",
  },
  {
    id: 3,
    titulo: "Test_1",
    pdfUrl: "assets/pdfs/Test_1.pdf",
    miniatura: "assets/img/revista/Test_1.webp",
  },
  {
    id: 4,
    titulo: "Test_1",
    pdfUrl: "assets/pdfs/Test_1.pdf",
    miniatura: "assets/img/revista/Test_1.webp",
  },
  {
    id: 5,
    titulo: "Test_1",
    pdfUrl: "assets/pdfs/Test_1.pdf",
    miniatura: "assets/img/revista/Test_1.webp",
  },
  {
    id: 6,
    titulo: "Test_1",
    pdfUrl: "assets/pdfs/Test_1.pdf",
    miniatura: "assets/img/revista/Test_1.webp",
  },
];

// Variable global para guardar el PDF seleccionado
let selectedPdf = null;

// --- Funciones de localStorage ---
// Obtener el objeto de accesos (devuelve un objeto con ids como llaves y booleanos)
function getAccesos() {
  const stored = localStorage.getItem("accesoRevistas");
  if (stored) {
    return JSON.parse(stored);
  } else {
    return {};
  }
}

// Guardar el acceso a un artículo (id => true)
function guardarAcceso(id) {
  const accesos = getAccesos();
  accesos[id] = true;
  localStorage.setItem("accesoRevistas", JSON.stringify(accesos));
}

// Verificar si un artículo ya está desbloqueado
function estaDesbloqueado(id) {
  const accesos = getAccesos();
  return accesos[id] === true;
}
// ---------------------------------

// Función para renderizar la lista de PDFs
function renderPdfList() {
  const container = document.getElementById("pdf-list-container");
  if (!container) return;

  container.innerHTML = "";
  articulos.forEach((art) => {
    const div = document.createElement("div");
    div.className = "pdf-item";
    div.innerHTML = `
            <img src="${art.miniatura}" alt="${art.titulo}" class="pdf-thumb" onerror="this.src='https://placehold.co/300x200?text=Sin+imagen'">
            <div class="pdf-title">${art.titulo}</div>
            <button class="btn-leer" data-id="${art.id}">Leer</button>
        `;
    container.appendChild(div);
  });

  // Asignar eventos a los botones "Leer"
  document.querySelectorAll(".btn-leer").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(btn.dataset.id);
      selectedPdf = articulos.find((a) => a.id === id);
      if (selectedPdf) {
        // Verificar si ya está desbloqueado
        if (estaDesbloqueado(selectedPdf.id)) {
          // Si ya tiene acceso, mostrar directamente el visor
          showPdfViewer(selectedPdf);
        } else {
          // Si no, mostrar el formulario
          showModal();
        }
      }
    });
  });
}

// Mostrar el modal del formulario
function showModal() {
  const modal = document.getElementById("form-modal");
  modal.style.display = "flex";
}

// Ocultar modal
function hideModal() {
  const modal = document.getElementById("form-modal");
  modal.style.display = "none";
  document.getElementById("access-form").reset();
}

// Mostrar el visor del PDF
function showPdfViewer(pdf) {
  const viewer = document.getElementById("pdf-viewer");
  const frame = document.getElementById("pdf-frame");
  const titleSpan = document.getElementById("pdf-title-view");

  titleSpan.textContent = pdf.titulo;
  frame.src = pdf.pdfUrl;
  viewer.style.display = "block";

  // Opcional: scroll suave al visor
  viewer.scrollIntoView({ behavior: "smooth" });
}

// Manejar el envío del formulario (simulado)
function handleFormSubmit(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nombre || !email) {
    alert("Por favor, completa todos los campos");
    return;
  }

  // Aquí en la maqueta solo simulamos. Más tarde enviarás a backend.
  console.log(
    `Usuario: ${nombre}, Email: ${email} solicitó acceso a: ${selectedPdf.titulo}`,
  );

  // Guardar en localStorage que este artículo está desbloqueado
  if (selectedPdf) {
    guardarAcceso(selectedPdf.id);
  }

  // Cerrar modal y mostrar el PDF
  hideModal();
  if (selectedPdf) {
    showPdfViewer(selectedPdf);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  renderPdfList();

  const form = document.getElementById("access-form");
  form.addEventListener("submit", handleFormSubmit);

  const closeBtn = document.getElementById("close-modal");
  closeBtn.addEventListener("click", hideModal);

  // Cerrar modal si se hace clic fuera del contenido
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("form-modal");
    if (e.target === modal) hideModal();
  });
});
