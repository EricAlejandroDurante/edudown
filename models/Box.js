const { Schema, model } = require("mongoose");

const BoxSchema = new Schema({
    id: {
        type: Number
    },
    tipo_box: {
        type: String,
        required: true
    },
    tamano_box: {
        type: String,
        require: true
    },
    estado_actual: {
        type: String,
        required: true
    }
});
module.exports = model("Box", BoxSchema);