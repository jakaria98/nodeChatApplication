const bcrypt = require('bcrypt');
const User = require('../models/People');

//get user
const getUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.render('users', {
            users: users,
        });
    } catch (err) {
        next(err);
    }
};

//add user
const addUser = async (req, res, next) => {
    let newUser;
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        if (req.files > 0) {
            newUser = new User({
                ...req.body,
                password: hashedPassword,
                avatar: req.files[0].filename,
            });
        } else {
            newUser = new User({
                ...req.body,
                password: hashedPassword,
            });
        }
        const data = await newUser.save();
        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Unknown error occurred!',
                },
            },
        });
    }
};

// remove user
const removeUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete({
            _id: req.params.id,
        });

        // remove user avatar if any
        if (user.avatar) {
            unlink(path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`), (err) => {
                if (err) console.log(err);
            });
        }

        res.status(200).json({
            message: 'User was removed successfully!',
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Could not delete the user!',
                },
            },
        });
    }
};
module.exports = { getUser, addUser, removeUser };
