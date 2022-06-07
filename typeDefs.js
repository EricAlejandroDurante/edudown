const {gql} = require('apollo-server-express')

//usamos gql para se vea como sintaxis de graphql
const typeDefs = gql`
    type Query{
        hello:String
    }
`
module.exports = {typeDefs}