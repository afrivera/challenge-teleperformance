const mongoose = require('mongoose');


const dbConnection = async()=> {
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('db online');
    } catch (error) {
        throw new Error('Error trying to start db')
    }
}

module.exports = {
    dbConnection
};
