const _ = require('lodash');
const userType = require('./userType');
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

var notifType = new GraphQLObjectType({
  name: 'Notifs',
  fields: {
    id: { type: GraphQLInt },
    type: { type: GraphQLString },
    receiver_uuid: { type: GraphQLString },
    sender_uuid: { type: GraphQLString },
    sender_profile: {
      type: userType,
      resolve: async (notif) => {
        var textQuery = `
          SELECT * FROM users
          WHERE uuid='${notif.sender_uuid}'
        `;
        try {
          var data = await psql.query(textQuery);
          if (data.rowCount !== 0) {
            data = data.rows[0];
            return data;
          }
        } catch (e) {
          return new Error('Error while receiving the notif user' + e)
        }
      }
    }
  }
})

module.exports = notifType;
