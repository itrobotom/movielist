//import { options } from './token'
import { consoleToken } from "../components/token"
import { getOptions } from "./token"
const apiKey = 'e8965550d679c35b205fefcb1ba66382';
const baseApiUrl = 'https://api.themoviedb.org/3';

export async function RequestGenre() {
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

export async function getPopularMoves(page = 1) {
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

export async function getRatingMoves(page = 1) {
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

export async function getMoveDescription(filmId) {
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

export async function getMoveActors(filmId) {
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