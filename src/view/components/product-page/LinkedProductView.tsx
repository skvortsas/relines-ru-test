import { useMemo, memo } from 'react';
import {LinkedProduct} from "../../../models";

interface LinkedProductViewProps {
  product: LinkedProduct;
  onButtonClick: (product: LinkedProduct) => void;
}

const LinkedProductView = ({ product, onButtonClick }: LinkedProductViewProps) => {
  const relation = useMemo(() => {
    if (product.linkType === 'related') return 'Сопутствующий товар:';
    if (product.linkType === 'analog') return 'Аналог:';
  }, [product.linkType]);

  return (
    <div>
      {relation}
      <button onClick={() => onButtonClick(product)}>{product.name}</button>
    </div>
  )
};

export default memo(LinkedProductView);
