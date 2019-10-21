const app = require('.');
const request = require('supertest')(app);
// eslint-disable-next-line no-unused-vars
const { expect } = require('chai');

describe('/api', () => {
  it('returns a 200 on the API route page', () => request.get('/api')
    .expect(200));


  describe('/streams/:user_id', () => {

  });
});
