import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let url;

switch (process.env.NODE_ENV) {
  case ('test'):
    url = 'mongodb://localhost:27017/climendo';
    break;
  case ('development'):
    url = process.env.DEVELOPMENT_DB;
    break;
  case ('production'):
    url = process.env.DB;
    break;
  default:
    url = 'mongodb://localhost:27017/stack';
    break;
}

function db() {
  return mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
}

export default db;
