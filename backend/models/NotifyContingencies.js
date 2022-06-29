const { Schema, model } = require('mongoose');
const notifyContingenciesSchema = Schema({
    boxNotify: {
        type: String,
        required: true,
    },
    dateNotify:{
        type: String,
        required: true
    },
    timeNotification:{
        type: String,
        required: true
    },
    userNotification:{
        type: String,
        required: true
    },
    notification:{
        type: String,
        required: true
    }
})

module.exports= model('NotifyContingencies', notifyContingenciesSchema );