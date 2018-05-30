const _ = require('lodash');

const Users = [
  {
      "id": 1,
      "first_name": "diwadoo",
      "last_name": "diwadoo",
      "email": "diwadoo",
      "gender": "Male",
      "password": "diwadoo",
  },
  {
    "id": 2,
    "first_name": "wadii",
    "last_name": "wadii",
    "email": "wadii",
    "gender": "Male",
    "password": "wadii",
  },
  {
    "id": 3,
    "first_name": "jean",
    "last_name": "jean",
    "email": "jean",
    "gender": "Male",
    "password": "jean",
  }
];

const Messages = [
  { id: 1, author: 1, content: 'Introduction to GraphQL'},
  { id: 2, author: 2, content: 'Welcome to Meteor'},
  { id: 3, author: 2, content: 'Advanced GraphQL'},
  { id: 4, author: 3, content: 'Launchpad is Cool'},
];


const resolvers = {
  Query: {
    Users : () => Users,
    User: function (_, args) {
      return Users.find(user => user.id == args.id)
    }
    // (id) => console.log(id)//_.find(Users, {'id': id})
  },
  User: {
    messages: (User) => {
      // console.log(User);
      var myArray = [];
      Messages.find(message => {
        if (message.author === User.id)
          myArray.push(message)
      })
      return myArray
    }//Messages.find(Message => Messages.author === User.id)
  }
}

module.exports = resolvers;

// Tweet: {
//   Author: (tweet) => authors.find(author => author.id == tweet.author_id),
//   Stats: (tweet) => stats.find(stat => stat.tweet_id == tweet.id),
// },