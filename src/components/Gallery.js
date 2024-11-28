import React from "react";
import Japan1 from "../images/Japan1.jpg";
import Japan2 from "../images/Japan2.jpg";
import Japan3 from "../images/Japan3.jpg";
import Japan4 from "../images/Japan4.jpg";
import Japan5 from "../images/Japan5.jpg";

const imageUrls = [Japan1, Japan2, Japan3, Japan4, Japan5];

function Gallery({ openModal }) {
    return (
        <div className="gallery-container">
            {imageUrls.map((image, index) => (
                <div className="card" key={index} onClick={() => openModal(image)}>
                    <img src={image} alt={`Gallery item ${index + 1}`} />
                </div>
            ))}
        </div>
    );
}

export default Gallery;
