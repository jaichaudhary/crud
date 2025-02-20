import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Item} from '../database/db';

interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [],
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      if (index !== -1) state.items[index] = action.payload;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const {setItems, addItem, updateItem, removeItem} = itemSlice.actions;
export default itemSlice.reducer;
