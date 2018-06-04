const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
// const Users = require('./Models/UserSchema');
const fs = require('fs');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./Graphql/typeDefs');
const resolvers = require('./Graphql/resolvers');

const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  } = require('graphql');

app.use(cors());

const Users = [
  {
      "id": 1,
      "first_name": "diwadoo",
      "last_name": "diwadoo",
      "email": "diwadoo",
      "gender": "Male",
      "password": "diwadoo",
  },
  {
    "id": 2,
    "first_name": "wadii",
    "last_name": "wadii",
    "email": "wadii",
    "gender": "Male",
    "password": "wadii",
  },
  {
    "id": 3,
    "first_name": "jean",
    "last_name": "jean",
    "email": "jean",
    "gender": "Male",
    "password": "jean",
  }
];

const Messages = [
  { id: 1, author: 1, content: 'Introduction to GraphQL'},
  { id: 2, author: 2, content: 'Welcome to Meteor'},
  { id: 3, author: 2, content: 'Advanced GraphQL'},
  { id: 4, author: 3, content: 'Launchpad is Cool'},
];

var commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: { type: GraphQLInt },
    author: { type: GraphQLInt },
    content: { type: GraphQLString },
  }
})

var userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    messages: {
      type: new GraphQLList(commentType),
      resolve: (User) => {
        var myArray = [];
        Messages.find(message => {
          if (message.author === User.id)
          myArray.push(message)
        })
        return myArray;
      }
    }
  }
})

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    postComment: {
      type: commentType,
      args: {
        author: { type: GraphQLInt },
        content: { type: GraphQLString },
      },
      resolve: function(_, args) {
        console.log(msg.id)
        args.id = 5;
        Messages.push(msg);
        console.log(Messages);
        return Messages[args.id];
      }
    }
  }
})

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: GraphQLInt }
      },
      resolve: function (_, args) {
        return Users.find(user => user.id == args.id);
      }
    },
    users: {
      type: new GraphQLList(userType),
      resolve: function () {
        return Users;
      }
    }
  }
});

const schema = require('./Graphql/Schema')
const schema2 = new GraphQLSchema({query: queryType, mutation: mutationType})
app.use('/graphql',
  // bodyParser.json(),
  graphqlHTTP({
  // schema: Users.schema,
  // rootValue: Users.root,
  schema: schema2,
  graphiql: true,
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log(typeDefs)
  console.log(resolvers);
})
