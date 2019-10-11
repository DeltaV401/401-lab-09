'use strict';

const Q = require('@nmq/q/client');

class Model {

  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Creates a schema for the different models.
   */
  jsonSchema() {
    console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function'
      ? this.schema.jsonSchema()
      : {};
  }

  /**
   * Gets a given model, either all of that model or a single record of that model selected by id.
   * @param {number} _id 
   */
  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject)
      .then(res => {
        Q.publish('database', 'get', res);
        return res;
      });
  }

  /**
   * Creates a new record in a given model.
   * @param {object} record 
   */
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save()
      .then(res => {
        Q.publish('database', 'post', res);
        return res;
      });
  }

  /**
   * Updates a single record selected by id with whatever record you decide to replace it with.
   * @param {number} _id 
   * @param {object} record 
   */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true })
      .then(res => {
        Q.publish('database', 'put', res);
        return res;
      });
  }

  /**
   * Deletes a single record selected by id.
   * @param {number} _id 
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id)
      .then(res => {
        Q.publish('database', 'delete', res);
        return res;
      });
  }

}

module.exports = Model;
