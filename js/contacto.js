(function () {
  const formContainer = document.getElementById("contact-form-container");
  const successMessage = document.getElementById("success-message");
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validación básica
      const nombre = this.querySelector('input[name="nombre"]').value.trim();
      const email = this.querySelector('input[name="email"]').value.trim();
      if (!nombre || !email) {
        alert("Por favor, completa tu nombre y correo electrónico.");
        return;
      }

      // Ocultar formulario suavemente
      formContainer.style.transition = "opacity 0.3s ease";
      formContainer.style.opacity = "0";

      setTimeout(() => {
        formContainer.style.display = "none";
        successMessage.style.display = "block";
        successMessage.style.opacity = "0";
        successMessage.style.transform = "translateY(10px)";
        // Forzar reflow
        successMessage.offsetHeight;
        successMessage.style.transition =
          "opacity 0.3s ease, transform 0.3s ease";
        successMessage.style.opacity = "1";
        successMessage.style.transform = "translateY(0)";
      }, 300);
    });
  }
})();
