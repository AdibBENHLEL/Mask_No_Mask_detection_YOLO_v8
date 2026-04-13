from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from PIL import Image
import numpy as np
import base64, io

app = Flask(__name__)
CORS(app)  # allow React to call Flask

model = YOLO('best.pt')

@app.route('/detect', methods=['POST'])
def detect():
    data = request.get_json()

    # Decode base64 image from React
    img_data = base64.b64decode(data['image'].split(',')[1])
    image    = Image.open(io.BytesIO(img_data)).convert('RGB')

    results  = model(image, conf=0.5)[0]

    detections = []
    for box in results.boxes:
        cid  = int(box.cls)
        conf = float(box.conf)
        x1, y1, x2, y2 = map(float, box.xyxy[0])
        detections.append({
            'label':      model.names[cid],
            'confidence': round(conf, 2),
            'box':        {'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2}
        })

    has_unmasked = any(d['label'] == 'without_mask' for d in detections)

    return jsonify({
        'detections':   detections,
        'alert':        has_unmasked,
        'with_mask':    sum(1 for d in detections if d['label'] == 'with_mask'),
        'without_mask': sum(1 for d in detections if d['label'] == 'without_mask')
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)