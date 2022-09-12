import { IMAGE_NOT_FOUND_URL } from '../../constants';
import './notFoundData.css';

export const NotFoundData = () => {
  return (
    <li className="catalog__not_found">
      <h3>Sorry, no matches found</h3>
      <img src={IMAGE_NOT_FOUND_URL} alt="not_found_gif"/>
    </li>
  );
};