import { getDataById, saveData, updateDataById, deleteI } from "../service/repositoryData.js"

async function returnProductById(data){
    return getDataById(data.id)
}

async function saveProduct(data){
    return saveData(data.title, data.price, data.thumbnail, data.timestamp, data.desc, data.stock, data.code)
}

async function updateProduct(data){
    return updateDataById(data.id, data.title, data.price, data.thumbnail, data.timestamp, data.desc, data.stock, data.code)
}

async function deleteProductById(data){
    return deleteI(data.id)
}

export { returnProductById, saveProduct, updateProduct, deleteProductById }