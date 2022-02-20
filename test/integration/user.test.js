const app = require('../../src/app');
const supertest = require('supertest');
const request = supertest(app)
const faker = require('Faker');
const httpStatus = require('http-status');
const { User } = require('../../src/models');
const setupTestDB = require('../utils/setupDB');
setupTestDB();
describe('User routes', () => {
    describe('POST /v1/register', () => {
        let 
            user = {
            name: faker.name.findName(),
            email: faker.internet.email().toLowerCase(),
            password: 'password12',
          };
      
        test('should return 201 and successfully create new user if data is ok', async () => {
      
            const res = await request
              .post('/v1/register')
              .send(user)
              .expect(httpStatus.CREATED);
            expect(res.body).not.toHaveProperty('password');
            
            expect(res.body).toEqual({user:{
                id: expect.anything(),
                name: user.name,
                email: user.email
            },tokens:   expect.anything(),
              
            });
      
            const dbUser = await User.findById(res.body.user.id);
            expect(dbUser).toBeDefined();
            expect(dbUser.password).not.toBe(user.password);
            expect(dbUser).toMatchObject({ name: user.name, email: user.email});
          });
          
          test('should return 400 error if email is invalid', async () => {
          
            user.email = 'invalidEmail';
      
            await request
              .post('/v1/register')
              .send(user)
              .expect(httpStatus.BAD_REQUEST);
          });

          test('should return 400 error if password does not contain both letters and numbers', async () => {
       
            user.password = 'password';
      
            await request
              .post('/v1/register')
              .send(user)
              .expect(httpStatus.BAD_REQUEST);
      
              user.password = '1111111';
      
            await request
              .post('/v1/register')
              .send(user)
              .expect(httpStatus.BAD_REQUEST);
          });
      
    });
});