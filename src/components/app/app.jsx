import React from 'react';
import {useState, useEffect} from 'react';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import styles from './app.module.css';

function App() {
  const [ingredients, setIngredients] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBun, setSelectedBun] = useState();
  const [isModalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setIngredients(data.data);
        }
        else {
          throw new Error('Полученные от сервера данные некорректны.')
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
    <div>
      <AppHeader/>
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} onIngredientSelect={addItemToConstructor} onBunSelect={changeSelectedBun} handleModal={handleModal}/>
        <BurgerConstructor selectedBun={selectedBun} selectedIngredients={selectedItems} handleModal={handleModal}/>
      </main>
    </div>
    <ModalOverlay isModalOpened={isModalOpened} handleModal={handleModal}/>
    </>
  );
}

export default App;
