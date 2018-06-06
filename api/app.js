const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const app = express();

const userType = require('./defTypes/userType');
const commentType = require('./defTypes/commentType');
const mutationType = require('./mutations/mutation');
const queryType = require('./queries/query.js');
const psql = require('./db/dbconnect');

const { GraphQLSchema } = require('graphql');

app.use(cors());

// const schema = require('./Graphql/Schema')

const schema = new GraphQLSchema({query: queryType, mutation: mutationType})

// const verifyToken = (token) => {
//   const [prefix, payload] = token.split(' ')
//   let user = null
//   if (!payload) { //no token in the header
//       throw new Error('No token provided')
//   }
//   jwt.verify(payload, secret, (err, data) => {
//       if (err) { //token is invalid
//           throw new Error('Invalid token!')
//       } else {
//         textQuery = `SELECT * FROM users WHERE email='${args.email}' AND password='${args.password}'`;
//         try {
//           user = await psql.query(textQuery);
//           user = user.rowCount === 1 ? user.rows[0] : null;
//         } catch (e) {
//           throw (e)
//         }
//       }
//   })
//   if (!user) { //user does not exist in DB
//       throw new Error('User does not exist')
//   }
//   return user;
// }

// app.use('/graphql', (req, res, next) => {
//   const token = req.headers['authorization']
//   try {
//       req.user = verifyToken(token)
//       next()
//   } catch (e) {
//       res.status(401).json({
//           message: e.message
//       })
//   }
// });

app.use('/graphql',
  // bodyParser.json(),
  graphqlHTTP((req, res) => ({
  schema: schema,
  graphiql: true,
  })
))
;

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

app.get('/setup', async function () {
  var textQuery = "DROP TABLE IF EXISTS users";
  await psql.query(textQuery);

  var textQuery = "CREATE TABLE IF NOT EXISTS Users(id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, first_name TEXT NOT NULL, last_name TEXT NOT NULL, password TEXT NOT NULL, uuid TEXT, age INTEGER, gender TEXT, created_at TIMESTAMP DEFAULT now())";
  await psql.query(textQuery);

  var textQuery = "INSERT INTO USERS (email, first_name, last_name, password) VALUES ('diwadoo', 'diwadoo', 'diwadoo', 'diwadoo')";
  await psql.query(textQuery);

  var textQuery = "INSERT INTO USERS (email, first_name, last_name, password) VALUES ('wadii', 'wadii', 'wadii', 'wadii')";
  await psql.query(textQuery);

  var textQuery = "INSERT INTO USERS (email, first_name, last_name, password) VALUES ('tidus', 'tidus', 'tidus', 'tidus')";
  await psql.query(textQuery);
})