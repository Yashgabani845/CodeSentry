import React, { useRef, useState, useEffect } from "react";

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [message, setMessage] = useState("");
  const [intervalId, setIntervalId] = useState(null);
  const [frameImage, setFrameImage] = useState(null); // for displaying backend image
  const [faceStatus, setFaceStatus] = useState("");   // for status: matched, not_matched, not_detected

  useEffect(() => {
    // Start webcam stream on component mount
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
        setMessage("Cannot access webcam");
      });

    return () => {
      // Clean up on unmount - stop webcam stream
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      if (intervalId) clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, []);

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleEnroll = async () => {
    const imageBlob = await captureFrame();
    if (!imageBlob) {
      setMessage("Could not capture image for enrollment.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageBlob, "enroll.jpg");

    fetch("http://localhost:5000/enroll", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          setIsEnrolled(true);
          setMessage("Enrollment successful!");
        } else {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((err) => {
        setMessage("Enrollment failed: " + err.message);
      });
  };

  const handleVerify = async () => {
    const imageBlob = await captureFrame();
    if (!imageBlob) {
      setMessage("Could not capture image for verification.");
      setFrameImage(null);
      setFaceStatus("");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageBlob, "verify.jpg");

    fetch("http://localhost:5000/verify", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const status = res.headers.get("X-Face-Status");
        setFaceStatus(status || "");
        if (res.ok) {
          const imageBlob = await res.blob();
          setFrameImage(URL.createObjectURL(imageBlob));
          if (status === "matched") {
            setMessage("Face matched ✔️");
          } else if (status === "not_matched") {
            setMessage("Face not matched ❌");
          } else if (status === "not_detected") {
            setMessage("No face detected ❌");
          } else {
            setMessage("Unknown status");
          }
        } else {
          setMessage("Verification failed.");
          setFrameImage(null);
        }
      })
      .catch(() => {
        setMessage("Network or server error during verification.");
        setFrameImage(null);
      });
  };

  const startVerificationLoop = () => {
    if (!isEnrolled) {
      setMessage("Please enroll face first.");
      return;
    }
    setMessage("Verification started...");
    const id = setInterval(() => {
      handleVerify();
    }, 3000); // check every 3 seconds (adjust as needed)
    setIntervalId(id);
  };

  const stopVerificationLoop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setMessage("Verification stopped.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Recognition Live Test</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "320px", height: "240px", border: "1px solid #ccc" }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div style={{ marginTop: 10 }}>
        <button onClick={handleEnroll} disabled={isEnrolled}>
          {isEnrolled ? "Enrolled" : "Enroll Face"}
        </button>
        <button
          onClick={startVerificationLoop}
          disabled={!isEnrolled || intervalId !== null}
          style={{ marginLeft: 10 }}
        >
          Start Verification
        </button>
        <button onClick={stopVerificationLoop} disabled={!intervalId} style={{ marginLeft: 10 }}>
          Stop Verification
        </button>
      </div>
      <p>{message}</p>
      {frameImage && (
        <div>
          <img
            src={frameImage}
            alt="Face Result"
            style={{
              width: 320,
              height: 240,
              marginTop: 8,
              border: "2px solid #333",
              objectFit: "cover",
            }}
          />
          <p style={{
            color: faceStatus === "matched" ? "green" : "red",
            fontWeight: "bold"
          }}>
            {faceStatus === "matched"
              ? "Face Matched"
              : faceStatus === "not_matched"
              ? "Face Not Matched"
              : faceStatus === "not_detected"
              ? "No Face Detected"
              : ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;