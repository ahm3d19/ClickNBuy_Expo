import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import wishlistReducer from '../slices/wishlistSlice';
import productReducer from '../slices/productSlice';
import similarProductsReducer from '../slices/similarProductsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
    similarProducts: similarProductsReducer,
  },
});
