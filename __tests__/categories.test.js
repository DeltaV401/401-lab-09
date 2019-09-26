'use strict';

const Categories = require('../src/models/categories/categories-model');
let categories = new Categories();
require('./src/supergoose');

describe('Categories model', () => {
  it('can post() a new category', () => {
    let obj = { name: 'Food' };
    return categories.post(obj)
      .then(category => {
        Object.keys(obj).forEach(key => {
          expect(category).toHaveProperty(key, obj[key]);
          expect(category[key]).toEqual(obj[key]);
        });

        expect(category).toMatchObject(obj);
        expect(category).toHaveProperty('id');
      });
  });

  it('can get() a category', () => {
    let obj = { name: 'Food' };
    return categories.post(obj)
      .then(category => {
        return categories.get(category.id)
          .then(() => {
            expect(category).toHaveProperty('name', 'Food');
          });
      });
  });

  it('can put() a category', () => {
    let obj = { name: 'Food' };
    return categories.post(obj)
      .then(category => {
        return categories.put(category.id, { name: 'Groceries' })
          .then(name => {
            return categories.get(name.id)
              .then(() => {
                expect(name).toHaveProperty('name', 'Groceries');
              });
          });
      });
  });

  it('can delete() a category', () => {
    let obj = { name: 'Food' };
    return categories.post(obj)
      .then(category => {
        return categories.delete(category.id)
          .then(() => {
            return categories.get(category.id)
              .then(deleted => {
                expect(deleted).toEqual([]);
              });
          });
      });
  });
});