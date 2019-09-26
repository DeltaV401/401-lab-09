'use strict';

const Products = require('../src/models/products/products-model');
let products = new Products();
require('./src/supergoose');

describe('Products model', () => {
  it('can post() a new product', () => {
    let obj = { name: 'Bread', price: 2.99, category: 'Groceries' };
    return products.post(obj)
      .then(product => {
        Object.keys(obj).forEach(key => {
          expect(product).toHaveProperty(key, obj[key]);
          expect(product[key]).toEqual(obj[key]);
        });

        expect(product).toMatchObject(obj);
        expect(product).toHaveProperty('id');
      });
  });

  it('can get() a product', () => {
    let obj = { name: 'Bread', price: 2.99, category: 'Groceries' };
    return products.post(obj)
      .then(product => {
        return products.get(product.id)
          .then(
            expect(product.name).toBe(obj.name)
            );
      });
  });

  it('can put() a product', () => {
    let obj = { name: 'Bread', price: 2.99, category: 'Groceries' };
    return products.post(obj)
      .then(product => {
        return products.put(product.id, { name: 'Wheat Bread', price: 3.49, category: 'Food' })
          .then(name => {
            return products.get(name.id)
              .then(() => {
                expect(name).toHaveProperty('name', 'Wheat Bread');
                expect(name).toHaveProperty('price', 3.49);
                expect(name).toHaveProperty('category', 'Food');
              });
          });
      });
  });

  it('can delete() a product', () => {
    let obj = { name: 'Bread', price: 2.99, category: 'Groceries' };
    return products.post(obj)
      .then(product => {
        return products.delete(product.id)
          .then(() => {
            return products.get(product.id)
              .then(deleted => {
                expect(deleted).toEqual([]);
              });
          });
      });
  });
});