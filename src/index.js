import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/reset.css";
import "./style/App.css";

import { MoveDescription } from "./page/moveDescription/MoveDescription";
import { getMoveDescription } from "./components/Network"

//роутер
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./components/error-page";

import { Provider } from 'react-redux'
import { createStore } from 'redux'

//задаем типы экшенов через константы чтобы при вводе не ошибиться
export const ADD_TOKEN = 'ADD_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';

//создаем объект пользователя, чтобы потом можно было не только сохраняти и изменять информацию о токене, но и другую 
const defaultUserInformation = {
    tokenAutorization: '', 
}

//экшт в виде объекта
// action = {
//     type: "ADD_TOKEN",
//     payload: 
// }

//экшн в виде функции, в которую удобно отправить параметр (не обязательно создавать с аргументом)
export function addToken(token){
    return {type: ADD_TOKEN, payload: token}
}
export function deleteToken() { //вызывать будет без аргументов дабы передать пустую строчку для отчистки токена в сторе
    return {type: DELETE_TOKEN, payload: ""}
}

const reducer = (state = defaultUserInformation, action) => {
    switch(action.type) {
        case "ADD_TOKEN":
            return{ ...state, tokenAutorization: action.payload}
        case "DELETE_TOKEN":
            return{...state, tokenAutorization: action.payload}
        default:
            return state;
    }
}

export const store = createStore(reducer);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/film/:filmId", 
        element: <MoveDescription />,
        //объект params берется из динамических данных url, мы задаем только один динамический параметр через : то есть :filmId, было бы в url несколько динамических параметров
        // значит в params был бы доступ к нескольким динамическим параметрам
        loader: ({ params }) => {
            const filmId = params.filmId; 
            return getMoveDescription(filmId);
        },
    }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
    
);
