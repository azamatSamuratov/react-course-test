// ProductList.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './CartSlice';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  
  // Состояние для товаров
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Состояние для фильтрации и поиска
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  
  // Состояние для избранного
  const [favorites, setFavorites] = useState([]);
  
  // Фильтрация по категориям
  const categories = [
    'all',
    'Комнатные растения',
    'Суккуленты',
    'Цветущие растения',
    'Травы',
    'Деревья',
    'Экзотические'
  ];
  
  // Загрузка продуктов
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // В реальном приложении здесь был бы API-запрос
        // Используем моковые данные для демонстрации
        const mockProducts = [
          { id: 1, name: 'Монстера', price: 2499, category: 'Комнатные растения', description: 'Крупное тропическое растение с резными листьями', image: 'monstera.jpg', inStock: true, rating: 4.8 },
          { id: 2, name: 'Фикус Бенджамина', price: 1899, category: 'Комнатные растения', description: 'Популярное комнатное дерево с мелкими листьями', image: 'ficus.jpg', inStock: true, rating: 4.5 },
          { id: 3, name: 'Алоэ Вера', price: 899, category: 'Суккуленты', description: 'Лечебное растение с мясистыми листьями', image: 'aloe.jpg', inStock: true, rating: 4.7 },
          { id: 4, name: 'Кактус', price: 599, category: 'Суккуленты', description: 'Неприхотливый суккулент разных форм и размеров', image: 'cactus.jpg', inStock: false, rating: 4.3 },
          { id: 5, name: 'Орхидея Фаленопсис', price: 3299, category: 'Цветущие растения', description: 'Элегантное цветущее растение', image: 'orchid.jpg', inStock: true, rating: 4.9 },
          { id: 6, name: 'Розмарин', price: 799, category: 'Травы', description: 'Ароматная трава для кулинарии', image: 'rosemary.jpg', inStock: true, rating: 4.4 },
          { id: 7, name: 'Лимонное дерево', price: 4599, category: 'Деревья', description: 'Карликовое цитрусовое дерево', image: 'lemon.jpg', inStock: true, rating: 4.6 },
          { id: 8, name: 'Венерина мухоловка', price: 1299, category: 'Экзотические', description: 'Хищное насекомоядное растение', image: 'flytrap.jpg', inStock: true, rating: 4.8 },
          { id: 9, name: 'Сансевиерия', price: 1199, category: 'Комнатные растения', description: 'Неприхотливое растение с вертикальными листьями', image: 'sansevieria.jpg', inStock: true, rating: 4.5 },
          { id: 10, name: 'Бамбук', price: 1599, category: 'Деревья', description: 'Символ удачи и процветания', image: 'bamboo.jpg', inStock: false, rating: 4.2 }
        ];
        
        // Имитация задержки сети
        setTimeout(() => {
          setProducts(mockProducts);
          setLoading(false);
        }, 500);
        
      } catch (err) {
        setError('Ошибка загрузки товаров');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Функция добавления в корзину
  const handleAddToCart = (product) => {
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };
    
    dispatch(addItem(itemToAdd));
    
    // Визуальная обратная связь
    alert(`${product.name} добавлен в корзину!`);
  };
  
  // Функция добавления/удаления из избранного
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };
  
  // Функция проверки, есть ли товар в корзине
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };
  
  // Функция проверки, есть ли товар в избранном
  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };
  
  // Фильтрация и сортировка продуктов
  const filteredAndSortedProducts = products
    .filter(product => {
      // Фильтрация по поисковому запросу
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Фильтрация по категории
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Сортировка
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  
  // Функция для отображения рейтинга звездами
  const renderRating = (rating) => {
    return (
      <div className="product-rating">
        {'★'.repeat(Math.floor(rating))}
        {'☆'.repeat(5 - Math.floor(rating))}
        <span className="rating-number"> ({rating})</span>
      </div>
    );
  };
  
  // Если загрузка
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загружаем растения...</p>
      </div>
    );
  }
  
  // Если ошибка
  if (error) {
    return (
      <div className="error-container">
        <h3>Ошибка!</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Повторить попытку</button>
      </div>
    );
  }
  
  return (
    <div className="product-list-container">
      {/* Заголовок */}
      <header className="product-list-header">
        <h1>🌿 Магазин растений Paradise Nursery</h1>
        <p>Найдите идеальное растение для вашего дома или сада</p>
      </header>
      
      {/* Панель фильтров и поиска */}
      <div className="filters-panel">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск растений..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="category">Категория:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Все категории' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="sort">Сортировка:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">По умолчанию</option>
              <option value="price-low">Цена: низкая → высокая</option>
              <option value="price-high">Цена: высокая → низкая</option>
              <option value="rating">По рейтингу</option>
              <option value="name-asc">Название: А-Я</option>
              <option value="name-desc">Название: Я-А</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Статистика */}
      <div className="product-stats">
        <p>
          Показано: <strong>{filteredAndSortedProducts.length}</strong> из {products.length} растений
          {searchTerm && ` по запросу "${searchTerm}"`}
          {selectedCategory !== 'all' && ` в категории "${selectedCategory}"`}
        </p>
      </div>
      
      {/* Список продуктов */}
      <div className="products-grid">
        {filteredAndSortedProducts.length === 0 ? (
          <div className="no-products">
            <p>😔 Растений не найдено. Попробуйте изменить параметры поиска.</p>
          </div>
        ) : (
          filteredAndSortedProducts.map(product => (
            <div key={product.id} className="product-card">
              {/* Избранное */}
              <button 
                className={`favorite-btn ${isFavorite(product.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(product.id)}
                aria-label={isFavorite(product.id) ? 'Удалить из избранного' : 'Добавить в избранное'}
              >
                {isFavorite(product.id) ? '❤️' : '🤍'}
              </button>
              
              {/* Изображение товара */}
              <div className="product-image">
                <div className="image-placeholder">
                  {product.name.charAt(0)}
                </div>
                {!product.inStock && (
                  <div className="out-of-stock">Нет в наличии</div>
                )}
              </div>
              
              {/* Информация о товаре */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-category">
                  <span className="category-tag">{product.category}</span>
                </div>
                
                <div className="product-rating-price">
                  <div className="rating-container">
                    {renderRating(product.rating)}
                  </div>
                  <div className="price-container">
                    <span className="product-price">{product.price.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>
              
              {/* Кнопки действий */}
              <div className="product-actions">
                <button
                  className={`add-to-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                >
                  {isInCart(product.id) ? '✓ В корзине' : '🛒 В корзину'}
                </button>
                
                <button
                  className="details-btn"
                  onClick={() => alert(`Подробности о ${product.name}`)}
                >
                  Подробнее
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Панель избранного */}
      {favorites.length > 0 && (
        <div className="favorites-sidebar">
          <h3>❤️ Избранное ({favorites.length})</h3>
          <ul>
            {products
              .filter(product => favorites.includes(product.id))
              .map(product => (
                <li key={product.id}>
                  <span>{product.name}</span>
                  <button onClick={() => toggleFavorite(product.id)}>✕</button>
                </li>
              ))
            }
          </ul>
        </div>
      )}
      
      {/* Информация о корзине */}
      <div className="cart-info">
        <p>
          В вашей корзине: <strong>{cartItems.length}</strong> товаров
        </p>
      </div>
    </div>
  );
};

export default ProductList;
