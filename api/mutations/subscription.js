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
      type: userType,
      args: {
        user_uuid: {type: GraphQLString}
      },
      subscribe: () => pubsub.asyncIterator('newVisit'),
      resolve: async (root, args, context) => {
        if (args.user_uuid === root.visited_uuid) {
          var textQueryInsert = `
            INSERT INTO notifs
            (receiver_uuid, sender_uuid, type) VALUES (
              '${root.visited_uuid}',
              '${root.visitor_uuid}',
              'visit'
            )`
          try {
            var data = await psql.query(textQueryInsert);
            var textQueryBis = `
              SELECT * FROM users
              WHERE uuid='${root.visitor_uuid}'
              `
            try {
              var databis = await psql.query(textQueryBis);
              databis = databis.rows[0];
              return databis;
            } catch (e) {
              return new Error('Error fetching visitor profile' + e);
            }
          } catch (e) {
            return new Error('Error inserting new visit notif');
          }
          return databis;
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
          var textQueryInsert = `
            INSERT INTO notifs
            (receiver_uuid, sender_uuid, type) VALUES (
              '${root.liked_uuid}',
              '${root.liker_uuid}',
              'like'
            )`
          try {
            var data = await psql.query(textQueryInsert);
          } catch (e) {
            return new Error('Error inserting new like notif');
          }
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
          var textQueryInsert = `
            INSERT INTO notifs
            (receiver_uuid, sender_uuid, type) VALUES (
              '${root.match_bis_uuid}',
              '${root.match_uuid}',
              'match'
            )`
          try {
            var data = await psql.query(textQueryInsert);
          } catch (e) {
            return new Error('Error inserting new match notif');
          }
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
          var textQueryInsert = `
            INSERT INTO notifs
            (receiver_uuid, sender_uuid, type) VALUES (
              '${root.liked_uuid}',
              '${root.liker_uuid}',
              'unmatch'
            )`
          try {
            var data = await psql.query(textQueryInsert);
          } catch (e) {
            return new Error('Error inserting new match notif');
          }
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
