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

port = process.env.PORT || 3000
app.listen(port)
console.log(`Running GraphQL API server with GraphiQL frontend on port ${port}`)
