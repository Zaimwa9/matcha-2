const hashType= require('../defTypes/hashtagType');
const NewHash = require('./newHash');
const pubsub = require('./serverConfig');
const { withFilter } = require('graphql-subscriptions');
const userType = require('../defTypes/userType')
const psql = require('../db/dbconnect.js');

const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

var subscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    newHash: {
      type: hashType,
      subscribe: () => pubsub.asyncIterator('newHash'),
      resolve: (root, args, context) => {
        return root
      },
    },
    newVisit: {
      type: new GraphQLList(userType),
      args: {
        user_uuid: {type: GraphQLString}
      },
      subscribe: () => pubsub.asyncIterator('newVisit'),
      resolve: (root, args, context) => {
        if (args.user_uuid === root[1].uuid) {
          return root;
        }
      }
    },
    newLike: {
      type: userType,
      args: {
        user_uuid: {type: GraphQLString}
      },
      subscribe: () => pubsub.asyncIterator('newLike'),
      resolve: async (root, args, context) => {
        if (args.user_uuid === root.liked_uuid) {
          var textQuery = `
            SELECT *
            FROM users
            WHERE uuid='${root.liker_uuid}'
          `
          try {
            var data = await psql.query(textQuery);
            data = data.rows[0];
            return data;
          } catch (e) {
            return new Error('Error on subscription like request' + e);
          }
        }
      }
    },
    newMatch: {
      type: new GraphQLList(userType),
      args: {
        user_uuid: {type: GraphQLString}
      },
      subscribe: () => pubsub.asyncIterator('newMatch'),
      resolve: async (root, args, context) => {
        if (args.user_uuid === root.match_uuid || args.user_uuid === root.match_bis_uuid) {
          var textQuery = `
            SELECT *
            FROM users
            WHERE uuid='${root.match_uuid}' OR uuid='${root.match_bis_uuid}'
          `
          try {
            var data = await psql.query(textQuery);
            return data.rows;
          } catch (e) {
            return new Error('Error on subscription match request' + e);
          }
        }
      }
    },
    unMatch: {
      type: userType,
      args: {
        user_uuid: {type: GraphQLString}
      },
      subscribe: () => pubsub.asyncIterator('unMatch'),
      resolve: async (root, args, context) => {
        if (args.user_uuid === root.liked_uuid) {
          var textQuery = `
            SELECT *
            FROM users
            WHERE uuid='${root.liker_uuid}'
          `
          try {
            var data = await psql.query(textQuery);
            data = data.rows[0]
            return data;
          } catch (e) {
            return new Error('Error on subscription unmatch request' + e);
          }
        }
      }
    }
  },
})

module.exports = subscriptionType
