// CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Добавление товара в корзину
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Если товар уже есть в корзине, увеличиваем количество
        existingItem.quantity += newItem.quantity || 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        // Если товара нет, добавляем новый
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
          totalPrice: newItem.price * (newItem.quantity || 1)
        });
      }
      
      // Обновляем общие показатели
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },
    
    // Удаление товара из корзины
    removeItem: (state, action) => {
      const itemId = action.payload;
      
      // Находим индекс товара
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      
      if (itemIndex !== -1) {
        // Удаляем товар
        state.items.splice(itemIndex, 1);
        
        // Обновляем общие показатели
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
    
    // Обновление количества товара
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      
      // Проверяем, что количество положительное число
      if (quantity <= 0) {
        // Если количество 0 или меньше, удаляем товар
        const itemIndex = state.items.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
          state.items.splice(itemIndex, 1);
        }
      } else {
        // Обновляем количество
        const existingItem = state.items.find(item => item.id === id);
        if (existingItem) {
          existingItem.quantity = quantity;
          existingItem.totalPrice = existingItem.price * quantity;
        }
      }
      
      // Обновляем общие показатели
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },
    
    // Дополнительные редьюсеры (опционально)
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    
    // Уменьшение количества на 1
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        } else {
          // Если количество становится 0, удаляем товар
          const itemIndex = state.items.findIndex(item => item.id === itemId);
          state.items.splice(itemIndex, 1);
        }
        
        // Обновляем общие показатели
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
    
    // Увеличение количества на 1
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        
        // Обновляем общие показатели
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    }
  }
});

// Экспорт действий
export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart, 
  decrementQuantity, 
  incrementQuantity 
} = cartSlice.actions;

// Экспорт редьюсера
export default cartSlice.reducer;

// Селекторы для доступа к данным
export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) => state.cart.totalItems;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectItemById = (itemId) => (state) => 
  state.cart.items.find(item => item.id === itemId);
