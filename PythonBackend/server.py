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
import traceback
import numpy as np
from flask import Flask, make_response, request, send_file
from flask_cors import CORS
import io
from PIL import Image
import os
import tempfile
from PIL import Image as PILImage 

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

    file = request.files.get('image')
    if not file:
        return "No image uploaded.", 400

    try:
        file.stream.seek(0)
        image = face_recognition.load_image_file(file.stream)

        # Save the image for debugging/audit purposes
        from PIL import Image as PILImage
        pil_image = PILImage.fromarray(image)
        pil_image.save('enrolled_face.jpg')  # This will overwrite each time!

        # Usual checks
        if image.ndim != 3 or image.shape[2] != 3:
            return "Image is not a valid RGB image.", 400
        if image.dtype != np.uint8:
            return "Image data is not uint8.", 400

        image = np.ascontiguousarray(image, dtype=np.uint8)
        encodings = face_recognition.face_encodings(image)
        if len(encodings) == 0:
            return "No face found in enrollment image.", 400

        reference_face_encoding = encodings[0]
        return "Enrollment successful."

    except Exception as e:
        import traceback
        traceback.print_exc()
        return f"Failed to process image: {str(e)}", 500

@app.route('/verify', methods=['POST'])
def verify():
    global reference_face_encoding
    if reference_face_encoding is None:
        resp = make_response("No enrolled face. Please enroll first.", 400)
        return resp

    file = request.files['image']
    file_bytes = file.read()

    image = face_recognition.load_image_file(io.BytesIO(file_bytes))
    encodings = face_recognition.face_encodings(image)
    face_locations = face_recognition.face_locations(image)

    frame = cv2.imdecode(np.frombuffer(file_bytes, np.uint8), cv2.IMREAD_COLOR)

    if len(encodings) == 0 or len(face_locations) == 0:
        _, img_encoded = cv2.imencode('.jpg', frame)
        response = make_response(img_encoded.tobytes(), 401)  # <-- Return 401
        response.headers.set('Content-Type', 'image/jpeg')
        response.headers.set('X-Face-Status', 'not_detected')
        return response

    face_encoding = encodings[0]
    results = face_recognition.compare_faces([reference_face_encoding], face_encoding, tolerance=0.5)

    if results[0]:
        for (top, right, bottom, left) in face_locations:
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
        _, img_encoded = cv2.imencode('.jpg', frame)
        response = make_response(img_encoded.tobytes(), 200)
        response.headers.set('Content-Type', 'image/jpeg')
        response.headers.set('X-Face-Status', 'matched')
        return response
    else:
        for (top, right, bottom, left) in face_locations:
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
        _, img_encoded = cv2.imencode('.jpg', frame)
        response = make_response(img_encoded.tobytes(), 403)  # <-- Return 403
        response.headers.set('Content-Type', 'image/jpeg')
        response.headers.set('X-Face-Status', 'not_matched')
        return response

@app.route('/')
def health():
    return 'OK'

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # default to 5000, but use PORT if set
    app.run(host='0.0.0.0', port=port)

