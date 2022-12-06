
import contenedor from "../../containers/products.js"
import config from "../../../pers/config.js"
import SingletonClass from "../../containers/singleton.js"


class ProductsDaoDb extends SingletonClass {

    constructor() {

            super(config.mariaDb, "products")

    }

}

export default ProductsDaoDb

