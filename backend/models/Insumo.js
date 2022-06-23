const { Schema, model } = require("mongoose");

const InsumoSchema = new Schema({
    id: {
        type: Number
    },
    insumo: {
        type: String,
        required: true
    },
    tipo_insumo: {
        type: String,
        require: true
    },
    cantidad: {
        type: Number,
        required: true
    }
});
module.exports = model("Insumo", InsumoSchema);