import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Para poder filtrar primero necesito traerme la accion
import { getRecipes, filterRecipesByDiets, orderByTitle, orderByScore, getRecipeBySearch } from "../Store/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import bg from "../Assets/background.jpg";
import "../Styles/Home.css";
import Filter from "./Filter";
import Loading from "./Loading";
import NavBar from "./NavBar";
import NoResults from "./NoResults";
function Home() {
  const allRecipes = useSelector((state) => state.recipes);
  const loading = useSelector((state) => state.loading);
  const [search, setSearch] = useState("");
  //!Paginado
  //estado local con la pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  // setRecipesPerPage(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  //Indice de la primer receta
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  //Constante para contener las recetas que estan en la pagina actual
  //Me traigo todas las recetas y le hago un slice para recortar, solo me quedo con las recetas que esten entre el
  //indice de mi primer receta y el indice de mi utlima receta
  // const currentRecipes = allRecipes.slice(
  //   indexOfFirstRecipe,
  //   indexOfLastRecipe
  // );
  //Este estado local solo voy a utilizarlo para que renderizar cuando seteo la pagina en mi handle de ordenamiento
  const [order, setOrder] = useState("");
  //Lo que hace esta constante es unicamente setear el estado de mi pagina actual
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //Me traigo el dispatch para poder ir despachando las acciones
  const dispatch = useDispatch();
  //Obtengo las recetas del estado
  //Hook para que cuando se monte el componente me traiga todas las recetas
  //En el arreglo irian las dependencias
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const containerStyle = {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  };
  function handleClick(e) {
    //Para que no se rompa y no se recargue la pagina
    e.preventDefault();
    dispatch(getRecipes());
  }
  //Funcion que me va a traer el filtro del las dietas
  //Esta funcion se la vamos a pasar al select y cuando se modifique ejecuta la funcion
  //La funcion va a despachar la accion que filtra
  function handleFilterDiets(e) {
    e.preventDefault();
    //e.target.value toma el valor de los value de cada una de las opciones
    //Ademas eso es lo que le llega a la accion como payload
    dispatch(filterRecipesByDiets(e.target.value));
  }
  function handleSortByTitle(e) {
    e.preventDefault();
    dispatch(orderByTitle(e.target.value));
    setCurrentPage(1);
    //Cuando seteo este estado se va a renderizar la pagina
    setOrder(`Ordenado ${e.target.value}`);
  }
  function handleSortByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value + order}`);
  }
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  function searchRecipe() {
    if (search === "") {
      return alert("Debe ingresar algo para buscar");
    }
    dispatch(getRecipeBySearch(search));
    setCurrentPage(1);
    setSearch("");
  }
  function showHomePage() {
    if (loading) {
      return <Loading></Loading>;
    }
    if (allRecipes.length > 0) {
      const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
      return (
        <div style={containerStyle}>
          <NavBar handleClick={handleClick} searchRecipe={searchRecipe} handleSearch={handleSearch}></NavBar>
          <h1 className="welcomeTitle">Welcome to Recipes</h1>
          <br></br>
          <Filter handleFilterDiets={handleFilterDiets} handleSortByScore={handleSortByScore} handleSortByTitle={handleSortByTitle}></Filter>
          <div>
            {currentRecipes &&
              currentRecipes.map((e) => {
                return (
                  <Link key={e.id} to={`/recipes/${e.id}`}>
                    <Card key={e.id} id={e.id} title={e.title} image={e.image} diets={e.diets}></Card>
                  </Link>
                );
              })}
            <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}></Paginado>
          </div>
        </div>
      );
    } else {
      return <NoResults></NoResults>;
    }
  }

  return <div>{showHomePage()}</div>;
}

export default Home;
