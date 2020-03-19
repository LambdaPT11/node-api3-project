const express = require('express');
const middleware = require('../middleware/middleware.js');
const userDB = require('./userDb.js');

const router = express.Router();
const validateUser = middleware.validateUser
const validateUserId = middleware.validateUserId

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
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});


router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});


module.exports = router;
