var app = require('../server.js');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;

describe('/smoke test', function() {
  it('should return Hello, World', function *(){
    var res = yield request.get('/').expect(200).end();
    expect(res.text).to.equal('Hello World');
  });
});
