import React from "react";
import Header from "./components/header/Header";
import MoveFilter from "./page/moveFilter/MoveFilter";
import CardFilm from "./page/cardFilm/CardFilm";
import './App.css'
// Импортируем изображения
import onePic from ".//media/one_pic.png"; 
import twoPic from ".//media/two_pic.png";
import threePic from ".//media/three_pic.png";
import fourPic from ".//media/four_pic.png";

function App() {
  return (
    <>
      <Header />
      <div className="filtr-cards_film">
        <div className="move-filter-container">
          <MoveFilter />
        </div>
        <div className="cards-container">
          <CardFilm img = {fourPic}/> 
          <CardFilm img = {onePic}/>
          <CardFilm img = {twoPic}/>
          <CardFilm img = {threePic}/>
        </div>  
      </div>
      
    </>
  );
}

export default App;
