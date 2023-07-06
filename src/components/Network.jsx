const url = 'https://api.themoviedb.org/3/genre/movie/list?language=ru';
// const headers = {
//   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODk2NTU1MGQ2NzljMzViMjA1ZmVmY2IxYmE2NjM4MiIsInN1YiI6IjY0OTMxZmMwNDNjZDU0MDE0NGEwYTcxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HraQMPJL2W8ZeKI5PCIbG7FVyPhwufE2ucIJ1rnubaE',
//   accept: 'application/json'
// };

export async function RequestGenre(headers) {
    let response = await fetch(url, {headers});
    if (response.ok) {
        let json = await response.json(); // получаем массив объектов ({id: 28, name: 'боевик'})
        console.log(json.genres[0]); 
        console.log(`Ответ с сервера по жанрам в json ${json.genres}`);
        return json;
    } else {
        console.log(`Ошибка HTTP: ${response.status}`);
    } 
}
