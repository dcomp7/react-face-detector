
import React, { useRef } from 'react';
import Camera from './components/Camera';
import FaceDetector from './components/FaceDetector';

const App = () => {
  const videoRef = useRef(null);

  return (
    <div>
      <Camera onPlay={() => {}} videoRef={videoRef} />
      <FaceDetector videoRef={videoRef} />
    </div>
  );
};

export default App;
