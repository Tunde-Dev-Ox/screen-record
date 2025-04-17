import { useEffect, useRef, useState } from "react";
import './cameraOverlay.scss';

const CameraOverlay = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };

    enableCamera();
  }, []);

  const handleMouseDown = (e) => {
    setDragging(true);
    containerRef.current.dataset.offsetX = e.clientX - position.x;
    containerRef.current.dataset.offsetY = e.clientY - position.y;
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const offsetX = parseInt(containerRef.current.dataset.offsetX);
    const offsetY = parseInt(containerRef.current.dataset.offsetY);
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div
      ref={containerRef}
      className="camera-overlay"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <video ref={videoRef} autoPlay muted playsInline />
    </div>
  );
};

export default CameraOverlay;
