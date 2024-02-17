import React, { useState } from 'react';
import Modal from 'react-modal';
import '../CSS/Modal.css'

const CustomModal = ({ isOpen, closeModal, onButtonClick, content }) => {
    const [inputText, setInputText] = useState(0);
  
    const handleInputChange = (e) => {
      setInputText(e.target.value);
    };
  
    return (
      <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Example Modal"
      className="custom-modal" // Add a class for styling
      overlayClassName="custom-modal-overlay"
      >
        <div>{content}</div>
        <input className="modal-input" type="number" value={inputText} onChange={handleInputChange} placeholder="Set Role ID"/>
        <button className="modal-button" onClick={() => onButtonClick(inputText)}>Set</button>
        <button className="modal-button" onClick={closeModal}>Close Modal</button>
      </Modal>
    );
  };
  
  export default CustomModal;