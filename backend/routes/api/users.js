require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;

// Load user model
const user = require('../../models/User');
const User = require('../../models/User');

// GET api/users/test (this route is public)
router.get('/test', (req, res) => {
	res.json({ message: `User endpoint OK OK` });
});

// POST route api/user/register (this is a public route)
router.post('/register', (req, res) => {
	// Find user by email
	User.findOne({ email: req.body.email })
	.then(user => {
		//if email is already exist,  send 400 status
		
		if(user) {
			return res.status(400).json({ msg: `Email already exist`})
		} else {
			//create a new user
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			})
			
			// salt and has the password
			bcrypt.genSalt(10, (error, salt) => {
				bcrypt.hash(newUser.password, salt, (error, hash) => {
					if (error) throw error;
					//change the password to the hash
					newUser.password = hash;
					newUser.save()
					.then(createdUser => res.json(createdUser))
					.catch(err => console.log(err))
				})
			})
			console.log(user)
		}
	})
});

module.exports = router;
