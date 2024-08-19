import { Application, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        produces: ['application/json'],
        // Define info object
        info: {
            title: 'REST API Docs',
            version: '1.0.0',
            contact: {
                email: 'anwarmahedisr@gmail.com',
                name: 'Anwar Hossain',
            },
            description:
                'Custom structure to build an REST API using Express.js',
            license: {
                name: 'All Rights Reserved',
            },
        },
        // Define security protocols
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        host: 'http://localhost:4000',
    },
    host: 'localhost:4000',
    schemes: ['http', 'https'],
    basePath: '/api/v2', // Set the base path to '/api'
    apis: ['./src/resources/**/*.controller.ts'], // Path to your controller files
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app: Application, port: number) {
    // Swagger page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Docs available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs;
