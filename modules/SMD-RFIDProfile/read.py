import MFRC522
import signal
import time


import RPi.GPIO as GPIO
pinNum=11 # BOARD
GPIO.setmode(GPIO.BOARD)




GPIO.setup(pinNum, GPIO.OUT) 


continue_reading = True
MIFAREReader = MFRC522.MFRC522()

cardA = [220,132,10,22,68]
cardB = [37,199,110,118,250]
cardC = [20,38,121,207,132]

def end_read(signal, frame):
  global continue_reading
  continue_reading = False
  print "Ctrl+C captured, ending read."
  MIFAREReader.GPIO_CLEEN()

signal.signal(signal.SIGINT, end_read)

while continue_reading:
  (status,TagType) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)
  if status == MIFAREReader.MI_OK:
    print "Card detected"
  (status,backData) = MIFAREReader.MFRC522_Anticoll()
  if status == MIFAREReader.MI_OK:
    print "Card read UID: "+str(backData[0])+","+str(backData[1])+","+str(backData[2])+","+str(backData[3])+","+str(backData[4])
    if  backData == cardA:
      print "Oihane Gomez"
      GPIO.output(pinNum, GPIO.HIGH) 
      time.sleep(1)
      GPIO.output(pinNum, GPIO.LOW) 
    elif backData == cardB:
      print "is Card B"
      GPIO.output(pinNum, GPIO.LOW) 
    elif backData == cardC:
      print "is Card C"
      GPIO.output(pinNum, GPIO.LOW) 
    else:
      print "Usuario desconocido"
      GPIO.output(pinNum, GPIO.LOW) 

