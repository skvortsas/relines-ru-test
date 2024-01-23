import { productPageReducer } from './product-page';
import {
  addProductToCompareList,
  setProduct,
  removeProductFromCompareList,
  setLinkedProducts,
} from '../actions/product-page';
import { LinkedProduct } from '../../models';

describe('product-page reducer', () => {
  const initialState = {
    comparingProducts: undefined,
    product: undefined,
    linkedProducts: undefined,
  };

  it('should handle add-product-to-compare-list when list is empty', () => {
    const product = {
      id: '1',
      name: 'Продукт 1',
      price: 100,
    };
    const action = addProductToCompareList(product);
    const state = productPageReducer(initialState, action);

    expect(state.comparingProducts).toHaveLength(1);
    expect(state.comparingProducts).toContain(product);
  });

  it('should not add a product that is already in the list', () => {
    const product = {
      id: '1',
      name: 'Продукт 1',
      price: 100,
    };
    const initialStateWithProduct = {
      comparingProducts: [product],
      product: undefined,
      linkedProducts: undefined,
    };
    const action = addProductToCompareList(product);
    const state = productPageReducer(initialStateWithProduct, action);

    expect(state.comparingProducts).toHaveLength(1);
  });

  it('should add a new product to a non-empty list', () => {
    const product1 = {
      id: '1',
      name: 'Продукт 1',
      price: 100,
    };
    const product2 = {
      id: '2',
      name: 'Продукт 2',
      price: 200,
    };
    const initialStateWithProduct = {
      comparingProducts: [product1],
      product: undefined,
      linkedProducts: undefined,
    };
    const action = addProductToCompareList(product2);
    const state = productPageReducer(initialStateWithProduct, action);

    expect(state.comparingProducts).toHaveLength(2);
    expect(state.comparingProducts).toContainEqual(product2);
  });

  it('should set the product which is passed to set-product action', () => {
    const product = {
      id: '1',
      name: 'Продукт 1',
      price: 100,
    };
    const action = setProduct(product);
    const state = productPageReducer(initialState, action);

    expect(state.product).toEqual(product);
  });

  it ('should set the linked products which are passed to set-linked-products action', () => {
    const linkedProducts: LinkedProduct[] = [
      {
        id: '1',
        name: 'Продукт 1',
        price: 100,
        linkType: 'analog',
      },
      {
        id: '2',
        name: 'Продукт 2',
        price: 200,
        linkType: 'related',
      },
    ];
    const action = setLinkedProducts(linkedProducts);
    const state = productPageReducer(initialState, action);

    expect(state.linkedProducts).toEqual(linkedProducts);
  });

  it('should remove a product from the comparing list', () => {
    const product1 = {
      id: '1',
      name: 'Продукт 1',
      price: 100,
    };
    const product2 = {
      id: '2',
      name: 'Продукт 2',
      price: 200,
    };
    const initialStateWithProducts = {
      comparingProducts: [product1, product2],
      product: undefined,
      linkedProducts: undefined,
    };
    const action = removeProductFromCompareList(product1);
    const state = productPageReducer(initialStateWithProducts, action);

    expect(state.comparingProducts).toHaveLength(1);
    expect(state.comparingProducts).toContainEqual(product2);
  });

  it('should not remove a product from the comparing list if it is not in the list', () => {
    const product1 = {
      id: '1',
      name: 'Продукт 1',
      price: 100,
    };
    const product2 = {
      id: '2',
      name: 'Продукт 2',
      price: 200,
    };
    const initialStateWithProducts = {
      comparingProducts: [product1],
      product: undefined,
      linkedProducts: undefined,
    };
    const action = removeProductFromCompareList(product2);
    const state = productPageReducer(initialStateWithProducts, action);

    expect(state.comparingProducts).toHaveLength(1);
    expect(state.comparingProducts).toContainEqual(product1);
  });
});