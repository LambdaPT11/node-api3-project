const express = require('express');
const middleware = require('../middleware/middleware.js');
const userDB = require('./userDb.js');
const postsDB = require('../posts/postDb')

const router = express.Router();
const validateUser = middleware.validateUser
const validateUserId = middleware.validateUserId
const validatePost = middleware.validatePost

router.get('/', (req, res) => {
  
  userDB.get()
    .then ((users) => {
      res.status(200).json(users)
    })
    .catch ((error) => {
      res.status(500).json({ msg: 'it BROKE!!!' })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.post('/', validateUser, (req, res) => {
  const  user  = req.body
  userDB.insert(user)
    .then((user) => {
      res.status(201).json({ success: 'a new user has been brought forth', user })
    })
    .catch(err => {
      res.status(500).json({ err: 'you really need to try that again' })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params
  userDB.getById(id)
    .then(user => {
      if (user) {
        userDB.remove(id)
      .then(deleted => {
        if(deleted) {
          res.status(200).json({ msg: `user ${id} was deleted!\n ${user.name} is dead` });
        } else { null }
      })
      } else { null }
    })
    .catch(err => {
      res.status(500).json({ msg: 'ok, that did not work, like at all. Nope.' })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const { id } = req.params

  usersDB.update(id, req.body)
		.then(user => {
			res.status(200).json({ success: 'Info Updated!', info: req.body })
		})
		.catch(err => {
			res.status(500).json({ error: 'You found me but I cannot provide any info, try again!', err })
		})
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const { text } = req.body
	const user_id = req.params.id

	usersDB.getById(user_id)
		.then(post => {
			if (!post) {
				null
			} else {
				let newPost = {
					text,
					user_id,
				}

				postsDB.insert(newPost).then(post => {
					res.status(201).json({ success: post })
				})
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'You found me but I cannot provide any info, try again!', err })
		})
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params

	usersDB.getUserPosts(id)
		.then(data => {
			data ? res.status(200).json(data) : null
		})
		.catch(err => {
			res.status(500).json({ error: 'You found me but I cannot provide any info, try again!', err })
		})
});


module.exports = router;
