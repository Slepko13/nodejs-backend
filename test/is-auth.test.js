const { expect } = require('chai');

const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const isAuth = require('../src/middleware/is-auth');

describe('Auth middleware', () => {
  it('should throw an error if no auth header provided', () => {
    const req = {
      get: () => null,
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw(
      'Not authenticated first'
    );
  });

  it('should yield a userId after decoding the token', () => {
    const req = {
      get: () => 'Dearer xyz',
    };
    jwt.verify = () => ({ userId: 'abc' });
    isAuth(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req.userId).to.equal('abc');
  });
  it('should call jwt.verify', () => {
    const req = {
      get: () => 'Dearer xyz',
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });
    isAuth(req, {}, () => {});
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
  it('should yield a userId equal to "abc" after decoding the token', () => {
    const req = {
      get: () => 'Dearer xyz',
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });
    isAuth(req, {}, () => {});
    expect(req).to.have.property('userId').to.equal('abc');
    jwt.verify.restore();
  });
});
