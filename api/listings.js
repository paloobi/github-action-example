const express = require('express');

const SALT_COUNT = 10;

const prisma = require('../client');

const listingsRouter = express.Router();

// GET /api/listings
listingsRouter.get('/', async (req, res, next) => {
    try {
        const listings = await prisma.listing.findMany();
        res.send({listings});
    } catch(e) {
        console.error(e);
    }
})

// GET /api/listings/:id
listingsRouter.get('/:id', async (req, res, next) => {
    try {
        const listing = await prisma.listing.findUniqueOrThrow({
            where: {
                id: Number(req.params.id),
            },
        })
        res.send({listing});
    } catch(e) {
        console.error(e);
    }
})

// POST /api/listings
listingsRouter.post('/', async (req, res, next) => {
    const {title, description, price} = req.body;

    const listing = await prisma.listing.create({
        data: {
            title, description, price
        }
    });


    res.send({listing});
});

// DELETE /api/listings
listingsRouter.delete('/:id', async (req, res, next) => {
    const listing = await prisma.listing.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.send({listing})
})


module.exports = listingsRouter;