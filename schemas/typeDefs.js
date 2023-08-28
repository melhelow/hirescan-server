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
    getUser(id: ID!): User
    getAllUsers: [User]
    getAllReviews: [Review]
    getReview(id: ID!): Review
    getCompanyByName(company: String!): [Review]
    getCompanyById(id: ID!): Review
    getCompanyByEmail(email: String!): [Review]
    getCompanyByTelephone(telephone: String!): [Review]
    getCompanyByPersonInCharge(personInCharge: String!): [Review]
    getAllCompanies: [Review]
    
}
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addReview(username: String!, company: String!, personInCharge: String!, telephone: String!, email: String!, website: String!, address: String!, review: String!): Review
        login(email: String!, password: String!): Auth
        removeReview(reviewId: ID!): Boolean
    }
`;




module.exports = typeDefs;