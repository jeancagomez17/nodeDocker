const jwt = require('jsonwebtoken')
const tokenS =  require('../config')

function verifyToken(req,res,next){
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(404).json({
            token:null,
            auth:false
        }) 

    }
    const decode = jwt.verify(token, tokenS)
    req.userId = decode.id
    next()
}
module.exports = verifyToken