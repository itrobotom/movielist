//import { options } from './token'
import { consoleToken } from "../components/token"
import { getOptions, postOptionsFavorite } from "./token"
const apiKey = 'e8965550d679c35b205fefcb1ba66382';
const baseApiUrl = 'https://api.themoviedb.org/3';

async function RequestGenre() {
    const options = getOptions();
    try {
        const url = `${baseApiUrl}/genre/movie/list?language=ru&api_key=${apiKey}`;
        let response = await fetch(url, options);
        
        if (response.status === 200) { //if (response.ok) не достаточно, там код 200-299, лучше наверняка 200 смотреть
            let json = await response.json(); // получаем массив объектов ({id: 28, name: 'боевик'})
            //console.log(json.genres[0]); 
            return json;
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        } 
    } catch (error) { //выведется созданная в else response OK
        alert(`Не можем обратиться к серверу, проверьте интернет соединение: ${error.name} - ${error.message}`);
        throw error; //проброс исключения чтобы его в useEffect Обработать
        //ошибку возвращать не надо, иначе далее в рендере мы обратимся к объекту, который пришел, ожидая данные о фильме, а получим объект ошибки
    } 
}

async function getPopularMoves(page = 1) {
    const options = getOptions();
    const url = `${baseApiUrl}/movie/popular?language=ru&api_key=${apiKey}&page=${page}`;
    let response = await fetch(url, options);
    if (response.ok) {
        const json = await response.json(); // получаем массив объектов 
        return json;
    } else {
        console.log(`Ошибка HTTP: ${response.status}`);
    } 
}

async function getRatingMoves(page = 1) {
    const options = getOptions();
    const url = `${baseApiUrl}/movie/top_rated?language=ru&api_key=${apiKey}&page=${page}`;
    try{
        let response = await fetch(url, options);
        if (response.status === 200) {
            const json = await response.json(); // получаем массив объектов 
            //console.log(json.genres[0]); 
            return json;
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        } 
    }
    catch (error){
        alert(`Не можем обратиться к серверу, проверьте интернет соединение: ${error.name} - ${error.message}`);
        throw error; //проброс исключения 
    }
    
}

async function getMoveDescription(filmId) {
    const options = getOptions();
    
    const url = `https://api.themoviedb.org/3/movie/${filmId}?append_to_response=credits&language=ru`;
    consoleToken();
    let response = await fetch(url, options);
    if (response.ok) {
        const json = await response.json(); // получаем массив объектов 
        console.log(json);
        return json;
    } else {
        console.log(`Ошибка HTTP: ${response.status}`);
    } 
}

async function getMoveActors(filmId) {
    const options = getOptions();
    const url = `${baseApiUrl}/movie/${filmId}?append_to_response=credits?language=ru&api_key=${apiKey}`; //const url = `${baseApiUrl}/movie/${filmId}/credits?language=ru&api_key=${apiKey}`;

    let response = await fetch(url, options);
    if (response.ok) {
        const json = await response.json(); // получаем массив объектов 
        //console.log(json);
        return json;
    } else {
        console.log(`Ошибка HTTP: ${response.status}`);
    } 
}

async function getIdAccount(){
    const options = getOptions();
    const url = `${baseApiUrl}/account/account_id`;
    let response = await fetch(url, options);
    try {
        if (response.ok) {
            const json = await response.json(); // получаем массив объектов 
            console.log('id аккаунта: ', json.id);
            return json;
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        }
    } catch(error) {
        alert(`Не можем обратиться к серверу, проверьте интернет соединение: ${error.name} - ${error.message}`);
        throw error; //проброс исключения 
    }
}

async function addFavoriteFilm(movie_id, account_id, method){
    const options = postOptionsFavorite(movie_id, method);
    console.log('Вот id фильма2', movie_id);
    const url = `${baseApiUrl}/account/${account_id}/favorite`;
    console.log('лог1', url);
    let response = await fetch(url, options);
    console.log('лог2', response);
    try {
        if (response.ok) {
            const json = await response.json(); // получаем массив объектов 
            console.log('Ответ сервера при добавления фильма в избранное: ', json);
            //return json;
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        }
    } catch(error) {
        alert(`Не можем обратиться к серверу, проверьте интернет соединение: ${error.name} - ${error.message}`);
        throw error; //проброс исключения 
    }
}

async function getFavoriteFilm(account_id){
    const options = getOptions();
    const url = `${baseApiUrl}/account/${account_id}/favorite/movies`;
    let response = await fetch(url, options);
    try {
        if (response.ok) {
            const json = await response.json(); // получаем массив объектов 
            console.log('Избранные фильмы: ', json);
            return json;
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        }
    } catch(error) {
        alert(`Не можем обратиться к серверу, проверьте интернет соединение: ${error.name} - ${error.message}`);
        throw error; //проброс исключения 
    }
}

export { RequestGenre, getPopularMoves, getRatingMoves, getMoveDescription, getMoveActors, getIdAccount, addFavoriteFilm, getFavoriteFilm }
