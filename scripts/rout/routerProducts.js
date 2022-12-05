// Express setup
import express from "express"
import adminsCheck from "../middlewares/admin.js"
import { getStock, getStockById, createStock, updateStock, deleteStock} from "../controllers/processData.js"

const { Router } = express;

// Router
const routerProducts = new Router();
routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended: true}))

// Paths

routerProducts.get("/productos/:id", getStockById)

routerProducts.post("/productos", adminsCheck, createStock)

routerProducts.put("/productos/:id", adminsCheck, updateStock)

routerProducts.delete("/productos/:id", adminsCheck, deleteStock)

routerProducts.get('/productos', getStock)

export default routerProducts
