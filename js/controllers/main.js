import { servicesProducts } from "../services/product-services.js";
// URL desde mockapi
const BASE_URL = "https://673525585995834c8a920433.mockapi.io/api/productos/productos";
// URL desde localhost
// const BASE_URL="http://localhost:3001/productos";

// const form = document.querySelector("[data-formulario]");


let currentPage = 1;
let pageSize = 10;

const productContainer = document.querySelector("[data-product]");
const paginationContainer = document.querySelector("[data-pagination]"); // Asegúrate de tener un contenedor para la paginación


function createCard({ id, nombre, descripcion, precio, url_imagen, categoria }) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <a href="../pages/detalles.html?id=${id}">
                <div class="image-container">
                    <img src="${url_imagen}" alt="${id}: ${nombre}"
                        class="card-image">
                </div>
                <div class="card-content">
                    <h4 class="card-title">${id}: ${nombre}</h4><hr>
                    <p class="">${categoria.toUpperCase()}</p>
                    <p class="card-description">${descripcion}</p><br>
                    <p class="card-price">$${precio}</p>
                    <a href="../pages/detalles.html?id=${id}" class="card-link">Ver más...</a>
                </div>
            </a>
    `;
    return card;

}

const renderProducts = async (page, pageSize) => {
    productContainer.innerHTML = '';

    try {
        const listProducts = await servicesProducts.productList(BASE_URL, page, pageSize);
        listProducts.forEach(product => {
            const productCard = createCard(product);
            productContainer.appendChild(productCard);
        });

    } catch (error) {
        console.error("Hubo un error: ", error);
        productContainer.innerHTML = "<h2 class='mensaje-fallo'>Hubo un error al mostrar los productos...</h2>";

    }
}

const setupPagination = (totalPages, currentPage) => {
    paginationContainer.innerHTML = '';
    document.getElementById('currentPage').innerHTML = currentPage;
    document.getElementById('totalPages').innerHTML = totalPages;

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Ant';
        prevButton.classList.add('pagination-button');
        prevButton.onclick = () => {
            currentPage--;
            renderProducts(currentPage, pageSize);
            setupPagination(totalPages, currentPage);
        };
        paginationContainer.appendChild(prevButton);
    }
    for (let i = start; i <= end; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.add('pagination-button');
        if (i === currentPage) {
            button.disabled = true;
            button.classList.add('active')
        } else {
            button.disabled = false;
            button.classList.remove('active')
        }
        button.onclick = () => {
            currentPage = i;
            renderProducts(currentPage, pageSize);
            setupPagination(totalPages, currentPage);
        };
        paginationContainer.appendChild(button);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Sig';
        nextButton.classList.add('pagination-button');
        nextButton.onclick = () => {
            currentPage++;
            renderProducts(currentPage, pageSize);
            setupPagination(totalPages, currentPage);
        };
        paginationContainer.appendChild(nextButton);
    }
}

// async function crearProducto(event) {
//     event.preventDefault();

//     const nombre = document.querySelector("[data-nombre]").value;
//     const descripcion = document.querySelector("[data-descripcion]").value;
//     const precio = document.querySelector("[data-precio]").value;
//     const url_imagen = document.querySelector("[data-imagen]").value;
//     const categoria = document.querySelector("[data-categoria]").value;

//     console.log(nombre, descripcion, precio, url_imagen, categoria);
//     try {
//         const resultado = await servicesProducts.createProduct(BASE_URL, nombre, descripcion, precio, url_imagen, categoria);
//         console.log(resultado);
//         alert(resultado.id);
//         window.location.href = `../pages/detalles.html?id=${resultado.id}`;
//     } catch (error) {
//         console.error("Hubo un error: ", error);
//         alert("Error");
//     }


// }
// // Al hacer clic en el boton del formulario
// if (form) {
//     form.addEventListener("submit", (event) => {
//         crearProducto(event);
//     });
// }


const init = async () => {

    try {
        const totalProducts = await fetch(BASE_URL);
        const data = await totalProducts.json();
        const totalCount = data.length
        console.log(totalCount);
        const totalPages = Math.ceil(totalCount / pageSize);

        await renderProducts(currentPage, pageSize);
        setupPagination(totalPages, currentPage);
    }
    catch (error) {
        console.error("Hubo un error: ", error);
        // productContainer.innerHTML = "<h2 class='mensaje-fallo'>Hubo un error al mostrar los productos.</h2>";
    }
}
if (productContainer) {
    init();
}

export { BASE_URL };