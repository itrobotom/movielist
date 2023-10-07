import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from "@mui/material/Typography";

export function SliderYears({ valueYears, onChange }) {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography gutterBottom>
        Год релиза 1960-2023
      </Typography>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={valueYears}
        onChange={onChange}
        valueLabelDisplay="auto"
        max={2023} 
        min={1960} 
        size="small"
        valueLabelDisplay="auto" //отображать значение над бегунками только когда перемещаем их auto, а если надо всегда, то on
      />
    </Box>
  );
}