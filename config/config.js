require('dotenv').config();
const env = process.env;

const development = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE,
  host: env.DATABASE_HOST,
  dialect: 'mysql',
};
const test = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE,
  host: env.DATABASE_HOST,
  dialect: 'mysql',
};
const prodution = {
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE,
  host: env.DATABASE_HOST,
  dialect: 'mysql',
};

module.exports = { development, test, prodution };
