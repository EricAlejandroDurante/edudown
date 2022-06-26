const {connect, default: mongoose} = require('mongoose');
require('dotenv').config()

//const connected = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@lpwww2022.1fc40.mongodb.net/lpwww2022`
const connected = `mongodb+srv://admin:admin12345@lpwww2022.1fc40.mongodb.net/lpwww2022`
//const connected = 'mongodb://127.0.0.1:27017/back-enLP'
const connectDB = async () => {
    try{
        await connect(connected, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Data base connected")
    }catch(error){
        console.error(error);
    }
};

module.exports = {connectDB}