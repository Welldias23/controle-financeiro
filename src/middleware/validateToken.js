const { verifyToken } = require("../core/jwt")

const validateToken = (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({mensagem: "O usuario não esta logado."})
    } 

    try {
        const token = authorization.split(" ")[1]
        const users = verifyToken(token)
        req.users = users
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({mensagem: "O usuario não esta logado."})
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({mensagem: "O usuario não esta logado."})
        }
        return  res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

module.exports = validateToken