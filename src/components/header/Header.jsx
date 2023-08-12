import './Header.css'
import InputIcon from '@mui/icons-material/Input';
import IconButton from '@mui/material/IconButton';

function Header({head}) {
  return (
    <div className="header">
      <button className="button-home">{head}</button>
      {/* Поменять войти на иконку */}
      <IconButton aria-label="add"
        sx={{ mr: 20}}
        //onClick={resetFiltr}
      >
        <InputIcon />
      </IconButton>
    </div>
  );
}

export default Header;
