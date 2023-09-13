import './Header.css'
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteTokenCookies } from "../token"

function Header({head, isLogin, setIsLogin}) {
  // клик на кнопку logout либо сотрет токен из куков
  function handleLogin() {
    setIsLogin(!isLogin);
    if(isLogin){ //если поставить !isLogin он не успевает меняться при клике (некоторе время остается true) и токен не удаляется 
      console.log('Удаляем токен!');
      deleteTokenCookies(); //удаляем токен из куков
    }
    console.log('После удаления токена вот такой флаг авторизации: ', isLogin); 
  }

  return (
    <div className="header">
      <button className="button-home">{head}</button>
      {/* Поменять войти на иконку */}
      <IconButton aria-label="add"
        sx={{ mr: 20 }}
        onClick={handleLogin}
      >
        {isLogin ? <LogoutIcon /> : <LoginIcon /> }
      </IconButton>
    </div>
  );
}

export default Header;
