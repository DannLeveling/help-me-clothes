function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

let cartCount = 0;
function toggleCart() {
  cartCount++;
  document.getElementById("cartCount").textContent = cartCount;
}

function goToCart() {
  window.location.href = "carrito.html";
}

function updateCartCount() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById("cartCount").textContent = total;
}

updateCartCount();

// ABRIR MODAL
document.querySelector(".mission-btn").addEventListener("click", () => {
  document.getElementById("aboutModal").classList.add("show");
});

// CERRAR MODAL
document.querySelector(".about-close").addEventListener("click", () => {
  document.getElementById("aboutModal").classList.remove("show");
});

// CERRAR SI HACE CLICK FUERA
document.getElementById("aboutModal").addEventListener("click", (e) => {
  if (e.target.id === "aboutModal") {
    document.getElementById("aboutModal").classList.remove("show");
  }
});

const modal = document.getElementById("applyModal");
const closeBtn = document.querySelector(".close");
const form = document.getElementById("applyForm");
const successMessage = document.getElementById("successMessage");

// Abre el modal con la info del puesto
function openApplyModal(jobTitle, company, description) {
  document.getElementById("modalJobTitle").textContent = jobTitle;
  document.getElementById("modalCompany").textContent = company;
  document.getElementById("jobPosition").value = jobTitle;

  modal.style.display = "flex";
}

// Cerrar modal
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// Enviar formulario a tu correo con EmailJS
form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_np2ls8z", "template_pbzdf2u", this)
    .then(() => {
      successMessage.style.display = "block";
      form.reset();
    })
    .catch((error) => {
      alert("Error enviando el formulario: " + JSON.stringify(error));
    });
});

// ===== MODAL DE RECLAMOS =====
const reclamoModal = document.getElementById("reclamoModal");
const btnReclamos = document.getElementById("btnReclamos");
const closeReclamo = document.querySelector(".close-reclamo");
const formReclamo = document.getElementById("reclamoForm");
const mensajeExito = document.getElementById("reclamoExito");

// Abrir modal
if (btnReclamos) {
  btnReclamos.addEventListener("click", () => {
    reclamoModal.style.display = "flex";
  });
}

// Cerrar modal
closeReclamo.addEventListener("click", () => {
  reclamoModal.style.display = "none";
});

// Enviar datos
formReclamo.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const telefono = document.getElementById("rTelefono").value;
  const tipo = document.getElementById("tipo").value;
  const mensaje = document.getElementById("description").value;

  // Guardar en localStorage
  const reclamoData = {
    nombre: nombre,
    correo: correo,
    telefono: telefono,
    tipo: tipo,
    mensaje: mensaje,
    fecha: new Date().toLocaleString()
  };

  let reclamos = JSON.parse(localStorage.getItem("reclamos")) || [];
  reclamos.push(reclamoData);
  localStorage.setItem("reclamos", JSON.stringify(reclamos));

  // Enviar por EmailJS
  emailjs.send("service_np2ls8z", "template_lbx8ytb", {
    nombre: nombre,
    correo: correo,
    tipo: tipo,
    mensaje: mensaje
  })
    .then(() => {
      mensajeExito.style.display = "block";

      formReclamo.reset();

      setTimeout(() => {
        reclamoModal.style.display = "none";
        mensajeExito.style.display = "none";
      }, 2500);
    })
    .catch(() => {
      alert("Ocurrió un error, intenta nuevamente.");
    });
});

// ===== MODAL DE DEVOLUCIONES =====
const devolucionModal = document.getElementById("devolucionModal");
const btnDevoluciones = document.querySelector('a[href="devoluciones.html"]');
const closeDevolucion = document.querySelector(".close-devolucion");

// Abrir modal
if (btnDevoluciones) {
  btnDevoluciones.addEventListener("click", (e) => {
    e.preventDefault();
    devolucionModal.style.display = "flex";
  });
}

// Cerrar modal
closeDevolucion.addEventListener("click", () => {
  devolucionModal.style.display = "none";
});

const formDonacion = document.getElementById("formDonacionRopa");
const donacionModal = document.getElementById("donacionModal");
const closeDonacion = document.querySelector(".close-donacion");
const btnDonaciones = document.getElementById("btndonaciones");
const mensajeexito = document.getElementById("mensajeexito");

// Abrir modal al hacer click en "Donaciones"
if (btnDonaciones) {
  btnDonaciones.addEventListener("click", () => {
    donacionModal.style.display = "flex";
  });
}

// Cerrar modal con la "X"
closeDonacion.addEventListener("click", () => {
  donacionModal.style.display = "none";
});

// Cerrar modal si se hace clic fuera del contenido
donacionModal.addEventListener("click", (e) => {
  if (e.target === donacionModal) {
    donacionModal.style.display = "none";
  }
});

// Enviar formulario (simulación)
formDonacion.addEventListener("submit", function (e) {
  e.preventDefault(); // evitar recargar la página

  // Mostrar mensaje de éxito
  mensajeexito.style.display = "block";

  // Ocultar mensaje después de 2.5 segundos
  setTimeout(() => {
    mensajeexito.style.display = "none";
    donacionModal.style.display = "none";
  }, 2500);

  // Limpiar formulario
  formDonacion.reset();
});

const sellModal = document.getElementById("sellClothesModal");
const btnSell = document.getElementById("btnSellClothes");
const closeSell = document.getElementById("closeSellClothes");
const formSell = document.getElementById("formSellClothes");
const mensajeSellExito = document.getElementById("mensajeSellExito");

// Abrir modal
if (btnSell) {
  btnSell.addEventListener("click", () => {
    sellModal.style.display = "flex";
  });
}

// Cerrar modal
closeSell.addEventListener("click", () => {
  sellModal.style.display = "none";
});

// Cerrar modal al hacer clic fuera del contenido
sellModal.addEventListener("click", (e) => {
  if (e.target === sellModal) {
    sellModal.style.display = "none";
  }
});

// Enviar formulario (simulación)
formSell.addEventListener("submit", function (e) {
  e.preventDefault();

  // Mostrar mensaje de éxito
  mensajeSellExito.style.display = "block";

  // Ocultar mensaje y cerrar modal después de 2.5 seg
  setTimeout(() => {
    mensajeSellExito.style.display = "none";
    sellModal.style.display = "none";
  }, 2500);

  // Limpiar formulario
  formSell.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuarioLogeado");
  const userBtn = document.getElementById("userBtn");
  const userDropdown = document.getElementById("userDropdown");

  if (usuario && userBtn) {
    userBtn.innerHTML = `
      <img src="img/iconos/login.svg" class="icono-nav">
      <span>${usuario}</span>
    `;
    userBtn.href = "#";

    userBtn.addEventListener("click", (e) => {
      e.preventDefault();
      userDropdown.style.display =
        userDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
      if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.style.display = "none";
      }
    });
  }
});

function logout() {
  localStorage.removeItem("usuarioLogeado");
  window.location.reload();
}