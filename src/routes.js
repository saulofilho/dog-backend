const { Router } = require('express');
// const User = require('./app/models/User');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const FoodController = require('./app/controllers/FoodController');

const validateUserStore = require('./app/validators/UserStore');
const validateUserUpdate = require('./app/validators/UserUpdate');
const validateSessionStore = require('./app/validators/SessionStore');
const validateFoodStore = require('./app/validators/FoodStore');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Saulo',
//     email: 'hello@saulofilho.com',
//     password_hash: '200288',
//   });

//   return res.json(user);
// });

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

// routes.put('/users', authMiddleware, UserController.update);

routes.get('/food', FoodController.index);

// aplica o middleware em todas as rotas abaixo
routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.post('/food', validateFoodStore, FoodController.store);
routes.delete('/food/:id', FoodController.delete);

module.exports = routes;
