const typeDefs =`
    type User {
        id: Int
        first_name: String
        last_name: String
        email: String
        gender: String
        password: String
    }

    type Query {
        User(id: ID!): User
        Users: [User]
    }`

module.exports = typeDefs;