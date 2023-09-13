import Paper from '@mui/material/Paper';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './Login.css'

function GetToken({onClickToken}) {
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

function InputToken({onClickCancel, inputToken, saveToken}) {

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
                        onChange={inputToken}
                    />
                </DialogContent>
                <DialogActions disableSpacing={true}>
                    <Button style={{ fontWeight: 500, color: '#2196F3', fontSize: '14px' }} variant="text" onClick={onClickCancel}>Отмена</Button>
                    <Button style={{ fontWeight: 500, color: '#2196F3', fontSize: '14px' }} variant="text" onClick={saveToken}>Ок</Button>
                </DialogActions> 
                
            </Paper>
        </div>       
    );
}

export { GetToken, InputToken }