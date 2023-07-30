import React, { useState, useEffect, useReducer } from "react";
import AllPagination from "../../components/allPagination/AllPagination";
import { categories } from '../../data/data'
import {RequestGenre, getRatingMoves, getPopularMoves} from '../../components/Network';
import { token } from "../../components/token";
import { FilterContext } from "../../components/Context";
import './MoveFilter.css';
import { SliderYears } from "../../components/sliderYears/SliderYears";
import { CheckGenre } from "../../components/checkGenre/CheckGenre";
// MUI
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import { SelectSort } from "../../components/selectSort/SelectSort";


function MoveFilter({ movies, setMovies, setIsLoadDataCards, page, setPage }) {
  //можно завести через диспатч в общий юсредьюс и добавить в большой стейт иеще и массив с жанрами
  const [genres, setGenries] = useState(null); //храним данные с сервера в genries, по умолчанию лучше null, чем [] пустой массив
  const [isGetGenre, setIsGetGenre] = useState(false);
  
  //переменная состояния для хранения числа, которое будет использовано для создания ключа каждому блоку с фильтром
  const [keyResetFilter, setKeyResetFiltr] = useState(0);

  const defaultPage = 1;

  const initialFilter = {
    selectSort: 'Популярности',
    selectYear: [1960, 2023],
    selectedGenresIds: [],
  };//['Популярные по убыванию', '2022', []]
  
  const [stateFilter, dispatch] = useReducer(stateFilterReduсer, initialFilter);

  //!!!ЧТОБЫ сократить размер файла, можно перенести редьюсер в отдельный файл
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
      console.log(event.target.value);
  };


  function handleChangeValueYears(event, selectYear) {
    dispatch({
      type: 'setSelectYear',
      newYear: selectYear
    })
    console.log(selectYear);
  }

  //создаем и обновляем массив id элементов с выбранными элементами из списка жанров

  function handleChangeItem(nextGenre){
    const updatedSelectedIds = [...stateFilter.selectedGenresIds]; //создаем новый массив updatedSelectedIds, который копирует элементы из соответсвующего поля стейта.
                                                                  //т.к. далее используется метод splice, вызывающий мутацию. Потом мы на основе новых данных обновим стейт
    const index = updatedSelectedIds.indexOf(nextGenre.id); //если элемент не найден, вернется -1

    if (index !== -1) { 
      updatedSelectedIds.splice(index, 1); // Удалить идентификатор, если уже выбран
    } else {
      updatedSelectedIds.push(nextGenre.id); // Добавить идентификатор, если еще не выбран
    }

    dispatch({
      type: 'setChangeGenre',
      updateIdGenre: updatedSelectedIds
    })
    console.log(updatedSelectedIds); // Вывод обновленного массива идентификаторов выбранных жанров
  }

  function resetFiltr() {
    setKeyResetFiltr(keyResetFilter + 1); 
    console.log(keyResetFilter);
    dispatch({type: 'setSelectSort', newSort: initialFilter.selectSort})
    dispatch({type: 'setSelectYear', newYear: initialFilter.selectYear})
    //при выводе мы видим, что сами переменные на странице изменились, а в консоли вывелись старые данные при первом клике на сброс, а при втором обновились как положено...
    dispatch({ type: 'setChangeGenre', updateIdGenre: initialFilter.selectedGenresIds})
    setPage(defaultPage);
    console.log(`Переменные состояния после сброса фильтров ${stateFilter.selectSort} и ${stateFilter.selectYear} и ${stateFilter.selectedGenresIds}`);
  }

  useEffect(() => { //запрос данных только после рендера всей страницы каркаса, куда мы будем размещать данные (жанры, карточки с фильмами)
    RequestGenre(token)
      .then((jsonGenre) => {
        console.log('Данные по жанрам с сервера'); //`Данные по жанрам с сервера ${jsonGenre.genres}` При преобразовании массива объектов в строку с помощью шаблонных строк (``), каждый объект преобразуется в строку "[object Object]".
        //Чтобы вывести содержимое объектов в виде читаемых значений, можно использовать метод JSON.stringify() с параметром null для отступов. 
        //Это преобразует объекты в строку JSON с отступами, делая их более читаемыми.
        //2 - количество отступов 
        console.log(JSON.stringify(jsonGenre.genres, null, 2));
        setGenries(jsonGenre.genres); //сохранили жанры, пришедшие с сервера
        setIsGetGenre(true);
      })
  }, []); //пустой массив чтобы перерендер не зациклился

  useEffect(() => {
    if(stateFilter.selectSort === 'Популярности'){
      getPopularMoves(page)
        .then((json) => {
          console.log(JSON.stringify(json, null, 2));
          //СОХРАНИТЬ ОБЪЕКТ С ФИЛЬМАМИ В СТЕЙТ ОТОБРАЖАЕМХ ФИЛЬМОВ. СТЕЙТ ДОЛЖЕН БЫТЬ В РОДИТЕЛЕ APP.JS, ТАМ ЖЕ МЫ И СПУСКАЕМ ДАННЫЕ ВНУТРЬ КАРТОЧЕК
          setMovies(json);
          setIsLoadDataCards(true); //данные загружены, меняем флаг из App.js
        })
    } else { // значит по рейтингу (всего два типа фильтров)
      getRatingMoves(page)
        .then((json) => {
          console.log(JSON.stringify(json, null, 2));
          //СОХРАНИТЬ ОБЪЕКТ С ФИЛЬМАМИ В СТЕЙТ ОТОБРАЖАЕМХ ФИЛЬМОВ
          setMovies(json);
          setIsLoadDataCards(true); //данные загружены, меняем флаг из App.js
        })
    }
    // Включаем зависимость stateFilter.selectSort
  }, [stateFilter.selectSort, page]); // Добавляем stateFilter.selectSort в массив зависимостей

  //console.log(genres);
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
              // sx={{ mt: 2, ml: 2 }}
              onClick={resetFiltr}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <SelectSort valueFilter = {stateFilter.selectSort} onChange = {handleChangeSelectSort} categories = {categories}/>
          <SliderYears valueYears={stateFilter.selectYear} onChange={handleChangeValueYears}/>
          {isGetGenre && <CheckGenre
            key={`${keyResetFilter}`} 
            genres={genres}
            selectedGenresIds={stateFilter.selectedGenresIds} // Передаем selectedGenresIds в CheckGenre
            onChangeItem={handleChangeItem}
          />} 
          <AllPagination page={page} setPage={setPage} />
        </Box>   
      </div>
    </FilterContext.Provider>
    
  );
}

export default MoveFilter;

// В этом примере используется массив selectedGenresIds, в котором хранятся идентификаторы выбранных жанров. В функции handleChangeItem происходит следующее:

// Создается копия массива selectedGenresIds с помощью оператора расширения [...selectedGenresIds].
// Проверяется наличие идентификатора жанра в массиве selectedGenresIds с использованием indexOf(nextGenre.id).
// Если идентификатор уже присутствует в массиве (index > -1), то он удаляется из массива с помощью splice(index, 1).
// Если идентификатор отсутствует в массиве (index === -1), то он добавляется в конец массива с помощью push(nextGenre.id).
// Обновленный массив идентификаторов выбранных жанров присваивается состоянию selectedGenresIds с помощью setSelectedGenresIds(updatedSelectedIds).
// Выводится обновленный массив идентификаторов в консоль для отслеживания изменений.
// Теперь selectedGenresIds представляет собой массив с выбранными жанрами, и он будет обновляться по мере выделения/снятия выделения чекбоксов.