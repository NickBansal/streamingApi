const app = require('.');
const request = require('supertest')(app);
// eslint-disable-next-line no-unused-vars
const { expect } = require('chai');
const dummyData = require('./testData');

describe('/api', () => {
  it('should return a 200 on the API route page', () => request
    .get('/api')
    .expect(200));

  it('GET returns 404 error when passed a wrong url', () => request
    .get('/api/wrongurl')
    .expect(404)
    .then((res) => {
      expect(res.body.msg).to.equal('/api/wrongurl does not exist');
    }));


  describe('/streams/:user_id', () => {
    it('GET returns 200 and the users profile', () => request
      .get(`/api/streams/${dummyData[0].userId}`)
      .expect(200)
      .then((res) => {
        expect(res.body.name).equal('Natasha Quinn');
        expect(res.body.streamsCurrentlyWatching).equal(0);
        expect(res.body).to.be.an('object');
      }));

    it('GET returns 400 with an unknown user id', () => request
      .get('/api/streams/invalid_user_id')
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('profile not found');
      }));

    it('PUT returns 200 and an updated increased streamsCurrentlyWatching', () => request
      .put(`/api/streams/${dummyData[1].userId}/increase`)
      .expect(200)
      .then((res) => {
        expect(res.body.name).equal('Jamie Connor');
        expect(res.body.streamsCurrentlyWatching).equal(2);
      }));

    it('PUT returns 400 if the user is already watching 3 streams', () => request
      .put(`/api/streams/${dummyData[3].userId}/increase`)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('This user has reached their limit. Can ony watch a maximum of 3 streams at a time');
      }));

    it('PUT returns 200 and an updated decreased streamsCurrentlyWatching', () => request
      .put(`/api/streams/${dummyData[2].userId}/decrease`)
      .expect(200)
      .then((res) => {
        expect(res.body.name).equal('Gracie Whitehouse');
        expect(res.body.streamsCurrentlyWatching).equal(0);
      }));

    it('PUT returns 400 if the user is not watching any streams', () => request
      .put(`/api/streams/${dummyData[4].userId}/decrease`)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('This user is currently not watching any streams');
      }));
  });
});
