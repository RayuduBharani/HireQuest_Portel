const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/HireQuestPortal')
        console.log('Database Connected.')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDb