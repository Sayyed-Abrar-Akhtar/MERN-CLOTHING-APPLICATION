import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import { config } from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import currencyRoutes from './routes/currencyRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

config();
connectDB();

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const PORT = process.env.PORT || 90;

app.use(express.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/currency', currencyRoutes);

app.get('/api/config/paypal', (req, res) =>
  res
    .status(200)
    .send({ success: true, clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running..........');
  });
}

app.use(notFound);

app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

export default app;
