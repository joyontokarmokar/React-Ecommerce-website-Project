import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);

      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({
          ...item,
          quantity: item.quantity || 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    //Total Sum er jonno
    updateQuantity: (state, action) => {
            const {id, quantity} = action.payload
            const product = state.items.find(i => i.id === id)

            if(product){
                product.quantity = quantity
            }
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        //Cart theke products remove korar jonno
      removeCart: (state, action) => {
          const itemId = action.payload
          state.items = state.items.filter(item => item.id !== itemId)
          
          // LocalStorage Update
          localStorage.setItem('cart', JSON.stringify(state.items))
      },
      //Cart er sob kichu remove er jonno
      clearCart: (state) => {
          state.items = [];
          localStorage.removeItem('cart')
        },
  }
});

export const { addToCart, updateQuantity, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
