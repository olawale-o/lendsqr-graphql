const db = require('../database');

module.exports = {
  findBy: async (credentials) => {
    const user = await db('user').where(credentials).first('id', 'email', 'first_name', 'last_name', 'balance', 'password', 'account_no');
    return user;
  },
  getUsers: async () => {
    try {
        const users = await db.select('id', 'first_name', 'last_name', 'email', 'balance', 'created_at', 'updated_at').from('user');
        console.log(users);
        return users;
    } catch(err) {
        console.log(err);
    }
  },
};