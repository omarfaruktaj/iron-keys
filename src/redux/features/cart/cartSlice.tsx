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
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.product._id === action.payload
      );
      if (
        existingItem &&
        existingItem.quantity < existingItem.product.availableQuantity
      ) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.product._id === action.payload
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  emptyCart,
} = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
