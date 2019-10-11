'use strict';

const supergoose = require('./src/supergoose');
const {app} = require(`../src/app`);
const mockRequest = supergoose(app);

describe('api server', () => {

  it('should respond with a 404 on an invalid route', () => {

    return mockRequest
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });

  it('should respond properly on request to /api/v1/categories', () => {

    return mockRequest
      .get('/api/v1/categories')
      .then(results => {
        expect(results.status).toBe(200);
      });

  });

  it('should be able to post to /api/v1/categories', () => {

    let obj = {name:'test'};

    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .expect(200)
      .then(results => {
        expect(results.body).toHaveProperty('name', 'test');
      });

  });


  it('following a post to categories, should find a single record', () => {

    let obj = {name:'testing'};

    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(results => {
        return mockRequest.get(`/api/v1/categories/${results.body._id}`)
          .expect(200)
          .then(list => {
            expect(list.body).toHaveProperty('name', 'testing');
          });
      });

  });

});
