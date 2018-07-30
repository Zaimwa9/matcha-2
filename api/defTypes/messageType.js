const _ = require('lodash');
const psql = require('../db/dbconnect.js');
const userType = require('./userType.js');

const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

var messageType = new GraphQLObjectType ({
  name: 'Messages',
  fields: {
    id: { type: GraphQLInt },
    author_uuid: { type: GraphQLString },
    receiver_uuid: { type: GraphQLString},
    content: { type: GraphQLString },
    sent_at : { type: GraphQLString },
    author: {
      type: userType,
      resolve: async (message) => {
        var textQuery =
        `
          SELECT *
          FROM users
          WHERE uuid='${message.author_uuid}'
        `;
        try {
          var data = await psql.query(textQuery);
          data = data.rows[0];
          return data;
        } catch (e) {
          return new Error('Error resolving author' + e);
        }
      }
    },
    receiver: {
      type: userType,
      resolve: async (message) => {
        var textQuery =
        `
          SELECT *
          FROM users
          WHERE uuid='${message.receiver_uuid}'
        `;
        try {
          var data = await psql.query(textQuery);
          data = data.rows[0];
          return data;
        } catch (e) {
          return new Error('Error resolving author' + e);
        }
      }
    }
  }
})

module.exports = messageType;
