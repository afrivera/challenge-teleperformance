const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');

const Post = require('../models/post');
const User = require('../models/user');
const { appSuccess } = require('../helpers/appSuccess');
const { ErrorObject } = require('../helpers/error');


const getAll = catchAsync (async (req, res, next) => {
    try {
        const posts = await Post.find()
                        .populate('userPost', 'name lastName')

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
        const post = await Post.findById( id )
                        .populate('userPost', 'name lastName updatedAt')
        
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
    const userPost = req.uid

    try {

        const post = new Post({ userPost, desc });

        const user = await User.findById( userPost )
        user.posts.push(post._id)

        // save Post
        await Promise.all([post.save()], user.save())

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

// add comment to post
const postComment = catchAsync( async(req, res, next )=> {
    try {
        const { id } = req.params;
        const { comments } = req.body
        console.log(id)
        const post = await Post.findById( id );

        // if post doesn't exist
        if(!post){
            throw new ErrorObject('post Not Found', 404);
        }

        post.comments.push({
            user: req.uid,
            comments
        })

        await post.save();

        appSuccess({
            res,
            message: 'Comment added to post',
            body: post
        })

    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving  Posts] - [Posts - DELETE ]: ${ error.message}`
        )
       next( httpError );
    }
})

// like or unlike post
const likeOrUnlikePost = catchAsync( async(req, res, next )=> {
    try {
        const { id } = req.params;
        const post = await Post.findById( id );
        const userId = req.uid;

        // if post doesn't exist
        if(!post){
            throw new ErrorObject('post Not Found', 404);
        }

        if( post.likes.includes( userId )){
            const i = post.likes.indexOf( userId );
            post.likes.splice( i, 1);
            await post.save();

            return appSuccess({
                res,
                message: 'Post unliked',
                body: post
            })
        } else {
            post.likes.push( userId );
            await post.save();
            return appSuccess({
                res,
                message: 'Post Liked',
                body: post
            })
        }

    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error Retrieving  Posts] - [Posts - DELETE ]: ${ error.message}`
        )
       next( httpError );
    }
})

module.exports = {
    getAll,
    getById,
    post,
    put,
    destroy,
    postComment,
    likeOrUnlikePost
};
