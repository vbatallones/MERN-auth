require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const passport = require('passport');
const users = require('./routes/api/users')

//MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

//Importing passport file into server
require('./config/passport')(passport);


app.get('/', (req, res) => {
	res.status(200).json({ message: `Smile, you are being watch by the Backend Team` });
});

app.use('/api/users', users);

//PORT
app.listen(port, () => {
	console.log(`🎧listening to port ${port} 🎧`);
});
