// Express setup
import express from "express"
import contenedor from "../containers/products.js"
import adminsCheck from "./admin.js"
import config from "./config.js"
import path from "path";
import { fileURLToPath } from 'url';
import logger from "./logger.js";

const { Router } = express;
// Stock class
const Contenedor = contenedor
const stock = new Contenedor(config.mariaDb, "products")


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Router
const routerProducts = new Router();
routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended: true}))

routerProducts.get("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const reStock = await stock.getAll()
    const selStock = await stock.getById(parseInt(id))
    if ( parseInt(id) <= reStock.length) {
    res.send(selStock)} else {
    logger.warn("Product not found")
    res.send("Product not found")
    }
})

routerProducts.post("/productos", adminsCheck, async (req, res) => {
    const newProd = req.body
    console.log(req.body)
    await stock.save(newProd.title, newProd.price, newProd.thumbnail, newProd.time, newProd.desc, newProd.stock, newProd.code)
    console.log("Post done!")
    //res.json(newProd)
})

routerProducts.put("/productos/:id", adminsCheck, async (req, res) => {
    const { id } = req.params;
    const updatedProd = req.body;
    const reStock = await stock.updateById(id, updatedProd.title, updatedProd.price, updatedProd.thumbnail, updatedProd.time, updatedProd.desc, updatedProd.stock, updatedProd.code);
    res.json(reStock)
})

routerProducts.delete("/productos/:id", adminsCheck, async (req, res) => {
    const { id } = req.params;
    const reStock = await stock.deleteById(id);
    res.json(reStock)
})

routerProducts.get('/productos', async (req, res) => {
    const reStock = await stock.getAll()
    res.json(reStock);
})




export default routerProducts
