const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { appSuccess } = require('../helpers/appSuccess');
const { ErrorObject } = require('../helpers/error');
const { generateJWT } = require('../helpers/jwt');

const login = catchAsync (async(req, res, next ) => {
    try {
       const { email, password } = req.body;
       
       const user = await User.findOne({ email });
       const validPass = user && bcrypt.compareSync( password, user.password );

       // valid user exist and correct password 
       if(!user || !validPass ){
        throw new ErrorObject('email or password incorrect', 401, )
       }

       const token = await generateJWT( user.id );
       
       appSuccess({
        res,
        code: 200,
        message: 'User Login Succesfully',
        body: {user, token}
       })
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving Auth Login] - [auth - POST ]: ${ error.message}`
        )
       next( httpError )
    }
})

const getAll = catchAsync (async (req, res, next) => {
    try {
        const users = await User.find();

        appSuccess({
            res,
            message: 'get all Users retrieved Succesfully',
            body: users
        })
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving Users] - [users - GET ]: ${ error.message}`
        )
       next( httpError )
    }
})

const getById = catchAsync (async(req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById( id );
        
        appSuccess({
            res,
            message: 'get User By Id retrieved Succesfully',
            body: user
        })

    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving User By Id] - [users - GET ]: ${ error.message }`
        )
       next( httpError )
    }
})

const post = catchAsync (async(req, res, next) => {
    const { name, lastName, email, password } = req.body;

    try {

        // validate if email exist
        const userDB = await User.findOne({ email });
        if( userDB){
            throw new ErrorObject('Email already exist in DB', 404)
        }

        const user = new User({ name, lastName, email, password });
        const token = await generateJWT( user.id );
        
        // hash password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // save user
        await user.save();

        appSuccess({
            res,
            message: 'user created Succesfully',
            body: {user, token},
        })
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving Users] - [users - POST ]: ${ error.message}`
        )
       next( httpError )
    }

})

const put = catchAsync (async(req, res, next) => {
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
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving Users] - [users - PUT ]: ${ error.message}`
        )
       next( httpError )
    }
})

const destroy = catchAsync (async(req, res, next )=> {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete( id );
        appSuccess({
            res,
            message: 'user deleted Succesfully',
            body: user
        })
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving  Users] - [users - DELETE ]: ${ error.message}`
        )
       next( httpError )
    }
})

module.exports = {
    login,
    getAll,
    getById,
    post,
    put,
    destroy
};
