import { combineReducers, createStore } from 'redux'
import { reducerUser } from './userReducer'
import { reducerMovies } from './moviesReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
 
const rootReducer = combineReducers({
    user: reducerUser, // Имя "user" будет использоваться для доступа к этому редуктору
    movies: reducerMovies
})

export const store = createStore(rootReducer, composeWithDevTools());