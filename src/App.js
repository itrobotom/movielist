import { React, useState, useEffect } from "react";
import Header from "./components/header/Header";
import MoveFilter from "./page/moveFilter/MoveFilter";
import CardFilm from "./page/cardFilm/CardFilm";
import './App.css'
import { getIdAccount, getFavoriteFilm } from './components/Network'
import { GetToken, InputToken } from "./components/login/Login"
import { saveTokenCookies, checkTokenCookie, getTokenCookie, consoleToken } from "./components/token"

function App() {
  const [movies, setMovies] = useState(null); //храним данные о фильмах с сервера (будет объект)
  const [isLoadDataCards, setIsLoadDataCards] = useState(false);
  const [favoriteFilms, setFavoriteFilms] = useState(null); //храним данные о избранных фильмах
  const [isLoadFavoriteFilms, setIsLoadFavoriteFilms] = useState(false);
  const [page, setPage] = useState(1); //установка страницы в пагинации
  const [isLogin, setIsLogin] = useState(false);
  const [isClickGetToken, setIsClickGetToken] = useState(false); //изначально не нажата запросить клавиша о том, что токен получен
  const [tokenInputPopup, setTokenInputPopup] = useState('');

  // const handleCardClick = (movieId) => {
  //   console.log('Clicked movie ID:', movieId);
  //   //отправим запрос на сервер по деталям фильма
  //   getMoveDescription(movieId);
  // };

  const handleClickToken = () => {
    setIsClickGetToken(!isClickGetToken);
    console.log('isClickGetToken', isClickGetToken);
  }

  const handleInputToken = (e) => { //вызывается каждый раз, как добавлен новый символ
    const newToken = e.target.value;
    setTokenInputPopup(newToken);
    //console.log('Введенный токен: ', tokenInputPopup);
  }

  //если мы не авторизованы       if(!isLogin) {}     то есть токен в куках пустой, то отображаем пустое окно и header + значек авторизации справа сверху как 
  //checkTokenCookie() ? setIsLogin(true) : setIsLogin(false); 
  useEffect(() => { //ОБЯЗАТЕЛЬНО НУЖЕН USEEFFECT, ИНАЧЕ ПОЛУЧИМ ЗАЦИКЛЕННЫЕ РЕНДЕР (ИЗМЕНЕНИЕ СТЕЙТА ПОРОЖДАЕТ ПЕРЕРЕНДЕР)
    if (checkTokenCookie()) {
      console.log('Токен в куках есть!');
      setTokenInputPopup(getTokenCookie()); //достаем токен из куков (А ЗАЧЕМ, ЕСЛИ МОЖНО ПРОСТО ВЫЗЫВАТЬ ФУНКЦИЮ getTokenCookie()) КОТОРАЯ В token.jsx подставит токен в опции
      console.log('А вот и сам токен, который обновился в стейте из куков: ', tokenInputPopup); //ПОИДЕЕ СТЕЙТ С ТОКЕНОМ НАМ И НЕ НУЖЕН ЗДЕСЬ
      setIsLogin(true); //устанавливаем флаг авторизации в истину, чтобы ниже по логике провести рендер с фильмами и тд
      consoleToken(); //проверка что лежит в переменной токена, которая подставляется в опции перед запросом
      
      // Загрузить избранные фильмы только после успешной авторизации
      getFavoriteFilm()
      .then((favoriteFilms) => {
        // favoriteFilms содержит избранные фильмы
        // Сохраните избранные фильмы в стейте
        setFavoriteFilms(favoriteFilms);
        console.log('Вот наш результат из json по избранным фильмам: ', favoriteFilms.results)
        setIsLoadFavoriteFilms(true); // Устанавливаем флаг, что данные загружены
      })
      .catch((error) => {
        // Обработка ошибок при загрузке избранных фильмов
        console.error('Ошибка загрузки избранных фильмов:', error);
      });
      } else {
        console.log('Токен в куках отсутствует!');
        //стейт по умолчанию остается false и не меняется, а значит и перерендер страницы не получаем
      }
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании компонента
  
  const saveInputToken = () => {
    saveTokenCookies(tokenInputPopup); //сохранить в куках tokenInputPopup
    //флаг авторизации на войденный если токен был введен!!!
    if(checkTokenCookie()){
      setIsLogin(true); //ставим флаг, что мы АВТОРИЗОВАНЫ 
      getIdAccount();   //сохраняем ID аккаунта
    }
    //console.log('Введенный токен: ', tokenInputPopup);
  }

  //при клике на header появляется модалка для ввода почты и запроса токена (токен уже есть, запрос только для абстракции)
  //появляется поле для ввода токена, токен вставили - сохраняем в куках и для всех запросов он берется из куков (а изначально лежит просто в переменной)
  
  //достаем токен из куков (если его нет, вернем false)
  if(!isLogin) { //при запуске проверка, пройдена ли авторизация (если есть токен в куках), 
                 //изначально ВСЕГДА будет открываться только шапка с окном ввода токена, т.к. обновление isLogin пройдет в useEffect и если в куках будет токен, то произойдет перерерндер и мы увидим фильмы
    return (
      <>
        <Header head={'Фильмы'} isLogin={isLogin} setIsLogin={setIsLogin}/>     
        { !isClickGetToken ? <GetToken onClickToken={handleClickToken} /> : <InputToken onClickCancel={handleClickToken} inputToken={handleInputToken} saveToken={saveInputToken}/> }
      </>
    )
  } 
  
  //а если мы авторизованы уже, то все что ниже + значек выхода из профиля справа сверху
  //обязательно нужно предусмотреть рендер только после ответа серевера
  // Если данные еще загружаются, отобразить загрузочный индикатор или сообщение о загрузке
  if (!isLoadDataCards || !isLoadFavoriteFilms) { 
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
        {movies.results.map((movie) => {
          // Ищем объект с соответствующим id в массиве favoriteFilms, если найдет, то будет true
          const favoriteFilmFlag = favoriteFilms.results.find((film) => film.id === movie.id);

          return (
            <div key={movie.id}>
              {/* УБРАЛ LINK ОТ СЮДА Т.К. ЕГО ДЕЙСТВИЕ РАСПРОСТРАНЯЛОСЬ НА ВСЮ КАРТОЧКУ И ВСЕ ЕЕ ЭЛЕМЕНТЫ В Т.Ч. НА ИЗБРАННОЕ (ЗВЕЗДОЧКУ) */}
              {/* <Link to={`/film/${movie.id}`}> */}
                {/* <CardFilm movie={movie} myOnClick={handleCardClick} favoriteFilm={favoriteFilmFlag !== undefined} /> */}
                <CardFilm movie={movie} favoriteFilm={favoriteFilmFlag !== undefined} />
              {/* </Link> */}
            </div>
          );
        })}
        </div>
      </div>
      
    </>
  );
}
export default App;
