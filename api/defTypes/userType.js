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
const visitType = require('./visitType');
const blockedType = require('./blockedType');
const likeType = require('./likeType');


const psql = require('../db/dbconnect.js');

var userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    first_name: { type: new GraphQLNonNull(GraphQLString) },
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
    counter: { type: GraphQLInt },
    distance: { type: GraphQLString },
    is_liked: { type: GraphQLInt },
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
    },
    visits: {
      type: new GraphQLList(visitType),
      resolve: async (User) => {
        textQuery = `SELECT * FROM visits where visited_uuid='${User.uuid}' ORDER BY visited_at DESC LIMIT 15`
        try {
          const data = await psql.query(textQuery);
          return data.rows;
        } catch (e) {
          return new Error('Database error: ' + e)
        }
      }
    },
    fakereports: {
      type: GraphQLInt,
      resolve: async (User) => {
        textQuery = `SELECT COUNT(*) AS reports FROM fakes where uuid='${User.uuid}'`
        try {
          const data = await psql.query(textQuery);
          return data.rows[0].reports;
        } catch (e) {
          return new Error('Database error: ' + e)
        }
      }
    },/*
    matches: {
      type: new GraphQLList(userType),
      resolve: async (User) => {
        textQuery = `
                      with prematches as (
                      SELECT l2.liker_uuid as match_uuid FROM where likes as l1 WHERE l1.liker_uuid='${User.uuid}
                      LEFT JOIN likes as l2 WHERE l2.liked_uuid='${User.uuid}' AND l2.liker_uuid=l1.liked_uuid
                      WHERE l2.liker_uuid IS NOT NULL
                      )
                      SELECT * FROM users as u
                      LEFT JOIN prematches as pm ON u.uuid=pm.match_uuid
                      WHERE pm.match_uuid IS NOT NULL
                    '`
      }
    }*/
  }
})

module.exports = userType;
