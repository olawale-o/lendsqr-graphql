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

  updateBalance: async (filter, credentials) => {
    const user = await db('user').where(filter).first('id', 'balance');
    if (!user) {
      throw new Error('User not found');
    }
    const newBalance = parseFloat(user.balance) + parseFloat(credentials.balance);

    const rows = await db.transaction(async (trx) => await db('user').where('id', '=', user.id).update({ balance: newBalance }).transacting(trx));

    if (rows > 0) {
      const details = await db('user').where(filter).first('id', 'first_name', 'last_name', 'balance', 'account_no');
      return details;
    }

    throw new Error('User not found');
  },

  getUsers: async () => {
    try {
      const users = await db.select('id', 'first_name', 'last_name', 'email', 'balance', 'created_at', 'updated_at').from('user');
      return users;
    } catch(err) {
      console.log(err);
    }
  },

  getUser: async (id) => await db('user').where({ id }).first('id', 'first_name', 'last_name', 'email', 'balance', 'created_at', 'updated_at'),
};