const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')
const Subscription = require('./resolvers/Subscription')
const Vote = require ('./resolvers/Vote')

//Schema-Driven Development

//This is the implementation of the schema
//A JS object that mirrors your Queries, Mutations, and Subscriptions and their fields from the schema
const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote,
}
//Context is an argument received by resolvers
//It's a plain JS object that resolvers can read/write to
//You can write to it as well when the GraphQLServer is intialized
//Pass data or functions (like the prisma client instance) to the resolver

//Imported this from graphql-yoga and passed the schema and resolvers to it
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request=> {
        return {
            ...request,
            prisma,
        }
    },
})

server.start(()=> console.log(`Server is running on http://localhost:4000`));