import { fork } from "child_process"

const random = async (req, res) => {
    const cantidad = req.query.cantidad ?? 1000;
    //console.log(cantidad)
    const forked = fork("../service/calculate.js");
    forked.send(cantidad)
    forked.on("message", (objeto) => {
        console.log("res", objeto)
        res.send(objeto)
    })
}

export default random