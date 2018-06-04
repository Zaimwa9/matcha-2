const Message = require('./MessageType');
const Birthday = require('./BirthdayType');

const User = `type User {
  id: Int
  first_name: String
  last_name: String
  email: String!
  gender: String
  password: String
  messages: [Message]
  birthday: Birthday
  }
`

module.exports = [User, Message, Birthday];