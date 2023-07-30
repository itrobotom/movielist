//const url = 'https://api.themoviedb.org/3/genre/movie/list?language=ru';
// самая первая ссылка https://api.themoviedb.org/3/genre/movie/list?language=ru
// эндпоинты для получения фильмов либо популярных, либо по рейтингу
// https://developer.themoviedb.org/reference/movie-top-rated-list
// https://developer.themoviedb.org/reference/movie-popular-list

const apiKey = 'e8965550d679c35b205fefcb1ba66382';
const baseApiUrl = 'https://api.themoviedb.org/3';

// перенесен в файл token.jsx
// const headers = {
//   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODk2NTU1MGQ2NzljMzViMjA1ZmVmY2IxYmE2NjM4MiIsInN1YiI6IjY0OTMxZmMwNDNjZDU0MDE0NGEwYTcxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HraQMPJL2W8ZeKI5PCIbG7FVyPhwufE2ucIJ1rnubaE',
//   accept: 'application/json'
// };

export async function RequestGenre(headers) {
    const url = `${baseApiUrl}/genre/movie/list?language=ru&api_key=${apiKey}`;
    let response = await fetch(url, {headers});
    if (response.ok) {
        let json = await response.json(); // получаем массив объектов ({id: 28, name: 'боевик'})
        //console.log(json.genres[0]); 
        //console.log(`Ответ с сервера по жанрам в json ${json.genres}`);
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
        //console.log(`Ответ с сервера по жанрам в json ${json.genres}`);
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
        //console.log(`Ответ с сервера по жанрам в json ${json.genres}`);
        return json;
    } else {
        console.log(`Ошибка HTTP: ${response.status}`);
    } 
}

// curl --request GET \
//      --url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200' \
//      --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODk2NTU1MGQ2NzljMzViMjA1ZmVmY2IxYmE2NjM4MiIsInN1YiI6IjY0OTMxZmMwNDNjZDU0MDE0NGEwYTcxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HraQMPJL2W8ZeKI5PCIbG7FVyPhwufE2ucIJ1rnubaE' \
//      --header 'accept: application/json'