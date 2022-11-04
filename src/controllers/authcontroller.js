const router = require('express').Router();
const modelUser = require('../models/User')
const jwt = require('jsonwebtoken')
const tokenS =  require('../config')
const verifyToken = require('./verifyToken')

router
.get('/prueba', (req, res)=>{
    res.send('bienvenido')
})
.post('/signup', async (req, res) => {
    
    const { username, email, password } = req.body
    const newUser = new modelUser({
        username,
        email,
        password
    })
    newUser.password = await newUser.encryptPassword(newUser.password)
    console.log(newUser)
    await newUser.save()
    const tok = jwt.sign( {id : newUser?._id}, tokenS, {
        expiresIn: 60 * 60 * 24
    } )
    res.json({
        auth:true,
        msg: "creado",
        tok
    })
})
.post('/signin', async (req, res)=>{
    const {email, password }= req.body
    const user = await modelUser.findOne({email})
    if(!user){
        return res.status(404).json({
            email:"No existe"
        })
    }
    const validatePass = await user.validatePassword(password)
    if(!validatePass){
        return res.status(404).json({
            token:null,
            auth:false
        }) }
    const tok = jwt.sign( {id : user?._id}, tokenS,{
        expiresIn: 60 * 60 * 24
    })
    return res.status(200).json({
        token:tok,
        auth:true
    })


})
.get('/me',verifyToken, async (req, res)=>{
    const user = await modelUser.findById(req.userId, {password: 0})
    return res.json({ msg:"True", user})
})

module.exports = router