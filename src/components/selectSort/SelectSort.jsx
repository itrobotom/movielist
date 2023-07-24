import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export function SelectSort({valueFilter, onChange, categories}) {
    return(
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native"> Сортировать по: </InputLabel>
            <Select
                //key={`${keyResetFilter}${stateFilter.selectSort}`} НАДО ИЛИ НЕТ СТАВИТЬ КЛЮЧ ДЛЯ MUI АДЕКВАТНОГО ПЕРЕРЕНДЕРА
                variant="standard"
                value={valueFilter} //по умолчанию брать значение из состояния! а не из исходного массива
                onChange={onChange}
              >
                <MenuItem value={categories[0]}>{categories[0]}</MenuItem>
                <MenuItem value={categories[1]}>{categories[1]}</MenuItem>
            </Select>
          </FormControl>
    )
}