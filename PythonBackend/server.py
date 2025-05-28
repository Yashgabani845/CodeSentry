# from flask import Flask, request, send_file
# from flask_cors import CORS
# import cv2
# import numpy as np
# import io

# app = Flask(__name__)
# CORS(app)

# # Load face detection model
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
# @app.route('/detect', methods=['POST'])
# def detect():
#     file = request.files['image']
#     image_bytes = np.asarray(bytearray(file.read()), dtype=np.uint8)
#     frame = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)

#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=3)  # loosen parameters

#     print(f"Faces detected: {len(faces)}")  # DEBUG print

#     if len(faces) > 1:
#         for (x, y, w, h) in faces:
#             cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

#         _, img_encoded = cv2.imencode('.jpg', frame)
#         return send_file(
#             io.BytesIO(img_encoded.tobytes()),
#             mimetype='image/jpeg',
#             as_attachment=False
#         )
#     else:
#         return '', 204

# if __name__ == '__main__':
#     app.run(port=5000)

import face_recognition
import cv2
import numpy as np
from flask import Flask, request, send_file
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)

# Load DNN face detector
net = cv2.dnn.readNetFromCaffe('deploy.prototxt', 'res10_300x300_ssd_iter_140000_fp16.caffemodel')

@app.route('/detect', methods=['POST'])
def detect():
    file = request.files['image']
    image_bytes = np.asarray(bytearray(file.read()), dtype=np.uint8)
    frame = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)
    (h, w) = frame.shape[:2]

    blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0,
                                 (300, 300), (104.0, 177.0, 123.0))
    net.setInput(blob)
    detections = net.forward()

    faces = []
    for i in range(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.5:
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")
            faces.append((startX, startY, endX - startX, endY - startY))

    print(f"Faces detected: {len(faces)}")

    if len(faces) > 1:
        for (x, y, w_, h_) in faces:
            cv2.rectangle(frame, (x, y), (x + w_, y + h_), (0, 255, 0), 2)
        _, img_encoded = cv2.imencode('.jpg', frame)
        return send_file(io.BytesIO(img_encoded.tobytes()), mimetype='image/jpeg', as_attachment=False)
    else:
        return '', 204
    
reference_face_encoding = None

@app.route('/enroll', methods=['POST'])
def enroll():
    global reference_face_encoding
    file = request.files['image']
    image = face_recognition.load_image_file(file)
    encodings = face_recognition.face_encodings(image)

    if len(encodings) == 0:
        return "No face found in enrollment image.", 400

    reference_face_encoding = encodings[0]
    return "Enrollment successful."
@app.route('/verify', methods=['POST'])
def verify():
    global reference_face_encoding
    if reference_face_encoding is None:
        return "No enrolled face. Please enroll first.", 400

    file = request.files['image']
    
    # Read the file only ONCE
    file_bytes = file.read()
    
    # Load for face recognition
    image = face_recognition.load_image_file(io.BytesIO(file_bytes))
    encodings = face_recognition.face_encodings(image)

    if len(encodings) == 0:
        return '', 204  # No face found

    face_encoding = encodings[0]
    results = face_recognition.compare_faces([reference_face_encoding], face_encoding, tolerance=0.5)

    # Decode image for drawing
    frame = cv2.imdecode(np.frombuffer(file_bytes, np.uint8), cv2.IMREAD_COLOR)

    if results[0]:
        # Draw green box around the face
        face_locations = face_recognition.face_locations(image)
        for top, right, bottom, left in face_locations:
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

        # Save frame if needed
        cv2.imwrite('matched_face.jpg', frame)

        return "Face matched.", 200
    else:
        return '', 204

if __name__ == '__main__':
    app.run(port=5000)
