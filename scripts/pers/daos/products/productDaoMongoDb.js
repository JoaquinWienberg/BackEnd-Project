
import ContainerMongoDb from "../../containers/mongoContainer.js"

class ProductsDaoMongoDb extends ContainerMongoDb {

    constructor() {
        super('products', {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            desc: { type: String, required: true },
            code: { type: String, required: true },
            timestamp: { type: String, required: true },
            category: { type: String, required: true },
        })
    }
}

export default ProductsDaoMongoDb

