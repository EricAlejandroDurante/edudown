const {connect} = require('mongoose');
require('dotenv').config()

//const connected = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@lpwww2022.1fc40.mongodb.net/lpwww2022`
const connected = `mongodb+srv://admin:admin12345@lpwww2022.1fc40.mongodb.net/lpwww2022`
const connectDB = async () => {
    try{
        await connect(connected, {useNewUrlParser: true, useUnifiedTopology: true});
    }catch(error){
        console.error(error);
    }
};

module.exports = {connectDB}