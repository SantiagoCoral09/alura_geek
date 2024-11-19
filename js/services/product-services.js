// import { BASE_URL } from "../controllers/main";

// Funcion para obtener todos los productos del API
const productList = async (BASE_URL, page, pageSize) => {
    try {
        const response = await fetch(`${BASE_URL}?page=${page}&limit=${pageSize}`);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error al listar los productos: ", error);
    }
}

// Funcion para obtener por su id un solo producto
const getProductById = async (BASE_URL, id) => {
    try {
        const response = await fetch(`${BASE_URL}?id=${id}`);
        const data = await response.json();
        return data[0];

    } catch (error) {
        console.error("Error al obtener el producto: ", error);
    }
}

// Funcion para crear un nuevo producto en el API
const createProduct = async (BASE_URL, nombre, descripcion, precio, url_imagen, categoria) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "nombre": nombre,
                "descripcion": descripcion,
                "precio": precio,
                "url_imagen": url_imagen,
                "categoria": categoria
            })
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error("Ha ocurrido un error al enviar el producto...")
        }
        return data;

    } catch (error) {
        console.log("Error al crear el producto: ", error);
    }
}

// Funcion para actualizar un producto del API
const modificarProducto = async (BASE_URL, id, nombre, descripcion, precio, url_imagen, categoria) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                "nombre": nombre,
                "descripcion": descripcion,
                "precio": precio,
                "url_imagen": url_imagen,
                "categoria": categoria
            })

        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error("Ha ocurrido un error al enviar el video...")
        }
        return data;
    } catch (error) {
        console.log("Error al modificar el producto: ", error);

    }
}

// Funcion para eliminar un producto del API mediante su id
const deleteProduct = async (BASE_URL, id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log("Eliminado. ", data);
        return data;
    } catch (error) {
        console.error("Error al eliminar el producto: ", error);
    }
}

// Funcion para filtrar por categoria
const filtrarCategoria = async (BASE_URL, page, pageSize, parametro, valor) => {
    try {
        const response = await fetch(`${BASE_URL}?page=${page}&limit=${pageSize}&${parametro}=${valor}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al filtrar..: ", error);
    }
}

const filtrarProductos = async (BASE_URL, page, pageSize, parametro) => {
    try {
        const response = await fetch(`${BASE_URL}?page=${page}&limit=${pageSize}&nombre=${parametro}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al filtrar por nombre: ", error);

    }
}






export const servicesProducts = {
    productList, createProduct, getProductById, deleteProduct, modificarProducto, filtrarCategoria, filtrarProductos
}
