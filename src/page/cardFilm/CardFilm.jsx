import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { addFavoriteFilm } from '../../components/Network';
import { React, useState } from "react";

import { Link } from "react-router-dom";

import Cookies from 'js-cookie'

export default function CardFilm({movie, favoriteFilm}) { 
  const [favoriteFilmFlag, setFavoriteFilmFlag] = useState(favoriteFilm); 
  const imgURL= "https://image.tmdb.org/t/p/w500" + (movie.poster_path || movie.backdrop_path);

  const handleFavoriteBtn = () => {
    const accountId = Cookies.get('account_id'); 
    if(favoriteFilmFlag){
      setFavoriteFilmFlag(!favoriteFilmFlag);
      addFavoriteFilm(movie.id, accountId, false)
        .then(() => {
          //ничего не делаем, т.к. мы уже поменяли на отмеченное в избранное не дожадаясь ответа сервера
        })
        .catch((error) => {
          setFavoriteFilmFlag(favoriteFilmFlag);
          alert("Сетевая ошибка при удалении из избранного, повторите позже", error);
          console.error("Сетевая ошибка при удалении из избранного, повторите позже", error);
        });    
    } else {
      setFavoriteFilmFlag(!favoriteFilmFlag);
      addFavoriteFilm(movie.id, accountId, true)
        .then(() => {
          //ничего не делаем, т.к. мы уже поменяли на отмеченное в избранное не дожадаясь ответа сервера
        })
        .catch((error) => {
          setFavoriteFilmFlag(favoriteFilmFlag);
          alert("Сетевая ошибка при добавлении в избранное, повторите позже", error);
          console.error("Сетевая ошибка при добавлении в избранное, повторите позже", error);
        });
      
    }
  }

  return (
    <Card sx = {{ width: 296, height: 550, mr: '20px', mb: '20px' }}>
      <CardActionArea >
        <Link to={`/film/${movie.id}`}>
          <CardMedia
            component="img"
            image = { imgURL }
            alt="img_film"
          />
        </Link>
        <Box
            sx={{width: '104%', display: 'flex', justifyContent: 'space-between'}}
        >
          <Box ml='10px' mt='10px'>
            <Typography color="#000000" variant="h6" gutterBottom>{movie.original_title}</Typography>
            <Typography color="lightgray" variant="h7">{movie.vote_average}</Typography>
          </Box>
          {/* ПРЕДУПРЕЖДЕНИЕ react-dom.development.js:86 Warning: validateDOMNesting(...): <button> cannot appear as a descendant of <button>.
          ЕСЛИ ЗАКОММЕНТИТЬ IconButton, ВСЕ ОК, ВЫШЕ В РОДИТЕЛЯХ СМОТЕРТЬ BUTTON */}
          <IconButton aria-label="add"
            sx = {{ mt: 0, mr: 2 }}
            onClick={handleFavoriteBtn}     
          >
            <StarBorderIcon style={{ color: favoriteFilmFlag ? 'red' : 'gray' }}/>
          </IconButton>
        </Box>
      </CardActionArea>
    </Card>
  );
}
