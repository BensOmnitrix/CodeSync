import express from 'express';
import cors from 'cors';
import { mainRouter } from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/api', mainRouter); 

app.use(errorHandler); // Global error handler

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});