const caseCtr = {};
const caseModel = require('../models/case-model.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


// Crear Case
caseCtr.createCase = async (req, res) => {
    try {
        const { caseAlarmName, caseClient, caseTeamInCharge, caseDetail, caseKeyWords } = req.body;

        const newCase = new caseModel({
            caseAlarmName,
            caseClient,
            caseTeamInCharge,
            caseDetail,
            caseKeyWords
        });

        await newCase.validate();

        const caseAlarmNameValidator = await caseModel.findOne({ caseAlarmName });

        if (caseAlarmNameValidator) {
            return res.status(400).json({ mensaje: 'El caso ya existe. Por favor validar el histórico' });
        }

        const savedCase = await newCase.save();

        res.status(201).json({
            mensaje: '¡Caso registrado exitosamente!',
            id: savedCase._id,
            name: savedCase.caseAlarmName
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


// Listar Cases
caseCtr.listCases = async(req, res) => {
    try {
        const respuesta = await caseModel.find();
        res.json(respuesta)
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar Casos',
            error: error.message
        });
    }
}

// Listar Cases por ID
caseCtr.listCaseById = async(req, res) => {
    try {
        const id = req.params.id;
        const listOneCase = await caseModel.findById(id);
        
        if(!listOneCase){
            return res.status(404).json({mensaje: "El caso no existe. Por favor validar el ID"});
        }

        res.status(200).json({
            mensaje: "Caso encontrado: ",
            Detalles: listOneCase
        })

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar el caso',
            error: error.message
        });
    }
}


// Listar Cases por nombre de alarma
caseCtr.listCaseByAlarmName = async(req, res) => {
    try {
        const {alarmName} = req.params;
        const listOneCase = await caseModel.find(
            {
            caseAlarmName:
                {$regex:`.*${alarmName}.*`, $options:'i'}
            });
        

        if (!listOneCase || listOneCase.length === 0) {
            return res.status(404).json({
                mensaje: "El caso no existe. Por favor validar el nombre de la alarma"
            });
        }

        res.status(200).json({
            mensaje: "Caso encontrado: ",
            Detalles: listOneCase
        })

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar los casos',
            error: error.message
        });
    }
}



// Listar Cases por cliente
caseCtr.listCaseByClient = async(req, res) => {
    try {
        const {client} = req.params;
        const listOneCase = await caseModel.find(
            {
            caseClient:
                {$regex:`.*${client}.*`, $options:'i'}
            });
        

        if (!listOneCase || listOneCase.length === 0) {
            return res.status(404).json({
                mensaje: "Cliente no encontrado. Por favor validar el nombre del cliente"
            });
        }

        res.status(200).json({
            mensaje: "Caso encontrado: ",
            Detalles: listOneCase
        })

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar los casos por cliente',
            error: error.message
        });
    }
}


// Listar Cases por nombre de alarma
caseCtr.listCaseByAlarmName = async(req, res) => {
    try {
        const {alarmName} = req.params;
        const listOneCase = await caseModel.find(
            {
            caseAlarmName:
                {$regex:`.*${alarmName}.*`, $options:'i'}
            });
        

        if (!listOneCase || listOneCase.length === 0) {
            return res.status(404).json({
                mensaje: "El caso no existe. Por favor validar el nombre de la alarma"
            });
        }

        res.status(200).json({
            mensaje: "Caso encontrado: ",
            Detalles: listOneCase
        })

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar los casos',
            error: error.message
        });
    }
}



// Listar Cases por key word
caseCtr.listCaseByKeyWord = async(req, res) => {
    try {
        const {keyWord} = req.params;
        const listOneCase = await caseModel.find(
            {
            caseKeyWords:
                {$regex:`.*${keyWord}.*`, $options:'i'}
            });
        

        if (!listOneCase || listOneCase.length === 0) {
            return res.status(404).json({
                mensaje: "Palabras clave no encontradas. Por favor validar el nombre del cliente"
            });
        }

        res.status(200).json({
            mensaje: "Caso encontrado: ",
            Detalles: listOneCase
        })

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar los casos por cliente',
            error: error.message
        });
    }
}


// Actualizar Case
caseCtr.updateCaseById = async (req, res) => {
    try {
        const id = req.params.id;

        const updatedCase = await caseModel.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators:true }
        );

        if (!updatedCase) {
            return res.status(404).json({ mensaje: 'Caso no encontrado' });
        }

        res.json({
            mensaje: 'El caso fue actualizado con éxito!',
            updatedCase
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el caso',
            error: error.message
        });
    }
};

// Eliminar Case
caseCtr.deleteCase = async(req, res) => {
    try {
        const id = req.params.id

        const deleteCaseById = await caseModel.findByIdAndDelete(
            id
        )

        if(!deleteCaseById){
            return res.status(404).json({mensaje:"El caso no fue encontrado"});
        }

        res.json({
            mensaje: "¡El caso fue eliminado con éxito!"
            })

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el caso",
            error: error.message
        })
    }
}

module.exports = caseCtr;