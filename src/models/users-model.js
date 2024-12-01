const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'Campo requerido'],
        minLength:[3, 'Se requiere mínimo 3 caracteres'],
        maxLength:[50, 'Se acepta máximo 50 caracteres']
    },
    userLastName: {
        type: String,
        required: [true, 'Campo requerido'],
        minLength:[4, 'Se requiere mínimo 4 caracteres'],
        maxLength:[50, 'Se acepta máximo 50 caracteres']
    },
    userDepartment:{
        type: String,
        required: [true, 'Campo requerido'],
        minLength:[3, 'Se requiere mínimo 3 caracteres'],
        maxLength:[100, 'Se acepta máximo 100 caracteres']
    },
    userPosition:{
        type: String,
        required: [true, 'Campo requerido'],
        minLength:[3, 'Se requiere mínimo 3 caracteres'],
        maxLength:[80, 'Se acepta máximo 80 caracteres']
    },
    userEmail: {
        type: String, 
        required: [true, 'Campo requerido'],
        minLength:[10, 'Se requiere mínimo 10 caracteres'],
        maxLength:[80, 'Se acepta máximo 80 caracteres']
    },
    userPassword: {
        type: String, 
        required: [true, 'Campo requerido'],
        minLength:[8, 'Se requiere mínimo 8 caracteres']
    },
    userCreateDate: {type:Date, default:Date.now},
    isAdmin: {type:Boolean, default:false},
    isActive: {type:Boolean, default:true}
});

module.exports = mongoose.model('user', userSchema);