const express = require('express');
const bcrypt = require('bcrypt');

const SALT_COUNT = 10;

const prisma = require('../client');

const usersRouter = express.Router();

// GET /api/users
usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        users.forEach(user => delete user.password);
        res.send({users});
    } catch(e) {
        console.error(e);
    }
})

// GET /api/users/:id
usersRouter.get('/:id', async (req, res, next) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: Number(req.params.id),
            },
            include: {
                listings: true
            }
        })
        delete user.password;
        res.send({user});
    } catch(e) {
        console.error(e);
    }
})

// POST /api/users
usersRouter.post('/register', async (req, res, next) => {
    const {email, name, password, bio} = req.body;
    console.log(email, name, password);
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        }
    });

    // TODO: generate a JWT token for the user

    delete user.password;

    res.send({user: userWithoutPassword});
    /* response: {
        user: {
            id: ...,
            name: ...
        }
    }
    */
});

// DELETE /api/users
usersRouter.delete('/:id', async (req, res, next) => {
    const user = await prisma.user.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.send({user})
})


module.exports = usersRouter;