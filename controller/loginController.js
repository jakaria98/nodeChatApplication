//external imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// internal imports
const User = require('../models/People');

function getLogin(req, res, next) {
    res.render('index');
}

// Login
const login = async (req, res, next) => {
    try {
        // find user
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }],
        });
        // if user found
        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            // if password is matched
            if (isValidPassword) {
                const userObject = {
                    username: user.username,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role,
                };
                // generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                });
                // set cookie
                res.cookie(process.env.COOKIE_NAME, token, {
                    httpOnly: true,
                    maxAge: process.env.JWT_EXPIRY,
                    signed: true,
                });
                // set locals
                res.locals.loggedInUser = userObject;
                res.render('inbox');
            } else {
                throw createError('Login failed! Please try again.');
            }
        } else {
            throw createError('Login failed! Please try again.');
        }
    } catch (err) {
        res.render('index', {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
};
module.exports = { getLogin, login };
