const app = require('.');
const request = require('supertest')(app);
// eslint-disable-next-line no-unused-vars
const { expect } = require('chai');
const dummyData = require('./testData');

describe('/api', () => {
  it('should return a 200 on the API route page', () => request.get('/api')
    .expect(200));


  describe('/streams/:user_id', () => {
    it('GET returns 200 and the users profile', () => request.get(`/api/streams/${dummyData[0].userid}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
      }));
  });
});
