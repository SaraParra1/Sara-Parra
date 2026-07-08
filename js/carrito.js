import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito");

    contenedor.innerHTML = "";
    divAcciones.innerHTML = "";

    if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "Tu carrito está vacío";

    contenedor.appendChild(mensaje);
    return;
}
        carrito.forEach((producto, index) => {

    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto-carrito");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;

    const info = document.createElement("div");
    info.classList.add("info-producto");
    info.appendChild(titulo);
    info.appendChild(precio);

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar producto";

    btnEliminar.addEventListener("click", () => {
        eliminarProducto(index);
        renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(info);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);

}); // <-- Aquí termina el forEach

// Calcular total
const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

const totalTexto = document.createElement("h2");
totalTexto.textContent = `Total: $${total}`;
divAcciones.appendChild(totalTexto);

// Botón vaciar
const btnVaciar = document.createElement("button");
btnVaciar.classList.add("btn", "btn-vaciar-carrito");
btnVaciar.textContent = "Vaciar carrito";

btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
});

divAcciones.appendChild(btnVaciar);
}; // cierre de renderizarCarrito

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});