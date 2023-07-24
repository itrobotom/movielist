import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default function CardFilm({img}) {
  return (
    <Card sx={{ maxWidth: 296, maxHeight: 324, mr: '20px', mb: '20px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          //height="140" //можно изменить высоту отображения карточки
          image={img}
          alt="img film"
        />
        <Box
            sx={{width: '104%', display: 'flex', justifyContent: 'space-between'}}
        >
          <Box ml='10px' mt='10px'>
            <Typography ml='0px' color="#000000" variant="h6" gutterBottom>Матрица</Typography>
            <Typography ml='0px' color="lightgray" variant="h7" gutterBottom>Рейтинг 9</Typography>
          </Box>
          

          <IconButton aria-label="add"
             sx={{ mt: 0, mr: 2 }}
          >
            <StarBorderIcon />
          </IconButton>
        </Box>
      </CardActionArea>
    </Card>
  );
}