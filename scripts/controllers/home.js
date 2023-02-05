const home = (req, res) => {
    const { user } = req;
    const nombre = req.session.user
    if (req.session.user) {
        res.render('index', {nombre: nombre});
    } else {
        res.redirect('/login');
    }
}

export default home