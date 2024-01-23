import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { LinkedProduct, Product } from '../../models';

type CatalogPageState = {
  product: Product | undefined;
  linkedProducts: LinkedProduct[] | undefined;
  comparingProducts: Product[] | undefined;
};

const defaultState: CatalogPageState = {
  product: undefined,
  linkedProducts: undefined,
  comparingProducts: undefined,
};

export const productPageReducer = createReducer<CatalogPageState>(defaultState, {
  'product-page/set-product': (state, action: PayloadAction<Product>) => {
    state.product = action.payload;
  },
  'product-page/set-linked-product': (state, action: PayloadAction<LinkedProduct[]>) => {
    state.linkedProducts = action.payload;
  },
  'product-page/add-product-to-compare-list': (state, action: PayloadAction<Product>) => {
    if (state.comparingProducts === undefined) {
      state.comparingProducts = [];
    }
    if (state.comparingProducts.some((product) => product.id === action.payload.id)) {
      console.log(`User adds product with id ${action.payload.id} to compare list that is already in the list`);
      return;
    }

    state.comparingProducts.push(action.payload);
    console.log(`User adds product with id ${action.payload.id} to compare list`);
  },
  'product-page/remove-product-from-compare-list': (state, action: PayloadAction<Product>) => {
    if (state.comparingProducts === undefined) {
      return;
    }
    state.comparingProducts = state.comparingProducts.filter(
      (product) => product.id !== action.payload.id,
    );
    console.log(`User removes product with id ${action.payload.id} from compare list`);
  }
});
