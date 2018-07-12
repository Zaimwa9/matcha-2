const hashtagType = require('../defTypes/hashtagType');
const userType = require('../defTypes/userType');
const pictureType = require('../defTypes/pictureType');
const visitType = require('../defTypes/visitType');
const fakeType = require('../defTypes/fakeType');
const blockedType = require('../defTypes/blockedType');
const likeType = require('../defTypes/likeType');

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
        textQuery = `
                      SELECT * FROM users
                      WHERE
                      email='${args.email}'
                      AND
                      password='${args.password}'
                      `;
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
        lng: { type: GraphQLString },
        orientation: { type: GraphQLString },
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
                      lng='${args.lng}',
                      orientation='${args.orientation}'
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
        textQuery = `
                      INSERT INTO hashtags(
                      uuid,
                      content
                      ) VALUES (
                      '${args.uuid}',
                      '${args.content}'
                      ) RETURNING *
                    `;
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
        textQuery = `
                      DELETE FROM hashtags
                      WHERE id='${args.id}'
                      RETURNING *
                    `;
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
        textQuery = `
                      DELETE FROM pictures
                      WHERE id='${args.id}'
                      RETURNING *
                    `;
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
    },

    newVisit: {
      type: visitType,
      args: {
        visitor_uuid: {type: GraphQLString},
        visited_uuid: {type: GraphQLString},
      },
      resolve: async function(root, args) {
        textQuery = `
                      INSERT INTO visits (
                        visitor_uuid,
                        visited_uuid
                      ) VALUES (
                        '${args.visitor_uuid}',
                        '${args.visited_uuid}'
                      ) ON CONFLICT (visitor_uuid, visited_uuid)
                      DO
                        UPDATE
                          SET visited_at=current_timestamp, visit_count=visits.visit_count + 1
                      RETURNING *
                    `;
        try {
          var data = await psql.query(textQuery);
          if (data.rowCount === 0) {
            throw new Error('Database Error');
          } else {
            data = data.rows[0];
            var textQueryBis = `
              SELECT *
              FROM users
              WHERE uuid='${args.visitor_uuid}'
              UNION
              SELECT * from users
              WHERE uuid='${args.visited_uuid}'
              `
            try {
              var databis = await psql.query(textQueryBis);
              pubsub.publish('newVisit', databis.rows)
              return data;
            } catch (e) {
              return new Error('Error looking for visitor' + e)
            }
            return data;
          }
        } catch (e) {
          console.log(e);
          return new Error('Error: ' + e);
        }
      }
    },

    reportUser: {
      type: fakeType,
      args: {
        uuid: {type: GraphQLString},
        reporter_uuid: {type: GraphQLString},
      },
      resolve: async function(root, args) {
        textQuery = `
                      INSERT INTO fakes (
                        uuid,
                        reporter_uuid
                      ) VALUES (
                        '${args.uuid}',
                        '${args.reporter_uuid}'
                      ) ON CONFLICT (uuid, reporter_uuid)
                      DO
                        UPDATE
                          SET reported_at=current_timestamp
                      RETURNING *
                    `;
        try {
          var data = await psql.query(textQuery);
          if (data.rowCount === 0) {
            throw new Error('Database Error');
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

    blockUser: {
      type: blockedType,
      args: {
        uuid: {type: GraphQLString},
        blocked_uuid: {type: GraphQLString},
      },
      resolve: async function(root, args) {
        textQuery = `
                      INSERT INTO blocked (
                        uuid,
                        blocked_uuid
                      ) VALUES (
                        '${args.uuid}',
                        '${args.blocked_uuid}'
                      ) ON CONFLICT (uuid, blocked_uuid)
                      DO
                        UPDATE
                          SET blocked_at=current_timestamp
                      RETURNING *
                    `;
        try {
          var data = await psql.query(textQuery);
          if (data.rowCount === 0) {
            throw new Error('Database Error');
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

    likeUser: {
      type: likeType,
      args: {
        liker_uuid: {type: GraphQLString},
        liked_uuid: {type: GraphQLString},
      },
      resolve: async function(root, args) {
        textQuery = `
                      INSERT INTO likes (
                        liker_uuid,
                        liked_uuid
                      ) VALUES (
                        '${args.liker_uuid}',
                        '${args.liked_uuid}'
                      ) ON CONFLICT (liker_uuid, liked_uuid)
                      DO
                        UPDATE
                          SET liked_at=current_timestamp
                      RETURNING *
                    `;
        try {
          var data = await psql.query(textQuery);
          if (data.rowCount === 0) {
            throw new Error('Database Error');
          } else {
            data = data.rows[0];
            pubsub.publish('newLike', {liker_uuid: args.liker_uuid, liked_uuid: args.liked_uuid});
            var textQueryBis = `
            SELECT *
            FROM likes
            WHERE (liker_uuid='${args.liker_uuid}' AND liked_uuid='${args.liked_uuid}')
            OR (liker_uuid='${args.liked_uuid}' AND liked_uuid='${args.liker_uuid}')
            `
            try {
              var dataIsMatch = await psql.query(textQueryBis);
              if (dataIsMatch.rowCount === 2) {
                // Add record in match
                var textQueryTer = `
                  INSERT INTO matches (
                    match_uuid,
                    match_bis_uuid
                  ) VALUES (
                    '${args.liker_uuid}',
                    '${args.liked_uuid}'
                  ) ON CONFLICT (match_uuid, match_bis_uuid)
                  DO
                    UPDATE
                      SET matched_at=current_timestamp
                  RETURNING *
                `;
                try {
                  var dataAddMatch = await psql.query(textQueryTer);
                  pubsub.publish('newMatch', {match_uuid: dataAddMatch.rows[0].match_uuid, match_bis_uuid:  dataAddMatch.rows[0].match_bis_uuid});
                  return data
                } catch (e) {
                  return new Error('Error inserting newMatch')
                }
              }
            } catch (e) {
              return new Error('Error in checking if newMatch')
            }
            // Returning first initial set of data
            return data;
          }
        } catch (e) {
          console.log(e);
          return new Error('Error: ' + e);
        }
      }
    },

    unlikeUser: {
      type: likeType,
      args: {
        liker_uuid: {type: GraphQLString},
        liked_uuid: {type: GraphQLString},
      },
      resolve: async function(root, args) {
        textQuery = `
                      DELETE
                      FROM likes
                      WHERE liker_uuid='${args.liker_uuid}'
                      AND liked_uuid='${args.liked_uuid}'
                      RETURNING *
                    `;
        try {
          var data = await psql.query(textQuery);
          if (data.rowCount === 0) {
            throw new Error('Database Error');
          } else {
            data = data.rows[0];

            var textQueryBis = `
            SELECT *
            FROM matches
            WHERE (match_uuid='${args.liker_uuid}' AND match_bis_uuid='${args.liked_uuid}')
            OR (match_uuid='${args.liked_uuid}' AND match_bis_uuid='${args.liker_uuid}')
            `
            try {
              var dataIsMatch = await psql.query(textQueryBis);
              if (dataIsMatch.rowCount !== 0) {
                var textQueryTer = `
                  DELETE
                  FROM matches
                  WHERE (match_uuid='${args.liker_uuid}' AND match_bis_uuid='${args.liked_uuid}')
                  OR (match_uuid='${args.liked_uuid}' AND match_bis_uuid='${args.liker_uuid}')
                  RETURNING *
                `
                try {
                  var dataRemoveMatch = await psql.query(textQueryTer);
                  pubsub.publish('unMatch', {match_uuid: dataRemoveMatch.rows[0].match_uuid, match_bis_uuid:  dataRemoveMatch.rows[0].match_bis_uuid});
                  return data
                } catch (e) {
                  return new Error('Error deleting match');
                }
              }
            } catch (e) {
              return new Error('Error querying matches');
            }
            return data;
          }
        } catch (e) {
          return new Error('Error: ' + e);
        }
      }
    },
  }
})

module.exports = mutationType;
