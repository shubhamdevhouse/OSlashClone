const app = require('../../src/app');
const supertest = require('supertest');
const faker = require('Faker');
const request = supertest(app)
const httpStatus = require('http-status');
const { User } = require('../../src/models');
const { Shortlink } = require('../../src/models');
const setupTestDB = require('../utils/setupDB');
setupTestDB();
describe('User routes', () => {
    describe('Shortlink Service', () => {
     
        let user = {
            name: faker.name.findName(),
            email: faker.internet.email().toLowerCase(),
            password: 'password12',
          };
        let shortlinkCreation  = {
            shortlink:"zoom",
            url:"https://zoom.com",
            description:"A zoom meeting url",
            tags:["zoom","meeting"]
        }
        let userObj;
        let shortlinkCreared;
        test('should return 201 and successfully create new user so that we can use the token to create shortlink', async () => {
        
         userObj = await request
        .post('/v1/register')
        .send(user);
    });
        test('should return 201 and successfully create new shortlink if data is ok', async () => {
        
            const res = await request
              .post('/v1/createShortlink')
              .send(shortlinkCreation)
              .set('Authorization', 'Bearer '+userObj.body.tokens.access.token)
              .expect(httpStatus.CREATED);
            expect(res.body).toEqual({shortlink:{
                id: expect.anything(),
                shortlink: shortlinkCreation.shortlink,
                url: shortlinkCreation.url,
                tags:shortlinkCreation.tags,description:shortlinkCreation.description
            },
              
            });
      
            const dbUser = await Shortlink.findById(res.body.shortlink.id);
            expect(dbUser).toBeDefined();
            expect(dbUser).toMatchObject({ shortlink: shortlinkCreation.shortlink, url: shortlinkCreation.url,
            tags:shortlinkCreation.tags,description:shortlinkCreation.description});
            shortlinkCreared = res.body.shortlink;
          });
          
          test('should successfully list all shortlinks', async () => {
        
            const res = await request
              .get('/v1/listShortlinks')
              .set('Authorization', 'Bearer '+userObj.body.tokens.access.token);
            expect(res.body).toEqual(expect.anything());
            });

                      
          test('search shortlink with a keyword expect result if found else empty', async () => {
        
            const res = await request
              .get('/v1/listShortlinks')
              .set('Authorization', 'Bearer '+userObj.body.tokens.access.token);
            expect(res.body).toEqual([shortlinkCreared]);
            });
      
            test('get shortlink object by passing shortlink name', async () => {
        
                const res = await request
                  .get('/v1/getShortlink?shortlink=zoom')
                  .set('Authorization', 'Bearer '+userObj.body.tokens.access.token);
                expect(res.body).toEqual(shortlinkCreared);
                });

                test('delete shortlink by passing name', async () => {
        
                    const res = await request
                      .delete('/v1/deleteShortlink?shortlink=zoom')
                      .set('Authorization', 'Bearer '+userObj.body.tokens.access.token);
                    expect(res.body).toEqual(shortlinkCreared);
                    const dbUser = await Shortlink.findById(res.body.shortlink.id);
                    expect(dbUser).toBeNull();
                    });
    });
});