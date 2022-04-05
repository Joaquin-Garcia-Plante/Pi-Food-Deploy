require("dotenv").config();
const axios = require("axios");
const { detailRouteApi, mainRouteApi } = require("../providers/api");
// const { API_KEY } = process.env;

const getApiRecipes = async () => {
  const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=1db02e94b5b54f3e8974e5c8e0e972f5&addRecipeInformation=true&number=100`);
  let result = apiInfo.data.results;
  result = mainRouteApi(result);
  return result;
};
const getApiRecipeDetail = async (id) => {
  const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=1db02e94b5b54f3e8974e5c8e0e972f5`);
  let result = detailRouteApi(apiInfo.data);
  return result;
};

module.exports = { getApiRecipes, getApiRecipeDetail };
