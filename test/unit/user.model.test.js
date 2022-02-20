const faker = require('Faker');
const { User } = require('../../src/models');
describe("User Model Testing", ()=>{

    describe("User validation", () =>{
        let user;
        beforeEach(()=>{
            user = {
                name: faker.name.findName(),
                email: faker.internet.email().toLowerCase(),
                password: 'password12',

            }
        });
        test('should correctly validate new user', async()=>{
            await expect(new User(user).validate()).resolves.toBeUndefined();
        });

        test('should check if email is valid or not',async () =>{
            user.email = 'wrongemailformat';
            await expect(new User(user).validate()).rejects.toThrow();
        });

        test('should check if password length is less then 8 characters' ,async()=>{
            user.password='12@456';
            await expect(new User(user).validate()).rejects.toThrow();
        });
        
        test('should check if password doest not contain number' ,async()=>{
            user.password='abcdefghe';
            await expect(new User(user).validate()).rejects.toThrow();
        });

        test('should check if password doest not contain letters' ,async()=>{
            user.password='123456789';
            await expect(new User(user).validate()).rejects.toThrow();
        });

    });

    describe('User toJSON()', () => {
        test('should not return user password when toJSON is called', () => {
          const user = {
            name: faker.name.findName(),
            email: faker.internet.email().toLowerCase(),
            password: 'abcdefgh1',
          };
          expect(new User(user).toJSON()).not.toHaveProperty('password');
        });
      });
});