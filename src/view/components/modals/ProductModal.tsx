import { Product } from '../../../models';
import { useEffect } from 'react';

import { Modal } from '../common/modal';

interface ProductModalProps {
  show: boolean;
  onClose: () => void;
  productName: Product['name'];
  productPrice: Product['price'];
}

const ProductModal = ({ show, onClose, productPrice, productName }: ProductModalProps) => {
    useEffect(() => {
    if (show) {
      console.log('User observes product with name ', productName);
    }
  }, [show, productName]);

  if (!show) {
    return null;
  }

  return (
    <Modal onClose={onClose}>
      <h3>
        {productName}
      </h3>
      <div>
        Price: {productPrice}
      </div>
    </Modal>
  )
};

export default ProductModal;
