const _ = require('lodash');

const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

const commentType = require('./commentType');
const hashtagType = require('./hashtagType');
const pictureType = require('./pictureType');

const psql = require('../db/dbconnect.js');

var userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    first_name: { type: new GraphQLNonNull(GraphQLString)},
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    password: {
      type: GraphQLString,
      resolve : async () => null
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: GraphQLString },
    uuid: { type: GraphQLString },
    age: { type: GraphQLInt },
    token: { type: GraphQLString },
    gender: { type: GraphQLString },
    address: { type: GraphQLString },
    lat: {type: GraphQLString },
    lng: {type: GraphQLString },
    created_at: { type: GraphQLString },
    description: { type: GraphQLString },
    hashtags: {
      type: new GraphQLList(hashtagType),
      resolve: async (User) => {
        textQuery = `SELECT * FROM hashtags where uuid='${User.uuid}'`;
        try {
          const data = await psql.query(textQuery);
          return data.rows;
        } catch (e) {
          return new Error('Database error: ' + e)
        }
      }
    },
    pictures: {
      type: new GraphQLList(pictureType),
      resolve: async (User) => {
        textQuery = `SELECT * FROM pictures where author_uuid='${User.uuid}' ORDER BY posted_at DESC LIMIT 5`
        try {
          const data = await psql.query(textQuery);
          return data.rows;
        } catch (e) {
          return new Error('Database error: ' + e)
        }
      }
    }

    // messages: {
    //   type: new GraphQLList(commentType),
    //   resolve: async (User) => {
    //     textQuery = `SELECT * FROM messages where author=${User.id}`;
    //     try {
    //       const data = await psql.query(textQuery)
    //       return data.rows;
    //     } catch (e) {
    //       return new Error('Database error: ' + e);
    //     }
    //   }
    // },
  }
})

module.exports = userType;
