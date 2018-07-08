const _ = require('lodash');
const moment = require('moment');

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
            AND liked_at >= current_date - INTERVAL '1 month'
            GROUP BY 1
          ),
          blockmetric as (
            SELECT
              '${User.uuid}' as user_uuid,
              COUNT(*) as blocked_count
            FROM blocked
            WHERE blocked_uuid='${User.uuid}'
            AND blocked_at >= current_date - INTERVAL '3 months'
            GROUP BY 1
          ),
          reportedmetric as (
            SELECT
              '${User.uuid}' as user_uuid,
              SUM(CASE WHEN uuid='${User.uuid}' THEN 1 ELSE 0 END) as reported_count
            FROM fakes
            WHERE uuid='${User.uuid}'
            AND reported_at >= current_date - INTERVAL '3 months'
            GROUP BY 1
          )
          SELECT
            '${User.uuid}' as user_uuid,
            COALESCE(v.visits_received, 0) as visits_received,
            COALESCE(v.visits_given, 0) as visits_given,
            COALESCE(l.likes_received, 0) as likes_received,
            COALESCE(l.likes_given, 0) as likes_given,
            COALESCE(b.blocked_count, 0) as blocked_count,
            COALESCE(r.reported_count, 0) as reported_count
          FROM user as u
          LEFT JOIN visitmetric as v on v.user_uuid='${User.uuid}'
          LEFT JOIN likemetric as l on l.user_uuid = '${User.uuid}'
          LEFT JOIN blockmetric as b on b.user_uuid = '${User.uuid}'
          LEFT JOIN reportedmetric as r on r.user_uuid ='${User.uuid}'
        `;
        try {
          var data = await psql.query(textQuery);
          data = data.rows[0];
          var likeScore = 0;
          var visitScore = 0;
          if (data.likes_given < data.likes_received) {
            likeScore = 0.2;
          };
          const likesReceived = data.likes_received > 100 ? 100 : data.likes_received;
          const likesGiven = data.likes_given > 100 ? 100 : data.likes_given;
          likeScore += (likesReceived / 100) * 0.6 + (likesGiven / 100) * 0.2;
          if (data.visits_given < data.visits_received) {
            visitScore = 0.2;
          }
          const visitsReceived = data.visits_received > 100 ? 100 : data.visits_received;
          const visitsGiven = data.visits_given > 100 ? 100 : data.visits_given;
          visitScore += (visitsReceived / 100) * 0.6 + (visitsGiven / 100) * 0.2;
          const blockPenalty = (data.blocked_count / 100) > 0.2 ? 0.2 : data.blocked_count / 100;
          const reportPenalty =  data.reported_count / 50;
          const seniority = (moment(User.created_at).isBefore(moment().subtract(6, 'months'))) ? 0.1 : 0;
          const popularity = Math.round(100 * (0.5 - blockPenalty - reportPenalty + seniority + visitScore * 0.2 + likeScore * 0.2));
          console.log(likeScore * 0.2, visitScore * 0.2)
          return popularity;
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
