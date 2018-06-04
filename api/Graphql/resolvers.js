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

const Birthdays = [
    { id: 1, author: 1, date: 'Monday'},
    { id: 2, author: 2, date: 'Tuesday'},
    { id: 3, author: 4, date: 'Wednesday'},
    { id: 4, author: 3, date: 'Saturday'},
]


const resolvers = {
  Query: {
    User: function (_, args) {
      return Users.find(user => user.id == args.id)
    },
    Users : () => Users
  },
  User: {
    messages: (User) => {
      var myArray = [];
      Messages.find(message => {
        if (message.author === User.id)
        myArray.push(message)
      })
      return myArray
    },
    birthday: (User) => {
      var myObj;
      Birthdays.find(birthday => {
        if (birthday.author === User.id) {
          // console.log(birthday.date);
          myObj = birthday;
        }
      })
      return myObj;
    },
  }
}

module.exports = resolvers;
