const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const courses = require('./Models/graphschem');

app.use(cors());

var MyGraphQLSchema = buildSchema(`
type Query {
  hello: String,
  salut: String
}
`);

var root = {
  salut: () => {
    return 'Bonjour Monde';
  },
  hello: () => {
    return 'Hello world!';
  },
};

// app.use('/graphql', graphqlHTTP({
//   schema: MyGraphQLSchema,
//   rootValue: root,
//   graphiql: true,
// }));

coursesData: [
  {
      id: 1,
      title: 'The Complete Node.js Developer Course',
      author: 'Andrew Mead, Rob Percival',
      description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs/'
  },
  {
      id: 2,
      title: 'Node.js, Express & MongoDB Dev to Deployment',
      author: 'Brad Traversy',
      description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
  },
  {
      id: 3,
      title: 'JavaScript: Understanding The Weird Parts',
      author: 'Anthony Alicea',
      description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
      topic: 'JavaScript',
      url: 'https://codingthesmartway.com/courses/understand-javascript/'
  }
]

app.use('/graphql', graphqlHTTP({
  schema: courses.schema,
  rootValue: {
    course: courses.getCourse,
    courses: courses.getCourses
  },
  graphiql: true,
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log(courses)
})
