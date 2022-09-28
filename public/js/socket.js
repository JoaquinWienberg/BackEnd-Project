const socket = io.connect();

function render(data) {
    const html = data.map(elem =>{
        return(`<div class="text-success fst-italic"><span class="fw-bold text-primary">${elem.id}- </span><span class="fw-bold text-primary">${elem.firstName} ${elem.lastName}- ${elem.age} - ${elem.alias} - ${elem.avatar}</span><span style="color:brown">${elem.timedate}</span> : ${elem.text}</div>`)
    }).join(" ")
    document.getElementById("messages").innerHTML = html
}

function addMessage(e) {
    e.preventDefault()
    const time = new Date()
    const mensaje = {
        author: {
            id: document.getElementById("user").value,
            timedate: time.getDate() + "/" + (parseInt(time.getMonth()) + 1) + "/" + time.getFullYear() + " - " + time.getHours() + ":" +time.getMinutes(),
            firstName: document.getElementById("name").value,
            lastName: document.getElementById("surname").value,
            alias: document.getElementById("alias").value,
            avatar: document.getElementById("avatar").value,
            age: document.getElementById("age").value,
        },

        text: document.getElementById("text").value,
    }

    const result = document.getElementById("user").value

    if (result.includes("@")) {
        socket.emit("new-messages", mensaje)
        console.log(mensaje.author + " " + mensaje.text)} else {
        console.log("Error: Incorrect Email")
    }
    return false
}

socket.on('messages', data => {
    console.log(data)
    render(data)
})

document.getElementById("chatForm").addEventListener("click", (e) => addMessage(e))


// Add product list hbs in html

async function makeHtmlTable(productsT) {
    return fetch('../views/main.hbs')
        .then(res => res.text())
        .then(chart => {
            const template = Handlebars.compile(chart);
            const html = template({displayProducts: productsT, stockExists: true })
            console.log(productsT)
            return html
        })
}

socket.on('products', async data => {
    const productsDisplay = makeHtmlTable(data)
    renderProds(productsDisplay)
});

async function renderProds(data) {
    const prodsHTML = await data
    document.getElementById("itemsDisplay").innerHTML = prodsHTML
}

document.getElementById("addProdBtn").addEventListener("click", (e) => addNewProduct(e))

function addNewProduct(e) {
    e.preventDefault()
    newProd = {
        title: document.getElementById("newProdName").value,
        price: document.getElementById("newProdPrice").value,
        thumbnail: document.getElementById("newProdThumbnail").value,
        desc: document.getElementById("newProdDesc").value,
        stock: document.getElementById("newProdStock").value,
        code: document.getElementById("newProdCode").value,
    }
    socket.emit("new-product", newProd)
    return false
}
