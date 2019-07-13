const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const { schema, rootValue } = require('./schema')

const app = express()

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true
  })
)

app.listen(4000)
console.log('Running GraphQL API server with GraphiQL frontend on localhost:4000/graphql')
