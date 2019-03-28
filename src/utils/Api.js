import axios from 'axios';
require('dotenv').config();

export default axios.create({
  baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': process.env.API_KEY
  }
});
