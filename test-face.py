import cv2
from modifyDeepface import run
from modifyDeepface import update_represent

video = cv2.VideoCapture(0)
datatbase = update_represent()

# try:
while True:
  __, frame = video.read()
  cv2.imshow("TEST", frame)
  if cv2.waitKey(1) & 0xFF == ord('q'):
    break
  stack = run(frame, datatbase)
  print(stack)
# except Exception as e:
#   print(e)
# DeepFace.stream("server/images", detector_backend="mtcnn", enable_face_analysis=False)