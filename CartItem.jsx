// CartItem.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  removeItem, 
  updateQuantity, 
  clearCart,
  incrementQuantity,
  decrementQuantity,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice 
} from './CartSlice';
import { Link } from 'react-router-dom';
import './CartItem.css';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
  
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showPromoMessage, setShowPromoMessage] = useState('');
  
  // Функция удаления товара
  const handleRemoveItem = (itemId) => {
    if (window.confirm('Удалить товар из корзины?')) {
      dispatch(removeItem(itemId));
    }
  };
  
  // Функция обновления количества
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };
  
  // Увеличение количества на 1
  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };
  
  // Уменьшение количества на 1
  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };
  
  // Очистка всей корзины
  const handleClearCart = () => {
    if (window.confirm('Очистить всю корзину?')) {
      dispatch(clearCart());
    }
  };
  
  // Применение промокода
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setShowPromoMessage('Введите промокод');
      return;
    }
    
    const validPromoCodes = {
      'PLANT10': 10,
      'GREEN20': 20,
      'PARADISE15': 15,
      'SALE2024': 25
    };
    
    if (validPromoCodes[promoCode.toUpperCase()]) {
      const discountPercent = validPromoCodes[promoCode.toUpperCase()];
      const discountAmount = (totalPrice * discountPercent) / 100;
      setDiscount(discountAmount);
      setShowPromoMessage(`✅ Промокод применён! Скидка ${discountPercent}%`);
    } else {
      setDiscount(0);
      setShowPromoMessage('❌ Неверный промокод');
    }
  };
  
  // Расчет итоговой суммы
  const finalPrice = totalPrice - discount;
  const shippingCost = totalPrice > 5000 ? 0 : 500;
  const totalWithShipping = finalPrice + shippingCost;
  
  // Если корзина пуста
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h2>Ваша корзина пуста</h2>
          <p>Добавьте растения, чтобы сделать ваш дом зеленее!</p>
          <Link to="/products" className="continue-shopping-btn">
            Перейти к покупкам
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-container">
      {/* Заголовок */}
      <header className="cart-header">
        <h1>🛒 Корзина покупок</h1>
        <p>Проверьте ваш заказ перед оформлением</p>
      </header>
      
      <div className="cart-layout">
        {/* Основная часть с товарами */}
        <div className="cart-items-section">
          <div className="cart-items-header">
            <h2>Товары в корзине ({totalItems})</h2>
            <button 
              className="clear-cart-btn"
              onClick={handleClearCart}
            >
              Очистить корзину
            </button>
          </div>
          
          {/* Список товаров */}
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                {/* Изображение товара */}
                <div className="cart-item-image">
                  <div className="image-placeholder">
                    {item.name.charAt(0)}
                  </div>
                </div>
                
                {/* Информация о товаре */}
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">
                    Цена: <span>{item.price.toLocaleString()} ₽</span>
                  </p>
                </div>
                
                {/* Управление количеством */}
                <div className="cart-item-quantity">
                  <button 
                    className="quantity-btn minus"
                    onClick={() => handleDecrement(item.id)}
                    aria-label="Уменьшить количество"
                  >
                    −
                  </button>
                  
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="quantity-input"
                  />
                  
                  <button 
                    className="quantity-btn plus"
                    onClick={() => handleIncrement(item.id)}
                    aria-label="Увеличить количество"
                  >
                    +
                  </button>
                </div>
                
                {/* Итоговая стоимость товара */}
                <div className="cart-item-total">
                  <span className="total-label">Итого:</span>
                  <span className="total-price">
                    {item.totalPrice.toLocaleString()} ₽
                  </span>
                </div>
                
                {/* Удаление товара */}
                <button 
                  className="remove-item-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Удалить товар"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          
          {/* Кнопка продолжения покупок */}
          <div className="continue-shopping">
            <Link to="/products" className="back-to-shop-btn">
              ← Продолжить покупки
            </Link>
          </div>
        </div>
        
        {/* Боковая панель с итогами */}
        <div className="cart-summary-section">
          <div className="summary-card">
            <h3>Сумма заказа</h3>
            
            {/* Промежуточные расчеты */}
            <div className="summary-row">
              <span>Товары ({totalItems} шт.)</span>
              <span>{totalPrice.toLocaleString()} ₽</span>
            </div>
            
            {/* Промокод */}
            <div className="promo-code-section">
              <div className="promo-input-group">
                <input
                  type="text"
                  placeholder="Промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button 
                  className="apply-promo-btn"
                  onClick={applyPromoCode}
                >
                  Применить
                </button>
              </div>
              {showPromoMessage && (
                <div className={`promo-message ${showPromoMessage.includes('✅') ? 'success' : 'error'}`}>
                  {showPromoMessage}
                </div>
              )}
            </div>
            
            {/* Скидка */}
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Скидка по промокоду</span>
                <span className="discount-amount">-{discount.toLocaleString()} ₽</span>
              </div>
            )}
            
            {/* Доставка */}
            <div className="summary-row">
              <span>Доставка</span>
              <span>
                {shippingCost === 0 ? 'Бесплатно' : `${shippingCost} ₽`}
                {totalPrice < 5000 && (
                  <div className="free-shipping-note">
                    Бесплатная доставка от 5000 ₽
                  </div>
                )}
              </span>
            </div>
            
            {/* Итоговая сумма */}
            <div className="summary-row total">
              <span>Итого к оплате</span>
              <span className="final-price">{totalWithShipping.toLocaleString()} ₽</span>
            </div>
            
            {/* Информация о сохранении */}
            <div className="savings-info">
              {discount > 0 && (
                <p className="savings">
                  Вы экономите: <span>{discount.toLocaleString()} ₽</span>
                </p>
              )}
              {shippingCost === 0 && totalPrice >= 5000 && (
                <p className="free-shipping">🎉 Бесплатная доставка!</p>
              )}
            </div>
            
            {/* Кнопка оформления заказа */}
            <button 
              className="checkout-btn"
              onClick={() => alert('Заказ оформлен! Спасибо за покупку.')}
            >
              Оформить заказ
            </button>
            
            {/* Гарантии */}
            <div className="guarantees">
              <div className="guarantee-item">
                <span className="guarantee-icon">✅</span>
                <span>Гарантия качества растений</span>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-icon">🔄</span>
                <span>Возврат в течение 14 дней</span>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-icon">🔒</span>
                <span>Безопасная оплата</span>
              </div>
            </div>
          </div>
          
          {/* Рекомендованные товары (опционально) */}
          <div className="recommended-section">
            <h4>Добавьте к заказу:</h4>
            <div className="recommended-items">
              <div className="recommended-item">
                <div className="rec-image">🌱</div>
                <div className="rec-info">
                  <p>Удобрение для растений</p>
                  <p className="rec-price">399 ₽</p>
                </div>
                <button className="add-rec-btn">+</button>
              </div>
              <div className="recommended-item">
                <div className="rec-image">🏺</div>
                <div className="rec-info">
                  <p>Декоративный горшок</p>
                  <p className="rec-price">899 ₽</p>
                </div>
                <button className="add-rec-btn">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Мобильная версия итогов */}
      <div className="mobile-summary">
        <div className="mobile-total">
          <span>Итого: {totalWithShipping.toLocaleString()} ₽</span>
          <button className="mobile-checkout-btn">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
