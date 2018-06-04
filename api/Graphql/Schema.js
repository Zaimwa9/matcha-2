const User = require('./UsersType');
const { makeExecutableSchema } = require('graphql-tools');
console.log(User);

const resolvers = require('./resolvers.js');

const Query = `
type Query {
  User(id: ID!): User
  Users: [User]
}`

const SchemaDefinition = `
schema {
  query: Query
}
`;

module.exports = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, Query,
    ...User
  ],
  resolvers: resolvers,
});