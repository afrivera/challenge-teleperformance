const User = require('../models/user');
const bcrypt = require('bcrypt');
const { appSuccess } = require('../helpers/appSuccess');

const login = async(req, res) => {
    try {
       const { email, password } = req.body;
       
       const user = await User.findOne({ email });
       const validPass = user && bcrypt.compareSync( password, user.password );

       // valid user exist and correct password 
       if(!user || !validPass ){
       throw new Error('email or password incorrect')
       }
       
       appSuccess({
        res,
        code: 201,
        message: 'User Login Succesfully',
        body: user
       })
    } catch (error) {
       console.log(error)
    }
}

const getAll = async (req, res) => {
    try {
        const users = await User.find();

        appSuccess({
            res,
            message: 'get all Users retrieved Succesfully',
            body: users
        })
    } catch (error) {
       console.log(error)
    }
}

const getById = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById( id );
        
        appSuccess({
            res,
            message: 'get User By Id retrieved Succesfully',
            body: user
        })

    } catch (error) {
       console.log(error)
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

        appSuccess({
            res,
            message: 'user created Succesfully',
            body: user
        })
    } catch (error) {
        returnconsole.log(error)
    }

}

const put = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName } = req.body;

        const user = await User.findByIdAndUpdate( id, { name, lastName }, { new: true });
        
        appSuccess({
            res,
            message: 'user update Succesfully',
            body: user
        })
    } catch (error) {
       console.log(error)
    }
}

const destroy = async(req, res )=> {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete( id );
        appSuccess({
            res,
            message: 'user deleted Succesfully',
            body: user
        })
    } catch (error) {
       console.log(error)
    }
}

module.exports = {
    login,
    getAll,
    getById,
    post,
    put,
    destroy
};
