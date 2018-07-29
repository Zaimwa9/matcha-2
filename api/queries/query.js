const _ = require('lodash');
const userType = require('../defTypes/userType');
const notifType = require('../defTypes/notifType');
const messageType = require('../defTypes/messageType');
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
        uuid: { type: GraphQLString },
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
          ON ST_DISTANCE_SPHERE(ST_POINT(u.lng::float, u.lat::float), ST_POINT(mu.lng::float, mu.lat::float)) / 1000 < 500
          WHERE ST_DISTANCE_SPHERE(ST_POINT(u.lng::float, u.lat::float), ST_POINT(mu.lng::float, mu.lat::float)) / 1000 < 500
          ORDER by ST_DISTANCE_SPHERE(ST_POINT(u.lng::float, u.lat::float), ST_POINT(mu.lng::float, mu.lat::float)) ASC
        ),
        count_hashtags AS (
        SELECT h2.uuid, count(*) AS counter
        FROM hashtags AS h1
        LEFT JOIN hashtags AS h2
          ON h1.uuid='${args.uuid}'
          AND h1.content = h2.content
          AND h1.uuid <> h2.uuid
        WHERE h2.uuid IS NOT NULL
        GROUP BY 1
        )
        SELECT
        md.*,
        COALESCE(ch.counter, 0) as count_hashtags,
        CASE WHEN l.liked_uuid IS NOT NULL then 1 ELSE 0 END AS is_liked,
        CASE WHEN l2.liker_uuid IS NOT NULL then 1 ELSE 0 END AS likesyou
        FROM matchesbyDistance AS md
        LEFT JOIN count_hashtags AS ch ON md.uuid=ch.uuid
        LEFT JOIN likes AS l on md.uuid=l.liked_uuid AND l.liker_uuid='${args.uuid}'
        LEFT JOIN likes as l2 on md.uuid=l2.liker_uuid AND l2.liked_uuid='${args.uuid}'
        LEFT JOIN blocked as b on md.uuid=b.blocked_uuid AND b.uuid='${args.uuid}'
        WHERE md.uuid <> '${args.uuid}'
        AND b.blocked_uuid IS NULL
        ORDER by counter DESC
        LIMIT 150`
        try {
          const data = await psql.query(textQuery);
          return data.rows;
        } catch (e) {
          console.log(e)
          return new Error('Database error: ' + e)
        }
      }
    },

    visitUsers: {
      type: new GraphQLList(userType),
      args: {
        uuid: { type: GraphQLString }
      },
      resolve: async function (root, args) {
        textQuery = `
          SELECT v.visitor_uuid, u.*
          FROM visits AS v
          LEFT JOIN blocked b on v.visitor_uuid=b.blocked_uuid AND uuid='${args.uuid}'
          LEFT JOIN users as u
            ON v.visitor_uuid=u.uuid
            AND v.visited_uuid='${args.uuid}'
          WHERE v.visited_uuid='${args.uuid}' and b.blocked_uuid IS NULL
          ORDER BY v.visited_at DESC
          LIMIT 10
        `;
        try {
          const data = await psql.query(textQuery);
          return data.rows;
        } catch (e) {
          console.log(e)
          return new Error('Database error: ' + e)
        }
      }
    },

    getNotifs: {
      type: new GraphQLList(notifType),
      args: {
        uuid: { type: GraphQLString }
      },
      resolve: async function (root, args) {
        textQuery = `
          SELECT *
          FROM notifs
          WHERE receiver_uuid='${args.uuid}'
          OR ((receiver_uuid='${args.uuid}' OR sender_uuid='${args.uuid}') AND type='match')
          ORDER BY received_at DESC
          LIMIT 30
        `;
        try {
          const data = await psql.query(textQuery);
          return data.rows;
        } catch (e) {
          console.log(e)
          return new Error('Database error: ' + e)
        }
      }
    },

    getMatches: {
      type: new GraphQLList(userType),
      args: {
        uuid: { type: GraphQLString }
      },
      resolve: async function (root, args) {
        textQuery = `
          with fmatches_uuid as (
            SELECT match_bis_uuid as matches_uuid
            FROM matches
            WHERE match_uuid='${args.uuid}'
            UNION
            SELECT match_uuid as matches_uuid
            FROM matches
            WHERE match_bis_uuid='${args.uuid}'
          )
          SELECT *
          FROM fmatches_uuid
          LEFT JOIN users on matches_uuid=uuid
        `;
        try {
          const data = await psql.query(textQuery);
          return data.rows;
        } catch (e) {
          console.log(e)
          return new Error('Database error: ' + e)
        }
      }
    },

    getMessages: {
      type: new GraphQLList(messageType),
      args: {
        uuid: { type: GraphQLString }
      },
      resolve: async function (root, args) {
        textQuery = `
          SELECT *
          FROM messages
          WHERE author_uuid='${args.uuid}' OR receiver_uuid='${args.uuid}'
          ORDER BY sent_at DESC
          LIMIT 50
        `;
        try {
          const data = await psql.query(textQuery);
          return data.rows;
        } catch (e) {
          console.log(e)
          return new Error('Database error: ' + e)
        }
      }
    }
  }
});

module.exports = queryType;
