const userType = require('../defTypes/userType');

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

module.exports = queryType;