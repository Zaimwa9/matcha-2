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
        with myUser as (
          select * from users where uuid='${args.uuid}'
        ),
        matchesbyDistance as (
        select mu.uuid as user_uuid, u.*, ST_DISTANCE_SPHERE(ST_POINT(u.lng::float, u.lat::float), ST_POINT(mu.lng::float, mu.lat::float)) / 1000 as distance
          from users as u
          left join myUser as mu
          on ST_DISTANCE_SPHERE(ST_POINT(u.lng::float, u.lat::float), ST_POINT(mu.lng::float, mu.lat::float)) / 1000 < 200
          where ST_DISTANCE_SPHERE(ST_POINT(u.lng::float, u.lat::float), ST_POINT(mu.lng::float, mu.lat::float)) / 1000 < 200
          order by ST_DISTANCE_SPHERE(ST_POINT(u.lng::float, u.lat::float), ST_POINT(mu.lng::float, mu.lat::float)) ASC
        ),
        count_hashtags as (
        select h1.uuid, count(*) as counter from hashtags as h1 left join hashtags as h2 on h1.uuid='${args.uuid}' and h1.content = h2.content and h1.uuid <> h2.uuid where h2.uuid is not null group by 1
        )
        select md.*, ch.counter from matchesbyDistance as md
        left join count_hashtags as ch on md.uuid=ch.uuid
        order by counter desc`
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
