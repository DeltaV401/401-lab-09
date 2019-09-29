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
      .then(results => {
        expect(200);
        expect(results[0]).toHaveProperty('name', 'test');
      });

  });


  it('following a post to categories, should find a single record', () => {

    let obj = {name:'testing'};

    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(results => {
        return mockRequest.get(`/api/v1/categories/${results.body._id}`)
          .then(list => {
            expect(200);
            expect(list).toHaveProperty('name', 'testing');
          });
      });

  });

});