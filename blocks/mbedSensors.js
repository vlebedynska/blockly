/**
 * @fileoverview Sensor blocks for EV3.
 * @requires Blockly.Blocks
 * @author Beate
 */

'use strict';

goog.provide('Blockly.Blocks.mbedSensors');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

Blockly.Blocks['mbedSensors_getSample'] = {
    /**
     * Get the current reading from choosen sensor.
     *
     * @constructs mbedSensors_getSample
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            SENSORPORT - 1, 2, 3 or 4
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var button = new Blockly.FieldDropdown([ [ 'A', 'A' ], [ 'B', 'B' ] ]);


        var sensorType;
        // this switch can be removed if micropython is supporting the light level
        if (this.workspace.device === 'microbit') {
            sensorType = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_KEY + ' ' + Blockly.Msg.SENSOR_PRESSED, 'KEYS_PRESSED' ],
                    [ Blockly.Msg.SENSOR_GESTURE, 'GESTURE_ACTIVE' ], [ Blockly.Msg.SENSOR_COMPASS, 'COMPASS_ANGLE' ], [ Blockly.Msg.SENSOR_TIME, 'TIME' ] ],
            function(option) {
                if (option && this.sourceBlock_.getFieldValue('SENSORTYPE') !== option) {
                    this.sourceBlock_.updateShape_(option);
                }
            });
        } else {
            sensorType = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_KEY + ' ' + Blockly.Msg.SENSOR_PRESSED, 'KEYS_PRESSED' ],
                    [ Blockly.Msg.SENSOR_PIN + ' ' + Blockly.Msg.SENSOR_PRESSED, 'PIN_TOUCHED' ],
                    [ Blockly.Msg.SENSOR_GESTURE, 'GESTURE_ACTIVE' ],
                    [ Blockly.Msg.SENSOR_COMPASS, 'COMPASS_ANGLE' ],
                    [ Blockly.Msg.SENSOR_MIC, 'MICROPHONE' ],
                    [ Blockly.Msg.SENSOR_TIME, 'TIME' ],
                    [ Blockly.Msg.SENSOR_TEMPERATURE, 'TEMPERATURE' ],
                    [ Blockly.Msg.MODE_AMBIENTLIGHT, 'LIGHT_LEVEL' ],
                    [ Blockly.Msg.ANALOG, 'PIN_ANALOG' ],
                    [ Blockly.Msg.DIGITAL, 'PIN_DIGITAL' ],
                    [ Blockly.Msg.PULSE_HIGH, 'PIN_PULSEHIGH' ],
                    [ Blockly.Msg.PULSE_LOW, 'PIN_PULSELOW' ],
                    [ Blockly.Msg.ACCELEROMETER_ROTATION, 'ORIENTATION' ],
                    [ Blockly.Msg.ACCELERATION, 'ACCELERATION' ] ],
            function(option) {
                if (option && this.sourceBlock_.getFieldValue('SENSORTYPE') !== option) {
                    this.sourceBlock_.updateShape_(option);
                }
            });
        }
        this.appendDummyInput('DROPDOWN').appendField(Blockly.Msg.GET, 'GET').appendField(sensorType, 'SENSORTYPE').appendField(button, 'KEY');
        this.setOutput(true, 'Boolean');
        this.sensorType_ = 'KEYS_PRESSED';
        this.setTooltip(Blockly.Msg.GETSAMPLE_TOOLTIP);
        this.setMovable(false);
        this.setDeletable(false);
        //this.updateShape_(this.sensorType_);
    },
    /**
     * Create XML to represent whether the sensor type has changed.
     *
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('input', this.sensorType_);
        return container;
    },
    /**
     * Parse XML to restore the sensor type.
     *
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        var input = xmlElement.getAttribute('input');
        this.sensorType_ = input;
        this.updateShape_(this.sensorType_);
    },

    /**
     * Called whenever anything on the workspace changes.
     *
     * @this Blockly.Block
     */
    /*
     * onchange : function() { if (!this.workspace) { // Block has been deleted.
     * return; } else if (this.update) this.updateShape_(); },
     */
    /**
     * Called whenever the shape has to change.
     *
     * @this Blockly.Block
     */
    updateShape_ : function(option) {
        this.sensorType_ = option;
        var button = new Blockly.FieldDropdown([ [ 'A', 'A' ], [ 'B', 'B' ] ]);
        var gesture = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_GESTURE_UP, 'UP' ], [ Blockly.Msg.SENSOR_GESTURE_DOWN, 'DOWN' ],
                [ Blockly.Msg.SENSOR_GESTURE_FACE_UP, 'FACE_UP' ], [ Blockly.Msg.SENSOR_GESTURE_FACE_DOWN, 'FACE_DOWN' ],
                [ Blockly.Msg.SENSOR_GESTURE_SHAKE, 'SHAKE' ], [ Blockly.Msg.SENSOR_GESTURE_FREEFALL, 'FREEFALL' ] ]);
        var direction = new Blockly.FieldDropdown([ [ 'x', 'X' ], [ 'y', 'Y' ], [ 'z', 'Z' ], [ Blockly.Msg.STRENGTH, 'STRENGTH' ] ]);
        var orientation = new Blockly.FieldDropdown([ [ Blockly.Msg.PITCH, 'PITCH' ], [ Blockly.Msg.ROLL, 'ROLL' ] ]);
        var timer = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_TIMER + ' 1', '1' ] ]);
        var pin = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_PIN + ' 0', '0' ], [ Blockly.Msg.SENSOR_PIN + ' 1', '1' ], [ Blockly.Msg.SENSOR_PIN + ' 2', '2' ],
                              [ Blockly.Msg.SENSOR_PIN + ' 3', '3' ] ]);
        var pinsAnalog = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_PIN + ' 1', '1' ], [ Blockly.Msg.SENSOR_PIN + ' 2', '2' ], [ Blockly.Msg.SENSOR_GROVE + ' A1', '5' ] ]);
        var pinsDigital =  new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_PIN + ' 0', '0' ], [ Blockly.Msg.SENSOR_PIN + ' 1', '1' ], [ Blockly.Msg.SENSOR_PIN + ' 2', '2' ],
                [ Blockly.Msg.SENSOR_PIN + ' 3', '3' ], [ Blockly.Msg.SENSOR_GROVE + ' A0', '4' ], [ Blockly.Msg.SENSOR_GROVE + ' A1', '5' ] ]);

        var input = this.getInput('DROPDOWN');
        var toRemove = [];
        for (var i = 0, field; field = input.fieldRow[i]; i++) {
            if (field.name === 'SENSORTYPE' || field.name === 'GET') {
                continue;
            }
            toRemove.push(field.name);
        }
        for (var j = 0; j < toRemove.length; j++) {
            input.removeField(toRemove[j]);
        }
        if (this.sensorType_ == 'GESTURE_ACTIVE') {
            input.appendField(gesture, 'GESTURE');
            this.appendValue_('BOOL');
            this.setOutput(true, 'Boolean');
        } else if (this.sensorType_ == 'COMPASS_ANGLE') {
            this.appendValue_('NUM_REV', 180);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'KEYS_PRESSED') {
            input.appendField(button, 'KEY');
            this.appendValue_('BOOL');
            this.setOutput(true, 'Boolean');
        } else if (this.sensorType_ == 'PIN_TOUCHED') {
            input.appendField(pin, 'PIN');
            this.appendValue_('BOOL');
            this.setOutput(true, 'Boolean');
        } else if (this.sensorType_ == 'PIN_ANALOG') {
            input.appendField(Blockly.Msg.SENSOR_VALUE)
            input.appendField(pinsAnalog, 'PIN');
            this.appendValue_('NUM_REV', 500);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'PIN_DIGITAL') {
            input.appendField(Blockly.Msg.SENSOR_VALUE)
            input.appendField(pinsDigital, 'PIN');
            this.appendValue_('NUM_REV', 1);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'PIN_PULSEHIGH') {
            input.appendField(Blockly.Msg.SENSOR_VALUE)
            input.appendField(pinsDigital, 'PIN');
            this.appendValue_('NUM_REV', 1);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'PIN_PULSELOW') {
            input.appendField(Blockly.Msg.SENSOR_VALUE)
            input.appendField(pinsDigital, 'PIN');
            this.appendValue_('NUM_REV', 1);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'TIME') {
            input.appendField(Blockly.Msg.SENSOR_MS_TIMER).appendField(timer, 'SENSORNUM');
            this.appendValue_('NUM_REV', 500);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'TEMPERATURE') {
            this.appendValue_('NUM_REV', 20);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'LIGHT_LEVEL') {
            this.appendValue_('NUM_REV', 50);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'ACCELERATION') {
            input.appendField(direction, 'DIRECTION');
            this.appendValue_('NUM_REV', 20);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'ORIENTATION') {
            input.appendField(orientation, 'ORIENTATION');
            this.appendValue_('NUM_REV', 20);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'MICROPHONE') {
            this.appendValue_('NUM_REV', 50);
            this.setOutput(true, 'Number');
        }

        // sensorType.setValue(this.sensorType_);
    },

    /**
     * Called whenever the blocks shape has changed.
     *
     * @this Blockly.Block
     */
    appendValue_ : function(type, value) {
        value = value || 30;
        var logComp = this.getParent();
        if (logComp && logComp.type != 'logic_compare')
            logComp = null;
        if (logComp) {
            // change inputs, if block is in logic_compare and not rebuild from mutation.
            if (logComp.getInputTargetBlock('B')) {
                logComp.getInputTargetBlock('B').dispose();
            }
            var block = null;
            logComp.updateShape(type);
            if (type == 'NUM' || type == 'NUM_REV') {
                block = this.workspace.newBlock('math_number');
                block.setFieldValue(value.toString(), 'NUM');
            } else if (type == 'BOOL') {
                block = this.workspace.newBlock('logic_boolean');
            } else {
                block = this.workspace.newBlock('robColour_picker');
                block.setFieldValue('#b30006', 'COLOUR')
            }
            block.initSvg();
            block.render();
            if (!logComp.inTask) {
                block.setInTask(false);
            }
            var valueB = logComp.getInput('B');
            valueB.connection.connect(block.outputConnection);
        }
    }
};

