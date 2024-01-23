import { Product } from '../../../models';
import { removeProductFromCompareList } from '../../../store/actions/product-page';
import { compareListSelector } from '../../../store/selectors/product-page';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';

import ProductView from './ProductView';

const CompareList = () => {
  const compareList = useSelector(compareListSelector);
  const dispatch = useDispatch<AppDispatch>();
  if (!compareList.length) return null;

  const removeItemFromTheList = (product: Product) => {
    dispatch(removeProductFromCompareList(product));
  };

  return (
    <div className="half-width">
      <div>Сравнение</div>
      <ul className="row gap wrap compare-list">
        {
          compareList.map((product) => (
            <li key={product.id} onClick={() => removeItemFromTheList(product)}>
              <ProductView {...product} />
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default CompareList;
