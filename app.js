//framework de node para crear url's en node
const express = require('express')

/*
Apollo herramienta para crear API de graphql
Lo extraemos para extender nuestro servidor
*/
const {ApolloServer} = require('apollo-server-express')

//que tipos de datos vamos a consultar en nuestro graphql
const {typeDefs} = require('./typeDefs')

//Para hacer las consultas basado en lo definido en typeDefs
const {resolvers} = require('./resolvers')

const app = express()

app.get('/', (req,res) => 
    res.send('Welcome to my api')
);

module.exports = app

//Iniciar el servidor
async function start (){

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    //Inicializamos el servidor con los parametros anteriores
    await apolloServer.start()
    apolloServer.applyMiddleware({app})

    app.get('*', (req,res) => 
        res.status(404).send("Error 404 o lo que usted quiera, Not Found")
    );

    app.listen(3000,()=>{
        console.log('Server on port', 3000)
    })
}

start()