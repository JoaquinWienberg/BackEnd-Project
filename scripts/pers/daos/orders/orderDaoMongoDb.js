
import ContainerMongoDb from "../../containers/mongoContainer.js"

class OrdersDaoMongoDb extends ContainerMongoDb {

    constructor() {
        super('orders', {
            products: { type: Array, required: true },
            orderNumber: { type: Number, required: true },
            state: { type: String, required: true },
            timestamp: { type: String, required: true },
            email: { type: String, required: true },
            totalPrice: { type: Number, required: true },
        })
    }
}

export default OrdersDaoMongoDb


