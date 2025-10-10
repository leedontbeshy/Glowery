import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Glowery API Docs',
      version: '1.0.0',
      description: 'RESTful API documentation using Swagger + YAML',
    },
    servers: [
      {
        url: 'http://localhost:8000/',
        description: 'Development server',
      },
    ],
  },

  apis: ['./src/features/**/*.ts', './docs/api-docs/**/*.yaml'],
};
