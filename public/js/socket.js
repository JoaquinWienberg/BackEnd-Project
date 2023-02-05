const socket = io.connect();

// MESSAGES

function render(data) {
    const html = data.map(elem =>{
        return(`<div class="text-success fst-italic"><span class="fw-bold text-primary">${elem.email}</span><span style="color:brown">${elem.timestamp}</span> : ${elem.message}</div>`)
    }).join(" ")
    document.getElementById("messages").innerHTML = html
}

const chatHTML = document.getElementById("messages");

function addMessage(e) {
    e.preventDefault()
    const time = new Date()
    const mensaje = {
        email: document.getElementById("user").value,
        type: "User",
        timestamp: time.getDate() + "/" + (parseInt(time.getMonth()) + 1) + "/" + time.getFullYear() + " - " + time.getHours() + ":" + time.getMinutes(),
        message: document.getElementById("text").value,
    }
    socket.emit("new-messages", mensaje)
    return false
}

socket.on('messages', data => {
    render(data)
})

document.getElementById("chatForm").addEventListener("click", (e) => addMessage(e))


