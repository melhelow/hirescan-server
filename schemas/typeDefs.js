const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        }

    type Review {
        _id: ID
        username: String
        company: String
        personInCharge: String
        telephone: String
        email: String
        website: String
        address: String
        review: String
        date: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
    getUser(username: String!): User
    getAllUsers: [User]
    getReviewById(id: ID!): Review
    getCompanyById(id: ID!): Review
    getCompanyByNameAndReview(company: String!, review: String!): [Review]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addReview(username: String!, company: String!, personInCharge: String!, telephone: String!, email: String!, website: String!, address: String!, review: String!): Review
        login(email: String!, password: String!): Auth
        removeReview(reviewId: ID!): Boolean
    }
`;




module.exports = typeDefs;