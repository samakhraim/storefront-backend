"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const orderProducts_1 = __importDefault(require("./handlers/orderProducts"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Storefront backend is running!');
});
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
(0, orderProducts_1.default)(app);
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
exports.default = app;
//# sourceMappingURL=server.js.map