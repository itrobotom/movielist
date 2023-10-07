import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';


import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function CheckGenre({ genres, selectedGenresIds, onChangeItem }) {
  return(
    <Autocomplete 
      fullWidth
      multiple
      options={genres}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      sx={{ mt: 3 }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      // style={{ width: 500 }}
      onChange={function (event, newValue) {
          onChangeItem(newValue)
          console.log(newValue); //видим в консоле инпут, по которому кликаем
        }
      }
      renderInput={(params) => (
        <TextField {...params} label="Жанры" placeholder="Выбрать" />
      )}
    />
  )
}



// В input добавлен атрибут checked, который устанавливает состояние чекбокса в зависимости от того, содержится ли идентификатор жанра в массиве selectedGenresIds. Для этого мы используем метод includes, который проверяет, включает ли массив указанный элемент.
// В функции onChange передается сам объект genre вместо измененного объекта. Теперь функция onChangeItem будет вызываться с объектом жанра, который был выбран или снят с выбора.
// Теперь, при выборе/снятии выбора чекбоксов, функция onChangeItem будет вызываться с объектом жанра, и массив selectedGenresIds будет обновляться соответствующим образом.
