const hashtagType = require('../defTypes/hashtagType');
const userType = require('../defTypes/userType');
const pictureType = require('../defTypes/pictureType');

const psql = require('../db/dbconnect.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');

const pubsub = require('./serverConfig');

const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: userType,
      args: {
        email: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        password: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: async function(root, args) {
        args.uuid = uuidv4();
        // args.password = await bcrypt.hash(args.password, 10);
        textQuery = `INSERT INTO users (
                      email,
                      first_name,
                      last_name,
                      uuid,
                      password
                    ) VALUES (
                      '${args.email}', '${args.first_name}', '${args.last_name}', '${args.uuid}', '${args.password}'
                    ) RETURNING *`;
        try {
          var data = await psql.query(textQuery);
          data = data.rows[0];
          data.token = jwt.sign({'uuid' : data.uuid}, 'quentinbaltringue');
          return data;
        } catch (e) {
          return new Error('Database error: ' + e);
        }
      }
    },

    login: {
      type: userType,
      args: {
        email: {type: GraphQLString},
        password: { type: GraphQLString }
      },
      resolve: async function(root, args) {
        textQuery = `SELECT * FROM users WHERE email='${args.email}' AND password='${args.password}'`
        try {
          var data = await psql.query(textQuery);
          if (data.rowCount === 0) {
            throw new Error('No such user found');
          } else {
            // User existant; delivrement du token
            data = data.rows[0];
            data.token = jwt.sign({'uuid' : data.uuid}, 'quentinbaltringue');
            return data;
          }
        } catch (e) {
          return new Error('Error: ' + e);
        }
      }
    },

    updateUser: {
      type: userType,
      args: {
        uuid: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        gender: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString },
        address: { type: GraphQLString },
        lat: { type: GraphQLString },
        lng: { type: GraphQLString }
      },
      resolve: async function(root, args) {
        textQuery = `UPDATE users SET
                      first_name='${args.first_name}',
                      last_name='${args.last_name}',
                      gender='${args.gender}',
                      email='${args.email}',
                      age='${args.age}',
                      address='${args.address}',
                      lat='${args.lat}',
                      lng='${args.lng}'
                      WHERE uuid='${args.uuid}' RETURNING *`
        try {
          var data = await psql.query(textQuery);
          if (data.rowCount === 0) {
            throw new Error('No such user found');
          } else {
            // User existant; delivrement du token
            data = data.rows[0];
            return data;
          }
        } catch (e) {
          return new Error('Error: ' + e);
        }
      }
    },

    // HASHTAGS
    addHashtag: {
      type: hashtagType,
      args: {
        uuid: {type: GraphQLString},
        content: {type: GraphQLString}
      },
      resolve: async function(root, args) {
        textQuery = `INSERT INTO hashtags(
                    uuid, content
                    ) VALUES ('${args.uuid}', '${args.content}') RETURNING *`;
        try {
          var data = await psql.query(textQuery);
          data = data.rows[0];
          pubsub.publish('newHash', data)
          return data;
        } catch (e) {
          return new Error('Database error: ' + e);
        }
      }
    },

    deleteHashtag: {
      type: hashtagType,
      args: {
        id: {type: GraphQLInt}
      },
      resolve: async function(root, args) {
        textQuery = `DELETE FROM hashtags WHERE id='${args.id}' RETURNING *`;
        try {
          var data = await psql.query(textQuery);
          data = data.rows[0];
          return data;
        } catch (e) {
          return new Error('Database error: ' + e);
        }
      }
    },

    deletePicture: {
      type: pictureType,
      args: {
        id: {type: GraphQLInt}
      },
      resolve: async function(root, args) {
        textQuery = `DELETE FROM pictures WHERE id='${args.id}' RETURNING *`;
        try {
          var data = await psql.query(textQuery);
          data = data.rows[0];
          console.log(data);
          var target = path.join(__dirname, '../public/uploads/', data.db_name);
          fs.unlink(target, (err) => {
            if (err)
              console.log(err)
            else
              console.log('deleted ' + target)
          });
          return data;
        } catch (e) {
          return new Error('Database error: ' + e);
        }
      }
    },

    updateDescription: {
      type: userType,
      args: {
        uuid: {type: GraphQLString},
        description: {type: GraphQLString}
      },
      resolve: async function(root, args) {
        textQuery = `
                      UPDATE users SET
                      description = '${args.description}'
                      WHERE uuid = '${args.uuid}'
                      RETURNING *
                    `;
        try {
          var data = await psql.query(textQuery);
          if (data.rowCount === 0) {
            throw new Error('No such user found');
          } else {
            data = data.rows[0];
            return data;
          }
        } catch (e) {
          console.log(e);
          return new Error('Error: ' + e);
        }
      }
    },

    updatePwd: {
      type: userType,
      args: {
        uuid: {type: GraphQLString},
        oldPwd: {type: GraphQLString},
        newPwd: {type: GraphQLString},
      },
      resolve: async function(root, args) {
        textQuery = `
                      UPDATE users SET
                      password='${args.newPwd}'
                      WHERE uuid='${args.uuid}' and password='${args.oldPwd}'
                      RETURNING *
                    `;
        try {
          var data = await psql.query(textQuery);
          if (data.rowCount === 0) {
            throw new Error('No such user found');
          } else {
            data = data.rows[0];
            return data;
          }
        } catch (e) {
          console.log(e);
          return new Error('Error: ' + e);
        }
      }
    }
  }
})

module.exports = mutationType;
