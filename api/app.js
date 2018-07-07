const express = require('express');
const app = express();
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

const { GraphQLSchema, execute, subscribe } = require('graphql');
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
const {createServer} = require('http');

const expressPlayground = require('graphql-playground-middleware-express');
const subscriptionType = require('./mutations/subscription');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const {graphiqlExpress, graphqlExpress} = require('graphql-server-express')

app.get('/test', (req, res) => {
  console.log('received request on test');
  res.json({name: 'quentin', occupation: 'suceurdebitecoloreesmaispasbasanees'})
})
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const schema = require('./Graphql/Schema')

const schema = new GraphQLSchema({query: queryType, mutation: mutationType, subscription: subscriptionType})

const ws = createServer(app);

ws.listen(3000, () => {
  console.log('running')
  new SubscriptionServer({
    execute,
    subscribe,
    schema: schema,
  }, {
    server: ws,
    path: '/subscriptions',
  });
});

app.use(
  '/graphql',
  graphqlExpress((req) => ({
    schema
  })
));

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:3000/subscriptions`
  })
);

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

/*
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
*/
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
/*
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
*/
app.get('/setup', async function () {
  var textQuery = "DROP TABLE IF EXISTS users";
  await psql.query(textQuery);

  var textQuery = "CREATE TABLE IF NOT EXISTS Users(id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, first_name TEXT NOT NULL, last_name TEXT NOT NULL, password TEXT NOT NULL, orientation TEXT DEFAULT 'Bi', uuid TEXT, address TEXT, description TEXT, age INTEGER DEFAULT 684367200, gender TEXT, lat TEXT, lng TEXT, created_at TIMESTAMP DEFAULT now())";
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

  var textQuery = "COPY users(email, first_name, last_name, password, uuid, gender, description, address, lat, lng) from '/home/wadii/Desktop/matcha/userscleaned.csv' delimiter ',';"
  await psql.query(textQuery);

  var textQuery = "COPY hashtags(uuid, content) from '/home/wadii/Desktop/matcha/hashtags.csv' delimiter ','"
  await psql.query(textQuery);

  var textQuery = "CREATE TABLE IF NOT EXISTS Visits(id SERIAL PRIMARY KEY, visitor_uuid TEXT NOT NULL, visited_uuid TEXT NOT NULL, visited_at TIMESTAMP DEFAULT now(), unique (visitor_uuid, visited_uuid))"
  await psql.query(textQuery);

  var textQuery = "CREATE TABLE IF NOT EXISTS fakes(id SERIAL PRIMARY KEY, uuid TEXT NOT NULL, reporter_uuid TEXT NOT NULL, reported_at TIMESTAMP DEFAULT now(), unique(uuid, reporter_uuid))"
  await psql.query(textQuery);

  var textQuery = "CREATE TABLE IF NOT EXISTS blocked(id SERIAL PRIMARY KEY, uuid TEXT NOT NULL, blocked_uuid TEXT NOT NULL, blocked_at TIMESTAMP DEFAULT now(), unique(uuid, blocked_uuid))"
  await psql.query(textQuery);

  var textQuery = "CREATE TABLE IF NOT EXISTS likes(id SERIAL PRIMARY KEY, liker_uuid TEXT NOT NULL, liked_uuid TEXT NOT NULL, liked_at TIMESTAMP DEFAULT now(), unique(liker_uuid, liked_uuid))"
  await psql.query(textQuery);
})
//  copy pictures(author_uuid, path, name) from '/home/wadii/Desktop/matcha/pictures.csv' delimiter ',';
//copy pictures(uuid, path, name) from '/home/wadii/Desktop/matcha/pictures.csv' delimiter ',';

/*
with myUser as (
  select * from users where uuid='5'
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
select h1.uuid, count(*) as counter from hashtags as h1 left join hashtags as h2 on h1.uuid='5' and h1.content = h2.content and h1.uuid <> h2.uuid where h2.uuid is not null group by 1
)

select md.*, ch.counter from matchesbyDistance as md
left join count_hashtags as ch on md.uuid=ch.uuid
order by counter desc
*/
