require('dotenv').config();
const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose")
const { buildSchema } = require("graphql");
const User = require('./models/user')

const server = express();

server.use(express.json())

server.use("/graphql", graphqlHttp({
  schema: buildSchema(`
    type User {
      _id: ID!
      firstname: String!
      lastname: String!
    }

    input UserInput {
      firstname: String!
      lastname: String!
    }

    type userQuery {
      users: [User!]!
    }

    type userMutation {
      createUser(userInput: UserInput): User
    }

    schema {
      query: userQuery
      mutation: userMutation
    }
    `),
    rootValue: {
      users: () => {

        return User.find().then(users => {
          return users
        }).catch(err => {
          throw err
        })
      },
      createUser: (args) => {
        const user = new User({
          firstname: args.userInput.firstname,
          lastname: args.userInput.lastname
        })

        return user.save().then(res => {
          console.log(res)
          return res
        }).catch(err => {
          console.log(err)
          throw err
        })
      }
    },
    graphiql: true
}))


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@foteekcluster-nv3fj.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true }
)
.then(() => {
    server.listen(3000, () => {
    console.log('Listening on port 3000')
  })
})
.catch(err => {
  console.log(err)
})
