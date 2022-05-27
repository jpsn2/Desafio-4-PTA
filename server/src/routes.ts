import express from 'express';
import RestaurantController from '@controllers/RestaurantController'

const routes = express.Router();
const restaurantController = new RestaurantController();

routes.post('/restaurant', restaurantController.create);
routes.get('/restaurant', restaurantController.get);
routes.get('/restaurant/:id', restaurantController.getById);
routes.delete('/restaurant/:id', restaurantController.delete);
routes.put('/restaurant/:id', restaurantController.update);


export default routes;