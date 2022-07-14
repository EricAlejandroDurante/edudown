//framework de node para crear url's en node
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

/*
Apollo herramienta para crear API de graphql
Lo extraemos para extender nuestro servidor
*/
const { ApolloServer } = require('apollo-server-express')

//que tipos de datos vamos a consultar en nuestro graphql
const { typeDefs } = require('./typeDefs')

//Para hacer las consultas basado en lo definido en typeDefs
const { resolvers } = require('./resolvers')

//Coneccion base de datos
const { connectDB } = require('./db');
const app = express()
connectDB()

//Importar rutas
const authRoutes = require('./routes/auth')
const validatetoken = require("./routes/middleware");

app.use(cors({
  origin: '*' // acá solo debería ser un dominio autorizado pero lo dejé en * por ahora
}));
app.use(bodyParser.json())
app.use('/api/user', authRoutes)

app.get('/', validatetoken, (req, res) =>
  res.send('Welcome to my api')
);

module.exports = app

//Iniciar el servidor
async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  //Inicializamos el servidor con los parametros anteriores
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })


  app.get('*', (req, res) =>
    res.status(404).send("Error 404 o lo que usted quiera, Not Found")
  );

  app.listen(3001, () => {
    console.log('Server on port', 3001)
  })
}

start()