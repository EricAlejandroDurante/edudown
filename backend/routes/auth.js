const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');


const schemaregister = Joi.object({
    RUT: Joi.string().min(3).max(20).required(),
    name: Joi.string().min(8).max(40).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(50).required(),
    especialidad: Joi.string().min(8).max(50).required()
})

router.post('/sign-in', async (req, res) =>{
    const user = User.findOne({RUT:req.body.rut})

    //existe el ususario?
    if(!user) return res.status(400).json({error: true, mensaje: "RUT INVALIDO"});

    //Contraseña valida?
    const passvalida = await bcrypt.compare(req.body.password, user.password)
    if(!passvalida) return res.status(400).json({error: true, mensaje: 'RUT INVALIDO'});

    const token = jwt.sign({
        name: user.name
    }, process.env.TOKEN_SECRET)


    res.json({
        accessToken: token,
        sessionId: "1"
    })
})


router.post('/register', async (req,res) =>{
    const {error} = schemaregister.validate(req.body)
    
    if(error){
        return res.status(400).json({error: error.details[0].message})
    }

    const existeElEmail = await User.findOne({email: req.body.email})
    if(existeElEmail) return res.status(400).json({error: true, mensaje: "Email ya registrado"})

    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltos)


    const user = new User({
        RUT: req.body.rut,
        name: req.body.name,
        email: req.body.email,
        especialidad: req.body.especialidad,
        password: password
    })

    try {
        const userDB = await user.save();
        res.json({
            error: null,
            data: userDB
        })
    } catch (error) {
        res.status(400).json(error)
    }  
});

module.exports = router;