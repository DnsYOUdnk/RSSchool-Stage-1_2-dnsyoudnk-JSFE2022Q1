import Slider from '@mui/material/Slider';
import { useContext, useState } from 'react';
import { Context } from '../../StoreContext';

export default function RangeSlider({maxValue, valueRange, markRange}:{maxValue: number, valueRange: number[], markRange: string}) {

  const [value, setValue] = useState<number[]>(valueRange);
  const { filterValue, setFilterValue } = useContext(Context);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if(markRange === '$' && filterValue) {
      filterValue.priceRange = Array.isArray(newValue) ? newValue : filterValue.priceRange;
      setFilterValue!({...filterValue})
    } else if (markRange === 'pc.' && filterValue) {
      filterValue.countRange = Array.isArray(newValue) ? newValue : filterValue.countRange;
      setFilterValue!({...filterValue})
    }
    setValue(newValue as number[]);
  };

  return (
    <div className='range_slider'>
      <div className='range_slider__value'>
        {value[0] + ' ' + markRange}
      </div>
      <Slider
        max={maxValue}
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