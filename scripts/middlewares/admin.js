const adminOn = true

function nonAdminError(route, method) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `route '${route}' method '${method}' not available`
    } else {
        error.descripcion = 'not available'
    }
    return error
}

function adminsCheck(req, res, next) {
    if (!adminOn) {
        res.json(nonAdminError())
    } else {
        next()
    }
}

export default adminsCheck