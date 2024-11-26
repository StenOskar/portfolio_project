import React from "react";

function Modal({ image, closeModal }) {
    return (
        <div className="modal" onClick={closeModal}>
            <span className="close" onClick={closeModal}>
                &times;
            </span>
            <img className="modal-content" src={image} alt="Modal" />
        </div>
    );
}

export default Modal;
