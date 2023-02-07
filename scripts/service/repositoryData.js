import { productsDaoMongo, cartDaoMongo } from "../pers/daos/factory.js"
import { asDto } from "../pers/DTO/productDto.js"

// Stock class

const stock = productsDaoMongo

// Data Repository functions

const getData = async () => {
    const data = await stock.getAll()
    return asDto(data)
}

const getDataById = async (id) => {
    const data = await stock.getById(id)
    return asDto(data)
}

const getDataByCategoryDB = async (category) => {
    const data = await stock.getByCategory(category)
    return asDto(data)
}

const deleteI = async (id) => {
    const data = await stock.deleteById(id)
    return data
}

const saveData = async (newProduct) => {
    const data = await stock.save(newProduct)
    return data
}

const updateDataById = async (id, updatedProduct) => {
    const data = await stock.updateById(id, updatedProduct)
    return data
}



export { getData, getDataById, saveData, updateDataById, deleteI, getDataByCategoryDB }