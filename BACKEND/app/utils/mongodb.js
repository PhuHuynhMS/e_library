const mongoose = require('mongoose');
class MongoDB {
    static connect = async (uri) => {
        try {
            const conn = await mongoose.connect(uri);
            return conn;
        } catch (error) {
            console.log('Cannot connect to the database!', error);
            return error;
        }
    };
}

module.exports = MongoDB;
