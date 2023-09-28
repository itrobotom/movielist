import './Header.css'
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteTokenCookies } from "../token"

function Header({head, isLogin, setIsLogin}) {
  function handleLogin() {
    if(isLogin){ 
      deleteTokenCookies(); 
      setIsLogin(!isLogin); 
    }
  }

  return (
    <div className="header">
      <button className="button-home">{head}</button>
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
