import React, { useState } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import Modal from "./components/Modal";

const Header = () => (
    <header className="App-header">
        <h1>Welcome to the Portfolio Assignment</h1>
        <p>
            This is a simple React setup to use delivery pipeline for the portfolio
            assignment in IDATA2502.<br/>
            The application is containerized with Docker, stored in Google Artifact Registry,
            and deployed to a Google Kubernetes Engine (GKE) cluster.<br/>
            The pipeline is automated using GitHub Actions. Pepsi is the best
        </p>
        <p>Below are some random images from the gallery</p>
    </header>
);

function App() {
    const [modalImage, setModalImage] = useState(null);

    const showImageModal = (imageSrc) => setModalImage(imageSrc);
    const hideImageModal = () => setModalImage(null);

    return (
        <div className="App">
            <Header />
            <Gallery openModal={showImageModal} />
            {modalImage && <Modal image={modalImage} closeModal={hideImageModal} />}
        </div>
    );
}

export default App;
