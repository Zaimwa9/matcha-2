const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

const commentType = require('./commentType')

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

module.exports = userType;