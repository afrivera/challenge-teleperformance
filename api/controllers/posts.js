const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const bcrypt = require('bcrypt');

const Post = require('../models/post');
const { appSuccess } = require('../helpers/appSuccess');
const { ErrorObject } = require('../helpers/error');


const getAll = catchAsync (async (req, res, next) => {
    try {
        const posts = await Post.find();

        appSuccess({
            res,
            message: 'get all Posts retrieved Succesfully',
            body: posts
        })
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving Posts] - [Posts - GET ]: ${ error.message}`
        )
       next( httpError )
    }
})

const getById = catchAsync (async(req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById( id );
        
        appSuccess({
            res,
            message: 'get Post By Id retrieved Succesfully',
            body: post
        })

    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving Post By Id] - [Posts - GET ]: ${ error.message }`
        )
       next( httpError )
    }
})

const post = catchAsync (async(req, res, next) => {
    const { desc } = req.body;
    const userId = req.uid

    try {

        const post = new Post({ userId, desc });

        // save Post
        await post.save();

        appSuccess({
            res,
            code: 201,
            message: 'Post created Succesfully',
            body: post,
        })
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving Posts] - [Posts - POST ]: ${ error.message}`
        )
       next( httpError )
    }

})

const put = catchAsync (async(req, res, next) => {
    try {
        const { id } = req.params;
        const { desc } = req.body;

        const post = await Post.findByIdAndUpdate( id, { desc }, { new: true });

        if(!post){
            return appSuccess({
                res,
                code: 403,
                message: `there is not post with id: ${ id }`,
                status: false
            })
        }
        
        appSuccess({
            res,
            message: 'Post update Succesfully',
            body: post
        })
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving Posts] - [Posts - PUT ]: ${ error.message}`
        )
       next( httpError )
    }
})

const destroy = catchAsync (async(req, res, next )=> {
    try {
        const { id } = req.params;

        const post = await Post.findByIdAndDelete( id );

        if(!post){
            return appSuccess({
                res,
                code: 403,
                message: `there is not post with id: ${ id }`,
                status: false
            })
        }

        appSuccess({
            res,
            message: 'Post deleted Succesfully',
            body: post
        })
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving  Posts] - [Posts - DELETE ]: ${ error.message}`
        )
       next( httpError )
    }
})

module.exports = {
    getAll,
    getById,
    post,
    put,
    destroy
};
