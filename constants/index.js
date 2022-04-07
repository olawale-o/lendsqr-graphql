require('dotenv').config();
const { PORT, JWT_SECRET, NODE_ENV } = process.env;

module.exports = {
  env: {
    PORT,
    JWT_SECRET,
    NODE_ENV,
  },
};
