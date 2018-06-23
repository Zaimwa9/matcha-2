const express = require('express');
const app = express();
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

const { GraphQLSchema } = require('graphql');
const userType = require('./defTypes/userType');
const mutationType = require('./mutations/mutation');
const queryType = require('./queries/query.js');

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var path = require('path');

const psql = require('./db/dbconnect');

const jwt = require('jsonwebtoken');

app.get('/test', (req, res) => {
  console.log('received request on test');
  res.json({name: 'quentin', occupation: 'suceurdebitecoloreesmaispasbasanees'})
})
app.use(cors());

app.use(express.static('public'));
// const schema = require('./Graphql/Schema')

const schema = new GraphQLSchema({query: queryType, mutation: mutationType})

const verifyToken = (token) => {
  if (!token) {
    throw new Error('No token provided');
  }
  const [prefix, payload] = token.split(' ')
  let user = null
  if (!payload) { //no token in the header
    throw new Error('No token provided')
  }
  jwt.verify(payload, 'quentinbaltringue', async (err, data) => {
    if (err) { //token is invalid
        throw new Error('Invalid token!')
    } else {
      textQuery = `SELECT * FROM users WHERE uuid='${data.uuid}'`;
      try {
        user = await psql.query(textQuery);
        user = user.rowCount === 1 ? user.rows[0] : null;
        console.log(user);
        if (!user) { //user does not exist in DB
          throw new Error('User does not exist')
        }
      } catch (e) {
        console.log(e);
        throw (e)
      }
    }
  })
  return user;
}

app.use('/graphql',
  // bodyParser.json(),
  // (req, res, next) => {
  //   console.log(req.headers.protected);
  //   if (req.headers.protected === 'false') {
  //     console.log('nexting')
  //     return next()
  //   }
  //   const token = req.headers['authorization']
  //   try {
  //     req.user = verifyToken(token)
  //     next()
  //   } catch (e) {
  //     console.log(e);
  //     res.status(200).json({
  //       auth: false,
  //       message: e.message
  //     })
  //   }
  // },
  graphqlHTTP((req, res) => ({
  schema: schema,
  graphiql: true,
  })
))
;

app.post('/upload', upload.single('file'), (req, res) => {
  var tmp_path = req.file.path;
  var name = Date.now() + req.file.originalname;
  var target_path = './public/uploads/' + name;
  var db_path = 'http://localhost:3000/uploads/' + name;

  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', async function() {
    var textQuery = `INSERT INTO pictures (
      author_uuid,
      path,
      mimetype,
      name,
      db_name,
      size
    ) VALUES (
      '${req.body.uuid}', '${db_path}', '${req.file.mimetype}', '${req.file.originalname}', '${name}', '${req.file.size}'
    ) RETURNING *`;
    try {
      const data = await psql.query(textQuery);
      res.status(200).send({data: data.rows[0]});
    } catch (e) {
      res.send('500');
      return new Error('Database error: ' + e);
    }
  });
  src.on('error', function(err) {
    console.log('error');
    res.send('500');
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

app.get('/setup', async function () {
  var textQuery = "DROP TABLE IF EXISTS users";
  await psql.query(textQuery);

  var textQuery = "CREATE TABLE IF NOT EXISTS Users(id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, first_name TEXT NOT NULL, last_name TEXT NOT NULL, password TEXT NOT NULL, uuid TEXT, address TEXT, description TEXT, age INTEGER DEFAULT 684430845, gender TEXT, lat NUMERIC, lng NUMERIC, created_at TIMESTAMP DEFAULT now())";
  await psql.query(textQuery);

  var textQuery = "INSERT INTO USERS (email, first_name, last_name, password) VALUES ('diwadoo', 'diwadoo', 'diwadoo', 'diwadoo')";
  await psql.query(textQuery);

  var textQuery = "INSERT INTO USERS (email, first_name, last_name, password) VALUES ('wadii', 'wadii', 'wadii', 'wadii')";
  await psql.query(textQuery);

  var textQuery = "INSERT INTO USERS (email, first_name, last_name, password) VALUES ('tidus', 'tidus', 'tidus', 'tidus')";
  await psql.query(textQuery);

  var textQuery = "DROP TABLE IF EXISTS hashtags";
  await psql.query(textQuery);

  var textQuery = "CREATE TABLE IF NOT EXISTS hashtags(id SERIAL PRIMARY KEY, uuid TEXT NOT NULL, content TEXT NOT NULL)";
  await psql.query(textQuery);

  var textQuery = "CREATE TABLE IF NOT EXISTS pictures(id SERIAL PRIMARY KEY, author_uuid TEXT NOT NULL, path TEXT NOT NULL, mimetype TEXT, name TEXT, size INT, db_name TEXT posted_at TIMESTAMP DEFAULT now())";
  await psql.query(textQuery);
})
