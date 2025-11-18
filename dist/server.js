"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./handlers/auth"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const orders_1 = __importDefault(require("./handlers/orders"));
const orderProducts_1 = __importDefault(require("./handlers/orderProducts"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/auth', auth_1.default);
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
(0, orderProducts_1.default)(app);
app.get('/', (req, res) => {
    res.send('API running');
});
if (process.env.ENV !== 'test') {
    app.listen(3000, () => {
        console.log('🚀 Server running on http://localhost:3000');
    });
}
exports.default = app;
//# sourceMappingURL=server.js.map