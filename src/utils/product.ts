import { LinkedProduct, Product, ProductLinkType } from '../models';

export const mapProductsToLinkedProducts = (chosenProduct: Product, products: Product[]): LinkedProduct[] => {
  return products.map((product) => {
    let linkType: ProductLinkType;
    if (chosenProduct.category) {
      if (product.category?.id === chosenProduct.category.id) {
        linkType = 'analog';

      //   Предполагаю, что "известная" категория - это картегория, которая вообще есть у товара
      //   Иначе с предоставленные данные не сходятся с примером в Readme, т.к. товар 4 также должен быть не
      //   сопутствующим
      } else if (product.category) {
        linkType = 'related';
      }
    }

    return {
      ...product,
      linkType,
    };
  });
};
