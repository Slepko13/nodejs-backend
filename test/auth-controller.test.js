const { expect } = require('chai');
const sinon = require('sinon');

const User = require('../src/models/user');
const AuthController = require('../src/controllers/auth');

describe('Auth controller', () => {
  describe('Login', () => {
    it('should throw an error with code 500 if accessing to database fails', (done) => {
      sinon.stub(User, 'findOne');
      User.findOne.throws();
      const req = {
        body: {
          email: 'test@gmail.com',
          password: 'tester',
        },
      };
      AuthController.login(req, {}, () => {}).then((result) => {
        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 500);
        done();
      });

      User.findOne.restore();
    });
  });
});
