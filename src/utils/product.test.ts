import { mapProductsToLinkedProducts } from './product';

describe('mapProductsToLinkedProducts', () => {
  const chosenProduct = {
    id: '1',
    category: { id: '1.1.1' },
    name: 'Продукт 1',
    price: 100,
  };
  const products = [
    {
      id: '2',
      category: { id: '1.1.1' },
      name: 'Продукт 2',
      price: 200,
    }, // Аналог
    {
      id: '3',
      category: { id: '1.2' },
      name: 'Продукт 3',
      price: 200,
    }, // Связанный в известной категории
    {
      id: '4',
      name: 'Продукт 4',
      price: 200,
    }, // Без категории
  ];

  it('maps products to linked products correctly', () => {
    const linkedProducts = mapProductsToLinkedProducts(chosenProduct, products);

    expect(linkedProducts.length).toBe(products.length);

    expect(linkedProducts[0].linkType).toBe('analog');
    expect(linkedProducts[1].linkType).toBe('related');
    expect(linkedProducts[2].linkType).toBeUndefined();
  });

  it('handles empty products array', () => {
    const linkedProducts = mapProductsToLinkedProducts(chosenProduct, []);
    expect(linkedProducts).toEqual([]);
  });

  it('handles case where chosenProduct has no category', () => {
    const noCategoryProduct = {
      id: '1',
      name: 'Продукт 1',
      price: 100,
    };
    const linkedProducts = mapProductsToLinkedProducts(noCategoryProduct, products);

    linkedProducts.forEach(product => {
      expect(product.linkType).toBeUndefined();
    });
  });
});