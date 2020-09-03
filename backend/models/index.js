require('dotenv').config();
const mongoose = require('mongoose');


// Mongo connection
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
});

// Mongoose connection object
const db = mongoose.connection;

// set up an event listener to fire once when the connection 'opens'
// console.log what the host and port is running on

db.once('open', () => {
	console.log(`Connected to MongoDB at ${host}:${port}`);
});

db.on('error', (error) => {
    console.log(`Database error\n${error}`)
})

module.exports.User = require('./User')