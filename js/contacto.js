(function () {
  const formContainer = document.getElementById("contact-form-container");
  const successDiv = document.getElementById("form-success");
  const contactForm = document.getElementById("contact-form");

  if (!contactForm || !formContainer || !successDiv) {
    console.warn("No se encontraron los elementos necesarios");
    return;
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = this.querySelector('input[name="nombre"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();

    if (!nombre || !email) {
      alert("Por favor, completa tu nombre y correo electrónico.");
      return;
    }

    // Ocultar el contenedor del formulario con animación
    formContainer.style.transition = "opacity 0.3s ease";
    formContainer.style.opacity = "0";

    setTimeout(() => {
      formContainer.style.display = "none";
      successDiv.style.display = "block";
      successDiv.style.opacity = "0";
      successDiv.style.transform = "translateY(10px)";
      successDiv.offsetHeight; // forzar reflow
      successDiv.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      successDiv.style.opacity = "1";
      successDiv.style.transform = "translateY(0)";
    }, 300);
  });
})();
