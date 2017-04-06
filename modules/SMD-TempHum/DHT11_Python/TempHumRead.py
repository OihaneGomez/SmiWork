from __future__ import print_function
from Adafruit_TSL2561 import Adafruit_TSL2561
import RPi.GPIO as GPIO
import dht11
import datetime
import sys
import signal
import time
import simplejson as json

# initialize GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()




# read data using pin 14
instance = dht11.DHT11(pin=14)

LightSensor = Adafruit_TSL2561()

# Enable auto gain switching between 1x and 16x
# Default is False
LightSensor.enable_auto_gain(True)


def to_node(message):
    try:
        print (message)
    except Exception:
        pass
    sys.stdout.flush()



while True:
	result = instance.read()
	lux = LightSensor.calculate_lux()
	if result.is_valid():
		print(str(result.temperature) + "," + str(result.humidity)+ "," + str(lux))
		sys.stdout.flush()
	time.sleep(10)
