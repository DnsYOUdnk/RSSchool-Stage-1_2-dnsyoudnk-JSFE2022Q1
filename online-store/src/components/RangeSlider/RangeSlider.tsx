import { useContext, useState } from 'react';
import Slider from '@mui/material/Slider';
import { Context } from '../../StoreContext';
import { SliderMark } from '../../types';

export default function RangeSlider(
  { maxValue, valueRange, markRange }: { maxValue: number, valueRange: number[], markRange: string }) {

  const [value, setValue] = useState<number[]>(valueRange);
  const { filterValue, setFilterValue } = useContext(Context);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (!filterValue) return;
    switch (markRange) {
      case SliderMark.MoneyСurrency: 
        filterValue.priceRange = Array.isArray(newValue) ? newValue : filterValue.priceRange;
        break;
      case SliderMark.Piece:
        filterValue.countRange = Array.isArray(newValue) ? newValue : filterValue.countRange;
        break;
      default: break;
    }
    setFilterValue!({ ...filterValue });
    setValue(newValue as number[]);
  };
  return (
    <div className='range_slider'>
      <div className='range_slider__value'>
        {Math.min(...value) + ' ' + markRange}
      </div>
      <Slider
        max={maxValue}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
      <div className='range_slider__value'>
        {Math.max(...value) + ' ' + markRange} 
      </div>
    </div>
  );
}