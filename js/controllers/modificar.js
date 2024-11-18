import { BASE_URL } from "./main.js";
import { servicesProducts } from "../services/product-services.js";
// Obtener el ID del producto directamente desde la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Ahora productId para mostrar las propiedades del producto
console.log('ID del producto:', productId);

const form = document.querySelector("[data-formulario]");

const renderProduct = async () => {
    try {
        const product = await servicesProducts.getProductById(BASE_URL, productId);
        console.log(product);
        document.querySelector("[data-nombre]").value = product.nombre;
        document.querySelector("[data-descripcion]").value = product.descripcion;
        document.querySelector("[data-precio]").value = product.precio;
        document.querySelector("[data-imagen]").value = product.url_imagen;
        document.querySelector("[data-categoria]").value = product.categoria;


    } catch (error) {
        console.error("Hubo un error: ", error);

    }
}

renderProduct();



async function editarProducto(event) {
    event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;
    const precio = document.querySelector("[data-precio]").value;
    const url_imagen = document.querySelector("[data-imagen]").value;
    const categoria = document.querySelector("[data-categoria]").value;

    console.log(nombre, descripcion, precio, url_imagen, categoria);
    try {
        const resultado = await servicesProducts.modificarProducto(BASE_URL, productId, nombre, descripcion, precio, url_imagen, categoria);
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
        editarProducto(event);
    });
}
