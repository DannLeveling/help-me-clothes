const cartItemsDiv = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

function loadCart() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  cartItemsDiv.innerHTML = "";

  if (carrito.length === 0) {
    cartItemsDiv.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalPriceEl.textContent = "S/ 0.00";
    return;
  }

  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio * item.cantidad;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.img || 'img/default.png'}">

        <div class="cart-info">
          <h3>${item.nombre}</h3>

          <p class="details">
            Talla: ${item.talla || "-"} <br>
            Color: <span style="display:inline-block;width:15px;height:15px;border-radius:50%;background:${item.color};"></span>
          </p>

          <div class="qty-box">
            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
            <span>${item.cantidad}</span>
            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">Eliminar</button>
      </div>
    `;
  });

  totalPriceEl.textContent = "S/ " + total.toFixed(2);
}

function changeQty(index, change) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito[index].cantidad += change;
  if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;

  localStorage.setItem("carrito", JSON.stringify(carrito));
  loadCart();
}

function removeItem(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  showToast("Producto eliminado");
  loadCart();
}
loadCart();
document.querySelector(".checkout-btn").addEventListener("click", () => {
  const usuario = localStorage.getItem("usuarioLogeado");

  if (!usuario) {
    document.getElementById("loginRequiredPopup").style.display = "flex";
    return;
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  document.getElementById("paymentModal").style.display = "flex";
});


const methodSelect = document.getElementById("paymentMethod");
const cardFields = document.getElementById("cardFields");
const yapeFields = document.getElementById("yapeFields");
const creditCuotas = document.getElementById("creditCuotas");

methodSelect.addEventListener("change", () => {
  let method = methodSelect.value;

  if (method === "yape") {
    cardFields.style.display = "none";
    yapeFields.style.display = "block";
  } else {
    cardFields.style.display = "block";
    yapeFields.style.display = "none";
  }

  if (method === "credito") {
    creditCuotas.style.display = "block";
  } else {
    creditCuotas.style.display = "none";
  }
});

document.querySelectorAll("input[inputmode='numeric']").forEach(input => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });
});

document.getElementById("paymentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const method = methodSelect.value;

  // === VALIDACIONES TARJETA ===
  if (method === "debito" || method === "credito") {
    const num = document.getElementById("cardNumber").value.trim();
    const cvv = document.getElementById("cardCVV").value.trim();
    const date = document.getElementById("cardDate").value.trim();
    const name = document.getElementById("cardName").value.trim();

    if (num.length !== 16) return alert("Número de tarjeta inválido");
    if (cvv.length !== 3) return alert("CVV inválido");
    if (!name) return alert("Ingrese el nombre");
    if (!/^\d{2}\/\d{2}$/.test(date)) return alert("Fecha inválida (MM/AA)");
  }

  // === VALIDACIONES YAPE ===
  if (method === "yape") {
    const yNum = document.getElementById("yapeNumber").value.trim();
    const yCode = document.getElementById("yapeCode").value.trim();

    if (yNum.length !== 9) return alert("Número de Yape inválido");
    if (yCode.length !== 6) return alert("Código inválido");
  }

  // Guardar productos del carrito en el closet personal
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let closet = JSON.parse(localStorage.getItem("closet")) || [];

  closet.push(...carrito);
  localStorage.setItem("closet", JSON.stringify(closet));

  // Vaciar carrito
  localStorage.removeItem("carrito");


  document.getElementById("paymentModal").style.display = "none";
  document.getElementById("purchasePopup").style.display = "flex";
});

document.getElementById("cancelPayment").addEventListener("click", () => {
  document.getElementById("paymentModal").style.display = "none";
});

function closePurchasePopup() {
  window.location.href = "index.html";
}

document.getElementById("goLoginBtn").addEventListener("click", () => {
  alert("Serás redirigido a la página principal para iniciar sesión.");
  window.location.href = "index.html";
});