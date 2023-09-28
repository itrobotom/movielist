import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export function SelectSort({valueFilter, onChange, categories}) {
    return(
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native"> Сортировать по: </InputLabel>
            <Select
                variant="standard"
                value={valueFilter} 
                onChange={onChange}
              >
                <MenuItem value={categories[0]}>{categories[0]}</MenuItem>
                <MenuItem value={categories[1]}>{categories[1]}</MenuItem>
            </Select>
          </FormControl>
    )
}