import logger from "../service/logger.js"

const info = async (req, res) => {
    logger.info("Ingreso a info exitoso!")
    res.render('info', {argumentos: process.argv.slice(2), nombrePlataforma: process.platform, nodeVer: process.version, memoriaRes: process.memoryUsage().rss, pathExe: process.execPath, proId: process.pid, carpeta: process.cwd() });

}

export default info