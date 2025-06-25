import React, { useEffect, useRef, useState } from "react";

const DETECT_INTERVAL = 2 * 1000;  // every 20 seconds
const VERIFY_INTERVAL = 3 * 1000;  // every 30 seconds

function getWebcamImage(video) {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  return new Promise((resolve) => {
    canvas.toBlob(resolve, "image/jpeg");
  });
}

export function withFaceVerification(WrappedComponent) {
  return function Wrapper(props) {
    const [status, setStatus] = useState("pending"); // pending, ok, detect-fail, verify-fail, blocked
    const [message, setMessage] = useState("");
    const [enrolled, setEnrolled] = useState(false);
    const videoRef = useRef(null);
    const detectTimer = useRef(null);
    const verifyTimer = useRef(null);

    // Request webcam and enroll on mount
   useEffect(() => {
  let stream;
  let mounted = true;

  async function startCameraAndEnroll() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current && mounted) {
        videoRef.current.srcObject = stream;
        // Wait for video metadata to be loaded
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = resolve;
        });
        await videoRef.current.play();
        // Take image and enroll
        const imageBlob = await getWebcamImage(videoRef.current);
        const form = new FormData();
        form.append("image", imageBlob, "enroll.jpg");
        const resp = await fetch("http://localhost:5000/enroll", {
          method: "POST",
          body: form,
        });
        if (resp.ok) {
          setEnrolled(true);
          setStatus("ok");
          setMessage("Face enrolled successfully.");
        } else {
          setStatus("blocked");
          setMessage("Face enrollment failed. Reload and try again.");
        }
      }
    } catch (err) {
      setStatus("blocked");
      setMessage(`Webcam permission denied or not available. ${err}`);
    }
  }

  startCameraAndEnroll();

  return () => {
    mounted = false;
    if (stream) stream.getTracks().forEach((t) => t.stop());
  };
}, []);

    // Detect faces
    const detectFaces = async () => {
      try {
        const imageBlob = await getWebcamImage(videoRef.current);
        const form = new FormData();
        form.append("image", imageBlob, "detect.jpg");
        const resp = await fetch("http://localhost:5000/detect", {
          method: "POST",
          body: form,
        });
        if (resp.status === 204) {
          setStatus("ok");
          setMessage("");
        } else if (resp.status === 200) {
          setStatus("detect-fail");
          setMessage("Multiple faces detected! Please make sure only you are in front of the camera.");
        }
      } catch (err) {
        setStatus("detect-fail");
        setMessage("Face detection failed. Check your camera.");
      }
    };

    // Verify enrolled face
    const verifyFace = async () => {
      try {
        const imageBlob = await getWebcamImage(videoRef.current);
        const form = new FormData();
        form.append("image", imageBlob, "verify.jpg");
        const resp = await fetch("http://localhost:5000/verify", {
          method: "POST",
          body: form,
        });
        if (resp.status === 200) {
          setStatus("ok");
          setMessage("");
        } else if (resp.status === 401) {
          setStatus("verify-fail");
          setMessage("No face detected. Please keep your face visible.");
        } else if (resp.status === 403) {
          setStatus("verify-fail");
          setMessage("Face does not match enrollment. Please make sure only you are in front of the camera.");
        }
      } catch (err) {
        setStatus("verify-fail");
        setMessage("Face verification failed. Check your camera.");
      }
    };

    // Setup periodic detect/verify
    useEffect(() => {
      if (enrolled && status !== "blocked") {
        detectTimer.current = setInterval(detectFaces, DETECT_INTERVAL);
        verifyTimer.current = setInterval(verifyFace, VERIFY_INTERVAL);
      }
      return () => {
        clearInterval(detectTimer.current);
        clearInterval(verifyTimer.current);
      };
    }, [enrolled, status]);

    // Block UI if failed
    if (status === "blocked") {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p>{message}</p>
          </div>
        </div>
      );
    }

    // Show overlay if detect/verify fails
    const showOverlay = status === "detect-fail" || status === "verify-fail";
    return (
      <>
        <video
          ref={videoRef}
          style={{ display: "none" }}
          autoPlay
          playsInline
          muted
        />
        {showOverlay && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center text-red-600 max-w-xs mx-auto">
              <h2 className="text-xl font-bold mb-2">Proctoring Alert</h2>
              <p className="mb-2">{message}</p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                onClick={() => {
                  setStatus("ok");
                  setMessage("");
                }}
              >
                I Understand
              </button>
            </div>
          </div>
        )}
        <WrappedComponent {...props} isProctoringActive={status === "ok"} />
      </>
    );
  };
}