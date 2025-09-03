import React from 'react';
import {useState} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import styles from './app.module.css';

function App() {
  const [isModalOpened, setModalOpened] = useState(false);

  const handleModal = () => {
    setModalOpened(prev => !prev);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <AppHeader/>
        <main className={styles.main}>
          <BurgerIngredients handleModal={handleModal}/>
          <BurgerConstructor handleModal={handleModal}/>
        </main>
      </div>
      <ModalOverlay isModalOpened={isModalOpened} handleModal={handleModal}/>
    </DndProvider>
  );
}

export default App;
