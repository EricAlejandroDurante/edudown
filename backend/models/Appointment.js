const { Schema, model } = require("mongoose");
//En agendamiento podriamos agregar el box que corresponde a cada agendamiento
const AppointmentSchema = new Schema({
    id: {
        type: String
    },
    especialistaID: {
        type: String,
        required: true
    },
    pacienteID: {
        type: String,
        require: true
    },
    box_selectedID: {
        type: String,
        require: true
    },
    horaInicio: {
        type: String,
        required: true
    },
    selectedDate: {
        type: String,
        required: true
    }
});
module.exports = model("Appointment", AppointmentSchema);