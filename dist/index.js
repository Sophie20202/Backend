"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./router/index"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swager_1 = __importDefault(require("./documentation/swager"));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swager_1.default));
// Middleware
app.use(body_parser_1.default.json());
app.use("/greet/v1", index_1.default);
// Environment variables
const port = process.env.PORT || 3000;
const database = process.env.DATABASE || "mongodb://localhost:27017/mydatabase";
// Server start
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
// Database connection
mongoose_1.default.connect(database)
    .then(() => {
    console.log(`Database connected successfully`);
})
    .catch((error) => {
    console.log(error);
});
exports.default = app;
