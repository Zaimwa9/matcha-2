const commentType = require('../defTypes/commentType')

const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

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
        args.id = 7;
        Messages.push(args);
        console.log(Messages);
        return Messages[args.id];
      }
    }
  }
})

module.exports = mutationType;