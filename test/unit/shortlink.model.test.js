const faker = require('Faker');
const { User } = require('../../src/models');

const { Shortlink } = require('../../src/models');
describe("Shortlink Model Testing", ()=>{

    describe("Shortlink validation", () =>{
        let shortlink;
        let user;
        beforeEach(() => {
            user = {
            name: faker.name.findName(),
            email: faker.internet.email().toLowerCase(),
            password: 'password12',
          };
        });
        
        const userObj = new User(user);
        beforeEach(() => {
            shortlink = {
                shortlink: 'zoom',
                user: userObj,
                description: 'Random description providing',
                tags: ['zoom','meet','video confrence'],
                url:'http://zoom.com'
            }
        });
        test('should correctly validate new shortlink', async()=>{
            await expect(new Shortlink(shortlink).validate()).resolves.toBeUndefined();
        });

        test('should check if tags can be empty or not',async () =>{
            shortlink.tags = [];
            await expect(new User(user).validate()).resolves.toBeUndefined();
        });


    });

    describe('User toJSON()', () => {
       
        let user = {
            name: faker.name.findName(),
            email: faker.internet.email().toLowerCase(),
            password: 'password12',
          };
          
          const userObj = new User(user);
          let shortlink = {
              shortlink: 'zoom',
              user: userObj,
              description: 'Random description providing',
              tags: ['zoom','meet','video confrence'],
              url:'http://zoom.com'
          }
          test('should not return user object when toJSON is called', () => {
          
           
            expect(new Shortlink(shortlink).toJSON()).not.toHaveProperty('user');});
        
      });
});