/* eslint-disable no-unused-vars */
import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import cacheRoute from './route/cache.route';
import ResponseFormat from './util/responseFormatter';
import { GENERIC_ERROR, NOT_FOUND } from './util/httpStatusCode';

dotenv.config();
const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', [cacheRoute]);

app.all('*', (req, res) => res.status(NOT_FOUND).json({
  success: false,
  message: 'Invalid route!',
}));

app.use((err, req, res, next) => ResponseFormat.error(res, err, GENERIC_ERROR));

export default app;
