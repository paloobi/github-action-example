
const app = require('../../app')
const request = require('supertest');

const prismaMock =require('../../mocks/prismaMock');

describe('/api/listings', () => {
    describe('GET /api/listings', () => {
        
        it('returns list of all listings', async () => {
            const listings = [
                {id: 1, title: "Sandwich", description: "Selling one ham sandwich", price: 12.20},
                {id: 1, title: "Car", description: "Selling one amazing car", price: 1000},
            ];

            prismaMock.listing.findMany.mockResolvedValue(listings);

            const response = await request(app).get('/api/listings');
            
            expect(response.body.listings[0]).toEqual(listings[0]);
            expect(response.body.listings[1]).toEqual(listings[1]);
        });
    });

    describe('POST /api/listings', () => {
        it('successfully creates a new listing', async () => {
            const newListing = {
                id: 1,
                title: "Hat",
                description: "Selling one fancy hat",
                price: 35
            };

            prismaMock.listing.create.mockResolvedValue(newListing);

            const response = await request(app).post('/api/listings');

            const {listing} = response.body;
            expect(listing.id).toEqual(newListing.id);
            expect(listing.title).toEqual(newListing.title);
            expect(listing.description).toEqual(newListing.description);
            expect(listing.price).toEqual(newListing.price);

            expect(prismaMock.listing.create).toHaveBeenCalledTimes(1);
        });
    })
});