import './Select.css'
import { useContext } from 'react';
import { FilterContext } from '../Context';
import {categories, years} from '../../data/data'


export function Select( {
  headerSelect, 
  options,
  onChangeSelect
} ) {
  
  const value = useContext(FilterContext); //достаем value из родителя, что там передали - объект stateFilter
  
  //можно брать данные из контекста в зависимости от options, тогда и dispatch можно тоже вернуть, и будет полноценное масштабирование
  let currentValue = '';
  options === categories ? currentValue =  value.selectSort : currentValue =  value.selectYear;
  return (
    <label className="label-filter">
      {headerSelect} 
      <select 
        value={currentValue} 
        className="select-filter" 
        name="sort" 
        id="sort-select" 
        onChange={(e) => {onChangeSelect(e.target.value)}}> 
        {options.map((value, index) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </label>
  );
}
