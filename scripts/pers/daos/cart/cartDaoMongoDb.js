
import ContainerMongoDb from "../../containers/mongoContainer.js"

class CartsDaoMongoDb extends ContainerMongoDb {

    constructor() {
        super('carts', {
            products: { type: Array, required: true },
            timestamp: { type: String, required: true },
            email: { type: String, required: true },
            location: { type: String, required: true },
        })
    }
}

export default CartsDaoMongoDb

