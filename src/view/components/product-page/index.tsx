import { FC, useEffect } from 'react';
import { productSelector } from '../../../store/selectors/product-page';
import { setLinkedProducts, setProduct } from '../../../store/actions/product-page';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { MockProductPageGateway } from '../../../gateways/product-page';
import { mapProductsToLinkedProducts } from '../../../utils/product';
import { useLocation } from 'react-router-dom';

import ProductView from './ProductView';
import LinkedProductsList from './LinkedProductsList';
import CompareList from '../../../view/components/product-page/CompareList';

import '../../../styles/product-page.css';

const gateway = new MockProductPageGateway();

export const ProductPage: FC = () => {
  const product = useSelector(productSelector);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    const productId = location.pathname.split('/').pop();
    // Отслеживается открытый продукт здесь, а не в reducer потому что до reducer не дойдет
    // информация, если пользователь захочет открыть не существующий продукт
    console.log('user opened product page with id: ', productId);
    if (!productId) return;

    gateway.getProduct(productId)
      .then((product) => {
        dispatch(setProduct(product));
        return product;
      }).then((product) => {
        gateway.getLinkedProducts(product.id)
          .then((linkedProducts) => {
            const mappedLinkedProducts = mapProductsToLinkedProducts(product, linkedProducts);
            dispatch(setLinkedProducts(mappedLinkedProducts));
          });
      })
      .catch((error) => {
        console.error('Something went wrong while fetching product: ', error);
      });
  }, [dispatch, location.pathname]);

  return (
    <div>
      <div className="row gap">
        <div className="half-width">
          {
            product && <ProductView {...product} />
          }
        </div>
        <CompareList />
      </div>
      <LinkedProductsList />
    </div>
  );
};