Blockly.Blocks['mbedSensors_key_isPressed'] = {
    /**
     * Is the specific key (button of the brick) pressed?
     *
     * @constructs mbedSensors_key_isPressed
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            KEY - Enter, Up, Down, Left, Right, Escape or Any
     * @returns immediately
     * @returns {Boolean}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var key = new Blockly.FieldDropdown([ [ 'A', 'button_a' ], [ 'B', 'button_b' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_KEY).appendField(key, 'KEY').appendField(Blockly.Msg.SENSOR_IS_PRESSED);
        this.setOutput(true, 'Boolean');
        this.setTooltip(Blockly.Msg.KEY_ISPRESSED_TOOLTIP);
    }
};

Blockly.Blocks['mbedSensors_pin_isTouched'] = {
    /**
     * Is the specific pin touched?
     *
     * @constructs mbedSensors_pin_isTouched
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            PIN - 0-3
     * @returns immediately
     * @returns {Boolean}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var pin = [ [ Blockly.Msg.SENSOR_PIN + ' 0', '0' ], [ Blockly.Msg.SENSOR_PIN + ' 1', '1' ], [ Blockly.Msg.SENSOR_PIN + ' 2', '2' ] ];
        if (this.workspace.device === 'calliope') {
            pin.push([ Blockly.Msg.SENSOR_PIN + ' 3', '3' ]);
        }
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_IS_PIN).appendField(new Blockly.FieldDropdown(pin), 'PIN').appendField(Blockly.Msg.SENSOR_IS_TOUCHED);
        this.setOutput(true, 'Boolean');
        this.setTooltip(Blockly.Msg.PIN_ISTOUCHED_TOOLTIP);
    }
};

Blockly.Blocks['mbedSensors_gesture_isActive'] = {
    /**
     * Get the current distance from the ultrasonic sensor.
     *
     * @constructs mbedSensors_ultrasonic_getDistance
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MODE - Distance or Presence
     * @param {String/dropdown}
     *            SENSORPORT - 1, 2, 3 or 4
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var gesture = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_GESTURE_UP, 'UP' ], [ Blockly.Msg.SENSOR_GESTURE_DOWN, 'DOWN' ],
                [ Blockly.Msg.SENSOR_GESTURE_FACE_UP, 'FACE_UP' ], [ Blockly.Msg.SENSOR_GESTURE_FACE_DOWN, 'FACE_DOWN' ],
                [ Blockly.Msg.SENSOR_GESTURE_SHAKE, 'SHAKE' ], [ Blockly.Msg.SENSOR_GESTURE_FREEFALL, 'FREEFALL' ] ]); // [ 'left', 'LEFT' ], [ 'right', 'RIGHT' ], [ '3g', 'G3' ], [ '6g', 'G6' ], [ '8g', 'G8' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GESTURE).appendField(gesture, 'GESTURE').appendField(Blockly.Msg.SENSOR_GESTURE_ACTIVE);
        this.setOutput(true, 'Boolean');
        this.setTooltip(Blockly.Msg.ULTRASONIC_GETSAMPLE_TOOLTIP);
    }
};

Blockly.Blocks['mbedSensors_microphone_getSample'] = {
    /**
     * Get the current reading from the microphone sensor.
     *
     * @constructs mbedSensors_microphone_getSample
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MODE - Angle or Rate
     * @param {String/dropdown}
     *            SENSORPORT - 1, 2, 3 or 4
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.SENSOR_MIC);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.MICROPHONE_GETSAMPLE_TOOLTIP);
    }
};

Blockly.Blocks['mbedSensors_compass_getSample'] = {
    /**
     * Get the current reading from the compass sensor.
     *
     * @constructs mbedSensors_compass_getSample
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MODE - Angle or Rate
     * @param {String/dropdown}
     *            SENSORPORT - 1, 2, 3 or 4
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.SENSOR_COMPASS);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.COMPASS_GETSAMPLE_TOOLTIP);
    }
};

Blockly.Blocks['mbedSensors_temperature_getSample'] = {
    /**
     * Get the current reading from the temperature sensor.
     *
     * @constructs mbedSensors_temperature_getSample
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.SENSOR_TEMPERATURE);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.TEMPERATURE_GETSAMPLE_TOOLTIP);
    }
};

Blockly.Blocks['mbedSensors_getRssi'] = {
    /**
     * Get the rssi of the last package.
     *
     * @constructs mbedSensors_getRssi
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.SENSOR_RADIO_RSSI);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.RADIO_GET_RSSI_TOOLTIP);
    }
};

Blockly.Blocks['mbedSensors_timer_reset'] = {
    /**
     * Reset the timer.
     *
     * @constructs mbedSensors_timer_reset
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            TIMER - 1-10
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var sensorNum;
        sensorNum = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_TIMER + ' 1', '1' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_RESET).appendField(sensorNum, 'SENSORNUM').appendField(Blockly.Msg.SENSOR_RESET_II);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.TIMER_RESET_TOOLTIP);
    }
};

Blockly.Blocks['mbedSensors_timer_getSample'] = {
    /**
     * Get the current reading from the timer.
     *
     * @constructs mbedSensors_timer_getSample
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            TIMER - 1-10
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var sensorNum;
        sensorNum = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_TIMER + ' 1', '1' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(sensorNum, 'SENSORNUM').appendField(Blockly.Msg.SENSOR_MS_TIMER);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.TIMER_GETSAMPLE_TOOLTIP);
    }
};

Blockly.Blocks['mbedSensors_pin_getSample'] = {
    /**
     * Get the current reading from a pin.
     *
     * @constructs mbedSensors_pin_getSample
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            PIN - 0-3
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var valueType;
        valueType = new Blockly.FieldDropdown([ [ Blockly.Msg.ANALOG, 'ANALOG' ], [ Blockly.Msg.DIGITAL, 'DIGITAL' ], [ Blockly.Msg.PULSE_HIGH, 'PULSEHIGH' ],
                [ Blockly.Msg.PULSE_LOW, 'PULSELOW' ] ], function(option) {
            if (option && this.sourceBlock_.getFieldValue('VALUETYPE') !== option) {
                this.sourceBlock_.updatePins_(option);
            }
        });
        // microbit pins, calliope pins are handled in updatePins_
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET).appendField(valueType, 'VALUETYPE').appendField(Blockly.Msg.SENSOR_VALUE).appendField(new Blockly.FieldDropdown(
                [ [ "dummy", '0' ] ]), 'PIN');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.PIN_GETSAMPLE_TOOLTIP);
        this.protocol_ = "ANALOG";
        var thisBlock = this;
        this.setTooltip(function() {
            var protocol_ = thisBlock.getFieldValue('VALUETYPE');
            var TOOLTIPS = {
                'ANALOG' : Blockly.Msg.PIN_GETSAMPLE_ANALOG_TOOLTIP,
                'DIGITAL' : Blockly.Msg.PIN_GETSAMPLE_DIGITAL_TOOLTIP,
                'PULSEHIGH' : Blockly.Msg.PIN_GETSAMPLE_PULSEHIGH_TOOLTIP,
                'PULSELOW' : Blockly.Msg.PIN_GETSAMPLE_PULSELOW_TOOLTIP
            };
            return TOOLTIPS[protocol_];
        });
        this.updatePins_(this.protocol_);
    },
    /**
     * Create XML to represent whether the sensor type has changed.
     *
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('protocol', this.protocol_);
        return container;
    },
    /**
     * Parse XML to restore the sensor type.
     *
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        var input = xmlElement.getAttribute('protocol');
        this.protocol_ = input;
        this.updatePins_(this.protocol_);
    },
    updatePins_ : function(protocol) {
        this.protocol_ = protocol;
        if (this.workspace.device === 'microbit') {
            var pins = [ [ Blockly.Msg.SENSOR_PIN + ' 0', '0' ], [ Blockly.Msg.SENSOR_PIN + ' 1', '1' ], [ Blockly.Msg.SENSOR_PIN + ' 2', '2' ] ];
            var pinField = this.getField("PIN");
            pinField.menuGenerator_ = pins;
            pinField.setValue("0");
            pinField.setText(Blockly.Msg.SENSOR_PIN + ' 0');
            return;
        }
        if (protocol === 'ANALOG') {
            var pins = [ [ Blockly.Msg.SENSOR_PIN + ' 1', '1' ], [ Blockly.Msg.SENSOR_PIN + ' 2', '2' ], [ Blockly.Msg.SENSOR_GROVE + ' A1', '5' ] ];
            var pinField = this.getField("PIN");
            pinField.menuGenerator_ = pins;
            pinField.setValue("1");
            pinField.setText(Blockly.Msg.SENSOR_PIN + ' 1');
        } else if (protocol === 'DIGITAL') {
            var pins = [ [ Blockly.Msg.SENSOR_PIN + ' 0', '0' ], [ Blockly.Msg.SENSOR_PIN + ' 1', '1' ], [ Blockly.Msg.SENSOR_PIN + ' 2', '2' ],
                    [ Blockly.Msg.SENSOR_PIN + ' 3', '3' ], [ Blockly.Msg.SENSOR_GROVE + ' A0', '4' ], [ Blockly.Msg.SENSOR_GROVE + ' A1', '5' ] ];
            var pinField = this.getField("PIN");
            pinField.menuGenerator_ = pins;
            pinField.setValue("0");
            pinField.setText(Blockly.Msg.SENSOR_PIN + ' 0');
        } else if (protocol === 'PULSEHIGH') {
            var pins = [ [ Blockly.Msg.SENSOR_PIN + ' 0', '0' ], [ Blockly.Msg.SENSOR_PIN + ' 1', '1' ], [ Blockly.Msg.SENSOR_PIN + ' 2', '2' ],
                    [ Blockly.Msg.SENSOR_PIN + ' 3', '3' ], [ Blockly.Msg.SENSOR_GROVE + ' A0', '4' ], [ Blockly.Msg.SENSOR_GROVE + ' A1', '5' ] ];
            var pinField = this.getField("PIN");
            pinField.menuGenerator_ = pins;
            pinField.setValue("0");
            pinField.setText(Blockly.Msg.SENSOR_PIN + ' 0');
        } else if (protocol === 'PULSELOW') {
            var pins = [ [ Blockly.Msg.SENSOR_PIN + ' 0', '0' ], [ Blockly.Msg.SENSOR_PIN + ' 1', '1' ], [ Blockly.Msg.SENSOR_PIN + ' 2', '2' ],
                    [ Blockly.Msg.SENSOR_PIN + ' 3', '3' ], [ Blockly.Msg.SENSOR_GROVE + ' A0', '4' ], [ Blockly.Msg.SENSOR_GROVE + ' A1', '5' ] ];
            var pinField = this.getField("PIN");
            pinField.menuGenerator_ = pins;
            pinField.setValue("0");
            pinField.setText(Blockly.Msg.SENSOR_PIN + ' 0');
        }
    }
};

Blockly.Blocks['mbedSensors_ambientLight_getSample'] = {
    /**
     * Get the current reading from a light sensor.
     *
     * @constructs mbedSensors_ambientLight_getSample
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.MODE_AMBIENTLIGHT);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.LIGHT_GETSAMPLE_TOOLTIP);
    }
};

Blockly.Blocks['mbedSensors_acceleration_getSample'] = {
    /**
     * Get the current reading from the acceleration sensor.
     *
     * @constructs mbedSensors_acceleration_getSample
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            KEY - X, Y, Z, STRENGTH
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var direction = new Blockly.FieldDropdown([ [ 'x', 'X' ], [ 'y', 'Y' ], [ 'z', 'Z' ], [ Blockly.Msg.STRENGTH, 'STRENGTH' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.ACCELERATION).appendField(direction, 'DIRECTION');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.ACCELERATION_TOOLTIP);
    }
};

Blockly.Blocks['mbedSensors_rotation_getSample'] = {
    /**
     * Get the current reading from the acceleration sensor.
     *
     * @constructs mbedSensors_rotation_getSample
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            KEY - PITCH, ROLL
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var mode = new Blockly.FieldDropdown([ [ Blockly.Msg.PITCH, 'PITCH' ], [ Blockly.Msg.ROLL, 'ROLL' ], ]);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.ACCELEROMETER_ROTATION).appendField(mode, 'MODE');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.ACCELEROMETER_ROTATION_TOOLTIP);
    }
};
