const closetDiv = document.getElementById("closetItems");

function loadCloset() {
    let closet = JSON.parse(localStorage.getItem("closet")) || [];

    if (closet.length === 0) {
        closetDiv.innerHTML = "<p>No tienes productos guardados.</p>";
        return;
    }

    closetDiv.innerHTML = "";

    closet.forEach((item, index) => {
        closetDiv.innerHTML += `
        <div class="closet-item">
            <img src="${item.img}">
            <h3>${item.nombre}</h3>

            <p>Cantidad: ${item.cantidad}</p>
            <p>Precio: S/ ${item.precio}</p>

            <p>Talla: ${item.talla || "-"}</p>
            <p>Color: 
                <span style="
                    display:inline-block;
                    width:15px;
                    height:15px;
                    border-radius:50%;
                    background:${item.color};
                "></span>
            </p>

            <button class="closet-remove-btn" onclick="removeClosetItem(${index})">
                Eliminar
            </button>
            <button class="Donar" onclick="removeClosetItem(${index})">
                Donar ropa
            </button>
        </div>
        `;
    });
}
loadCloset();
function removeClosetItem(index) {
    let closet = JSON.parse(localStorage.getItem("closet")) || [];

    closet.splice(index, 1);

    localStorage.setItem("closet", JSON.stringify(closet));

    showToast("Producto eliminado");

    loadCloset();
}

function showToast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2500);
}