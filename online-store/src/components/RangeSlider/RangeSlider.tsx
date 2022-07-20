import Slider from '@mui/material/Slider';
import { useState } from 'react';

export default function RangeSlider({valueRange}) {
  const [value, setValue] = useState<number[]>([0, 1000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    // console.log(event.target.value)
    setValue(newValue as number[]);
  };

  return (
    <>
      <Slider
        max={valueRange}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </>
  );
}