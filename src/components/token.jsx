import Cookies from 'js-cookie'
import { store } from '../index'
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODk2NTU1MGQ2NzljMzViMjA1ZmVmY2IxYmE2NjM4MiIsInN1YiI6IjY0OTMxZmMwNDNjZDU0MDE0NGEwYTcxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HraQMPJL2W8ZeKI5PCIbG7FVyPhwufE2ucIJ1rnubaE 

//написать функцию для сохранения токена в куки и получения из куков далее в options,
let token2 = ''; //сюда запишем токен для авторизации когда получим его из модалки, а пока он будет пустой или из куков
function saveTokenCookies(token) {
  //сохраняем код в куках, если его ввели
  if(!checkValidToken(token)) return; 
  const inputMailCodeValue = checkValidToken(token);
  console.log('Сейчас сохраним токен: ', inputMailCodeValue);
  Cookies.set('autorization-token', inputMailCodeValue);
  consoleToken();
}

function getTokenCookie() { //при вызове этой функции мы обновим глобальную переменную с токеном, которая при запуске приложения пустая и подставим ее в options для запросов на сервер
  token2 = Cookies.get('autorization-token');
  if (token2 === "") {
      return false;
  }
  return token2; 
}

function checkTokenCookie() {
  const token = Cookies.get('autorization-token');
  return !!token; // Преобразуем результат в булевое значение (true или false)
}

function checkValidToken(token) {
  if (token === "") {
      alert("Вы не ввели токен!");
      return false;
  }
  return token; 
}

function deleteTokenCookies() {
  console.log('Удаляем токен из куков т.к. выходим из кабинета');
  Cookies.remove('autorization-token');
  token2 = ""; //чистим переменную, которая подставляется в options
  consoleToken();
}

function consoleToken() {
  console.log('Переменная токена перед установкой в опции вот такая: ', token2); 
}

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token2}`, 
  },
}

function getOptions(){
  //const token = Cookies.get('autorization-token');
  //ТЕПЕРЬ ПОЛУЧИМ ДАННЫЕ О ТОКЕНЕ ИЗ ХРАНИЛИЩА REDUX
  const token = store.getState().tokenAutorization;
  console.log('getOpt store token', token);
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`, 
    },
  }
}

function postOptionsFavorite(movie_id, method){ //method - true/false
  console.log('Вот id фильма', movie_id);
  const token = Cookies.get('autorization-token');
  return {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({media_type: 'movie', media_id: movie_id, favorite: method})
  }
}



export { saveTokenCookies, checkTokenCookie, deleteTokenCookies, getTokenCookie, consoleToken, getOptions, postOptionsFavorite }