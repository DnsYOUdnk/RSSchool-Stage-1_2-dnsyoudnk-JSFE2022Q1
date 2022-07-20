import Slider from '@mui/material/Slider';
import { useState } from 'react';

export default function RangeSlider({valueRange, markRange}:{valueRange: number, markRange: string}) {
  const [value, setValue] = useState<number[]>([0,valueRange]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    // console.log(event.target.value)
    setValue(newValue as number[]);
  };

  return (
    <div className='range_slider'>
      <div className='range_slider__value'>
        {value[0] + ' ' + markRange}
      </div>
      <Slider
        max={valueRange}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
      <div className='range_slider__value'>
        {value[1] + ' ' + markRange} 
      </div>
    </div>
  );
}