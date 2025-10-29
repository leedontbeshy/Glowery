import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import helmet from 'helmet';

import routes from './features'; // index.ts
import { swaggerOptions } from './config/swagger.config';
import { errorHandler } from './common/middlewares/error.middleware';

const app = express();
//
app.use(express.json());

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
};

app.use(helmet());

//  Tạo Swagger spec
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Thêm Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//  Mount toàn bộ feature routes (vd /api/auth, /api/users)
app.use('/api/v1', routes);

app.use('/', () => {
    console.log('Hi')
})


app.use(errorHandler);
export default app;
