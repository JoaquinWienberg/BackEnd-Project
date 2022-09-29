const socket = io.connect();

// MESSAGE SCHEMES (Normalizr)

const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const textSchema = new normalizr.schema.Entity('texts', { author: authorSchema }, { idAttribute: 'id' })
const chatLogSchema = new normalizr.schema.Entity('Chat', { messages: [textSchema] }, { idAttribute: 'id' })

// MESSAGES

function render(data) {
    const html = data.map(elem =>{
        return(`<div class="text-success fst-italic"><span class="fw-bold text-primary">${elem.author.name} ${elem.author.surname}- ${elem.author.age} - <img src="${elem.author.avatar}" width=25px</span><span style="color:brown">${elem.timedate}</span> : ${elem.text}</div>`)
    }).join(" ")
    document.getElementById("messages").innerHTML = html
}

const chatHTML = document.getElementById("messages");

function addMessage(e) {
    e.preventDefault()
    const time = new Date()
    const mensaje = {
        author: {
            id: document.getElementById("name").value,
            email: document.getElementById("user").value,
            name: document.getElementById("name").value,
            surname: document.getElementById("surname").value,
            alias: document.getElementById("alias").value,
            avatar: document.getElementById("avatar").value,
            age: document.getElementById("age").value,
        },
        timedate: time.getDate() + "/" + (parseInt(time.getMonth()) + 1) + "/" + time.getFullYear() + " - " + time.getHours() + ":" +time.getMinutes(),
        text: document.getElementById("text").value,
    }

    socket.emit("new-messages", mensaje)
    /*if (result.includes("@")) {
        
        console.log(mensaje.author + " " + mensaje.text)} else {
        console.log("Error: Incorrect Email")
    }*/
    return false
    

}

socket.on('messages', data => {
    console.log(data)
    let msgs = normalizr.denormalize(data.result, chatLogSchema, data.entities);
    console.log(msgs)
    let normAmount = JSON.stringify(data).length;
    let dinormAmount = JSON.stringify(msgs).length;
    let reduction = parseInt((normAmount/dinormAmount)*100)
    document.getElementById('reduct').innerText = ("Relación con respecto al contenido sin normalizar: " + reduction + "%")
    render(msgs.messages)
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
