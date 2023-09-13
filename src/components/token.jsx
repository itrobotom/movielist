import Cookies from 'js-cookie'
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
    Authorization: `Bearer ${token2}`, //токен лучше записать не через обращение к кукам, а из стейта 
  },
}

function getOptions(){
  const token = Cookies.get('autorization-token');
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`, //токен лучше записать не через обращение к кукам, а из стейта 
    },
  }
}

export { saveTokenCookies, checkTokenCookie, deleteTokenCookies, getTokenCookie, consoleToken, getOptions }