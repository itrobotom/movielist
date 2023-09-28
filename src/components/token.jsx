import Cookies from 'js-cookie'

let token2 = '';
function saveTokenCookies(token) {
  if(!checkValidToken(token)) return; 
  const inputMailCodeValue = checkValidToken(token);
  Cookies.set('autorization-token', inputMailCodeValue);
  consoleToken();
}

function getTokenCookie() { 
  token2 = Cookies.get('autorization-token');
  if (token2 === "") {
      return false;
  }
  return token2; 
}

function checkTokenCookie() {
  const token = Cookies.get('autorization-token');
  return !!token; 
}

function checkValidToken(token) {
  if (token === "") {
      alert("Вы не ввели токен!");
      return false;
  }
  return token; 
}

function deleteTokenCookies() {
  Cookies.remove('autorization-token');
  token2 = ""; 
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
  const token = Cookies.get('autorization-token');
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`, 
    },
  }
}

function postOptionsFavorite(movie_id, method){ //method - true/false
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