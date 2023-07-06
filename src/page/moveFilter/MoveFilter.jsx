import React, { useState, useEffect, useReducer } from "react";
import CheckGenre from "../../components/checkGenre/CheckGenre";
import Pagination from "../../components/pagination/Pagination";
import {Select} from "../../components/select/Select"
import {categories, years} from '../../data/data'
import {RequestGenre} from '../../components/Network';
import { token } from "../../components/token";
import './MoveFilter.css';


function MoveFilter() {
  //можно завести через диспатч в общий юсредьюс и добавить в большой стейт иеще и массив с жанрами
  const [genres, setGenries] = useState([]); //храним данные с сервера в genries
  const [isGetGenre, setIsGetGenre] = useState(false);

  //переменная состояния для хранения числа, которе будет использовано для создания ключа каждому блоку с фильтром
  const [keyResetFilter, setKeyResetFiltr] = useState(0);

  let initialFilter = {
    selectSort: 'Популярные по убыванию',
    selectYear: '2022',
    selectedGenresIds: [],
  };//['Популярные по убыванию', '2022', []]
  
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
        return stateFilter;
    }
  }

  useEffect(() => { //запрос данных только после рендера всей страницы
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
  
  function handleChangeSelectSort(selectSort) {
    dispatch({
      type: 'setSelectSort',
      newSort: selectSort
    });
    console.log(selectSort);
  }

  function handleChangeSelectYear(selectYear) {
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
    console.log(`Переменные состояния после сброса фильтров ${stateFilter.selectSort} и ${stateFilter.selectYear} и ${stateFilter.selectedGenresIds}`);
  }

  //console.log(genres);
  return (
    <div className="filter">
      <h1>Фильтры:</h1>
      <div className="filtr-block-btn">
        <button className="button-filter" onClick={resetFiltr}>Сбросить</button>
        <button className="button-filter">Применить</button>
      </div>
      <Select 
        key={`${keyResetFilter}${stateFilter.selectSort}`} 
        headerSelect = {'Сортировать по:'} 
        options = {categories} 
        onChangeSelect={handleChangeSelectSort} 
        defaultValue = {stateFilter.selectSort}>
      </Select>
      <Select 
        key={`${keyResetFilter}${stateFilter.selectYear}`}
        headerSelect = {'Год релиза:'} 
        options = {years} 
        onChangeSelect={handleChangeSelectYear} 
        defaultValue = {stateFilter.selectYear}>
      </Select>
      {isGetGenre && <CheckGenre
        key={`${keyResetFilter}`} 
        genres={genres}
        selectedGenresIds={stateFilter.selectedGenresIds} // Передаем selectedGenresIds в CheckGenre
        onChangeItem={handleChangeItem}
      />}     
      <Pagination />
    </div>
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