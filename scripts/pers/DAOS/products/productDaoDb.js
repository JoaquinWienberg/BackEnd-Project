
import contenedor from "../../containers/products.js"
import config from "../../../pers/config.js"

let instance = null
class ProductsDaoDb extends contenedor {

    constructor() {

            super(config.mariaDb, "products")

    }

    static getInstance() {
        if(!instance) {
            instance = new ProductsDaoDb(config.mariaDb, "products");
        }
        return instance;
    }

}

export default ProductsDaoDb

