const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
// passport
const passport = require('passport');
// 引入 users.js
const users = require('./routes/api/users');
// 引入 profile
const profiles = require('./routes/api/Profiles');
// DB config
const db = require('./config/keys').mongoURI;

// 使用 body-parser 中間件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// passport 初始化
app.use(passport.initialize());

// Connect to mongodb
mongoose
	.connect(db)
	.then(() => {
		console.log('MongoDB Connected');
	})
	.catch((err) => {
		console.log(err);
	});

// passport 初始化
app.use(passport.initialize());
require('./config/passport')(passport);

// app.get('/', (req, res) => {
// 	res.send('Hello World!');
// });

// 使用 routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
