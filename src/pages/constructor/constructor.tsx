import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import styles from './constructor.module.css';

type ConstructorProps = {
    handleModal: () => void;
};

const Constructor: FC<ConstructorProps> = ({handleModal}) => {

  return (
    <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients/>
          <BurgerConstructor handleModal={handleModal}/>
        </main>
    </DndProvider>
  );
}

export default Constructor;
