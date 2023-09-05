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
        getAllReviews: async (parent, args) => {
            return await Review.find();
        },
        getReview:async (parent, args) => {
            return await Review.findById(args.id);
        },
        // getCompanyByName: async (_, { company }) => {
        //     return await Review.find({company});
        // },
        getCompanyById:async (parent, args) => {
            return await Review.findById(args.id);
        },
        getAllCompanies: async (parent, args) => {
            return await Review.find();
        },

        getCompanyByNameAndReview: async (_, { company, review }) => {
            return await Review.find({company, review});
        },
        // getCompanyByEmail: async (_,{email}) => {
        //     return await Review.find({email});
        // },

        // getCompanyByTelephone: async (_, {telephone}) => {
        //     return await Review.find({telephone} );
        // },
        // getCompanyByPersonInCharge: async (_,{ personInCharge}) => {
        //     return await Review.find({personInCharge});
        // },
   
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
        removeReview: async (parent, { _id }, context) => {
            if (context.user) {
                const review = await Review.findOneAndRemove({_id, username: context.user.username});
                return !!review;
            } else {
                throw new AuthenticationError("You need to be logged in!");
            }
            
        },
    },
};





module.exports = resolvers;