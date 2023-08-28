const { AuthenticationError } = require("apollo-server-express");
const { User, Review} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        getUser: async (parent, args) => {
            return User.findById(args.id );
        },
        getAllUsers: async () => {
            return User.find();
        },
        getReviewById: async (parent, args) => {
            return await Review.findById(args.id);
        },
        getCompanyById: async (parent, args) => {
            return await Review.findById(args.id);
        },
        getCompanyByNameAndReview: async (_,{company,review }) => {
            return await Review.find({company,review});
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            console.log({
                username,
                email,
                password
            })
            const user = await User.create({ 
                username, 
                email, 
                password
             });
             console.log(user)
            const token = signToken(user);
            return { token, user };
        },
        addReview: async (_, { username, company, personInCharge, telephone, email, website, address, review }) => {
            const newReview = await Review.create({ username, company, personInCharge, telephone, email, website, address, review });
            const token = signToken(newReview);
            return newReview;
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("No profile with this email found!");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect password!");
            }
            const token = signToken(user);
            return { token, user };
        },
        removeReview: async (parent, { _Id },context) => {
            if (context.user) {
                const review = await Review.findByIdAndRemove({_Id, username: context.user.username});
                return !!review;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },
};





module.exports = resolvers;