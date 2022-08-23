const { Schema, model } = require('mongoose');


const postSchema = Schema({
    userPost: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    desc: {
        type: String,
        required: true,
        max: 500
    },
    likes :[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            comments : {
                type: String,
                required: true,
                trim: true
            }
        }
    ]
    
},{
    timestamps: true
});



module.exports = model('Post', postSchema)