const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

router.get('/', (req, res) => {
	Comment.findAll({
		attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
		include: {
			model: User,
			attributes: ['username'],
		},
	})
		.then((dbCommentData) => res.json(dbCommentData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	if (req.sesion) {
		Comment.create({
			comment_text: req.body.comment_text,
			post_id: req.body.post_id,
			created_at: req.body.created_at,
			user_id: req.session.user_id,
		})
			.then((dbCommentData) => res.json(dbCommentData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	}
});

module.exports = router;
