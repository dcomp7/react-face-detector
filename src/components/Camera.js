
import React, { useRef, useEffect } from 'react';

const Camera = ({ onPlay }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    async function getVideo() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
    getVideo();
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        width="720"
        height="560"
        onPlay={onPlay}
        autoPlay
        muted
      />
    </div>
  );
};

export default Camera;
