const User = require('../models/user');
const bcrypt = require('bcrypt')


const getAll = async (req, res) => {
    try {
        const users = await User.find();

        res.json({
            users
        })
    } catch (error) {
        console.log(error)
    }
}

const getById = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById( id );
        res.json({
            user
        })

    } catch (error) {
        console.log(error);
    }
}

const post = async(req, res) => {
    const { name, lastName, email, password } = req.body;

    try {
        const user = new User({ name, lastName, email, password });

        // hash password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // save user
        await user.save();

        res.status(201).json({
            message: 'User Created',
            user
        })
    } catch (error) {
        console.log(error)
    }

}

const put = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName } = req.body;

        const user = await User.findByIdAndUpdate( id, { name, lastName }, { new: true });
        res.json({
            user
        })
    } catch (error) {
        console.log(error);
    }
}

const destroy = async(req, res )=> {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete( id );
        res.json({
            user
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAll,
    getById,
    post,
    put,
    destroy
};
