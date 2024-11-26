import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import "./AuroraBackground.css";


const AuroraBackground = () => {
    const containerRef = useRef(null);
    const animationFrameIdRef = useRef(null);
    const canvasARef = useRef(null);
    const canvasBRef = useRef(null);
    const simplexRef = useRef(null);
    const rayPropsRef = useRef(null);
    const centerRef = useRef([0, 0]);
    const tickRef = useRef(0);

    // Configuration Constants
    const rayCount = 500;
    const rayPropCount = 8;
    const rayPropsLength = rayCount * rayPropCount;
    const baseLength = 200;
    const rangeLength = 200;
    const baseSpeed = 0.05;
    const rangeSpeed = 0.1;
    const baseWidth = 10;
    const rangeWidth = 20;
    const baseHue = 120;
    const rangeHue = 60;
    const baseTTL = 50;
    const rangeTTL = 100;
    const noiseStrength = 100;
    const xOff = 0.0015;
    const yOff = 0.0015;
    const zOff = 0.0015;
    const backgroundColor = 'hsla(220,60%,3%,1)';

    // Utility Functions
    const rand = (max) => Math.random() * max;
    const round = (val) => Math.round(val);
    const fadeInOut = (life, ttl) => Math.sin((life / ttl) * Math.PI);

    // Initialize Rays
    // Initialize a Single Ray
    const initRay = (i) => {
        const length = baseLength + rand(rangeLength);
        let x = rand(canvasARef.current.width);
        let y1 = centerRef.current[1] + noiseStrength;
        let y2 = centerRef.current[1] + noiseStrength - length;

        // Corrected: Call simplexRef.current directly as a function
        const n = simplexRef.current(x * xOff, y1 * yOff, tickRef.current * zOff) * noiseStrength;

        y1 += n;
        y2 += n;
        const life = 0;
        const ttl = baseTTL + rand(rangeTTL);
        const width = baseWidth + rand(rangeWidth);
        const speed = baseSpeed + rand(rangeSpeed) * (round(rand(1)) ? 1 : -1);
        const hue = baseHue + rand(rangeHue);

        rayPropsRef.current.set([x, y1, y2, life, ttl, width, speed, hue], i);
    };


    // Initialize All Rays
    const initRays = () => {
        tickRef.current = 0;
        simplexRef.current = createNoise3D();
        rayPropsRef.current = new Float32Array(rayPropsLength);

        for (let i = 0; i < rayPropsLength; i += rayPropCount) {
            initRay(i);
        }
    };

    // Update and Draw a Single Ray
    const updateRay = (i, ctxA) => {
        let x = rayPropsRef.current[i];
        let y1 = rayPropsRef.current[i + 1];
        let y2 = rayPropsRef.current[i + 2];
        let life = rayPropsRef.current[i + 3];
        const ttl = rayPropsRef.current[i + 4];
        const width = rayPropsRef.current[i + 5];
        const speed = rayPropsRef.current[i + 6];
        const hue = rayPropsRef.current[i + 7];

        drawRay(x, y1, y2, life, ttl, width, hue, ctxA);

        x += speed;
        life++;

        rayPropsRef.current[i] = x;
        rayPropsRef.current[i + 3] = life;

        if (checkBounds(x, canvasARef.current.width) || life > ttl) {
            initRay(i);
        }
    };

    // Draw a Single Ray
    const drawRay = (x, y1, y2, life, ttl, width, hue, ctxA) => {
        const gradient = ctxA.createLinearGradient(x, y1, x, y2);
        gradient.addColorStop(0, `hsla(${hue},100%,65%,0)`);
        gradient.addColorStop(0.5, `hsla(${hue},100%,65%,${fadeInOut(life, ttl)})`);
        gradient.addColorStop(1, `hsla(${hue},100%,65%,0)`);

        ctxA.save();
        ctxA.beginPath();
        ctxA.strokeStyle = gradient;
        ctxA.lineWidth = width;
        ctxA.moveTo(x, y1);
        ctxA.lineTo(x, y2);
        ctxA.stroke();
        ctxA.closePath();
        ctxA.restore();
    };

    // Check if Ray is Out of Bounds
    const checkBounds = (x, width) => x < 0 || x > width;

    // Render Function with Blur Effect
    const render = (ctxA, ctxB, canvasB) => {
        ctxB.save();
        ctxB.filter = 'blur(12px)';
        ctxA.globalCompositeOperation = 'lighter';
        ctxB.drawImage(canvasARef.current, 0, 0);
        ctxB.restore();
    };

    // Main Draw Loop
    const draw = () => {
        const ctxA = canvasARef.current.getContext('2d');
        const ctxB = canvasBRef.current.getContext('2d');

        tickRef.current++;
        ctxA.clearRect(0, 0, canvasARef.current.width, canvasARef.current.height);
        ctxB.fillStyle = backgroundColor;
        ctxB.fillRect(0, 0, canvasBRef.current.width, canvasARef.current.height);

        // Draw Rays
        for (let i = 0; i < rayPropsLength; i += rayPropCount) {
            updateRay(i, ctxA);
        }

        // Render with Blur
        render(ctxA, ctxB, canvasBRef.current);

        // Request next frame
        animationFrameIdRef.current = requestAnimationFrame(draw);
    };

    // Setup Canvas and Initialize Rays
    const setupCanvas = () => {
        const canvasA = canvasARef.current;
        const canvasB = canvasBRef.current;

        const container = containerRef.current;
        if (!container) {
            console.error("Container for AuroraBackground not found.");
            return;
        }

        // Set canvas dimensions
        canvasA.width = window.innerWidth;
        canvasA.height = window.innerHeight;
        canvasB.width = window.innerWidth;
        canvasB.height = window.innerHeight;

        // Update center
        centerRef.current = [canvasA.width / 2, canvasA.height / 2];

        // Initialize rays
        initRays();

        // Start animation
        draw();
    };

    // Handle Window Resize
    const handleResize = () => {
        const canvasA = canvasARef.current;
        const canvasB = canvasBRef.current;

        if (!canvasA || !canvasB) return;

        canvasA.width = window.innerWidth;
        canvasA.height = window.innerHeight;
        canvasB.width = window.innerWidth;
        canvasB.height = window.innerHeight;

        centerRef.current = [canvasA.width / 2, canvasA.height / 2];
    };

    // Cleanup on Unmount
    const cleanup = () => {
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
        }
        window.removeEventListener('resize', handleResize);
    };

    // useEffect Hook for Setup and Cleanup
    useEffect(() => {
        setupCanvas();
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            cleanup();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="aurora-container" ref={containerRef}>
            <canvas ref={canvasARef} className="canvas-a"></canvas>
            <canvas ref={canvasBRef} className="canvas-b"></canvas>
        </div>
    );
};

export default AuroraBackground;
