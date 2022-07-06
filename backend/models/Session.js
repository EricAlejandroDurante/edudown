const { Schema, model } = require("mongoose");

const sessionSchema = new Schema({
    JTI: {
        type: String,
        required: true,
    },
    SESSION: {
        type:String,
        required: true,
    }
});

module.exports = model("Task", sessionSchema);