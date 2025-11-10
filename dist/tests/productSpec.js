"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
describe('Product Model', () => {
    let createdProductId;
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('create method should add a product', async () => {
        const result = await store.create({ name: 'Book', price: 15 });
        createdProductId = result.id.toString();
        expect(result.name).toBe('Book');
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('update method should modify a product', async () => {
        const result = await store.update(createdProductId, { name: 'Updated Book', price: 20 });
        expect(result.name).toBe('Updated Book');
    });
    it('delete method should remove the product', async () => {
        const result = await store.delete(createdProductId);
        expect(result.id).toBe(Number(createdProductId));
    });
});
//# sourceMappingURL=productSpec.js.map