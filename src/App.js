import { React, useState, useEffect } from "react";
import Header from "./components/header/Header";
import MoveFilter from "./page/moveFilter/MoveFilter";
import CardFilm from "./page/cardFilm/CardFilm";
import './App.css'
import { getIdAccount, getFavoriteFilm } from './components/Network'
import { GetToken, InputToken } from "./components/login/Login"
import { saveTokenCookies, checkTokenCookie, getTokenCookie, consoleToken } from "./components/token"

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {
  const [movies, setMovies] = useState(null); 
  const [isLoadDataCards, setIsLoadDataCards] = useState(false);
  const [favoriteFilms, setFavoriteFilms] = useState(null); 
  const [isLoadFavoriteFilms, setIsLoadFavoriteFilms] = useState(false);
  const [searchFilms, setSearchFilms] = useState(null);
  const [isSearchFilmNow, setIsSearchFilmNow] = useState(false); 
  const [page, setPage] = useState(1); 
  const [isLogin, setIsLogin] = useState(false);
  const [isClickGetToken, setIsClickGetToken] = useState(false);
  const [tokenInputPopup, setTokenInputPopup] = useState('');

  const handleClickToken = () => {
    setIsClickGetToken(!isClickGetToken);
  }

  const handleInputToken = (e) => { 
    const newToken = e.target.value;
    setTokenInputPopup(newToken);
  }

  useEffect(() => { 
    if (checkTokenCookie()) {
      setTokenInputPopup(getTokenCookie());
      setIsLogin(true); 
      consoleToken(); 
      getFavoriteFilm()
      .then((favoriteFilms) => {
        setFavoriteFilms(favoriteFilms);
        setIsLoadFavoriteFilms(true); 
      })
      .catch((error) => {
        console.error('Ошибка загрузки избранных фильмов:', error);
      });
      } else {
        console.log('Токен в куках отсутствует!');
      }
  }, []); 
  
  const saveInputToken = () => {
    saveTokenCookies(tokenInputPopup); 
    if(checkTokenCookie()){
      setIsLogin(true);
      getIdAccount();
    }
  }

  if(!isLogin) { 
    return (
      <>
        <Header head={'Фильмы'} isLogin={isLogin} setIsLogin={setIsLogin}/>     
        { !isClickGetToken ? <GetToken onClickToken={handleClickToken} /> : <InputToken onClickCancel={handleClickToken} inputToken={handleInputToken} saveToken={saveInputToken}/> }
      </>
    )
  } 
  
  if (!isLoadDataCards || !isLoadFavoriteFilms) { 
    return (
      <>
        <Header head={'Фильмы'} isLogin={isLogin} setIsLogin={setIsLogin}/>     
        <div className="filtr-cards_film">
          <div className="move-filter-container">
            <MoveFilter movies={movies} setMovies={setMovies} setIsLoadDataCards = {setIsLoadDataCards} />
          </div>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <CircularProgress />
          </Box>
        </div>  
      </>
    )
  }
  
  return (
    <>
      <Header head={'Фильмы'} isLogin={isLogin} setIsLogin={setIsLogin}/>
      <div className="filtr-cards_film">
        <div className="move-filter-container">
          <MoveFilter 
            movies={movies} 
            setMovies={setMovies} 
            setIsLoadDataCards = {setIsLoadDataCards} 
            page = {page} 
            setPage = {setPage} 
            searchFilms = {searchFilms} 
            setSearchFilms = {setSearchFilms}
            setIsSearchFilmNow = {setIsSearchFilmNow}
          />
        </div>
        
        <div className="cards-container">
        {movies.results.map((movie) => {
          const favoriteFilmFlag = favoriteFilms.results.find(film => film.id === movie.id);
          const searchFilmFlag = (searchFilms && searchFilms.results.length > 0) && searchFilms.results.some(item => item.id === movie.id);
          if(searchFilmFlag || !isSearchFilmNow){ 
            return (
              <div key={movie.id}>
                <CardFilm movie={movie} favoriteFilm={favoriteFilmFlag !== undefined} />
              </div>
            );
          }
        })}
        </div>
      </div>
      
    </>
  );
}
export default App;
