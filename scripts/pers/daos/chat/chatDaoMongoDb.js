import ContainerMongoDb from "../../containers/mongoContainer.js"

class ChatDaoMongoDb extends ContainerMongoDb {

    constructor() {
        super('chats', {
            type: { type: String, required: true },
            timestamp: { type: String, required: true },
            email: { type: String, required: true },
            message: { type: String, required: true },
        })
    }
}

export default ChatDaoMongoDb