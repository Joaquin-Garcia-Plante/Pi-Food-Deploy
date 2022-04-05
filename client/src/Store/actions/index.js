import axios from "axios";

//En esta funcion es donde sucede toda la conexion entre el front y el back
export function getRecipes() {
  return async function (dispatch) {
    dispatch({
      type: "RECIPE_LIST_LOADING",
    });
    try {
      var json = await axios.get("/recipes");
      return dispatch({
        type: "GET_RECIPES",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
//La accion recibe un payload que va a ser el value que me va a llegar
//Toda la logica es mejor hacerla en el reducer o en el componente en sí

//Accion para acceder al detalle de una receta

export function getRecipe(id) {
  return async function (dispatch) {
    dispatch({
      type: "RECIPE_LIST_LOADING",
    });
    try {
      var json = await axios.get(`/recipes/${id}`);
      return dispatch({
        type: "GET_RECIPE",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getRecipeBySearch(data) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/recipes?name=${data}`);
      return dispatch({
        type: "SEARCH_RECIPE",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterRecipesByDiets(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_RECIPES",
    payload: payload,
  };
}

export function orderByTitle(payload) {
  return {
    type: "ORDER_BY_TITLE",
    payload: payload,
  };
}

export function orderByScore(payload) {
  return {
    type: "ORDER_BY_SCORE",
    payload: payload,
  };
}

export function postRecipe(recipe) {
  return async function (dispatch) {
    try {
      await axios({
        method: "post",
        url: "/recipe",
        data: recipe,
      });
      return dispatch({
        type: "POST_RECIPE",
      });
    } catch (e) {
      console.log(e);
    }
  };
}
