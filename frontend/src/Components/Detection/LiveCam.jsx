import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const LiveCam = () => {
  const webcamRef = useRef(null);
  const [violationImg, setViolationImg] = useState(null);

  const captureAndSendFrame = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      const blob = await fetch(imageSrc).then(res => res.blob());
      const formData = new FormData();
      formData.append('image', blob, 'frame.jpg');

      try {
        const res = await axios.post('http://localhost:5000/detect', formData, {
          responseType: 'blob',
        });

        if (res.status === 200) {
          const url = URL.createObjectURL(res.data);
          setViolationImg(url);
          console.log('Multiple persons detected.');
        }
      } catch (err) {
        if (err.response && err.response.status === 204) {
          console.log('Single person — no action');
        } else {
          console.error('Detection failed:', err);
        }
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(captureAndSendFrame, 1000); // every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        audio={false}
        height={300}
        width={400}
        screenshotFormat="image/jpeg"
      />
      <h3>Violations:</h3>
      {violationImg && <img src={violationImg} alt="Violation" width="400" />}
    </div>
  );
};

export default LiveCam;
