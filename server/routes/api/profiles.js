// login & register
const express = require('express');
const router = express.Router();

// 使用 passport
const passport = require('passport');

const Profile = require('../../models/Profile');

// $route POST api/profiles/add
// @desc  創建 add api
// @access Private

router.post(
	'/add',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const profileFields = {};
		if (req.body.type) profileFields.type = req.body.type;
		if (req.body.describe) profileFields.describe = req.body.describe;
		if (req.body.income) profileFields.income = req.body.income;
		if (req.body.expend) profileFields.expend = req.body.expend;
		if (req.body.cash) profileFields.cash = req.body.cash;
		if (req.body.remark) profileFields.remark = req.body.remark;

		new Profile(profileFields)
			.save()
			.then((profile) => {
				res.json(profile);
			})
			.catch((err) => {
				console.log(err);
			});
	},
);

// $route GET api/profiles
// @desc  獲取 所有 訊息
// @access Private

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.find()
			.then((profile) => {
				if (!profile) return res.status(404).json('沒有任何內容!');
				res.json(profile);
			})
			.catch((err) => {
				res.status(404).json(err);
			});
	},
);

// $route GET api/profiles/:id
// @desc  獲取 單個 訊息
// @access Private

router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ _id: req.params.id })
			.then((profile) => {
				if (!profile) return res.status(404).json('沒有任何內容!');
				res.json(profile);
			})
			.catch((err) => {
				res.status(404).json(err);
			});
	},
);

// $route POST api/profiles/edit
// @desc  更新 訊息 api
// @access Private

router.post(
	'/edit/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const profileFields = {};
		if (req.body.type) profileFields.type = req.body.type;
		if (req.body.describe) profileFields.describe = req.body.describe;
		if (req.body.income) profileFields.income = req.body.income;
		if (req.body.expend) profileFields.expend = req.body.expend;
		if (req.body.cash) profileFields.cash = req.body.cash;
		if (req.body.remark) profileFields.remark = req.body.remark;
		Profile.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				$set: profileFields,
			},
			{
				new: true,
			},
		)
			.then((profile) => {
				res.json(profile);
			})
			.catch((err) => {
				res.status(404).json(err);
			});
	},
);

// $route POST api/profiles/delete/:id
// @desc  刪除 訊息 api
// @access Private
router.delete(
	'/delete/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOneAndRemove({ _id: req.params.id })
			.then((profile) => {
				res.json(profile);
			})
			.catch((err) => {
				res.status(404).json('刪除失敗' + err);
			});
	},
);
module.exports = router;
