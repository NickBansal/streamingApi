const app = require('.');
const request = require('supertest')(app);
// eslint-disable-next-line no-unused-vars
const { expect } = require('chai');
const dummyData = require('./testData');

describe('/api', () => {
  it('should return a 200 on the API route page', () => request.get('/api')
    .expect(200));

  it('GET returns 404 error when passed a wrong url', () => request.get('/api/wrongurl')
    .expect(404)
    .then((res) => {
      expect(res.body.msg).to.equal('/api/wrongurl does not exist');
    }));


  describe('/streams/:user_id', () => {
    it('GET returns 200 and the users profile', () => request.get(`/api/streams/${dummyData[0].userId}`)
      .expect(200)
      .then((res) => {
        expect(res.body.name).equal('Natasha Quinn');
        expect(res.body.streamsCurrentlyWatching).equal(0);
        expect(res.body).to.be.an('object');
      }));

    it('GET returns 400 with an unknown user id', () => request.get('/api/streams/invalid_user_id')
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('profile not found');
      }));

    it('PATCH returns 200 and an updated vote_count', () => request.patch(`/api/streams/${dummyData[0].userId}/?vote=up`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
      }));
  });
});
