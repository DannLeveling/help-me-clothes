// ===== PRODUCTOS =====
const productos = [
  { id: 1, nombre: "Casaca Hombre", precio: 120, img: "img/ropa hombre/casaca.png", categoria: "hombre invierno" },
  { id: 2, nombre: "Polo Hombre", precio: 45, img: "img/ropa hombre/polo hombre.png", categoria: "hombre verano" },
  { id: 3, nombre: "Vestido Mujer", precio: 89, img: "img/ropa mujer/vestido mujer.png", categoria: "mujer verano" },
  { id: 4, nombre: "Blusa Mujer", precio: 65, img: "img/ropa mujer/blusa mujer.png", categoria: "mujer verano" },
  { id: 5, nombre: "Casaca mujer", precio: 125, img: "img/ropa mujer/casaca mujer.png", categoria: "mujer invierno" },
  { id: 6, nombre: "Polo mujer", precio: 49, img: "img/ropa mujer/polo mujer.png", categoria: "mujer verano" },
  { id: 7, nombre: "Polera hombre", precio: 74, img: "img/ropa hombre/polera hombre.png", categoria: "hombre invierno" },
  { id: 8, nombre: "Polera mujer", precio: 59, img: "img/ropa mujer/polera mujer.png", categoria: "mujer invierno" },
  { id: 9, nombre: "Pantalon hombre", precio: 119, img: "img/ropa hombre/pantalon hombre.png", categoria: "hombre verano" }
];

const container = document.getElementById("productContainer");
let currentProduct = null;
let qty = 1;
let reviewList = null;

// =========== Mostrar productos ===========
function mostrarProductos(lista) {
  container.innerHTML = "";
  lista.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.nombre}">
        <h4>${p.nombre}</h4>
        <p>S/ ${p.precio}</p>
        <button onclick="openModal(${p.id})" class="vermas-btn">Ver más</button>
      </div>
    `;
  });
}
mostrarProductos(productos);

// ===== BUSQUEDA =====
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", e => {
    const text = e.target.value.toLowerCase();
    mostrarProductos(productos.filter(p => p.nombre.toLowerCase().includes(text)));
  });
}

// ===== FILTRO =====
document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    mostrarProductos(productos.filter(p => p.categoria === btn.dataset.category));
  });
});


// ================== MODAL ==================
const modal = document.getElementById("product-modal");
const modalImg = document.getElementById("modal-product-image");
const modalTitle = document.getElementById("modal-product-title");
const modalPrice = document.getElementById("modal-product-price");

reviewList = document.getElementById("reviewList");

// -------- ABRIR MODAL ----------
function openModal(id) {
  const p = productos.find(x => x.id === id);
  currentProduct = id;

  modalImg.src = p.img;
  modalTitle.textContent = p.nombre;
  modalPrice.textContent = "S/ " + p.precio;

  qty = 1;
  document.getElementById("qty-number").textContent = qty;

  loadReviews(id);

  modal.style.display = "flex";
  modal.classList.add("show");
}

// -------- CERRAR MODAL ----------
const closeBtn = document.querySelector(".close-btn");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 200);
  });
}

// ==================================
//        BOTONES TALLAS
// ==================================
document.querySelectorAll(".size-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// ==================================
//        COLORES
// ==================================
document.querySelectorAll(".color-box").forEach(box => {
  box.addEventListener("click", () => {
    document.querySelectorAll(".color-box").forEach(b => b.classList.remove("active"));
    box.classList.add("active");
  });
});

// ==================================
//        CANTIDAD
// ==================================
const qtyPlus = document.getElementById("qty-plus");
const qtyMinus = document.getElementById("qty-minus");

if (qtyPlus) {
  qtyPlus.addEventListener("click", () => {
    qty++;
    document.getElementById("qty-number").textContent = qty;
  });
}
if (qtyMinus) {
  qtyMinus.addEventListener("click", () => {
    if (qty > 1) qty--;
    document.getElementById("qty-number").textContent = qty;
  });
}

// ==================================
//        LOCALSTORAGE RESEÑAS
// ==================================
let selectedStars = 0;

document.querySelectorAll("#starRating span").forEach(star => {
  star.addEventListener("click", () => {
    selectedStars = parseInt(star.dataset.star);

    document.querySelectorAll("#starRating span").forEach(s => s.classList.remove("active"));
    for (let i = 1; i <= selectedStars; i++) {
      document.querySelector(`#starRating span[data-star="${i}"]`).classList.add("active");
    }
  });
});

function loadReviews(id) {
  reviewList.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("reviews_" + id)) || [];
  data.forEach(r => {
    reviewList.innerHTML += `
      <li class="review-item">
        <strong>${"★".repeat(r.stars)}</strong><br>
        ${r.text}
      </li>
    `;
  });
}

const addReviewBtn = document.getElementById("addReviewBtn");
if (addReviewBtn) {
  addReviewBtn.addEventListener("click", () => {
    const text = document.getElementById("newReview").value.trim();
    if (!text || selectedStars === 0) return;

    let data = JSON.parse(localStorage.getItem("reviews_" + currentProduct)) || [];

    data.push({ stars: selectedStars, text });

    localStorage.setItem("reviews_" + currentProduct, JSON.stringify(data));

    document.getElementById("newReview").value = "";
    selectedStars = 0;
    document.querySelectorAll("#starRating span").forEach(s => s.classList.remove("active"));

    loadReviews(currentProduct);
  });
}

// ================== AGREGAR A CARRITO ==================
const addToCartBtn = document.getElementById("addToCartBtn");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const talla = document.querySelector(".size-btn.active")?.textContent || null;
    const color = document.querySelector(".color-box.active")?.style.background || null;

    const producto = productos.find(x => x.id === currentProduct);

    const item = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: qty,
      talla,
      color,
      img: producto.img
    };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    showToast("Producto agregado al carrito");
    updateCartCount();
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function updateCartCount() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById("cartCount").textContent = total;
}

updateCartCount();

function goToCart() {
  window.location.href = "carrito.html";
}

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