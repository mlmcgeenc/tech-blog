const router = require('express').Router();
const sequelize = require('../config/config');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
	Post.findAll({
		where: {
			user_id: req.session.user_id,
		},
		attributes: ['id', 'title', 'created_at'],
	})
		.then((dbPostData) => {
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			res.render('dashboard', posts);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/edit/:id', withAuth, (req, res) => {
	Post.findAll({
		where: {
			id: req.params.id,
		},
		attributes: ['id', 'title', 'post_content'],
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with the provided id' });
				return;
			}

			const posts = dbPostData.get({ plain: true });
			res.render('edit-post', post);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
