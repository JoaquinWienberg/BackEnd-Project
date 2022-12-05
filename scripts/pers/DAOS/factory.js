import process from "process"
import ProductsDaoDb from "./products/productDaoDb.js";


let productsDaoFile

let productsDao
const option = process.argv[2] || 'Mem';


switch (option) {
    case 'sql':
        productsDao = new ProductsDaoDb();
        break
    case 'mongodb':   
        console.log("Mongo DB Unavailable. Current assignment was made with SQL")
        break
    default:
        productsDao = new ProductsDaoDb();
        break
}


export { productsDao, productsDaoFile }