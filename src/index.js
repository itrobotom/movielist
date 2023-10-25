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
import { store } from './store/mainReducer'


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
