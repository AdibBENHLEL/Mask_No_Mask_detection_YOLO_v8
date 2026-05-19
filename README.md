# OR Shield — Real-Time Surgical Mask Detection

A full-stack computer vision application that detects whether people
are wearing surgical masks in real time, designed for operating room
access control.

## demo vidéo 
https://drive.google.com/file/d/1ZEtoLr5TDHwof0xPpjg-GVC_yzNJ8SZf/view?usp=drivesdk


## Tech Stack
- **AI Model**: YOLOv8n (Ultralytics) trained on 1510 annotated images
- **Backend**: Python Flask REST API
- **Frontend**: React (Vite) with Web Audio API alerts
- **Training**: Google Colab (T4 GPU), dataset from Kaggle

## Features
- Live webcam feed with bounding box annotations
- Green/red detection labels with confidence scores
- Audio alerts: single beep (masked) / triple beep (unmasked)
- Real-time activity log with timestamps
- Session statistics dashboard
- mAP50: 0.93 | Precision: 0.94 | Recall: 0.91


## 📦 Model Download

You can download the trained model (`best.pt`) from Google Drive:

👉 **[Download best.pt](https://drive.google.com/file/d/1UM3GQ1kX2Ie8LuUdocR6R2JbMmLTOMRF/view?usp=drive_link)**

Place it in `yolo_v8_model/best.pt`

