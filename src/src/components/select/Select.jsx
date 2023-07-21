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
      {/* Функция, указанная в атрибуте onChange, будет вызываться каждый раз, когда происходит изменение значения select. 
      В данном случае, когда происходит изменение выбранного значения select, вызывается анонимная функция (e) => { onChangeSelect(e.target.value) }.
      Внутри этой анонимной функции e представляет объект события ChangeEvent, которое содержит информацию о событии изменения значения select.  
      e.target.value представляет выбранное значение select. Далее, вызывается функция onChangeSelect (которая передана из родительского компонента в качестве пропса), 
      и выбранное значение select передается в качестве аргумента этой функции. То есть, при изменении значения select, вызывается функция 
      onChangeSelect с выбранным значением в качестве аргумента, чтобы передать это значение обратно в родительский компонент
      */}
      <select 
        value={currentValue} 
        className="select-filter" 
        name="sort" 
        id="sort-select" 
        onChange={(e) => {onChangeSelect(e.target.value)}}> 
      {/* лучше индекс массива index не использовать в качестве ключа, а взять имя, т.к. оно не должно повторятья */}
        {options.map((value, index) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </label>
  );
}
