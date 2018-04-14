'use strict';

const UserService = require('./user');

describe('Test user service', () => {



  describe('.getDetailByName()', () => {
    it('Shoult be ok', async () => {
      try {
        let user = await UserService.getDetailByName('adsfdgfas');
        if (!user) {
          throw 'User not found!';
        }
        console.log(user)
        return user;
      } catch (error) {
        throw error;
      }
    });
  })
})