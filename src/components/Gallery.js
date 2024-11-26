import React from "react";
import BrageImage from "../images/Brage1.jpg";
import GakoriImage from "../images/gakori.jpg";
import Japan1 from "../images/Japan1.jpg";
import Japan2 from "../images/Japan2.jpg";

const imageUrls = [BrageImage, GakoriImage, Japan1, Japan2];

function Gallery({ openModal }) {
    return (
        <div className="gallery-container">
            {imageUrls.map((image, index) => (
                <div className="card" key={index} onClick={() => openModal(image)}>
                    <img src={image} alt={`Gallery Image ${index + 1}`} />
                </div>
            ))}
        </div>
    );
}

export default Gallery;
