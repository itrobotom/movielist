const apiKey = 'e8965550d679c35b205fefcb1ba66382';
const baseApiUrl = 'https://api.themoviedb.org/3';

export async function RequestGenre(headers) {
    const url = `${baseApiUrl}/genre/movie/list?language=ru&api_key=${apiKey}`;
    let response = await fetch(url, {headers});
    if (response.ok) {
        let json = await response.json(); // получаем массив объектов ({id: 28, name: 'боевик'})
        //console.log(json.genres[0]); 
        return json;
    } else {
        console.log(`Ошибка HTTP: ${response.status}`);
    } 
}

export async function getPopularMoves(page = 1) {
    const url = `${baseApiUrl}/movie/popular?language=ru&api_key=${apiKey}&page=${page}`;
    let response = await fetch(url);
    if (response.ok) {
        const json = await response.json(); // получаем массив объектов 
        //console.log(json.genres[0]); 
        return json;
    } else {
        console.log(`Ошибка HTTP: ${response.status}`);
    } 
}

export async function getRatingMoves(page = 1) {
    const url = `${baseApiUrl}/movie/top_rated?language=ru&api_key=${apiKey}&page=${page}`;
    let response = await fetch(url);
    if (response.ok) {
        const json = await response.json(); // получаем массив объектов 
        //console.log(json.genres[0]); 
        return json;
    } else {
        console.log(`Ошибка HTTP: ${response.status}`);
    } 
}

export async function getMoveDescription(movie_id) {
    //--url 'https://api.themoviedb.org/3/movie/movie_id?language=en-US' \
    const url = `${baseApiUrl}/movie/${movie_id}?language=ru&api_key=${apiKey}`;
    let response = await fetch(url);
    if (response.ok) {
        const json = await response.json(); // получаем массив объектов 
        //console.log(json.genres[0]); 
        //Ответ с сервера по жанрам в json
        console.log(json);
        return json;
    } else {
        console.log(`Ошибка HTTP: ${response.status}`);
    } 
}