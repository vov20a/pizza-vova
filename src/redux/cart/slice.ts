import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calkTotalPrice } from '../../utils/calkTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartItem } from './types';



interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const {items,totalPrice}=getCartFromLS()

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state,  action: PayloadAction<CartItem>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calkTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice =calkTotalPrice(state.items)
    },
    removeItem(state,action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice =calkTotalPrice(state.items)
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});


export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
