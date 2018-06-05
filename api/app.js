const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const app = express();

const userType = require('./defTypes/userType');
const commentType = require('./defTypes/commentType');
const mutationType = require('./mutations/mutation');
const queryType = require('./queries/query.js');

const { GraphQLSchema } = require('graphql');

const psql = require('./db/dbconnect')

app.use(cors());

// const schema = require('./Graphql/Schema')

const schema = new GraphQLSchema({query: queryType, mutation: mutationType})

app.use('/graphql',
  // bodyParser.json(),
  graphqlHTTP({
  // schema: Users.schema,
  // rootValue: Users.root,
  schema: schema,
  graphiql: true,
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
