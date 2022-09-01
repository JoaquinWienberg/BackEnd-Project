

// Products display

const stockDatabase = {

    get: () => {
        return fetch('/api/productos')
            .then(data => data.json())
    },
    post: (newProd) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProd)
        }
        return fetch('/api/cart', options)
    },
    delete: (idProd) => {
        const options = {
            method: 'DELETE'
        }
        return fetch(`/api/cart/${idProd}`, options)
    }
}

const cartDatabase = {

    get: () => {
        return fetch('/api/cartdb')
            .then(data => data.json())
    },

    delete: (idProd, idCart) => {
        const options = {
            method: 'DELETE'
        }
        return fetch(`/api/cart/${idCart}/${idProd}`, options)
    },

    post: (idProd, cart, prod) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(prod),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return fetch(`/api/cart/${cart}/${idProd}`, options)
    },

}

// Product display

const productDisplay = document.getElementById("itemsDisplay")

function updateProductDisplay () {
    return stockDatabase.get()
        .then(items => addProductsTable (items))
        .then(dataHTML => {
            productDisplay.innerHTML = dataHTML
        })
}

function addProductsTable (items) {
    let itemTable = `<table class="table table-dark text-center"  style="max-width: 800px; margin: 15px auto">
                <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th></th>
                </tr>`;
    for (const objProd of items) {
        itemTable +=  `<tr class="product text-dark table-light text-center" id=${objProd.id}>
                            <td>${objProd.title}</td>
                            <td>${objProd.desc}</td>
                            <td>$${objProd.price}</td>
                            <td><img src=${objProd.thumbnail} width="40px" alt="Product"></td>
                            <td><a type="button" class="btn btn-primary" onclick="addProductToCart('${objProd.id}')">Add to cart</a></td>
                        </tr> `;
    } 

    itemTable += "</table>"

    return itemTable
}

// Cart interaction

let availableProducts = []
let shoppingCart = []
let confirmedCart = []

function addProductToCart(prodId) {
    if (confirmedCart.length == 0) {                // It uses local array If cart isn't confirmed yet
        return stockDatabase.get()
        .then(data => data.filter(info => info.id == prodId))
        .then(product => shoppingCart.push(product[0]))} 
        else {                                      // Uses Get if the cart was already created
        return cartDatabase.get()
        .then(data => cartDatabase.post(prodId, data.length, availableProducts[0][parseInt(prodId)]))
        }
    
}

document.getElementById("addCartBtn").addEventListener("click", (e) => createNewCart(e))

const confirmedCartDisplay = document.getElementById("cartDisplay")

function createNewCart(e) {
    e.preventDefault();
    console.log(shoppingCart)
    confirmedCart.push(shoppingCart)
    confirmedCartDisplay.innerHTML = showCart(confirmedCart[0])
    return stockDatabase.post(shoppingCart)
}

function showCart(items) {

    let itemTable = `<h4 class="text-center">Shopping Cart confirmed! Products in cart: </h4>
                <table class="table table-dark text-center"  style="max-width: 800px; margin: 15px auto" id="cartTable">
                <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th></th>
                </tr>`;
    for (const objProd of items) {
        itemTable +=  `<tr class="product text-dark table-light text-center" id=cartLine${objProd.id}>
                            <td>${objProd.title}</td>
                            <td>${objProd.desc}</td>
                            <td>$${objProd.price}</td>
                            <td><img src=${objProd.thumbnail} width="40px" alt="Product"></td>
                            <td><a type="button" class="btn btn-primary" onclick="delProductFromCart('${objProd.id}')">Delete</a></td>
                        </tr> `;
    } 

    itemTable += `</table>
                <div class="d-flex justify-content-center align-items-center"><a type="button" class="btn btn-primary" onclick="delCart()">Delete Cart</a></div>
                `

    return itemTable
}

function delProductFromCart(id) {
    return cartDatabase.get()
    .then(data => cartDatabase.delete(id, data.length))
    .then(document.getElementById("cartLine" + id).outerHTML = "")   
}

function delCart() {
    return cartDatabase.get()
    .then(data => stockDatabase.delete(data.length))
    .then(document.getElementById("cartDisplay").outerHTML = `<h4 class="text-center"> Cart succesfuly deleted!</h4>`) 
}


function getStock () {
    return stockDatabase.get()
    .then (data => availableProducts.push(data))
}

updateProductDisplay()
getStock()