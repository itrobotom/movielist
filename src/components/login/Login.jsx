import Paper from '@mui/material/Paper';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './Login.css'

export function GetToken({onClickToken}) {
    return(
        <div className="background">
            <Paper elevation={6} sx={{ width: '444px', height: '180px' }}>
                <DialogTitle style={{ fontWeight: 'bold' }}>
                    Запросить токен
                </DialogTitle>    
                <DialogContent>
                    <TextField
                        required
                        id="standard-required"
                        label="Почта"
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions disableSpacing={true}>
                    <Button style={{ fontWeight: 500, color: '#2196F3', fontSize: '14px' }} variant="text">Отмена</Button>
                    <Button style={{ fontWeight: 500, color: '#2196F3', fontSize: '14px' }} variant="text" onClick={onClickToken}>Запросить</Button>
                </DialogActions> 
                
            </Paper>
        </div>       
    );
}

export function InputToken({onClickCancel}) {
    return(
        <div className="background">
            <Paper elevation={6} sx={{ width: '444px', height: '180px' }}>
                <DialogTitle style={{ fontWeight: 'bold' }}>
                    Введите токен
                </DialogTitle>    
                <DialogContent>
                    <TextField
                        required
                        id="standard-required"
                        label="Токен"
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions disableSpacing={true}>
                    <Button style={{ fontWeight: 500, color: '#2196F3', fontSize: '14px' }} variant="text" onClick={onClickCancel}>Отмена</Button>
                    <Button style={{ fontWeight: 500, color: '#2196F3', fontSize: '14px' }} variant="text">Ок</Button>
                </DialogActions> 
                
            </Paper>
        </div>       
    );
}


export function LoginPopup({namePopup, nameInput, btn1, btn2}) {
    return(
        <div className="background">
            <Paper elevation={6} sx={{ width: '444px', height: '180px' }}>
                <DialogTitle style={{ fontWeight: 'bold' }}>
                    {namePopup}
                </DialogTitle>    
                <DialogContent>
                    <TextField
                        required
                        id="standard-required"
                        label={nameInput}
                        variant="standard"
                    />
                    <h1>sdcsdvsdvswdv</h1>
                </DialogContent>
                <DialogActions disableSpacing={true}>
                    <Button style={{ fontWeight: 500, color: '#2196F3', fontSize: '14px' }} variant="text">{btn1}</Button>
                    <Button style={{ fontWeight: 500, color: '#2196F3', fontSize: '14px' }} variant="text">{btn2}</Button>
                </DialogActions> 
                
            </Paper>
        </div>       
    );
}