const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const People = mongoose.model('People', peopleSchema);

module.exports = People;
