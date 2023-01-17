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

def send_to_arduino (command):
  arduino.write(bytes(command, "utf-8"))

recognize = False

def stack_data_handler(my_stack_data):
  global recognize
  # print("Từ đây nè", my_stack_data)
  stack = my_stack_data["stack_id"]
  phone = my_stack_data["phone"]
  # print(stack, phone)
  recognize = True
  send_to_arduino ('B1#')
  countdown(120)
  send_to_arduino ('B0#')
  if recognize:
    # Kết quả sau 2 phút không tồn tại nhận dạng
    send_to_arduino ('M' + str(stack) + '#')
    pass
  recognize = False


def update_stack(data):
  global database
  stack_id = data["stack_id"]
  phone = data["phone"]
  send_to_arduino('N' + str(stack_id) + ';' + str(phone) + '#')
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
      # stack = run(frame, database)
      # recognize = False
      # # Kết quả nhận dạng là tồn tại
      # send_to_arduino ('T' + 'stack' +  '#')
      # stack là ngăn được nhận dạng
      pass
    except:
      pass
# except KeyboardInterrupt:
#   pass