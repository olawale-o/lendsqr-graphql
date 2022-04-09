const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const UserService = require('../services/usersService');

module.exports = {
  createUser: async (input) => {
    const { email } = input;
    try {
      const user = await UserService.findBy({ email });
      if (user) {
        return  { user: null,  message: 'Please provide valid credentials' };
      }
      const credentials = { ...input, password: bcrypt.hashSync(input.password, 10), accountNo: uuidv4() };
      const newUser = await UserService.create(credentials);
      return { message: 'User created successfully', user: newUser };
    } catch (err) {
      return { user: null,  message: err.message, };
    }
  },

  authenticateUser: async (input) => {
    const { email, password } = input;
    try {
      const user = await UserService.findBy({ email });
      if (!user) {
        return { message: 'User not found', user: null, wrongPassword: false };
      }
      const validate = bcrypt.compareSync(password, user.password);
      if (!validate) {
        return { message: 'Wrong Password', user, wrongPassword: true };
      }
      return { user, message: 'Welcome back' }
    } catch(err) {
      return { message: err.message };
    }
  },

  deposit: async (req, res, next) => {
    try {
      const { amount } = req.body;
      const { id } = req.params;
      const user = await UserService.updateBalance({ id }, { balance: amount });
      res.status(200).json({ message: 'Deposit successful', user, });
    } catch (error) {
      return next(error);
    }
  },
};