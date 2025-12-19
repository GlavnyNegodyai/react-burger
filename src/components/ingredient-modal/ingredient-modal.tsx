import React from "react";
import "./ingredient-modal.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useNavigate } from "react-router-dom";

export const IngredientModal = () => {
  const navigate = useNavigate();
  const onModalClose = () => {
    navigate(-1);
  };

  return (
    <Modal
      onClose={onModalClose}
      headerText="Детали ингредиента"
      isModalOpened={true}
    >
      <IngredientDetails />
    </Modal>
  );
};
