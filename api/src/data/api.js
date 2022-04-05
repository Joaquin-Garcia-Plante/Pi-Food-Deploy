require("dotenv").config();
const axios = require("axios");
const { detailRouteApi, mainRouteApi } = require("../providers/api");
// const { API_KEY } = process.env;

const getApiRecipes = async () => {
  const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=33b603cad3b744009f8e5fef0437cf22&addRecipeInformation=true&number=100`);
  let result = apiInfo.data.results;
  result = mainRouteApi(result);
  return result;
};
const getApiRecipeDetail = async (id) => {
  const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=33b603cad3b744009f8e5fef0437cf22`);
  let result = detailRouteApi(apiInfo.data);
  return result;
};

module.exports = { getApiRecipes, getApiRecipeDetail };
