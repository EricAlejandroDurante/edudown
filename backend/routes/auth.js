const app = require('express')
const router = app.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const secret = 'RTq+fNFrGRRwudfer2D0QuTRh+itYG69JpQj9S7/fiE='

const schemaregister = Joi.object({
    RUT: Joi.string().min(3).max(20).required(),
    name: Joi.string().min(8).max(40).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(50).required(),
    especialidad: Joi.string().min(8).max(50).required()
})

router.post('/sign-in', async (req, res) => {
    console.log
    const user = await User.findOne({email: req.body.email})

    //existe el usuario?
    if(!user) return res.status(401).json({error: true, mensaje: "Invalid credentials"});

    //Contraseña valida?
    const passvalida = await bcrypt.compare(req.body.password, user.password)
    if(!passvalida) return res.status(400).json({error: true, mensaje: 'RUT INVALIDO'});

    const token = jwt.sign({
        id: user.id
    }, process.env.TOKEN_SECRET || secret)
    // jti = obtener jti de token
    // tabla sessions: id, userId,  jti
    // session = Session.create(userId: user.id, jti: jti)
    console.log(user.id)
    res.json({
        accessToken: token,
        sessionId: user.id // session.id
    })
})

router.post('/sign-up', async (req,res) =>{
    const {error} = schemaregister.validate(req.body)
    
    if(error){
        return res.status(400).json({error: error.details[0].message})
    }

    const existeElEmail = await User.findOne({email: req.body.email})
    if(existeElEmail) return res.status(422).json({error: true, mensaje: "Email ya registrado"})

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

// ruta para desloguear
// delete /sessions/id
// también puede ser post /sign-out?sessionId=id
// Session.destroy
// responder con 204 no content


module.exports = router;
