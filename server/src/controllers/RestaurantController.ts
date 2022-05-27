import { Request, Response } from 'express';
import { Restaurant } from '@models/Restaurant';
import { Citi, Crud } from '../global'

export default class RestaurantController implements Crud {

    async create(request: Request, response: Response){
        const { name, address, typeFood } = request.body;

        const isAnyUndefined = Citi.areValuesUndefined(name, address, typeFood);
        if(isAnyUndefined) return response.status(400).send();

        const newRestaurant = { name, address, typeFood };
        const { httpStatus, message } = await Citi.insertIntoDatabase(Restaurant, newRestaurant);

        return response.status(httpStatus).send( {message });
    }

    async get(request: Request, response: Response){
        const { httpStatus, values } = await Citi.getAll(Restaurant);
        return response.status(httpStatus).send(values);
    }

    async getById(request: Request, response: Response){
        const { id } = request.params;
        const { value: restaurantFound, message }  = await Citi.findByID(Restaurant, id);

        if(!restaurantFound) return response.status(400).send({ message });

        return response.status(200).send(restaurantFound);
    }

    async update(request: Request, response: Response){
        const { id } = request.params;
        const { name, address, typeFood } = request.body;

        const isAnyUndefined = Citi.areValuesUndefined(name, address, typeFood, id);
        if(isAnyUndefined) return response.status(400).send();

        const restaurantWithUpdatedValues = { name, address, typeFood };
        const { httpStatus, messageFromUpdate } = await Citi.updateValue(Restaurant, id,  restaurantWithUpdatedValues);
        return response.status(httpStatus).send({ messageFromUpdate });
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;
        const { value: restaurantFound, message }  = await Citi.findByID(Restaurant, id);

        if(!restaurantFound) return response.status(400).send({ message }); 

        const { httpStatus, messageFromDelete } = await Citi.deleteValue(Restaurant, restaurantFound);
        return response.status(httpStatus).send({ messageFromDelete });
    }

}