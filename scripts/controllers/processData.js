import { getData as getDataDB, getDataById as getDataByIDDB, saveData as saveDataDB, updateDataById as updateDataByIDDB, deleteI as deleteDataByIdDB } from "../service/repositoryData.js"


const getStock = async (req, res) => {
    const reStock = await getDataDB();
    res.send(reStock)
}

const getStockById = async (req, res) => {
    const { id } = req.params;
    const reStock = await getDataDB()
    const selStock = await getDataByIDDB(id)
    res.send(selStock)
}

const createStock = async (req, res) => {
    const newProd = req.body
    await saveDataDB(newProd.title, newProd.price, newProd.thumbnail, newProd.time, newProd.desc, newProd.stock, newProd.code)
    console.log("Post done!")
    res.json(newProd)
}

const updateStock = async (req, res) => {
    const { id } = req.params;
    const updatedProd = req.body;
    const reStock = await updateDataByIDDB(id, updatedProd.title, updatedProd.price, updatedProd.thumbnail, updatedProd.time, updatedProd.desc, updatedProd.stock, updatedProd.code);
    res.json("Update complete")
}

const deleteStock = async (req, res) => {
    const { id } = req.params;
    const reStock = await deleteDataByIdDB(id);
    res.json("delete complete")
}

export { getStock, getStockById, createStock, updateStock, deleteStock}