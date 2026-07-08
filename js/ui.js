export const actualizarContador = (carrito) => {
const contador = document.getElementById("contador-carrito");
if (contador) {
    contador.textContent = carrito.legth;
}
};

export const mostrarMensaje = (texto) => {
    alert(texto);

};