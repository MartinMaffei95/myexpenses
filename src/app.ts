import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { router } from './routes';

const app = express();

const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(router);
app.listen(PORT, () => {
  console.log(`Server listen on port: ${PORT}`);
});
