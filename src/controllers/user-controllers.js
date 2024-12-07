
const userCtr = {};
const userModel = require('../models/users-model.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users-model.js');

// Crear User
userCtr.createUser = async (req, res) => {
    try {
        const { userName, userLastName, userDepartment, userPosition, userEmail, userPassword } = req.body;

        const newUser = new userModel({
            userName,
            userLastName,
            userDepartment,
            userPosition,
            userEmail,
            userPassword
        });

        await newUser.validate();

        const userEmailValidator = await userModel.findOne({ userEmail });

        if (userEmailValidator) {
            return res.status(400).json({ mensaje: 'El usuario ya se encuentra creado' });
        }

        newUser.userPassword = await bcrypt.hash(userPassword, 10);

        const savedUser = await newUser.save();

        const token = jwt.sign({ _id: savedUser._id }, '%$S3cW1k*1+Pa4s-.');
        res.status(201).json({
            mensaje: '¡Usuario creado exitosamente!',
            id: savedUser._id,
            name: savedUser.userName,
            lastname: savedUser.userLastName,
            token
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                mensaje: 'Error de validación',
                errores: error.errors
            });
        }

        res.status(500).json({
            mensaje: 'Error interno del servidor',
            error: error.message
        });
    }
};



// Listar Users
userCtr.listUsers = async(req, res) => {
    try {
        const respuesta = await userModel.find().select('-userPassword -isAdmin -isActive');
        res.json(respuesta)
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar los usuario',
            error: error.message
        });
    }
}

// Listar Users por ID
userCtr.listUsersById = async(req, res) => {
    try {
        const id = req.params.id;
        const listOneUser = await userModel.findById(
            id
        ).select('-userPassword -isAdmin -isActive');
        
        if(!listOneUser){
            return res.status(404).json({mensaje: "El usuarion no existe. Por favor validar el ID"});
        }

        res.status(200).json({
            mensaje: "Usuario encontrado: ",
            usuario: listOneUser
        })

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar el usuario',
            error: error.message
        });
    }
}


// Actualizar Users
userCtr.updateUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const updatedUser = await userModel.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators:true }
        );

        if (!updatedUser) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({
            mensaje: 'El usuario fue actualizado con éxito!',
            updatedUser
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el usuario',
            error: error.message
        });
    }
};


// Eliminar User
userCtr.deleteUser = async(req, res) => {
    try {
        const id = req.params.id

        const deleteUserById = await userModel.findByIdAndDelete(
            id
        )

        if(!deleteUserById){
            return res.status(404).json({mensaje:"El usuario no fue encontrado"});
        }

        res.json({
            mensaje: "¡El usuario fue eliminado con éxito!"
            })

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el usuario",
            error: error.message
        })
    }
}

// Login del user
userCtr.login = async(req, res) => {
    try {
        const {userEmail, userPassword} = req.body
        const user = await userModel.findOne({userEmail:userEmail})
        if(!user){
            return res.json({
                mensaje: 'Correo incorrecto'
            })
        }

        const match = await bcrypt.compare(userPassword, user.userPassword)
        if(match){
            const token = jwt.sign(
                {_id:user._id}, 
                '%$S3cW1k*1+Pa4s-.',
                {expiresIn: '8h'}
            )
            res.json({
                mensaje: 'Bienvenido',
                id: user._id,
                name: user.userName,
                lastname: user.userLastName,
                isAdm: user.isAdmin,
                isAct: user.isActive,
                token
            });
        }

        else{
            res.json({
                mensaje: 'Contraseña incorrecta'
            })
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Ha ocurrido un error: ',
            error: error.message
        });
    }

}

 module.exports = userCtr
