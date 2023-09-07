import './Header.css'
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

function Header({head, isLogin, setIsLogin}) {
  // клик на кнопку logout либо сотрет токен из куков
  function handleLogin() {
    setIsLogin(!isLogin);
    console.log(isLogin); 
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
