'use strict';

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
    return this.schema.find(queryObject);
  }

  /**
   * Creates a new record in a given model.
   * @param {object} record 
   */
  create(record) {
    console.log('r',record);
    let newRecord = new this.schema(record);
    console.log('n', newRecord);
    return newRecord.save();
  }

  /**
   * Updates a single record selected by id with whatever record you decide to replace it with.
   * @param {number} _id 
   * @param {object} record 
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   * Deletes a single record selected by id.
   * @param {number} _id 
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;
