import { servicesProducts } from "../services/product-services.js";
// URL desde mockapi
const BASE_URL = "https://673525585995834c8a920433.mockapi.io/api/productos/productos";
// URL desde localhost
// const BASE_URL="http://localhost:3001/productos";

let currentPage = 1;
let pageSize = 10;

const productContainer = document.querySelector("[data-product]");
const paginationContainer = document.querySelector("[data-pagination]"); // Asegúrate de tener un contenedor para la paginación


function createCard({ id, nombre, descripcion, precio, url_imagen, categoria }) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <a href="./pages/detalles.html?id=${id}">
                <div class="image-container">
                    <img src="${url_imagen}" alt="${id}: ${nombre}"
                        class="card-image">
                </div>
                <div class="card-content">
                    <h4 class="card-title">${id}: ${nombre}</h4><hr>
                    <p class="card-categoria">${categoria.toUpperCase()}</p>
                    <p class="card-description">${descripcion}</p><br>
                    <p class="card-price">$${precio}</p>
                    <a href="./pages/detalles.html?id=${id}" class="card-link">Ver más...</a>
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

const setupPagination = (totalPages, currentPage, buscando = {}) => {
    paginationContainer.innerHTML = '';
    document.getElementById('pageInfo').innerHTML = `Página ${currentPage} de ${totalPages}`;

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerText = '<';
        prevButton.classList.add('pagination-button');
        prevButton.onclick = () => {
            currentPage--;
            if (buscando.buscando) {
                console.log(buscando);
                renderProductosBuscados(currentPage, pageSize, buscando.parametro, buscando.valorBuscar);
                setupPagination(totalPages, currentPage, buscando);

            } else {
                renderProducts(currentPage, pageSize);
                setupPagination(totalPages, currentPage);

            }
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
            if (buscando.buscando) {
                console.log(buscando);
                renderProductosBuscados(currentPage, pageSize, buscando.parametro, buscando.valorBuscar);
                setupPagination(totalPages, currentPage, buscando);

            } else {
                renderProducts(currentPage, pageSize);
                setupPagination(totalPages, currentPage);

            }
        };
        paginationContainer.appendChild(button);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerText = '>';
        nextButton.classList.add('pagination-button');
        nextButton.onclick = () => {
            currentPage++;
            if (buscando.buscando) {
                console.log(buscando);
                renderProductosBuscados(currentPage, pageSize, buscando.parametro, buscando.valorBuscar);
                setupPagination(totalPages, currentPage, buscando);

            } else {
                renderProducts(currentPage, pageSize);
                setupPagination(totalPages, currentPage);

            }
        };
        paginationContainer.appendChild(nextButton);
    }
}

const init = async () => {

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        if (response.ok) {
            console.log(response);
            const totalCount = data.length
            console.log(totalCount);
            const totalPages = Math.ceil(totalCount / pageSize);

            await renderProducts(currentPage, pageSize);
            setupPagination(totalPages, currentPage);
        } else {
            productContainer.innerHTML = "<h2 class='mensaje-fallo'>Hubo un error al mostrar los productos.</h2>";
        }

    }
    catch (error) {
        console.error("Hubo un error: ", error);
    }
}

if (productContainer) {
    init();
}


const categoria = document.querySelector("[data-categoria]");
if (categoria)
    categoria.addEventListener("change", event => {
        const parametroConsulta = "categoria";
        const valorBuscar = categoria.value;

        buscarProductos(parametroConsulta, valorBuscar);
    });

const botonBusqueda = document.querySelector("[data-boton-busqueda]");
if (botonBusqueda)
    botonBusqueda.addEventListener("click", evento => {
        // se va a buscar por nombre en la API
        const parametroConsulta = "nombre";
        const valorBuscar = document.querySelector("[data-busqueda]").value;

        buscarProductos(parametroConsulta, valorBuscar);
    });

// Buscar un producto al presionar la tecla enter
const inputEle = document.getElementById('buscar');
if (inputEle) {
    inputEle.addEventListener('keyup', function (e) {
        let key = e.which || e.keyCode;
        if (key == 13) {
            // se va a buscar por nombre en la API
            const parametroConsulta = "nombre";
            const valorBuscar = document.querySelector("[data-busqueda]").value;

            buscarProductos(parametroConsulta, valorBuscar);
        }
    });
    // inputEle.addEventListener('input', evento => {
    //     evento.preventDefault();
    //     const parametroConsulta = "nombre";
    //     const valorBuscar = document.querySelector("[data-busqueda]").value;
    //     buscarProductos(parametroConsulta, valorBuscar);
    // });
}

async function buscarProductos(parametro, valorBuscar) {
    console.log(valorBuscar);
    if (valorBuscar !== "todos") {
        try {

            const response = await fetch(`${BASE_URL}?${parametro}=${valorBuscar}`);
            const data = await response.json();
            if (!response.ok) {
                productContainer.innerHTML = "<h2 class='mensaje-fallo'>No se encontró resultados...</h2>";
            } else {
                const totalCount = data.length
                console.log(totalCount);
                const totalPages = Math.ceil(totalCount / pageSize);
                const info = { "buscando": true, parametro, valorBuscar }
                setupPagination(totalPages, currentPage, info);
                await renderProductosBuscados(currentPage, pageSize, parametro, valorBuscar);
            }
        } catch (error) {
            console.error("Hubo un error: ", error);
            productContainer.innerHTML = "<h2 class='mensaje-fallo'>No hay resultados...</h2>";
        }
    } else {
        // document.querySelector(".pages").style.display = "block";
        await init();
    }
}

const renderProductosBuscados = async (page, pageSize, parametro, valorBuscar) => {
    productContainer.innerHTML = '';
    try {

        const resultado = await servicesProducts.filtrarCategoria(BASE_URL, page, pageSize, parametro, valorBuscar);
        console.log(resultado);
        if (resultado.length > 0) {
            resultado.forEach(product => {
                const productCard = createCard(product);
                productContainer.appendChild(productCard);
            });
        } else {
            productContainer.innerHTML = "<h2 class='mensaje-fallo'>No se encontraron resultados...</h2>";
        }
    } catch (error) {
        console.error("Hubo un error: ", error);
        productContainer.innerHTML = "<h2 class='mensaje-fallo'>Hubo un error al mostrar los productos...</h2>";

    }



}


export { BASE_URL };