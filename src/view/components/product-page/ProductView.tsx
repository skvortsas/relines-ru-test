import { Product } from '../../../models';

import '../../../styles/product.css';

const ProductView = ({ name, price }: Product) => {
  return (
    <div className="product full-height">
      <h2 className="product__name">
        {name}
      </h2>
      <div className="product__price">
        Price: {price}
      </div>
    </div>
  );
};

export default ProductView;
