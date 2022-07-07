const jwt = require('jsonwebtoken');
const secret = 'RTq+fNFrGRRwudfer2D0QuTRh+itYG69JpQj9S7/fiE='
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({error: 'Acceso denegado'})

    try {
        const verificar = jwt.verify(token, process.env.TOKEN_SECRET|| secret)
        req.user =verificar
        next()
    } catch (error) {
        res.status(400).json({error: 'Acceso denegado'})
    }
}

module.exports = verifyToken;