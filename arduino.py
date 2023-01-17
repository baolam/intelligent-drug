import serial
import threading

arduino = serial.Serial("COM5")

def send_to_arduino(command):
  arduino.write(bytes(command, "utf-8"))

stop = False

def listen():
  global stop
  while not stop:
    command = arduino.readline()
    if len(command) != 0:
      print("Lệnh nhận được là {}".format(command))

threading.Thread(name="Arduino serivce", target=listen) \
  .start()

try:
  while True:
    n = input("Nhập lệnh: ")  
    send_to_arduino(n)
except KeyboardInterrupt as e:
  stop = True