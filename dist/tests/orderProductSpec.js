"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderProduct_1 = require("../models/orderProduct");
const order_1 = require("../models/order");
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const orderProductStore = new orderProduct_1.OrderProductStore();
const orderStore = new order_1.OrderStore();
const productStore = new product_1.ProductStore();
const userStore = new user_1.UserStore();
describe('OrderProduct Model', () => {
    let userId;
    let orderId;
    let productId;
    beforeAll(async () => {
        const user = await userStore.create({
            first_name: 'OrderProd',
            last_name: 'User',
            password: '123'
        });
        userId = user.id;
        const order = await orderStore.create({
            user_id: userId,
            status: 'active'
        });
        orderId = order.id;
        const product = await productStore.create({
            name: 'TestProduct',
            price: 50
        });
        productId = product.id;
    });
    it('should add a product to an order', async () => {
        const result = await orderProductStore.addProduct({
            order_id: orderId,
            product_id: productId,
            quantity: 3
        });
        expect(result.quantity).toEqual(3);
        expect(result.order_id).toEqual(orderId);
    });
    it('should list products in an order', async () => {
        const result = await orderProductStore.productsByOrder(orderId.toString());
        const [firstItem] = result;
        expect(result.length).toBeGreaterThan(0);
        expect(firstItem?.order_id).toEqual(orderId);
    });
});
//# sourceMappingURL=orderProductSpec.js.map