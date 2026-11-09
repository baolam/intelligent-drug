# 💊 Intelligent Drug Dispenser with Facial Recognition

> **Hộp phân phát thuốc thông minh ứng dụng nhận diện khuôn mặt người bệnh bằng DeepFace và vi điều khiển Arduino.**

## 📖 Giới thiệu
Giải pháp y tế thông minh hỗ trợ việc uống thuốc đúng giờ, đúng liều lượng và đúng đối tượng. Hệ thống trang bị camera nhận diện khuôn mặt bệnh nhân; chỉ khi xác thực thành công đúng người cần uống, hộp thuốc mới mở ngăn chứa tương ứng và phát cảnh báo âm thanh.

## ✨ Tính năng nổi bật
- **Xác thực khuôn mặt với DeepFace**: Nhận diện người bệnh với độ chính xác cao (`modifyDeepface.py`).
- **Tự động điều khiển khay thuốc**: Giao tiếp Arduino để xoay động cơ mở đúng ngăn thuốc theo lịch trình.
- **Server quản lý lịch trình**: Giao diện backend Node.js (`server.js`) thiết lập thời gian biểu uống thuốc.
- **Kiểm thử độc lập**: Có các script test khuôn mặt (`test-face.py`) và test giao tiếp phần cứng (`arduino.py`).

## 🛠️ Công nghệ sử dụng
- **AI/CV**: Python, OpenCV, DeepFace
- **Backend**: Node.js (Express)
- **Hardware**: Arduino, Động cơ Servo / Step Motor, Camera module

## 🚀 Cài đặt & Chạy
```bash
npm install
pip install deepface opencv-python pyserial
node server.js
python index.py
```
