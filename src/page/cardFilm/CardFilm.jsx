import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { addFavoriteFilm } from '../../components/Network';
import { React, useState, useEffect } from "react";

import { Link } from "react-router-dom";

export default function CardFilm({movie, myOnClick, favoriteFilm}) { //добавить аргумент favoriteMovies (то есть будем смотерть, есть ли данный фильм в подборке избранных)
  const [favoriteFilmFlag, setFavoriteFilmFlag] = useState(favoriteFilm); 
  const imgURL= "https://image.tmdb.org/t/p/w500" + (movie.poster_path || movie.backdrop_path);
  
  // const handleCardClick = () => {
  //   myOnClick(movie.id); //получить id  в родителя при клике на карточку
  //   console.log('Вызвана функция: ', handleCardClick);
  // };

  const handleFavoriteBtn = () => {
    const accountId = 20045995;//забираем из куков, но пока просто укажем по факту мой
    //проверка в каком состоянии у нас фильм, если в избранном, то удаляем от туда, если не в избранном, то добавляем туда
    //favoriteFilm ? addFavoriteFilm(movie.id, accountId, true) : addFavoriteFilm(movie.id, accountId, false);
    if(favoriteFilmFlag){
      addFavoriteFilm(movie.id, accountId, false);
      setFavoriteFilmFlag(!favoriteFilmFlag);
    } else {
      addFavoriteFilm(movie.id, accountId, true);
      setFavoriteFilmFlag(!favoriteFilmFlag);
    }
    console.log('Получаем состояние израбранного: ', favoriteFilmFlag);
  }

  return (
    <Card sx = {{ width: 296, height: 550, mr: '20px', mb: '20px' }}>
      <CardActionArea >
        <Link to={`/film/${movie.id}`}>
          <CardMedia
            component="img"
            //height="140" //можно изменить высоту отображения изображения карточки, но тогда она будет урезана
            image = { imgURL }
            alt="img_film"
            // onClick={handleCardClick}
          />
        </Link>
        <Box
            sx={{width: '104%', display: 'flex', justifyContent: 'space-between'}}
        >
          <Box ml='10px' mt='10px'>
            <Typography color="#000000" variant="h6" gutterBottom>{movie.original_title}</Typography>
            <Typography color="lightgray" variant="h7">{movie.vote_average}</Typography>
          </Box>
          <IconButton aria-label="add"
            sx = {{ mt: 0, mr: 2 }}
            // onClick={(e) => {
            //   e.stopPropagation(); // Остановить распространение события
            //   handleFavoriteBtn();
            // }}
            onClick={handleFavoriteBtn}
             
          >
            <StarBorderIcon style={{ color: favoriteFilmFlag ? 'red' : 'gray' }}/>
          </IconButton>
        </Box>
      </CardActionArea>
    </Card>
  );
}
