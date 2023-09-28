import { consoleToken } from "../components/token"
import { getOptions, postOptionsFavorite } from "./token"
import Cookies from 'js-cookie'
const apiKey = 'e8965550d679c35b205fefcb1ba66382';
const baseApiUrl = 'https://api.themoviedb.org/3';

async function RequestGenre() {
    const options = getOptions();
    try {
        const url = `${baseApiUrl}/genre/movie/list?language=ru&api_key=${apiKey}`;
        let response = await fetch(url, options);
        
        if (response.status === 200) { 
            let json = await response.json();
            return json;
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        } 
    } catch (error) { 
        alert(`Не можем обратиться к серверу, проверьте интернет соединение: ${error.name} - ${error.message}`);
        throw error; 
    } 
}

async function getPopularMoves(page = 1) {
    const options = getOptions();
    const url = `${baseApiUrl}/movie/popular?language=ru&api_key=${apiKey}&page=${page}`;
    let response = await fetch(url, options);
    if (response.ok) {
        const json = await response.json();
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
            const json = await response.json(); 
            return json;
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        } 
    }
    catch (error){
        alert(`Не можем обратиться к серверу, проверьте интернет соединение: ${error.name} - ${error.message}`);
        throw error;
    }
    
}

async function getMoveDescription(filmId) {
    const options = getOptions();
    
    const url = `https://api.themoviedb.org/3/movie/${filmId}?append_to_response=credits&language=ru`;
    consoleToken();
    let response = await fetch(url, options);
    if (response.ok) {
        const json = await response.json(); 
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
        const json = await response.json();
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
            const json = await response.json(); 
            console.log('id аккаунта: ', json.id);
            Cookies.set('account_id', json.id);
            return json.id;
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        }
    } catch(error) {
        alert(`Не можем обратиться к серверу, проверьте интернет соединение: ${error.name} - ${error.message}`);
        throw error;
    }
}

async function addFavoriteFilm(movie_id, account_id, method){
    const options = postOptionsFavorite(movie_id, method);
    const url = `${baseApiUrl}/account/${account_id}/favorite`;
    let response = await fetch(url, options);
    try {
        if (response.ok) {
            const json = await response.json(); // получаем массив объектов 
            console.log('Ответ сервера при добавления фильма в избранное: ', json);
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        }
    } catch(error) {
        alert(`Не можем обратиться к серверу, проверьте интернет соединение: ${error.name} - ${error.message}`);
        throw error;
    }
}

async function getFavoriteFilm(){
    const account_id = Cookies.get('account_id');
    const options = getOptions();
    const url = `${baseApiUrl}/account/${account_id}/favorite/movies`;
    let response = await fetch(url, options);
    try {
        if (response.ok) {
            const json = await response.json();
            console.log('Избранные фильмы: ', json);
            return json;
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        }
    } catch(error) {
        alert(`Не можем обратиться к серверу, проверьте интернет соединение: ${error.name} - ${error.message}`);
        throw error;
    }
}

async function getSearchFilms(inputSearch) {
    const options = getOptions();
    const baseApiUrl = 'https://api.themoviedb.org/3';
    const url = `${baseApiUrl}/search/movie?query=${inputSearch}&include_adult=false&language=en-US&page=1`;
    let response = await fetch(url, options);
    try {
        if (response.ok) {
            const json = await response.json();
            console.log('Найденные фильмы: ', json);
            return json;
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        }
    } catch(error) {
        alert(`Не можем обратиться к серверу, проверьте интернет соединение: ${error.name} - ${error.message}`);
        throw error; 
    }  
}

export { RequestGenre, getPopularMoves, getRatingMoves, getMoveDescription, getMoveActors, getIdAccount, addFavoriteFilm, getFavoriteFilm, getSearchFilms }
