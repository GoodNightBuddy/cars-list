import axios from 'axios';
import API from './types';

export const fetchCars = async () => {
  try {
    const response = await axios.get(API.URL + API.CARS);
    return response.data.cars;
  } catch (error) {;
    console.log(error)
    throw new Error('Error fetching cars');
  }
};
