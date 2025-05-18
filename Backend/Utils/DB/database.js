const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://Bharani_Rayudu:Bharani@cluster0.bsh0jfz.mongodb.net/HireQuest?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Database Connected.')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDb