// Modal.js
import React from "react";

// Modal component
function Modal({ image, closeModal }) {
    const handleCloseClick = (event) => {
        event.stopPropagation(); // Prevents the event from bubbling up
        closeModal();
    };

    return (
        <div className="modal" onClick={closeModal}>
            <span className="close" onClick={handleCloseClick}>
                &times;
            </span>
            <img className="modal-content" src={image} alt="Modal" />
        </div>
    );
}

export default Modal;
