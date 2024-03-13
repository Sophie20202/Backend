"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        version: '2.0',
        title: 'Swagger Demo Project',
        description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
        {
            url: 'http:localhost:5000',
            description: 'api documentation'
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};
const outputFile = './swagger.json';
const endpointsFiles = ['../index.ts'];
(0, swagger_autogen_1.default)({ openapi: '3.1.0' })(outputFile, endpointsFiles, doc);
exports.default = doc;
