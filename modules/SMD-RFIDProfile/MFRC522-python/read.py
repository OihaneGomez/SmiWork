import MFRC522
import sys
import signal
import time
import simplejson as json
#import json
import RPi.GPIO as GPIO
#import simplejson as sj


pinNum=11 # BOARD
GPIO.setmode(GPIO.BOARD)

def to_node(message):
    try:
        print (message)
    except Exception:
        pass
    sys.stdout.flush()


GPIO.setup(pinNum, GPIO.OUT) 

continue_reading = True
MIFAREReader = MFRC522.MFRC522()


def end_read(signal, frame):
  global continue_reading
  continue_reading = False
  print "Ctrl+C captured, ending read."
  MIFAREReader.GPIO_CLEEN()

signal.signal(signal.SIGINT, end_read)

while continue_reading:
  (status,TagType) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)
  if status == MIFAREReader.MI_OK:
    (status,backData) = MIFAREReader.MFRC522_Anticoll()
  if status == MIFAREReader.MI_OK:
    enviar_js=str(backData[0])+str(backData[1])+str(backData[2])+str(backData[3])+str(backData[4])
    print(enviar_js)
    sys.stdout.flush()
    GPIO.output(pinNum, GPIO.HIGH) 
    time.sleep(1)
    GPIO.output(pinNum, GPIO.LOW) 

