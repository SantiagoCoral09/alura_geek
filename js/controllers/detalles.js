import { BASE_URL } from "./main.js";
import { servicesProducts } from "../services/product-services.js";
// Obtener el ID del producto directamente desde la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Ahora productId para mostrar las propiedades del producto
console.log('ID del producto:', productId);

const productContainer = document.querySelector("[data-prod]");

function createCard({ id, nombre, descripcion, precio, url_imagen, categoria }) {
    const card = document.createElement("div");
    card.classList.add("card-product");
    card.innerHTML = `
    <h2 class="detalles__titulo">Detalles del producto</h2>
                <div class="image-container">
                    <img src="${url_imagen}" alt="${id}: ${nombre}"
                        class="card-image">
                </div>
                <div class="">
                    <h4 class="card-title">${id}: ${nombre}</h4><hr>
                    <p class="">Categoría: ${categoria}</p><br>
                    <p class="">Descripción: ${descripcion}</p><br>
                    <p class="">Precio: $${precio}</p>
                </div>
                <div class="botones">
                    <a href="../pages/modificar.html?id=${id}" class="btn__modificar">Modificar</a>
                    <a class="btn__eliminar" href="../pages/eliminar.html?id=${id}">Eliminar</a>
                </div>
    `;
    return card;

}

const renderProduct = async () => {
    productContainer.innerHTML = '';

    try {
        const product = await servicesProducts.getProductById(BASE_URL, productId);
        console.log(product);
        const productCard = createCard(product);
        productContainer.appendChild(productCard);

    } catch (error) {
        console.error("Hubo un error: ", error);
        productContainer.innerHTML = "<h2 class='mensaje-fallo'>Hubo un error al mostrar el producto...</h2>";

    }
}

renderProduct();

