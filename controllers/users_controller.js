const { env: { JWT_SECRET } } = require('../constants');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const UserService = require('../services/usersService');

module.exports = {
  graphCreateUser: async (input) => {
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

  graphAuthenticateUser: async (input) => {
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

  createUser: async (req, res, next) => {
    passport.authenticate('local-register', { session: false }, async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error(info);
          if(err) {
            return res.status(500).json(info)
          }
          if(!user) {
            return res.status(403).json(info);
          }
          return next(error);
        } else {
            const body = {
              id: user.id,
              email: user.email,
              fullname: user.first_name,
              created_at: user.created_at,
              updated_at: user.updated_at
            };
            const token = jwt.sign({user: user,},JWT_SECRET);
            return res.status(201).json({
              user: body,
              token: token,
              message: "registered successfully",
            });
        }
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  },

  authenticateUser: async (req, res, next) => {
    passport.authenticate('local-login', async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error(info.message);
          if (err) { 
            return next(error);
          }
          if (!user) {
            return res.status(401).json(info);
          }
        }
        req.login(user, {session: false}, async (err) => {
          if (err) return next(err);
          const token = jwt.sign({
            userId: user.id,
            firstname: user.first_name,
            lastname: user.last_name,
            email: user.email,
          }, JWT_SECRET, { expiresIn: '1h' });
          return res.status(200).json({
            user: {
              id: user.id,
              email: user.email,
              account_no: user.account_no,
              first_name: user.first_name,
              last_name: user.last_name,
              created_at: user.created_at,
              updated_at: user.updated_at,
              balance: user.balance,
            },
            token,
            message: 'User loggedin successfully',
          });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  },

  deposit: async (id, amount) => {
    try {
      const user = await UserService.updateBalance({ id }, { balance: amount });
      return { message: 'Deposit successful', user, };
    } catch (error) {
      return { user: null, message: err.message };
    }
  },
};