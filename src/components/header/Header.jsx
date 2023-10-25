import './Header.css'
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteTokenCookies } from "../token"
import { deleteToken } from '../../store/userReducer'

import { useSelector, useDispatch } from 'react-redux';

function Header({head, isLogin, setIsLogin}) {

  const dispatch = useDispatch();

  // клик на кнопку logout либо сотрет токен из куков
  function handleLogin() {
    if(isLogin){ 
      console.log('Удаляем токен!');
      deleteTokenCookies(); //удаляем токен из куков
      dispatch(deleteToken());
      setIsLogin(!isLogin); //устанавливаем флаг как не авторизоавнный и сразу пройдет перерендер, отображаться теперь контент сайта не будет
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
