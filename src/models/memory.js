'use strict';

const uuid = require('uuid/v4');

class Model {

  constructor() {
    this.database = [];
  }

  /**
   * Gets a given model, either all of that model or a single record of that model selected by id, from the database.
   * @param {number} id 
   */
  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  /**
   * Creates a new record in a given model and stores it in the database.
   * @param {object} entry 
   */
  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /**
   * Updates a single record in the database selected by id with whatever record you decide to replace it with.
   * @param {number} id 
   * @param {object} entry 
   */
  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  /**
   * Deletes a single record in the database selected by id.
   * @param {number} id 
   */
  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  /**
   * Determines whether or not the desired input is valid for the database or not.
   * @param {object} entry 
   */
  sanitize(entry) {

    let valid = true;
    let record = {};
    let schema = this.schema();

    Object.keys(schema).forEach(field => {
      if (schema[field].required) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }

}

module.exports = Model;
