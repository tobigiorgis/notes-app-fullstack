const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express')
const User = require('../models/User')
const usersRouter = require('./users')

loginRouter.post('/', async (request, response) => {
    const {body} = request
    const {username, password} = nody

    const user = await User.findOne({ username })

    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        response.status(401).json({
            error: 'invalid user or password'
        })
    }

    const userForToken = {
        id: user._id,
        username: user.username,
    }

    const token = jwt.sign(userForToken, '123')

    response.send({
        name: user.name,
        username: user.username,
        token
    })
})

module.exports = loginRouter