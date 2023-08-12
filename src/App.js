import { React, useState } from "react";
import Header from "./components/header/Header";
import MoveFilter from "./page/moveFilter/MoveFilter";
import CardFilm from "./page/cardFilm/CardFilm";
import './App.css'
import { getMoveDescription } from './components/Network'

import { Link } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState(null); //храним данные с сервера будет объект
  const [isLoadDataCards, setIsLoadDataCards] = useState(false);
  const [page, setPage] = useState(1);

  const handleCardClick = (movieId) => {
    console.log('Clicked movie ID:', movieId);
    //отправим запрос на сервер по деталям фильма
    getMoveDescription(movieId);

  };

  //обязательно нужно предусмотреть рендер только после ответа серевера
  // Если данные еще загружаются, отобразить загрузочный индикатор или сообщение о загрузке
  if (!isLoadDataCards) { 
    return (
      <>
        <Header head={'Фильмы'}/>     
        <div className="filtr-cards_film">
          <div className="move-filter-container">
            <MoveFilter movies={movies} setMovies={setMovies} setIsLoadDataCards = {setIsLoadDataCards}/>
          </div>
          {/* добавить спиннер, а пока просто словами Loading */}
          <div>Loading...</div>
        </div>  
      </>
    )
  }
  
  return (
    <>
      <Header head={'Фильмы'}/>
      <div className="filtr-cards_film">
        <div className="move-filter-container">
          <MoveFilter movies={movies} setMovies={setMovies} setIsLoadDataCards = {setIsLoadDataCards} page = {page} setPage = {setPage}/>
        </div>
        
        {/* теперь в movies есть все данные, пришедшие с сервера, чтобы вывести карточки фильмов */}
        <div className="cards-container">
          {movies.results.map((movie) => (
            <div key={movie.id}>
              <Link to={`/film/${movie.id}`}>
                <CardFilm movie = {movie} onClick={handleCardClick}/>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
}

export default App;
