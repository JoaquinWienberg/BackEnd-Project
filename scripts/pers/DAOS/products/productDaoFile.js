import contenedor from "../../containers/products.js"

class ProductDaoFile extends contenedor {

    constructor() {
        super('catalog.txt')
    }

}

export default ProductDaoFile