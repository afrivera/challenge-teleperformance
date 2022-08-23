const { Schema, model } = require('mongoose');


const postSchema = Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
        max: 500
    },
    likes :{
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
    
},{
    timestamps: true
});



module.exports = model('Post', postSchema)