import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: '2.0',
        title: 'Swagger Demo Project',
        description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
        {
            url: 'http:localhost:5000',
            description:'api documentation'
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
const outputFile='./swagger.json';
const endpointsFiles=['../index.ts'];

swaggerAutogen({openapi:'3.1.0'})(outputFile,endpointsFiles,doc);

export default doc

