import React from 'react';
import {useState, useEffect} from 'react';
import AppHeader from './components/app-header/app-header.jsx';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from './components/burger-constructor/burger-constructor.jsx';
import ModalOverlay from './components/modal-overlay/modal-overlay.jsx';
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBun, setSelectedBun] = useState();
  const [isModalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIngredients(data.data);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const addItemToConstructor = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const changeSelectedBun = (item) => {
    setSelectedBun(item);
  };

  const handleModal = () => {
    setModalOpened(prev => !prev);
  };

  return (
    <>
    <div className='page-wrapper'>
      <AppHeader/>
      <main className='burger-constructor-main'>
        <BurgerIngredients ingredients={ingredients} onIngredientSelect={addItemToConstructor} onBunSelect={changeSelectedBun} handleModal={handleModal}/>
        <BurgerConstructor selectedBun={selectedBun} selectedIngredients={selectedItems} handleModal={handleModal}/>
      </main>
    </div>
    <ModalOverlay isModalOpened={isModalOpened}/>
    </>
  );
}

export default App;
