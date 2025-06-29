import React, { useState, useRef, useEffect } from 'react';
import { Camera, Shield, Eye, Monitor, Users, CheckCircle, AlertTriangle, Play } from 'lucide-react';
import Navbar from '../Homepage/Navbar';
const SERVER_URL = 'https://face-recognition-api-n3xi.onrender.com';
const TestEntryPage = () => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [webcamPermission, setWebcamPermission] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const rules = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Face Detection Required",
      description: "Keep your face clearly visible throughout the test. Look directly at the camera."
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Single Window Policy",
      description: "Do not switch tabs, open new windows, or minimize the browser during the test."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "No External Help",
      description: "No assistance from others, books, notes, or external resources allowed."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Clean Environment",
      description: "Ensure a quiet, well-lit room with a plain background. Remove distracting items."
    }
  ];

  const additionalRules = [
    "Maintain stable internet connection throughout the test",
    "Use a desktop or laptop computer (mobile devices not recommended)",
    "Close all unnecessary applications and browser tabs",
    "Position yourself 2-3 feet away from the camera",
    "Ensure good lighting on your face (avoid backlighting)",
    "Do not use virtual backgrounds or filters",
    "Keep your hands visible while typing",
    "Any suspicious activity will be flagged and may result in test termination"
  ];

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startWebcam = async () => {
  setIsEnrolling(true);
  setCameraError(null);
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' },
      audio: false,
    });
    streamRef.current = stream;
    setWebcamPermission(true);
    setIsWebcamActive(true); // <--- only set this after stream is ready
  } catch (error) {
    setWebcamPermission(false);
    setIsEnrolling(false);
    setIsWebcamActive(false);
    setCameraError(error.message || "Camera access denied.");
    alert('Camera access is required to proceed with the test. Please allow camera permissions and try again.');
  }
};
  useEffect(() => {
  if (isWebcamActive && videoRef.current && streamRef.current) {
    videoRef.current.srcObject = streamRef.current;
   videoRef.current.play()
  .then(() => setCameraError(null))
  .catch((err) => {
    // Only set the error if the video is not actually playing
    if (videoRef.current && videoRef.current.paused) {
      setCameraError("Could not start camera playback. Try restarting your browser.");
    } else {
      setCameraError(null); // Clear error if already playing
    }
  });
    setIsEnrolling(false);
    setTimeout(() => setFaceDetected(true), 1000);
  }
}, [isWebcamActive, videoRef.current, streamRef.current]);

 useEffect(() => {
    async function enrollFace() {
      if (isWebcamActive && videoRef.current && streamRef.current) {
        try {
          // Wait for video to be ready
          await videoRef.current.play();
          setTimeout(async () => {
            // 1. Draw current video frame to canvas
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // 2. Convert canvas to blob (image/jpeg)
            canvas.toBlob(async (blob) => {
              if (!blob) {
                setIsEnrolling(false);
                setCameraError("Could not capture frame.");
                return;
              }
              // 3. Prepare FormData
              const formData = new FormData();
              formData.append('image', blob, 'frame.jpg');

              // 4. Call the enroll endpoint
              try {
                const response = await fetch(`${SERVER_URL}/enroll`, {
                  method: 'POST',
                  body: formData,
                });

                if (response.ok) {
                  const text = await response.text();
                  setFaceDetected(true);
                  setIsEnrolling(false);
                  console.log("Enrollment successful:", text);
                } else {
                  const error = await response.text();
                  setFaceDetected(false);
                  setIsEnrolling(false);
                  setCameraError(error);
                  console.error("Enrollment failed:", error);
                }
              } catch (err) {
                setFaceDetected(false);
                setIsEnrolling(false);
                setCameraError("Enrollment request failed.");
                console.error("Enrollment fetch error:", err);
              }
            }, 'image/jpeg', 0.9);
          }, 1000); // Wait a moment for camera to settle (1s)
        } catch (err) {
          setCameraError("Could not start camera playback. Try restarting your browser.");
          setIsEnrolling(false);
        }
      }
    }
    enrollFace();
    // eslint-disable-next-line
  }, [isWebcamActive, videoRef.current, streamRef.current]);

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsWebcamActive(false);
    setFaceDetected(false);
    setWebcamPermission(null);
    setCameraError(null);
  };

  const handleProceedToTest = () => {
    if (faceDetected) {
      alert('Face verification successful! Proceeding to test...');
      // Here you would typically navigate to the actual test page
    } else {
      alert('Please ensure your face is clearly visible before proceeding.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8 mt-20">
        {/* Face Detection Section - Centered */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Camera className="w-8 h-8 text-blue-600" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Face Verification</h2>
                <p className="text-gray-600">Required for test enrollment</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Webcam Feed */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300" style={{ minHeight: 320 }}>
                {isWebcamActive ? (
                  <div className="relative flex justify-center items-center">
                    <video
                      ref={videoRef}
                      width={640}
                      height={480}
                      className="block"
                      autoPlay
                      muted
                      playsInline
                      style={{ background: "#222", maxWidth: "100%", borderRadius: "12px" }}
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    
                    {/* Face Detection Overlay - Only show when actually detecting */}
                    {isEnrolling && (
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center z-10">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Detecting...
                      </div>
                    )}

                    {faceDetected && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center z-10">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Face Detected
                      </div>
                    )}

                    {cameraError && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 z-20">
                        <span className="text-red-500 font-bold">{cameraError}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Camera not active</p>
                      <p className="text-gray-500 text-sm">Click "Start Verification" to begin</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera Status */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${webcamPermission === true ? 'bg-green-500' :
                      webcamPermission === false ? 'bg-red-500' : 'bg-gray-400'
                      }`}></div>
                    <span className="text-gray-700 font-medium">Camera Status</span>
                  </div>
                  <span className={`text-sm ${webcamPermission === true ? 'text-green-600' :
                    webcamPermission === false ? 'text-red-600' : 'text-gray-500'
                    }`}>
                    {webcamPermission === true ? 'Active' :
                      webcamPermission === false ? 'Permission Denied' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!isWebcamActive ? (
                  <button
                    onClick={startWebcam}
                    disabled={isEnrolling}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <Camera className="w-5 h-5" />
                    <span>{isEnrolling ? 'Starting Camera...' : 'Start Verification'}</span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleProceedToTest}
                      disabled={!faceDetected}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                    >
                      <Play className="w-5 h-5" />
                      <span>Proceed to Test</span>
                    </button>

                    <button
                      onClick={stopWebcam}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                    >
                      Stop Camera
                    </button>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Verification Tips:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Ensure good lighting on your face</li>
                  <li>• Look directly at the camera</li>
                  <li>• Remove sunglasses or face coverings</li>
                  <li>• Keep your face centered in the frame</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Rules Section - Below Camera */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Test Guidelines</h2>
                <p className="text-gray-600">Please read and follow all rules carefully</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {rules.map((rule, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-blue-600 mt-1">
                    {rule.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{rule.title}</h3>
                    <p className="text-gray-600 text-sm">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                Additional Requirements
              </h3>
              <div className="grid md:grid-cols-2 gap-x-6">
                <ul className="space-y-2">
                  {additionalRules.slice(0, 4).map((rule, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {additionalRules.slice(4).map((rule, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            By proceeding, you agree to follow all test guidelines and acknowledge that your session will be monitored.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            CodeCentry - Secure Assessment Platform © 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestEntryPage;