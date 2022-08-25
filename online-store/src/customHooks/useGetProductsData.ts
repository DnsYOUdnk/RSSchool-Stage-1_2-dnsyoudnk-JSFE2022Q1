import { useEffect, useState } from 'react';
import { PRODUCTS_DATA_URL } from '../constants';
import { IProduct } from '../types';

export const useGetProductsData = () => {
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch(PRODUCTS_DATA_URL)
      .then((res) => res.json())
      .then((json: IProduct[]): void => {
        setData([...json]);
      });
  }, []);

  return data;
};
