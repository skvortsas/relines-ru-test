import { LinkedProduct } from '../../../models';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { linkedProductsSelector } from '../../../store/selectors/product-page';
import { AppDispatch } from '../../../store';
import { useLessThenMediaQuery } from '../../../view/hooks/media-query';

import LinkedProductView from './LinkedProductView';
import { addProductToCompareList } from '../../../store/actions/product-page';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductModal from '../../../view/components/modals/ProductModal';

const LinkedProductsList = () => {
  const [showProductInfo, setShowProductInfo] = useState<LinkedProduct | null>(null);
  const linkedProducts = useSelector(linkedProductsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useLessThenMediaQuery(450);
  const navigate = useNavigate();
  const location = useLocation();

  const linkedProductClickHandler = useCallback((linkedProduct: LinkedProduct) => {
    if (linkedProduct.linkType === 'analog') {
      dispatch(addProductToCompareList(linkedProduct));
    } else {
      if (isMobile) {
        navigate(location.pathname, { state: { modalOpen: true } });
      }
      // Не создавал отдельное состояние в redux для модального окна, так как оно не используется в других местах
      setShowProductInfo(linkedProduct);
    }
  }, [dispatch, isMobile, navigate, location.pathname]);

  const closeProductInfo = useCallback(() => {
    setShowProductInfo(null);
    if (location.state && location.state.modalOpen) {
      navigate(-1);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    window.addEventListener('popstate', closeProductInfo);

    return () => {
      window.removeEventListener('popstate', closeProductInfo);
    }
  }, [closeProductInfo]);

  return (
    <>
      <ul>
        {
          linkedProducts.map((linkedProduct) => (
            <li key={linkedProduct.id}>
              <LinkedProductView product={linkedProduct} onButtonClick={linkedProductClickHandler}/>
            </li>
          ))
        }
      </ul>
      <ProductModal
        show={!!showProductInfo}
        onClose={closeProductInfo}
        productName={showProductInfo?.name ?? ''}
        productPrice={showProductInfo?.price ?? 0}
      />
    </>
  )
};

export default LinkedProductsList;
