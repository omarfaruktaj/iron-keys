import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../products/product-api";
import { RootState } from "@/redux/store";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product._id === action.payload._id
      );

      if (existingItem) {
        if (existingItem.quantity < action.payload.availableQuantity) {
          existingItem.quantity += 1;
        }
      } else {
        if (action.payload.availableQuantity > 0) {
          state.items.push({ product: action.payload, quantity: 1 });
        }
      }
    },
  },
});

export const { addProductToCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
