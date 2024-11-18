import { BASE_URL } from "./main.js";
import { servicesProducts } from "../services/product-services.js";
// Obtener el ID del producto directamente desde la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Ahora productId para mostrar las propiedades del producto
console.log('ID del producto:', productId);


const eliminarProducto = async () => {
    try {
        const confirmar = confirm("¿Estas seguro de eliminar el producto?", productId);
        if (!confirmar) {
            window.location.href = `../pages/detalles.html?id=${productId}`;
            return;
        }
        const respuesta = await servicesProducts.deleteProduct(BASE_URL, productId);
        console.log(respuesta);
        alert("Se eliminó correectamente");
        window.location.href = `../index.html`;

    } catch (error) {
        console.error("Hubo un error al eliminar el producto: ", error);
    }
}

eliminarProducto();