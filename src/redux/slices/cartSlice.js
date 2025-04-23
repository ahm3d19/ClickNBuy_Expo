import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      // Price is already a number, no need to parse
      const price = newItem.price;

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1, // Use passed quantity or default to 1
          totalPrice: price * (newItem.quantity || 1),
        });
      } else {
        existingItem.quantity += newItem.quantity || 1;
        existingItem.totalPrice += price * (newItem.quantity || 1);
      }

      state.totalQuantity += newItem.quantity || 1;
      state.totalAmount += price * (newItem.quantity || 1);
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (!existingItem) return;

      const price = existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= price;
      }

      state.totalQuantity--;
      state.totalAmount -= price;
    },

    deleteItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (!existingItem) return;

      state.items = state.items.filter(item => item.id !== id);
      state.totalQuantity -= existingItem.quantity;
      state.totalAmount -= existingItem.totalPrice;
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
