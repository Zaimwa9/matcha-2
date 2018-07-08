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
    likesyou: { type: GraphQLInt },
    orientation: { type: GraphQLString },
    popularity: {
      type: GraphQLInt,
      resolve: async (User) => {
        textQuery = `
          with visitmetric as (
            SELECT
              '${User.uuid}' as user_uuid,
              SUM(CASE WHEN visited_uuid='${User.uuid}' THEN 1 ELSE 0 END) as visits_received,
              SUM(CASE WHEN visitor_uuid='${User.uuid}' THEN 1 ELSE 0 END) as visits_given
            FROM visits
            WHERE (visited_uuid='${User.uuid}' OR visitor_uuid='${User.uuid}')
            AND visited_at >= current_date - INTERVAL '1 week'
            GROUP BY 1
          ),
          likemetric as (
            SELECT
              '${User.uuid}' as user_uuid,
              SUM(CASE WHEN liked_uuid='${User.uuid}' THEN 1 ELSE 0 END) as likes_received,
              SUM(CASE WHEN liker_uuid='${User.uuid}' THEN 1 ELSE 0 END) as likes_given
            FROM likes
            WHERE (liker_uuid='${User.uuid}' OR liked_uuid='${User.uuid}')
            AND liked_at >= current_date - INTERVAL '1 week'
            GROUP BY 1
          )
          SELECT
            '${User.uuid}' as user_uuid,
            v.visits_received,
            v.visits_given,
            l.likes_received,
            l.likes_given
          FROM visitmetric as v
          LEFT JOIN likemetric as l on v.user_uuid=l.user_uuid
        `;
        try {
          var data = await psql.query(textQuery);
          data = data.rows[0];
          //var likeScore = 
          return 12;
          //return data.rows;
        } catch (e) {
          return new Error('Database error: ' + e)
        }
      }
    },
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
