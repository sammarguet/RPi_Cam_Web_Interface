import datetime

import RPi.GPIO as GPIO
import time

# Define Pinout
PIN_MOTOR_0	= 21
PIN_MOTOR_1	= 20
PIN_LIGHT	= 16
PIN_MOTOR_3     = 12

PIN_BUTTON_0	= 25
PIN_BUTTON_1	= 24

PIN_OPEN	= 8
PIN_CLOSED	= 7


# Init variable
pin_b0		= 0
pin_b1		= 0

pin_open	= 0
pin_closed	= 0

# Init GPIO Inpout/Output
GPIO.setmode(GPIO.BCM)  # set board mode to Broadcom

GPIO.setup(PIN_MOTOR_0, GPIO.OUT)  # set up pin Motor 0
GPIO.setup(PIN_MOTOR_1, GPIO.OUT)  # set up Pin Motor 1

GPIO.setup(PIN_BUTTON_0, GPIO.IN)  # set up pin Button Closed
GPIO.setup(PIN_BUTTON_1, GPIO.IN)  # set up Pin Button Open

GPIO.setup(PIN_OPEN, GPIO.IN)  # set up Pin End Of Course Door Opened
GPIO.setup(PIN_CLOSED, GPIO.IN)  # set up Pin End Of Course Door closed

pin_b0 = GPIO.input(PIN_BUTTON_0)
pin_open = GPIO.input(PIN_CLOSED)


while pin_open and pin_b0 :
	pin_b0 = GPIO.input(PIN_BUTTON_0)
	pin_open = GPIO.input(PIN_CLOSED)
	GPIO.output(PIN_MOTOR_0, GPIO.HIGH)
	GPIO.output(PIN_MOTOR_1, GPIO.LOW)
GPIO.output(PIN_MOTOR_0, GPIO.LOW)
GPIO.output(PIN_MOTOR_1, GPIO.LOW)
