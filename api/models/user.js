const { Schema, model } = require('mongoose');


const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'field name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'field lastName is required'],
    },
    email: {
        type: String,
        required: [true, 'field email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'field password is required'],
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    google: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    }
},{
    timestamps: true
});

userSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject()
    object.uid = _id;
    return object
})

module.exports = model('User', userSchema)