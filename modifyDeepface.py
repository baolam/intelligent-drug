from deepface import DeepFace
from deepface.commons import distance as dst
import math
import os
import cv2

THRESHOLD = dst.findThreshold("VGG-Face", "euclidean")

def respresent(frame):
  # file_name = "input_file.jpg"
  # cv2.imwrite(file_name, frame)
  embedding = DeepFace.represent(frame, detector_backend="mtcnn", enforce_detection=False)
  return embedding

IMAGE_PATH = "server/images"

def update_represent() -> dict:
  embeddings = {  }
  for stack in os.listdir(IMAGE_PATH):
    embeddings[stack] = []
    for file_name in os.listdir(IMAGE_PATH + "/" + stack):
      f = IMAGE_PATH + "/" + stack + "/" + file_name
      embed = DeepFace.represent(f, detector_backend="mtcnn")
      embeddings[stack].append(embed)
  return embeddings

def run(frame, database):
  target_source = respresent(frame)
  
  mthreshold = math.inf
  item = 1 
  # Áp dụng công thức euclid với tìm kcnn (gtnn)
  for key, represents in database.items():
    for source in represents:
      threshold = dst.findEuclideanDistance(source, target_source)
      if threshold <= THRESHOLD and mthreshold > threshold:
        item = key
        mthreshold = threshold
  
  # print(mthreshold)
  return item

# đặc trưng (đặc điểm)
# Máy tính (tính toán trên số)

# chó : ["lông vàng", "mũi to", "móng dài"]
# mèo : ["lông màu đen sọc trắng", "mũi nhỏ", "móng nhỏ"]

# Chuyển đổi nó thành số
# chó : [0, 0, 0]
# mèo : [1, 1, 1]

# Máy sẽ kiếm cách để biểu diễn mấy con số này sao cho dễ tính toán nhất
# Chai nước : 1, 0
# Con heo : 2, 1
# Điện thoại : 0, 2

# 1 < 2 < 3 (xét về phương diện kích thước)
#           (xét về phương diện thông minh)

# Làm cho mô hình ai mở rộng
# [1, 1, 1, 1] --> mảng (tensor 1 chiều)
# [[], []] --> ma trận (tensor 2 chiều)
# [[[]], [[]]] --> tensor 3 chiều

# Chai nước --> Con heo --> Điện thoại
# tích vô hướng --> sự tương đồng

# Học đặc trưng (biểu diễn -> represent)
# Học kết hợp (mạng Fully connected) (không dùng)
# Công thức toán học để xác định độ tương đồng