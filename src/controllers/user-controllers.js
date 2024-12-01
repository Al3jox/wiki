
const userCtr = {};
const userModel = require('../models/users-model.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Crear User
userCtr.createUser = async(req, res) => {
    const {userName, userLastName, userDepartment, userPosition, userEmail, userPassword} = req.body
    const newUser = new userModel({
        userName, 
        userLastName, 
        userDepartment, 
        userPosition, 
        userEmail, 
        userPassword
    })

    const userEmailValidator = await userModel.findOne({userEmail:userEmail})
    if(userEmailValidator){
        res.json({
            mensaje: 'El usuario ya se encuentra creado'
        })
    }
    else{
        newUser.userPassword = await bcrypt.hash(userPassword, 10)
        const token = jwt.sign({_id:userPassword._id}, '%$S3cW1k*1+Pa4s-.')
        await newUser.save()
        res.json({
            mensaje: '¡Usuario creado exitosamente!',
            id: newUser._id,
            name: newUser.userName,
            lastname: newUser.userLastName, 
            token
        })
    }

}


// Listar Users
userCtr.listUsers = async(req, res) => {
    const respuesta = await userModel.find()
    res.json(respuesta)
}


userCtr.login = async(req, res) => {
    const {userEmail, userPassword} = req.body
    const user = await userModel.findOne({userEmail:userEmail})
    if(!user){
        return res.json({
            mensaje: 'Correo incorrecto'
        })
    }

    const match = await bcrypt.compare(userPassword, user.userPassword)
    if(match){
        const token = jwt.sign({_id:user._id}, '%$S3cW1k*1+Pa4s-.')
        res.json({
            mensaje: 'Bienvenido',
            id: user._id,
            name: user.userName,
            lastname: user.userLastName, 
            token
        })
    }

    else{
        res.json({
            mensaje: 'Contraseña incorrecta'
        })
    }

}

 module.exports = userCtr
