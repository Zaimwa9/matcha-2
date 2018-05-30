var Message = require('./Message');

const User = `type User {
  id: Int
  first_name: String
  last_name: String
  email: String
  gender: String
  password: String
  messages: [Message]
  }
`

module.exports = [User, Message];