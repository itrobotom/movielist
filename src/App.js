import { React, useState } from "react";
import Header from "./components/header/Header";
import MoveFilter from "./page/moveFilter/MoveFilter";
import CardFilm from "./page/cardFilm/CardFilm";
import './App.css'
import { getMoveDescription } from './components/Network'
import { GetToken, InputToken } from "./components/login/Login"

import { Link } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState(null); //храним данные с сервера будет объект
  const [isLoadDataCards, setIsLoadDataCards] = useState(false);
  const [page, setPage] = useState(1); //установка страницы в пагинации
  const [isLogin, setIsLogin] = useState(false);
  const [isClickGetToken, setIsClickGetToken] = useState(false); //изначально не нажата запросить клавиша о том, что токен получен

  const handleCardClick = (movieId) => {
    console.log('Clicked movie ID:', movieId);
    //отправим запрос на сервер по деталям фильма
    getMoveDescription(movieId);
  };

  const handleClickToken = () => {
    setIsClickGetToken(!isClickGetToken);
    console.log('isClickGetToken', isClickGetToken);
  }

  //const saveToken = (token) =>

  //если мы не авторизованы       if(!isLogin) {}     то есть токен в куках пустой, то отображаем пустое окно и header + значек авторизации справа сверху
  //при клике на header появляется модалка для ввода почты и запроса токена (токен уже есть, запрос только для абстракции)
  //появляется поле для ввода токена, токен вставили - сохраняем в куках и для всех запросов он берется из куков (а изначально лежит просто в переменной)
  
  if(!isLogin) {
    return (
      <>
        <Header head={'Фильмы'} isLogin={isLogin} setIsLogin={setIsLogin}/>     
        { !isClickGetToken ? <GetToken onClickToken={handleClickToken} /> : <InputToken onClickCancel={handleClickToken}/> }
      </>
    )
  }

  //а если мы авторизованы уже, то все что ниже + значек выхода из профиля справа сверху
  //обязательно нужно предусмотреть рендер только после ответа серевера
  // Если данные еще загружаются, отобразить загрузочный индикатор или сообщение о загрузке
  if (!isLoadDataCards) { 
    return (
      <>
        <Header head={'Фильмы'} isLogin={isLogin} setIsLogin={setIsLogin}/>     
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
      <Header head={'Фильмы'} isLogin={isLogin} setIsLogin={setIsLogin}/>
      <div className="filtr-cards_film">
        <div className="move-filter-container">
          <MoveFilter movies={movies} setMovies={setMovies} setIsLoadDataCards = {setIsLoadDataCards} page = {page} setPage = {setPage}/>
        </div>
        
        {/* теперь в movies есть все данные, пришедшие с сервера, чтобы вывести карточки фильмов */}
        <div className="cards-container">
          {movies.results.map((movie) => (
            <div key={movie.id}>
              <Link to={`/film/${movie.id}`}>
                <CardFilm movie = {movie} myOnClick={handleCardClick}/>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
}

export default App;
