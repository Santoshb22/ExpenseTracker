import React from 'react';
import Modal from 'react-modal';
import Styles from './ModalComponent.module.css';

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onRequestClose, title, onSubmit, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className={Styles.expenseModal}
      overlayClassName={Styles.modalOverlay}
    >
      <h2 className={Styles.modalTitle}>{title}</h2>
      <form onSubmit={onSubmit} className={Styles.modalForm}>
        <div className={Styles.modalInputs}>
          {children}
        </div>
        <div className={Styles.modalButtons}>
          <button type="submit" className={Styles.addExpenseButton}>
            {title === "Add Income" ? "Add Income" : "Add Expense"}
          </button>
          <button type="button" onClick={onRequestClose} className={Styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalComponent;
