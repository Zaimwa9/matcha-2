const Users = require('../data/User');
// Il faudra rajouter un appel a la DB
const _ = require('lodash');
var { buildSchema } = require('graphql');

module.exports = {
    schema : buildSchema(`
    type Query {
      user(id: Int!): User
      users(topic: String): [User]
    },
    type User {
      id: Int
      first_name: String
      last_name: String
      email: String
      gender: String
      password: String
    }
  `),

  getUser : function(args) {
    var id = args.id;
    console.log(Users);
    return Users.filter(course => {
        return course.id == id;
    })[0];
  },

  getUsers : function(args) {
    console.log('hit');
    console.log(args);
    if (args.topic) {
        var topic = args.topic;
        return Users.filter(course => course.topic === topic);
    } else {
        return Users;
    }
  },

  root : {
    user: function(args) {
      var id = args.id;
      console.log(Users);
      return Users.filter(course => {
          return Users.id == id;
      })[0];
    },
    users: function(args) {
      console.log('hit');
      console.log(args);
      if (args.topic) {
        var topic = args.topic;
        return Users.filter(course => course.topic === topic);
      } else {
        return Users;
      }
    },
  }
}