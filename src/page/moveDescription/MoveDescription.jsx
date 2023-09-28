import { React, useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { useLoaderData } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getFavoriteFilm, addFavoriteFilm } from '../../components/Network'

import Cookies from 'js-cookie'

export function MoveDescription() {
    const [favoriteFilms, setFavoriteFilms] = useState(null); 

    const jsonMoveDescription = useLoaderData(); 

    console.log('Подробности про фильм: ', jsonMoveDescription);
    const imgURL= "https://image.tmdb.org/t/p/w500" + (jsonMoveDescription.poster_path || jsonMoveDescription.backdrop_path);
    const [favoriteFilmFlag, setFavoriteFilmFlag] = useState(false);

    const handleFavoriteBtn = () => {
        const account_id = Cookies.get('account_id');
        if(favoriteFilmFlag){
          addFavoriteFilm(jsonMoveDescription.id, account_id, false);
          setFavoriteFilmFlag(!favoriteFilmFlag);
        } else {
          addFavoriteFilm(jsonMoveDescription.id, account_id, true);
          setFavoriteFilmFlag(!favoriteFilmFlag);
        }
        console.log('Получаем состояние израбранного: ', favoriteFilmFlag);
      }

    useEffect(() => { 
        getFavoriteFilm()
            .then((favoriteFilms) => {
            setFavoriteFilms(favoriteFilms);
            setFavoriteFilmFlag(favoriteFilms.results.some((film) => film.id === jsonMoveDescription.id));
        })
        .catch((error) => {
            console.error('Ошибка загрузки избранных фильмов:', error);
        });
    }, []); 
    
    return(
        <>
            <Header head={`Фильмы-${jsonMoveDescription.original_title}`}/>
            <Box
                sx={{ display: 'flex'}} 
            >    
                <CardMedia
                    component="img"
                    sx={{ width: "300px", height: "402px", m: 3, ml: 30}}
                    image = { imgURL }
                    alt="img_film"
                />
                
                <Box ml='10px' mt='10px'>
                    <Box ml='10px' mt='10px' sx={{ display: 'flex'}}>
                        <Typography 
                            ml='0px' color="#000000" variant="h3" gutterBottom
                        >
                            {`${jsonMoveDescription.original_title}(${jsonMoveDescription.release_date})`}
                        </Typography>
                        <IconButton aria-label="add"  
                            sx = {{ mb: 2, mr: 0 }}
                            onClick={handleFavoriteBtn}
                        >
                            <StarBorderIcon style={{ color: favoriteFilmFlag ? 'red' : 'gray' }}/>
                        </IconButton>
                    </Box>
                    
                    <IconButton  
                        sx = {{ mb: 2, mr: 0 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Box sx = {{ pt: 0, width: "50%"}}>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {jsonMoveDescription.credits.crew.slice(0, 4).map((actor) => (
                                <li key={actor.id}>
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>{`${actor.name}`}</Typography> 
                                </li>
                            ))}
                        </ul>
                        <Typography 
                            ml='0px' color="#000000" variant="h4" gutterBottom
                            sx = {{ pt: 8 }}
                            >
                                Детали
                        </Typography>
                        <TableContainer component={Paper} style={{ boxShadow: 'none', border: 'none' }}>
                            <Table style={{ borderCollapse: 'collapse', backgroundColor: 'transparent' }}>
                            <TableBody>
                                <TableRow >
                                    <TableCell style={{ width: '30%', borderBottom: 'none' }} >Страна</TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none' }}>{jsonMoveDescription.production_countries[0].name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none' }} >Год</TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none' }}>{jsonMoveDescription.release_date}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none', verticalAlign: 'top' }} >Жанр</TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none' }}>
                                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                                            {jsonMoveDescription.genres.map((genre, index) => (
                                                <li key={genre.id}>
                                                    <span>{`${genre.name}${index === jsonMoveDescription.genres.length - 1 ? '' : ', '} `}</span> 
                                                </li>
                                            ))}
                                        </ul>
                                        
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none' }} >Режиссер</TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none' }}>США</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none', verticalAlign: 'top' }} >Сценарий</TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none' }}>{jsonMoveDescription.overview}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none' }} >Бюджет</TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none' }}>{`${jsonMoveDescription.budget}$`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none' }} >Зрители</TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none' }}>{`${jsonMoveDescription.revenue} чел`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: '30%', borderBottom: 'none' }} >Время</TableCell>
                                    <TableCell style={{ width: '70%', borderBottom: 'none' }}>{`${jsonMoveDescription.runtime} мин`}</TableCell>
                                </TableRow>
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    
                </Box>
            </Box>


        </>
    )
}
