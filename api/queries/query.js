const _ = require('lodash');
const userType = require('../defTypes/userType');
const psql = require('../db/dbconnect.js');
const jwt = require('jsonwebtoken');

const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    checkToken: {
      type: userType,
      args: {
        token: { type: GraphQLString }
      },
      resolve: async function(root, args) {
        return jwt.verify(args.token, 'quentinbaltringue', async (err, data) => {
          if (err) {
            throw new Error('Invalid token!')
          } else {
            textQuery = `SELECT * FROM users WHERE uuid='${data.uuid}'`;
            try {
              var user = await psql.query(textQuery);
              user = user.rowCount === 1 ? user.rows[0] : null;
              return await user;
            } catch (e) {
              console.log(e);
              throw (e)
            }
          }
        })
      }
    },
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        uuid: { type: GraphQLString },
        // password: { type: GraphQLInt }
      },
      resolve: async function (root, args) {
        textQuery = `SELECT * FROM users WHERE uuid='${args.uuid}'`;
        try {
          const data = await psql.query(textQuery);
          return data.rows[0];
        } catch (e) {
          return new Error('Database error: ' + e);
        }
      }
    },

    users: {
      type: new GraphQLList(userType),
      resolve: async function () {
        textQuery = `SELECT * FROM users`;
        try {
          const data = await psql.query(textQuery);
          return data.rows;
        } catch (e) {
          return new Error('Database error: ' + e);
        }
      }
    },

    feedUsers: {
      type: new GraphQLList(userType),
      args: {
        uuid: { type: GraphQLString}
      },
      resolve: async function (root, args) {
        textQuery = `
        with myUser AS (
          SELECT * FROM users WHERE uuid='${args.uuid}'
        ),
        matchesbyDistance AS (
        SELECT mu.uuid AS user_uuid, u.*, ST_DISTANCE_SPHERE(ST_POINT(u.lng::float, u.lat::float), ST_POINT(mu.lng::float, mu.lat::float)) / 1000 AS distance
          FROM users AS u
          LEFT JOIN myUser AS mu
          ON ST_DISTANCE_SPHERE(ST_POINT(u.lng::float, u.lat::float), ST_POINT(mu.lng::float, mu.lat::float)) / 1000 < 200
          WHERE ST_DISTANCE_SPHERE(ST_POINT(u.lng::float, u.lat::float), ST_POINT(mu.lng::float, mu.lat::float)) / 1000 < 200
          ORDER by ST_DISTANCE_SPHERE(ST_POINT(u.lng::float, u.lat::float), ST_POINT(mu.lng::float, mu.lat::float)) ASC
        ),
        count_hashtags AS (
        SELECT h1.uuid, count(*) AS counter FROM hashtags AS h1 LEFT JOIN hashtags AS h2 ON h1.uuid='${args.uuid}' and h1.content = h2.content and h1.uuid <> h2.uuid WHERE h2.uuid is not null group by 1
        )
        SELECT md.*, ch.counter, CASE WHEN l.liked_uuid IS NOT NULL then 1 ELSE 0 END AS is_liked FROM matchesbyDistance AS md
        LEFT JOIN count_hashtags AS ch ON md.uuid=ch.uuid
        LEFT JOIN likes AS l on md.uuid=l.liked_uuid AND l.liker_uuid='${args.uuid}'
        WHERE md.uuid <> '${args.uuid}'
        ORDER by counter DESC`
        try {
          const data = await psql.query(textQuery);
          return data.rows;
        } catch (e) {
          return new Error('Database error: ' + e)
        }
      }
    }
  }
});

module.exports = queryType;
