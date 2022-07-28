const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', (req, res) => {
	Post.findAll({
		attributes: ['id', 'title', 'created_at'],
		include: {
			model: User,
			attributes: ['username'],
		},
	})
		.then((dbPostData) => {
      res.json(dbPostData)
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST api/posts
router.post('/', (req, res) => {
	Post.create({
		title: req.body.title,
		post_content: req.body.post_content,
		user_id: req.body.user_id,
	})
		.then((dbPostData) => res.json(dbPostData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// PUT api/posts/id
router.put('/:id', (req, res) => {
	Post.update(
		{
			title: req.body.title,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with the provided id' });
				return;
			}
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE api/posts/id
router.delete('/:id', (req, res) => {
	Post.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with the provided id' });
				return;
			}
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
