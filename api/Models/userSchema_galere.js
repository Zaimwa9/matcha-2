const Users = require('../data/User');
// Il faudra rajouter un appel a la DB
const _ = require('lodash');
import {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  } from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'Users',
  description: 'Users registered in Matcha',
  fields: () => ({
    id: {type: new GraphQL(GraphQLInt)},
    first_name: {type: new GraphQLNonNull(GraphQLString)},
    last_name: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    gender: {type: GraphQLString},
    password: {type: new GraphQLNonNull(GraphQLString)},
  })
})

const UserQueryRootType = new GraphQLObjectType({
  name: 'UserSchema',
  description: 'Root User Schema',
  fields: () => ({
    users: {
      args: {
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        email: {type: GraphQLString},
      },
      type: new GraphQLList(UserType),
      description: 'List of Users',
      resolve: (parent, args) => {
          if (Object.keys(args).length) {
              return _.filter(Users, args);
          }
          return Users;
      }
    }
  })
})

