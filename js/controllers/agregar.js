import { BASE_URL } from "./main.js";
import { servicesProducts } from "../services/product-services.js";
const form = document.querySelector("[data-formulario]");

async function crearProducto(event) {
    event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;
    const precio = document.querySelector("[data-precio]").value;
    const url_imagen = document.querySelector("[data-imagen]").value;
    const categoria = document.querySelector("[data-categoria]").value;

    console.log(nombre, descripcion, precio, url_imagen, categoria);
    try {
        const resultado = await servicesProducts.createProduct(BASE_URL, nombre, descripcion, precio, url_imagen, categoria);
        console.log(resultado);
        // alert(resultado.id);
        window.location.href = `../pages/detalles.html?id=${resultado.id}`;
    } catch (error) {
        console.error("Hubo un error: ", error);
        alert("Error");
    }


}
// Al hacer clic en el boton del formulario
if (form) {
    form.addEventListener("submit", (event) => {
        crearProducto(event);
    });
}
