import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSimilarProducts = createAsyncThunk(
  'similarProducts/fetchByCategory',
  async ({category, excludeId}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`,
      );

      // Filter out current product and limit to 4 similar items
      return response.data
        .filter(product => product.id !== excludeId)
        .slice(0, 4);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const similarProductsSlice = createSlice({
  name: 'similarProducts',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSimilarProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default similarProductsSlice.reducer;
