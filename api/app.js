const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const Users = require('./Models/UserSchema');
const fs = require('fs');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./Graphql/typeDefs');
const resolvers = require('./Graphql/resolvers');

app.use(cors());

const schema = require('./Graphql/Schema')
// makeExecutableSchema({typeDefs, resolvers});
var MyGraphQLSchema = buildSchema(`
type Query {
  hello: String,
  salut: String
}
`);

var root = {
  salut: () => {
    return 'Bonjour Monde';
  },
  hello: () => {
    return 'Hello world!';
  },
};

// app.use('/graphql', graphqlHTTP({
//   schema: MyGraphQLSchema,
//   rootValue: root,
//   graphiql: true,
// }));


app.use('/graphql', graphqlHTTP({
  // schema: Users.schema,
  // rootValue: Users.root,
  schema: schema,
  graphiql: true,
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log(typeDefs)
  console.log(resolvers);
})
