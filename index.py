import subprocess
import socketio
import threading
import time
import serial
import cv2

from modifyDeepface import run
from modifyDeepface import update_represent

NAMESPACE = "/"
client = socketio.Client()
video = cv2.VideoCapture(0)
database = update_represent()
arduino = serial.Serial()

def build_server():
  subprocess.run("node server.js")

def countdown(t):
  while t:
    time.sleep(1)
    t -= 1

recognize = False
def stack_data_handler(my_stack_data):
  global recognize
  print(my_stack_data)
  recognize = True
  countdown(120)
  if recognize == False:
    # Sự kiện nhận dạng thành công
    pass
  else:
    # Kết quả sau 2 phút không tồn tại nhận dạng
    pass
  recognize = False


def update_stack(data):
  global database
  database = update_represent()

def maintain_socket():
  client.on("stack_data", handler=stack_data_handler, namespace=NAMESPACE)
  client.on("update_stack", handler=update_stack, namespace=NAMESPACE)
  client.connect("http://localhost:4000", namespaces=[NAMESPACE])

threading.Thread(name="Server service", target=build_server) \
  .start()

threading.Thread(name="Socket service", target=maintain_socket) \
  .start()

# try:
while True:
  if recognize:
    __, frame = video.read()
    try:
      stack = run(frame, database)
      # Kết quả nhận dạng là tồn tại
      # stack là ngăn được nhận dạng
    except:
      pass
# except KeyboardInterrupt:
#   pass