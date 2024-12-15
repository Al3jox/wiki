const mongoose = require('mongoose');
const {Schema} = mongoose

const caseSchema = new Schema({
    caseAlarmName: {
        type: String,
        required: [true, 'Campo requerido'],
        minLength:[5, 'Se requiere mínimo 5 caracteres'],
        maxLength:[100, 'Se acepta máximo 100 caracteres']
    },
    caseClient: {
        type: String,
        required: [true, 'Campo requerido'],
        minLength:[4, 'Se requiere mínimo 4 caracteres'],
        maxLength:[80, 'Se acepta máximo 80 caracteres']
    },
    caseTeamInCharge:{
        type: String,
        required: [true, 'Campo requerido'],
        minLength:[3, 'Se requiere mínimo 3 caracteres'],
        maxLength:[100, 'Se acepta máximo 100 caracteres']
    },
    caseDetail:{
        type: String,
        required: [true, 'Campo requerido'],
        minLength:[10, 'Se requiere mínimo 10 caracteres'],
        maxLength:[3000, 'Se acepta máximo 100 caracteres']
    },
    caseKeyWords:{
        type: [String],
        required: [true, 'Campo requerido'],
        validate:
        [
            {
            validator: function (keyWords){
                return keyWords.every(word => word.length >= 3 && word.length <= 50);
                },
                message: 'Cada palabra debe tener entre 3 y 50 caracteres'
            },
            {
            validator: function (keyWords){
                return keyWords.length > 0;
                },
                message: 'Los campos del arreglo no pueden ir vacios'
            }
        ]
    },
    userCreateDate: {type:Date, default:Date.now},
    isActive: {type:Boolean, default:true}
});

module.exports = mongoose.model('case', caseSchema);