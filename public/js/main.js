const socket = io.connect();

function render(data) {
    const html = data.map(elem =>{
        return(`<div class="text-success fst-italic"><span class="fw-bold text-primary">${elem.author}- </span><span style="color:brown">${elem.date}</span> : ${elem.text}</div>`)
    }).join(" ")
    document.getElementById("messages").innerHTML = html
}

function addMessage(e) {
    e.preventDefault()
    const time = new Date()
    const mensaje = {
        author: document.getElementById("user").value,
        text: document.getElementById("text").value,
        date: time.getDate() + "/" + time.getMonth() + 1 + "/" + time.getFullYear() + " - " + time.getHours() + ":" +time.getMinutes()
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
    return fetch('./views/main.hbs')
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
    }
    socket.emit("new-product", newProd)
    return false
}
