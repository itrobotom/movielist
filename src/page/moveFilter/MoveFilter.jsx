import React, { useState, useEffect, useReducer } from "react";
import AllPagination from "../../components/allPagination/AllPagination";
import { categories } from '../../data/data'
import { RequestGenre, getRatingMoves, getPopularMoves, getSearchFilms } from '../../components/Network';
import { FilterContext } from "../../components/Context";
import './MoveFilter.css';
import { SliderYears } from "../../components/sliderYears/SliderYears";
import { CheckGenre } from "../../components/checkGenre/CheckGenre";
// MUI
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { SelectSort } from "../../components/selectSort/SelectSort";
import Input from '@mui/material/Input';


function MoveFilter({ setMovies, setIsLoadDataCards, page, setPage, searchFilms, setSearchFilms, setIsSearchFilmNow }) {
  //можно завести через диспатч в общий юсредьюс и добавить в большой стейт иеще и массив с жанрами
  const [genres, setGenries] = useState(null); //храним данные с сервера в genries, по умолчанию лучше null, чем [] пустой массив
  const [isGetGenre, setIsGetGenre] = useState(false);
  
  //переменная состояния для хранения числа, которое будет использовано для создания ключа каждому блоку с фильтром
  const [keyResetFilter, setKeyResetFiltr] = useState(0);

  const [inputSearchFilms, setInputSearchFilms] = useState(''); //введенный фильм в поиск

  const defaultPage = 1;

  const initialFilter = {
    selectSort: 'Популярности',
    selectYear: [1960, 2023],
    selectedGenresIds: [],
  };
  
  const [stateFilter, dispatch] = useReducer(stateFilterReduсer, initialFilter);

  function stateFilterReduсer(stateFilter, action) {
    switch (action.type) {
      case 'setSelectSort' : {
        return {
          ...stateFilter,
          selectSort: action.newSort
        };
      }
      case 'setSelectYear' : {
        return {
          ...stateFilter,
          selectYear: action.newYear
        };
      }
      case 'setChangeGenre' : {
        return {
          ...stateFilter,
          selectedGenresIds: action.updateIdGenre
        };
      }
      default:
        return {...stateFilter};
    }
  }

  const handleChangeSelectSort = (event) => {
    dispatch({
        type: 'setSelectSort',
        newSort: event.target.value
      });
  };


  function handleChangeValueYears(event, selectYear) {
    dispatch({
      type: 'setSelectYear',
      newYear: selectYear
    })
  }

  function handleChangeItem(nextGenre){
    const updatedSelectedIds = [...stateFilter.selectedGenresIds]; 
    const index = updatedSelectedIds.indexOf(nextGenre.id); 

    if (index !== -1) { 
      updatedSelectedIds.splice(index, 1); 
    } else {
      updatedSelectedIds.push(nextGenre.id);
    }

    dispatch({
      type: 'setChangeGenre',
      updateIdGenre: updatedSelectedIds
    })
  }

  function resetFiltr() {
    setKeyResetFiltr(keyResetFilter + 1); 
    dispatch({type: 'setSelectSort', newSort: initialFilter.selectSort})
    dispatch({type: 'setSelectYear', newYear: initialFilter.selectYear})
    //при выводе мы видим, что сами переменные на странице изменились, а в консоли вывелись старые данные при первом клике на сброс, а при втором обновились как положено...
    dispatch({ type: 'setChangeGenre', updateIdGenre: initialFilter.selectedGenresIds})
    setPage(defaultPage);
  }

  function handleChangeSearch(event) {
    setInputSearchFilms(event.target.value);
    (event.target.value !== '') ? setIsSearchFilmNow(true) : setIsSearchFilmNow(false);
  }

  useEffect(() => { 
    RequestGenre()
      .then((jsonGenre) => {
        
        console.log('Данные по жанрам с сервера'); 
        setGenries(jsonGenre.genres); 
        setIsGetGenre(true);
      })
      .catch((error) => {
        console.log('Ошибка получения жанров:', error);
      });
  }, []); 

  useEffect(() => {
    if(stateFilter.selectSort === 'Популярности'){
      getPopularMoves(page)
        .then((json) => {
          setMovies(json);
          setIsLoadDataCards(true);
        })
    } else { 
      getRatingMoves(page)
        .then((json) => {
          setMovies(json);
          setIsLoadDataCards(true); 
        })
        .catch((error) => {
          console.log('Ошибка получения данных:', error);
        });
    }
  }, [stateFilter.selectSort, page]);


  useEffect(() => {
    getSearchFilms(inputSearchFilms)
    .then((json) => {
      setSearchFilms(json);
    })
    .catch((error) => {
      console.log('Ошибка получения фильмов по поиску:', error);
    });
  }, [inputSearchFilms]);


  return (
    <FilterContext.Provider value={stateFilter}>
      <div className="filter">
        <Box
          m="50px"
        >
          <Box
            sx={{width: '250px', mb: 3, display: 'flex', justifyContent: 'space-between'}}
          >
            <Typography ml='0px' color="#007bff" variant="h5" gutterBottom>Фильтры:</Typography>
            <IconButton aria-label="add"
              onClick={resetFiltr}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Input
            sx={{width: '250px', mb: 3 }}
            placeholder="Поиск по названию"  
            onChange={handleChangeSearch}
          />
          <SelectSort valueFilter = {stateFilter.selectSort} onChange = {handleChangeSelectSort} categories = {categories}/>
          <SliderYears valueYears={stateFilter.selectYear} onChange={handleChangeValueYears}/>
          {isGetGenre && <CheckGenre
            key={`${keyResetFilter}`} 
            genres={genres}
            selectedGenresIds={stateFilter.selectedGenresIds}
            onChangeItem={handleChangeItem}
          />} 
          <AllPagination page={page} setPage={setPage} />
        </Box>   
      </div>
    </FilterContext.Provider>
    
  );
}

export default MoveFilter;
