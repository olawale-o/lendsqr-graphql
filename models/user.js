const db = require('../database');

module.exports = {
  createUser: async (credentials) => {
    const { email, password, firstName, lastName, accountNo } = credentials;
    const user = await db('user').insert({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        account_no: accountNo,
    }).then(id => db('user').where({ id }).first('id', 'email', 'first_name', 'last_name', 'balance', 'account_no'));
    return user;
  },

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