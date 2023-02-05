
document.getElementById("addProdBtn").addEventListener("click", (e) => addNewProduct(e))

function addNewProduct(e) {
    e.preventDefault()
    const time = new Date()
    newProd = {
        title: document.getElementById("newProdName").value,
        price: document.getElementById("newProdPrice").value,
        thumbnail: document.getElementById("newProdThumbnail").value,
        time: time.getDate() + "/" + time.getMonth() + 1 + "/" + time.getFullYear() + " - " + time.getHours() + ":" +time.getMinutes(),
        desc: document.getElementById("newProdDesc").value,
        stock: document.getElementById("newProdStock").value,
        code: document.getElementById("newProdCode").value,
    }
    stockDatabase.post(newProd);
    updateProductDisplay();

}

// Products display

const stockDatabase = {

    get: () => {
        return fetch('/api/products')
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
        return fetch('/api/products', options)
    },
    put: (idProd, newProd) => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(newProd),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return fetch(`/api/products/${idProd}`, options)
    },
    delete: (idProd) => {
        const options = {
            method: 'DELETE'
        }
        return fetch(`/api/products/${idProd}`, options)
    }
}

const productDisplay = document.getElementById("itemsDisplay")

// Delete item

function deleteProduct(itemId) {
    return stockDatabase.delete(itemId)
        .then(items => addProductsTable (items))
        .then(dataHTML => {
            productDisplay.innerHTML = dataHTML;
            document.getElementById("item" + id).outerHTML = ""
        })
}

// UpdateProduct

function addUpdateProduct(itemId) {
    const itemLine = document.getElementById("item"+itemId)
    const updatedInfoLine = `
                                <th><input type="text" name="title" placeholder="Name" id="updatedInfoTitle${itemId}"></th>
                                <th><input type="text" name="title" placeholder="Description" id="updatedInfoDesc${itemId}"></th>
                                <th><input type="number" name="title" placeholder="Price" id="updatedInfoPrice${itemId}"></th>
                                <th><input type="text" name="title" placeholder="Image Url" id="updatedInfoUrl${itemId}"></th>
                                <th><input type="number" name="title" placeholder="Stock" id="updatedInfoStock${itemId}"></th>
                                <th><input type="text" name="title" placeholder="Code" id="updatedInfoCode${itemId}"></th>
                                <td><a type="button" class="btn btn-primary" onclick="updateProduct('${itemId}')">Update</a></td>
                                <th></th>
                            `
    let tr = document.createElement("tr")
    tr.innerHTML = updatedInfoLine
    itemLine.after(tr)
}

function updateProduct(itemId) {
    let updatedProduct = {
        title: document.getElementById(`updatedInfoTitle${itemId}`).value,
        desc: document.getElementById(`updatedInfoDesc${itemId}`).value,
        price: document.getElementById(`updatedInfoPrice${itemId}`).value,
        thumbnail: document.getElementById(`updatedInfoUrl${itemId}`).value,
        stock: document.getElementById(`updatedInfoStock${itemId}`).value,
        code: document.getElementById(`updatedInfoCode${itemId}`).value,
        id: itemId
    }

    console.log(updatedProduct)

    stockDatabase.put(itemId, updatedProduct)

    updateProductDisplay();
}

// Update display function

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
                    <th>Code</th>
                    <th>Stock</th>
                    <th></th>
                    <th></th>
                </tr>`;
    for (const objProd of items) {
        itemTable +=  `<tr class="product text-dark table-light text-center" id="item${objProd.id}">
                            <td>${objProd.title}</td>
                            <td>${objProd.desc}</td>
                            <td>$${objProd.price}</td>
                            <td><img src=${objProd.thumbnail} width="40px" alt="Product"></td>
                            <td>${objProd.code}</td>
                            <td>${objProd.stock}</td>
                            <td><a type="button" class="btn btn-danger" onclick="deleteProduct('${objProd.id}')">Delete product</a></td>
                            <td><a type="button" class="btn btn-primary" onclick="addUpdateProduct('${objProd.id}')">Update data</a></td>
                        </tr> `;
    } 

    itemTable += "</table>"

    return itemTable
}

updateProductDisplay ()

