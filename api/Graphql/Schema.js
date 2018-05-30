// import User from './UsersS';
var User = require('./UsersS');
const { makeExecutableSchema } = require('graphql-tools');
console.log(User);

const resolvers = require('./resolvers.js');

const RootQuery = `
type Query {
  User(id: ID!): User
  Users: [User]
}`
// `
// type RootQuery {
//   user(id: Int!): User
//   users: [User]
// }
// `;

const SchemaDefinition = `
schema {
  query: Query
}
`;

module.exports = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, RootQuery,
    // we have to destructure array imported from the post.js file
    // as typeDefs only accepts an array of strings or functions
    ...User
  ],
  // we could also concatenate arrays
  // typeDefs: [SchemaDefinition, RootQuery].concat(Post)
  resolvers: resolvers,
});
// type Query {
//   User(id: ID!): User
//   Users: [User]
// }