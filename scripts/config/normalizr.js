import contenedor from "../pers/containers/products.js"
import config from "../pers/config.js"
import SystemChat from "../pers/containers/systemChat.js"
import normalizr from 'normalizr';
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;



// chat class
const sysChat = new SystemChat("./txt/chats.txt")


// NORMALIZR
async function getChat () {
    const data = await sysChat.getAll()
    return data
}


// SCHEMAS
    
const authorSchema = new schema.Entity('author', {}, {idAttribute: 'email'});
const textSchema = new schema.Entity('texts', {author: authorSchema}, {idAttribute: 'id'}) ;
const chatLogSchema = new schema.Entity('Chat',
        { messages: [textSchema]}, {idAttribute: 'id'});

const normalizeChat = (data) => normalize(data, chatLogSchema)

async function displayNormalizedChat() {
    const messages = await sysChat.getAll();
    const normalizedItem = normalizeChat({ id: 'messages', messages });
    return normalizedItem
}

export { displayNormalizedChat, getChat}