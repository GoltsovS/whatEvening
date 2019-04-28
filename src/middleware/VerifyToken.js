const jwt = require('jsonwebtoken')
const config = require('../config/config')

function verifyToken(req, res, next) {
    const token = req.cookies.token
    
    if (!token) {
        return res.status(403).send({
            auth: false,
            message: 'Токен недоступен'
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Ошибка при проверке токена',
                cookie: token
            })
        }
        
        req.userId = decoded.id
        next()
    })
}

module.exports = verifyToken