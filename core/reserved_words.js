/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blockly reserved words.
 * @author beate.jost@iais.fraunhofer.de
 */
'use strict';

goog.provide('Blockly.reservedWords');

Blockly.JAVA = [ 'abstract', 'continue', 'for', 'new', 'switch', 'assert', 'default','goto', 'package', 'synchronized', 'boolean', 'false', 'true', 'null', 'do', 'if', 'private', 'this', 'break', 'double', 'String' , 'implements', 'protected', 'throw', 'byte', 'else', 'import', 'public','throws', 'case', 'enum', 'instanceof', 'return', 'transient', 'catch', 'extends', 'int', 'short', 'try', 'char', 'final', 'interface', 'static', 'void', 'class', 'finally', 'long', 'strictfp', 'volatile', 'const', 'float', 'native', 'super', 'while', 'brickConfiguration', 'usedSensors', 'hal', 'NEPOprog' ];

//after "timer1" - for nxt, after "colorsLeft" - botnroll
Blockly.CPP  = ['time', 'auto', 'const', 'double', 'float', 'int', 'byte', 'short', 'struct', 'unsigned', 'break', 'continue', 'else', 'for', 'long', 'signed', 'switch', 'void', 'case', 'default', 'enum', 'goto', 'register', 'sizeof', 'typedef', 'volatile', 'char', 'do', 'extern', 'if', 'return', 'static', 'union', 'while', 'asm', 'dynamic_cast', 'namespace', 'reinterpret_cast', 'try', 'bool', 'explicit', 'new', 'static_cast', 'typeid', 'catch', 'false', 'operator', 'template', 'typename', 'class', 'friend', 'private', 'this', 'using', 'const_cast', 'inline', 'public', 'throw', 'virtual', 'delete', 'mutable', 'protected', 'true', 'null', 'wchar_t', 'and', 'bitand', 'compl', 'not_eq', 'or_eq', 'xor_eq', 'and_eq', 'bitor', 'not', 'or', 'xor', 'alignas', 'alignof', 'timer1', 'srand', 'random', 'task', 'string', 'main', 'bMotorFlippedMode', 'nMotorPIDSpeedCtrl', 'nSyncedMotors', 'nSyncedTurnRatio', 'wait1Msec', 'wait10Msec', 'time1', 'time10', 'time100', 'ClearTimer', 'SetSensorType', 'SensorValue', 'nMotorEncoder', 'ClearSensorValue', 'PlayTone', 'PlaySound', 'PlaySoundTone', 'PlaySoundFile', 'nxtDisplayStringAt', 'eraseDisplay', 'motor', 'cos', 'sin', 'tan', 'acos', 'asin', 'atan', 'atan2', 'cosh', 'sinh', 'tanh', 'acosh', 'asinh', 'atanh', 'exp', 'frexp', 'ldexp', 'log', 'log10', 'modf', 'exp2', 'expm1',  'ilogb',  'log1p',  'log2',  'logb',  'scalbn',  'scalbln',  'pow', 'sqrt', 'cbrt', 'hypot',  'erf',  'erfc',  'tgamma', 'lgamma',  'ceil', 'floor', 'fmod', 'trunc',
'min', 'max', 'PI', 'isdigit', 'string_reverse', 'round', 'itoa', 'lround', 'ultoa', 'dtoa', 'llround', 'rint',  'lrint',  'llrint',  'nearbyint',  'remainder',  'remquo',  'copysign',  'nan',  'nextafter', 'nexttoward',  'fdim',  'fmax',  'fmin',  'fabs', 'abs', 'S1', 'S2', 'S3', 'S4', 'BTN1', 'BTN2', 'BTN3', 'BTN4', 'BTNEXIT', 'BTNRIGHT', 'BTNLEFT', 'BTNCENTER', 'NO_OF_BTNS', 'INPUT_BLACKCOLOR', 'INPUT_BLUECOLOR', 'INPUT_GREENCOLOR', 'INPUT_YELLOWCOLOR', 'INPUT_REDCOLOR', 'INPUT_WHITECOLOR', 'OUT_A','OUT_B', 'OUT_C', 'OUT_AB', 'OUT_AC', 'OUT_BC', 'OUT_ABC', 'WHEELDIAMETER', 'WHEELDIAMETER', 'MAXLINES', 'colorsLeft', 'colorsRight', 'colorsLeft', 'MODULE_ADDRESS', 'one', 'brm', 'setup', 'Serial', 'String', 'T', 'Timer', 'loop', '#define', '#onclude', 'HIGH', 'LOW', 'INPUT', 'OUTPUT', 'LED_BUILTIN', 'KEY1', 'KEY2', 'BRAKE_TORQUE', 'OFF', 'ON', 'AN0', 'AN1', 'AN2', 'AN3', 'AN4', 'AN5', 'AN6', 'AN7', 'COMMAND_LED',   'COMMAND_SERVO1', 'COMMAND_SERVO2', 'COMMAND_LCD_L1', 'COMMAND_LCD_L2', 'COMMAND_IR_EMITTERS', 'COMMAND_STOP', 'COMMAND_MOVE', 'COMMAND_BRAKE', 'COMMAND_BAT_MIN', 'COMMAND_MOVE_PID', 'COMMAND_CALIBRATE', 'COMMAND_PID_CFG', 'COMMAND_ENCL_RESET', 'COMMAND_ENCR_RESET', 'COMMAND_ENC_SAVE', 'COMMAND_RAMP_CFG', 'COMMAND_MOV_DIF_SI', 'COMMAND_DIF_SI_CFG', 'COMMAND_MOVE_1M', 'COMMAND_STOP_1M', 'COMMAND_BRAKE_1M',  'COMMAND_ADC0', 'COMMAND_ADC1', 'COMMAND_ADC2', 'COMMAND_ADC3', 'COMMAND_ADC4', 'COMMAND_ADC5', 'COMMAND_ADC6', 'COMMAND_ADC7', 'COMMAND_BAT_READ', 'COMMAND_BUT_READ', 'COMMAND_OBSTACLES', 'COMMAND_IR_SENSORS', 'COMMAND_ENCL', 'COMMAND_ENCR', 'COMMAND_ENCL_INC', 'COMMAND_ENCR_INC', 'COMMAND_LINE_READ', 'COMMAND_ARDUINO_ANA0', 'COMMAND_ARDUINO_ANA1', 'COMMAND_ARDUINO_ANA2', 'COMMAND_ARDUINO_ANA3', 'COMMAND_ARDUINO_DIG0', 'COMMAND_ARDUINO_DIG1', 'COMMAND_ARDUINO_DIG2', 'COMMAND_ARDUINO_DIG3', 'COMMAND_ARDUINO_DIG4', 'COMMAND_ARDUINO_DIG5', 'COMMAND_ARDUINO_DIG6', 'COMMAND_ARDUINO_DIG7','COMMAND_ARDUINO_DIG8', 'COMMAND_ARDUINO_DIG9', 'COMMAND_ARDUINO_DIG10', 'COMMAND_ARDUINO_DIG11', 'COMMAND_ARDUINO_DIG12', 'COMMAND_ARDUINO_DIG13', 'COMMAND_ARDUINO_BUZ', 'COMMAND_ARDUINO_CMP', 'COMMAND_ARDUINO_SNR', 'COMMAND_ARDUINO_GRP1', 'COMMAND_ARDUINO_GRP2', 'M1', 'M2', 'LS1', 'LS2', 'LS3', 'LS4', 'LS5', 'LS6', 'LS7', 'LS8', 'DISABLE', 'ENABLE', 'COMMAND_FIRMWARE', 'COMMAND_RGBL', 'COMMAND_RGBR', 'COMMAND_SONARS', 'COMMAND_ADDRESS_CFG', 'COMMAND_SONAR_CFG', 'COMMAND_RGB_CFG', 'word', 'boolean', 'array', 'PROGMEM', 'Stream', 'count'];

Blockly.PYTHON = ['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'print', 'raise', 'return', 'try', 'while', 'with', 'yield', // keywords for both python2.7 and python3.4
'brickConfiguration', 'hal', 'math', 'random']; // imports that shouldn't be hidden

Blockly.ev3 = Blockly.JAVA;
Blockly.microbit = Blockly.PYTHON;
Blockly.calliope = Blockly.CPP;
Blockly.botnroll = Blockly.CPP;
Blockly.nxt = Blockly.CPP;
Blockly.nao = Blockly.PYTHON;
