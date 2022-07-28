const router = require('express').Router();
const session = require('express-session');
const sequelize = require('../config/config');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  // get all posts and the username of the user that made the post
	Post.findAll({
		attributes: ['id', 'post_url', 'title', 'created_at'],
		include: {
			model: User,
			attributes: ['username'],
		},
	})
		.then((dbPostData) => {
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			res.render('home', posts);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/login', (req, res) => {
  // if session is logged in redirect to home
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
  // if session is not logged in take user to the login page
	res.render('login');
});

router.get('/sign-up', (req, res) => {
	// if session is logged in redirect to home
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	// if session is not logged in take user to the login page
	res.render('sign-up');
});

router.get('/post/:id', (req, res) => {
	Post.findOne({
		where: {
			id: req.params.id,
		},
		attributes: [
			'id',
			'post_url',
			'title',
			'created_at',
		],
		include:{
				model: User,
				attributes: ['username'],
			},
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with the provided id' });
				return;
			}

			// serialize the data
			const post = dbPostData.get({ plain: true });

			// pass data to template
      if(session.loggedIn) {
        res.render('single-post', post);
      } else {
        res.redirect('/login');
				return;
      }
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// for testing session log in
router.get('/', (req, res) => {
	console.log(req.session);
});

module.exports = router;
