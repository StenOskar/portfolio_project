import React, { useState } from "react";
import "./App.css";
import AuroraBackground from "./components/AuroraBackground";
import Gallery from "./components/Gallery";
import Modal from "./components/Modal";

function App() {
    const [modalImage, setModalImage] = useState(null);

    const openModal = (imageSrc) => setModalImage(imageSrc);
    const closeModal = () => setModalImage(null);

    return (
        <div className="App">
            <AuroraBackground />
            <header className="App-header">
                <h1>Welcome to the Portfolio Assignment</h1>
                <p>
                    This is a simple React setup to use delivery pipeline for the portfolio
                    assignment in IDATA2502.<br/>
                    The application is containerized with Docker, stored in Google Artifact Registry,
                    and deployed to a Google Kubernetes Engine (GKE) cluster.<br/>
                    The pipeline is automated using GitHub Actions.
                </p>
                <p>Below are some random images from the gallery</p>
                <Gallery openModal={openModal}/>
            </header>
            {modalImage && <Modal image={modalImage} closeModal={closeModal}/>}
        </div>
    );
}

export default App;
