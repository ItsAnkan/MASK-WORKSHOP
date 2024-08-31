require('dotenv').config();
const mongoose = require('mongoose');

const dbInit = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log('Connected successfully to database!');
    } catch (error) {
        console.log(error);
    }
} 

module.exports = dbInit;