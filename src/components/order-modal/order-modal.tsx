import React from "react";
import "./order-modal.css";
import { OrderComposition } from "../order-composition/order-composition";
import Modal from "../modal/modal";
import { useNavigate } from "react-router-dom";

export const OrderModal = () => {
  const navigate = useNavigate();
  const onModalClose = () => {
    navigate(-1);
  };

  return (
    <Modal onClose={onModalClose} headerText="" isModalOpened={true}>
      <OrderComposition />
    </Modal>
  );
};
