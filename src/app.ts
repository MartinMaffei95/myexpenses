import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import db from './config/mongo';

// SWAGGER DOCS
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './docs/swagger';
import CategoryModel from './models/category';

const app = express();

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(router);

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

db().then(() => {
  console.log('Connection with DB is ready');
});
app.listen(PORT, () => {
  console.log(`Server listen on port: ${PORT}`);
});
