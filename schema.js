// provide types for schema
// needs to matchup with mongoose model
exports.typeDefs = `

type User{
    _id: ID
    username: String! @unique
    password: String!
    email: String! 
}

type Token {
    token: String!
}

type Mutation {
    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token

}

`;
