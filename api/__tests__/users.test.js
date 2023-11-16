const { mockDeep } = require('jest-mock-extended');
const app = require('../../app')
const request = require('supertest');

const prismaMock =require('../../mocks/prismaMock');

describe('GET /api/users', () => {
    
    it('returns list of all users', async () => {
        const users = [
            {id: 1, email: 'fakeemail@mail.com',name: 'Jane Doe', password:'password'},
            {id: 2, email: 'fakeemail@mail.com',name: 'Jane Doe', password:'password'}
        ];

        prismaMock.user.findMany.mockResolvedValue(users);

        const response = await request(app).get('/api/users');
        
        expect(response.body.users[0]).toEqual(users[0]);
    });

    // TODO: add a POST request?
});
