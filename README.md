<div align="center">

# 💊 INTELLIGENT DRUG DISPENSER 💊
### 🧑‍⚕️ Facial Recognition-Based Smart Medication Dispensing System
*Hộp Phân Phát Thuốc Thông Minh Ứng Dụng Nhận Diện Khuôn Mặt Bệnh Nhân Bằng DeepFace & Arduino*

[![Python](https://img.shields.io/badge/Python-3.9%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![DeepFace](https://img.shields.io/badge/DeepFace-Facial%20Recognition-FF6F00?style=for-the-badge&logo=facepunch&logoColor=white)](https://github.com/serengil/deepface)
[![Arduino](https://img.shields.io/badge/Arduino-Servo%20Control-00979D?style=for-the-badge&logo=arduino&logoColor=white)](https://arduino.cc)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

---

</div>

> [!IMPORTANT]
> **Intelligent Drug Dispenser** là giải pháp y tế thông minh ngăn ngừa việc uống nhầm thuốc hoặc quá liều. Thiết bị chỉ mở đúng ngăn thuốc tương ứng khi camera xác thực thành công khuôn mặt của bệnh nhân qua mô hình **DeepFace**, đồng thời ghi nhận lịch sử uống thuốc lên hệ thống.

---

## 📑 Mục Lục (Table of Contents)
- [✨ Tính Năng Nổi Bật](#-tính-năng-nổi-bật)
- [🏗️ Kiến Trúc Hoạt Động](#️-kiến-trúc-hoạt-động)
- [📂 Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [⚙️ Công Nghệ Sử Dụng](#️-công-nghệ-sử-dụng)
- [🚀 Hướng Dẫn Cài Đặt & Chạy](#-hướng-dẫn-cài-đặt--chạy)
- [🔮 Lộ Trình Phát Triển (Roadmap)](#-lộ-trình-phát-triển-roadmap)
- [📜 Giấy Phép (License)](#-giấy-phép-license)

---

## ✨ Tính Năng Nổi Bật

| Biểu Tượng | Tính Năng | Mô Tả Chi Tiết |
| :---: | :--- | :--- |
| 👤 | **Nhận Diện Khuôn Mặt Chính Xác** | Tích hợp DeepFace (`modifyDeepface.py`) so khớp khuôn mặt bệnh nhân với độ tin cậy cao, chống giả mạo. |
| ⏰ | **Phân Chia Liều Theo Lịch Trình** | Cấu hình lịch uống thuốc chi tiết theo giờ (Sáng / Trưa / Chiều / Tối). |
| 🔒 | **Khoá Ngăn Thuốc Vật Lý Tự Động** | Vi điều khiển Arduino điều khiển động cơ servo chỉ xoay mở đúng ngăn thuốc đã được gán quyền. |
| 🔔 | **Nhắc Nhở & Cảnh Báo Âm Thanh** | Kích hoạt chuông buzzer nhắc nhở khi đến cữ thuốc và cảnh báo nếu người lạ cố tình thao tác. |

---

## 🏗️ Kiến Trúc Hoạt Động

```mermaid
sequenceDiagram
    autonumber
    actor Patient as 🧑‍🦳 Bệnh Nhân
    participant Cam as 📷 Camera
    participant FaceAI as 🧠 DeepFace Module
    participant Server as 🚀 Node.js Core
    participant MCU as 💻 Arduino Board
    participant Box as 💊 Ngăn Khay Thuốc

    Server->>Patient: Phát chuông nhắc đến giờ uống thuốc
    Patient->>Cam: Đứng trước thiết bị quét mặt
    Cam->>FaceAI: Truyền khung hình khuôn mặt
    FaceAI->>FaceAI: So khớp đặc trưng với cơ sở dữ liệu
    alt Khuôn mặt hợp lệ
        FaceAI->>Server: Xác thực thành công (User ID)
        Server->>MCU: Lệnh xoay ngăn thuốc tương ứng
        MCU->>Box: Mở chốt ngăn thuốc
        Server->>Patient: Thông báo giọng nói: "Mời bạn uống thuốc"
    else Không đúng đối tượng
        FaceAI->>Server: Xác thực thất bại
        Server->>MCU: Giữ khoá an toàn & cảnh báo
    end
```

---

## 📂 Cấu Trúc Dự Án

```bash
intelligent-drug/
├── 📄 modifyDeepface.py      # Tinh chỉnh pipeline trích xuất đặc trưng và so khớp khuôn mặt
├── 📄 test-face.py           # Kịch bản kiểm tra khả năng nhận diện khuôn mặt độc lập
├── 📄 arduino.py             # Cầu nối truyền nhận tín hiệu điều khiển qua cổng nối tiếp Serial
├── 📄 index.py               # Module điều khiển luồng logic trung tâm
├── 📄 server.js              # Máy chủ Web Node.js quản lý lịch trình và phân quyền
├── 📄 doc.txt                # Ghi chú thiết kế và tài liệu hướng dẫn phần cứng
├── 📄 package.json           # Thư viện phụ thuộc Node.js
└── 📄 README.md              # Tài liệu dự án
```

---

## ⚙️ Công Nghệ Sử Dụng

- **AI Face Recognition**: Python, DeepFace, OpenCV, FaceNet/VGG-Face
- **Microcontroller**: Arduino Uno, Servo Motor SG90 / Stepper 28BYJ-48
- **Hardware Communication**: PySerial, UART
- **Backend Service**: Node.js, Express.js

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy

```bash
# 1. Clone repository
git clone https://github.com/baolam/intelligent-drug.git
cd intelligent-drug

# 2. Cài đặt các gói phụ thuộc
npm install
pip install deepface opencv-python pyserial tensorflow

# 3. Nạp code cho Arduino và kết nối cổng COM
# Chạy server điều phối
node server.js

# 4. Khởi động module nhận diện khuôn mặt
python index.py
```

---

## 🔮 Lộ Trình Phát Triển (Roadmap)

- [ ] 📲 **Zalo/Telegram Family Notification**: Tự động gửi thông báo đến người thân khi bệnh nhân đã uống hoặc bỏ lỡ cữ thuốc.
- [ ] 💊 **Pill Quantity Detection**: Sử dụng camera bên trong khay thuốc để phát hiện số lượng viên thuốc đã được lấy ra thực tế.

---

<div align="center">

## 📜 Giấy Phép (License)

Dự án được phân phối dưới giấy phép **MIT License**.

---
**Made with ❤️ by [Bảo Lâm](https://github.com/baolam)**

</div>
