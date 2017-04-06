import mibanda
import sys
import signal
import time
import simplejson as json
import datetime
import signal
import time
import simplejson as json
from mibanda import DiscoveryService

import mibanda


import mibanda
import sys
import signal
import time
import simplejson as json
import datetime
import signal
import time
import simplejson as json
from mibanda import DiscoveryService

import mibanda

if __name__ == '__main__':
	timeout = 5
	detectada=0;
	contaje=0;
	if len(sys.argv) > 1:
		timeout = int(sys.argv[1])

	#print "Starting discover for {} seconds...".format(timeout)
	ds = DiscoveryService()
	bands = ds.discover(timeout)
	longitud = len(bands)
	if not bands:
		print 100000
		sys.stdout.flush()

	for band in bands:
	   #print "Band found, called '{}', addres: {}".format(
	#	  	band.getName(), band.getAddress())
	  contaje=contaje+1;
	  if band.getAddress()=='C8:0F:10:25:D3:C1':
			detectada=1
			#print (detectada)
			#print "Ha detectado la banda"
			device = mibanda.BandDevice(band.getAddress(), band.getName())
			device.connect()
			pasos = device.getSteps()
			print str(pasos)
			sys.stdout.flush()
	  if (longitud == contaje and detectada == 0):
			detectada=0;
			print 100000
			sys.stdout.flush()






"""
sd = mibanda.DiscoveryService()

while True:
	device = mibanda.BandDevice("88:0F:10:2E:5C:8F", "MI")
#print device
#device.pair()
	device.connect()
#print "localizar empezando"
#device.locate()
#print "localizar acabando"
#info = device.getBatteryInfo()
#statusinfo = info.status
#print "bateria"
#print statusinfo
#statusinfolevel = info.level
#print "bateria2"
#print statusinfolevel
#statusinfocargas = info.charge_counter
#print statusinfocargas
#statusinfolast = info.last_charged
#print statusinfolast
	pasos = device.getSteps()
	print str(pasos)
	sys.stdout.flush()
	time.sleep(30)
#print pasos

"""
