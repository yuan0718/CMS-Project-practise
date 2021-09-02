// login & register
const express = require('express');
const router = express.Router();
// 使用 bcrypt 加密
const bcrypt = require('bcrypt');
// 使用 gravatar 頭像
const gravatar = require('gravatar');
// json web token 使用
const jwt = require('jsonwebtoken');
// 使用 passport
const passport = require('passport');

const keys = require('../../config/keys');

const User = require('../../models/User');

router.get('/test',(req,res)=>{
	res.json('Hello world')
})

// $route POST api/users/register 註冊
// @desc  返回 request(請求) 的json數據
// @access public
router.post('/register', (req, res) => {
	// 查詢數據中 是否有相同email
	User.findOne({
		email: req.body.email,
	}).then((user) => {
		if (user) {
			return res.status(400).json('email已被註冊');
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200',
				r: 'g',
				d: 'mm',
			});
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password,
				identity: req.body.identity,
			});
			// 使用 bcrypt
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					// Store hash in your password DB.
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) => {
							res.json(user);
						})
						.catch((err) => {
							console.log(err);
						});
				});
			});
		}
	});
});

// $route POST api/users/login 登入
// @desc  返回 token jwt passport
// @access public

router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	// 查詢數據庫
	User.findOne({
		email,
	}).then((user) => {
		if (!user) {
			return res.status(404).json('用戶或密碼錯誤!');
		}
		// 密碼匹配
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// jwt.sign('規則','加密字串','過期時間','Callback')
				const rule = {
					id: user.id,
					name: user.name,
					avatar: user.avatar,
					identity: user.identity,
				};
				jwt.sign(
					rule,
					keys.secretOrKey,
					{
						expiresIn: '7day',
					},
					(err, token) => {
						if (err) throw err;
						res.json({
							success: true,
							token: `Bearer ${token}`,
						});
					},
				);
			} else {
				return res.status(400).json('用戶或密碼錯誤!');
			}
		});
	});
});

// $route GET api/users/current 登入成功
// @desc  return current user
// @access Private
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
			identity: req.user.identity,
		});
	},
);

module.exports = router;
