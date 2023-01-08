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
  for key, represents in database.items():
    for source in represents:
      threshold = dst.findEuclideanDistance(source, target_source)
      if threshold <= THRESHOLD and mthreshold > threshold:
        item = key
        mthreshold = threshold
  
  # print(mthreshold)
  return item