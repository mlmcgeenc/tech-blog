const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', (req, res) => {
	User.findAll({
		attributes: { exclude: ['password'] },
	})
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post('/signup', (req, res) => {
	User.create({
		username: req.body.username,
		password: req.body.password,
	})
		.then((dbUserData) => {
			req.session.save(() => {
				req.session.user_id = dbUserData.id;
				req.session.username = dbUserData.username;
				req.session.loggedIn = true;

				res.json(dbUserData);
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post('/login', (req, res) => {
	User.findOne({
		where: {
			username: req.body.username,
		},
	}).then((dbUserData) => {
		if (!dbUserData) {
			res.status(404).json({ message: 'No account with that username exists' });
			return;
		}
    
		const validPassword = dbUserData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: 'Password was entered incorrectly' });
			return;
		}

		req.session.save(() => {
			req.session.user_id = dbUserData.id;
			req.session.username = dbUserData.username;
			req.session.loggedIn = true;

			res.json({ user: dbUserData, message: 'You are now logged in!' });
			console.log('You are now logged in!');
		});
	});
});

router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
		console.log('You have logged out');
	} else {
		res.status(404).end();
	}
});

module.exports = router;
