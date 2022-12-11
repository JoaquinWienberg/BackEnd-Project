const axios = require("axios")

// Get products

const host = "http://localhost:8080"

async function getProducts () {
    try {
        const res = await axios.get(`${host}/api/productos`);
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

async function getProductById () {
    try {
        const res = await axios.get(`${host}/api/productos/2`); // Gets stock number 2
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

async function createProduct () {
    try {
        const newProduct = {title: "Memoria RAM 16GB", price: 22000, thumbnail: "url", code: "FGGGEE", stock: 4, desc: "new"}
        const res = await axios.post(`${host}/api/productos`, newProduct);
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

async function updateProduct () {
    try {
        const updatedProduct = {id: 8, title: "Memoria RAM 16GB", price: 29000, thumbnail: "url", code: "FGGGEE", stock: 4, desc: "new"} // Price update
        const res = await axios.put(`${host}/api/productos/8`, updatedProduct); // Updates product ID 6 in SQL DB
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

async function deleteProduct () {
    try {
        const delProduct = 8
        const res = await axios.delete(`${host}/api/productos/${delProduct}`);
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

//getProducts()             //Test Get stock
//getProductById()          //Test get product by ID
//createProduct()           //Test create product
//updateProduct()           //Test update product
//deleteProduct()             //Test delete product
