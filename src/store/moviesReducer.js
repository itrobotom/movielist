

const dataMovies = {
    SET_MOVIES: 'SET_MOVIES', //добавляем фильмы через запрос на сервер в куки и в store
    IS_LOADED_MOVIES: 'IS_LOADED_MOVIES',
    GET_FAVORITE_MOVIES: 'GET_FAVORITE_MOVIES',
    IS_LOADED_FAVORITE_MOVIES: 'IS_LOADED_FAVORITE_MOVIES',
    GET_SEARCH_MOVIES: 'GET_SEARCH_MOVIES',
    IS_GET_SEARCH_MOVIE_MOVIES: 'IS_GET_SEARCH_MOVIE_MOVIES'
}

const defaultMoviesInfo = {
    movies: null,
    isLoadDataCards: false,
    favoriteMovies: null,
    isLoadFavoriteMovies: false,
    searchMovies: null,
    isSearchMovieNow: false
}

const reducerMovies = (state = defaultMoviesInfo, action) => {
    switch(action.type){
        case dataMovies.SET_MOVIES:
            return {...state, movies: action.payload}
        case dataMovies.IS_LOADED_MOVIES:
            return {...state, isLoadDataCards: action.payload}
        case dataMovies.GET_FAVORITE_MOVIES:
            return {...state, favoriteMovies: action.payload}
        case dataMovies.IS_LOADED_FAVORITE_MOVIES:
            return {...state, isLoadFavoriteMovies: action.payload}
        case dataMovies.GET_SEARCH_MOVIES:
            return {...state, searchMovies: action.payload}
        case dataMovies.IS_GET_SEARCH_MOVIE_MOVIES:
            return {...state, isSearchMovieNow: action.payload}
        default:
            return state;
    }
}

function setMovies(jsonMovies) {
    return {type: dataMovies.SET_MOVIES, payload: jsonMovies}
}

function changeStatusLoadMovies(flag) {
    return {type: dataMovies.IS_LOADED_MOVIES, payload: flag}
}

function setFavoriteMovies(jsonMovies) {
    return {type: dataMovies.GET_FAVORITE_MOVIES, payload: jsonMovies}
}
function changeStatusLoadFavoriteMovies(flag) {
    return {type: dataMovies.IS_LOADED_FAVORITE_MOVIES, payload: flag}
}

function setSearchMovies(jsonMovies) {
    return {type: dataMovies.GET_SEARCH_MOVIES, payload: jsonMovies}
}

function changeStatusLoadSearchMovies(flag) {
    return {type: dataMovies.IS_GET_SEARCH_MOVIE_MOVIES, payload: flag}
}

export { reducerMovies, setMovies, changeStatusLoadMovies, setFavoriteMovies, changeStatusLoadFavoriteMovies, setSearchMovies, changeStatusLoadSearchMovies }