const userDB = require('../users/userDb.js');

const logger = (req, res, next) => {
    const method = req.method
    const endPoint = req.originalUrl
    const date = new Date()
    console.dir(`${method} request to ${endPoint} at ${date}`)
    next()
}

const validateUserId = (req, res, next) => {
    const { id } = req.params
    userDB.getById(id)
        .then((user) => {
            if (user) {
                req.user
            } else {
                res.status(400).json({ msg: 'invalid user id' })
            }
        })
        next();
}

const validateUser = (req, res, next) => {
    if (Object.entries(req.body).length === 0) {
        res.status(400).json({ msg: 'missing user data' })
    } else if (!req.body.name) {
        res.status(400).json({ msg: 'missing required name field' })
    }
    next();
} 


module.exports = {
    logger,
    validateUser,
    validateUserId,
};
