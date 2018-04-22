import RPi.GPIO as GPIO
import time

# Define Pinout
PIN_LIGHT	= 16

# Init GPIO Inpout/Output
GPIO.setmode(GPIO.BCM)  # set board mode to Broadcom

GPIO.setwarnings(False)

GPIO.setup(PIN_LIGHT, GPIO.OUT)  # set up pin infra red light

#GPIO.output(PIN_LIGHT, GPIO.HIGH)
GPIO.output(PIN_LIGHT, GPIO.LOW)
