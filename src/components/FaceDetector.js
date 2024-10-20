
import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetector = ({ videoRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    };

    const detectFace = async () => {
      const options = new faceapi.TinyFaceDetectorOptions();
      const detections = await faceapi.detectAllFaces(videoRef.current, options);

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        faceapi.matchDimensions(canvasRef.current, videoRef.current);
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const resizedDetections = faceapi.resizeResults(detections, {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        });

        resizedDetections.forEach((detection) => {
          const { x, y, width, height } = detection.box;
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'green';
          ctx.strokeRect(x, y, width, height);
        });
      }
    };

    if (videoRef.current) {
      loadModels();
      videoRef.current.addEventListener('play', detectFace);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('play', detectFace);
      }
    };
  }, [videoRef]);

  return <canvas ref={canvasRef} width="720" height="560" />;
};

export default FaceDetector;
