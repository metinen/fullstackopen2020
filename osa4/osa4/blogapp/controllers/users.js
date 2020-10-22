const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    let passwordHash = "";

    bcrypt.genSalt(saltRounds, async function (err, salt) {
        bcrypt.hash(body.password, salt, async function (err, hash) {
            passwordHash = hash;
            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash,
            })

            const savedUser = await user.save()

            response.json(savedUser)
        });
    });
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
}
)

module.exports = usersRouter