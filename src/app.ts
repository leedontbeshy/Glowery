import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import routes from './features'; // index.ts
import { swaggerOptions } from './config/swagger.config';




const app = express();

app.use(express.json());

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
};

//  Tạo Swagger spec
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Thêm Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//  Mount toàn bộ feature routes (vd /api/auth, /api/users)
app.use('/api', routes);

export default app;
