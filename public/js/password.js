const password1 = document.getElementById("password1")
const password2 = document.getElementById("password2")
const passwordMsg = document.getElementById("pswdMiss")
const passwordCheck = document.getElementById("passwordCheck")

password2.addEventListener('change', (event) => {
    if (password1.value == password2.value) {
        passwordMsg.innerText="";
        document.getElementById("passwordCheck").disabled = false
    } else {
        passwordMsg.innerText="Passwords mismatch";
        document.getElementById("passwordCheck").disabled = true
    }
});