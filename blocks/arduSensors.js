/**
 * @fileoverview Sensor blocks for arduino-based robots.
 * @requires Blockly.Blocks
 * @author Artem Vinokurov
 */

'use strict';

goog.provide('Blockly.Blocks.arduSensors');

goog.require('Blockly.Blocks');

Blockly.Blocks['arduSensors_getSample'] = {
    /**
     * Get the current reading from choosen sensor.
     *
     * @constructs arduSensors_getSample
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
        sensorType = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_KEY + ' ' + Blockly.Msg.SENSOR_PRESSED, 'KEYS_PRESSED' ],
                [ Blockly.Msg.SENSOR_GESTURE, 'GESTURE_ACTIVE' ], [ Blockly.Msg.SENSOR_COMPASS, 'COMPASS_ANGLE' ],
                [ Blockly.Msg.SENSOR_MIC, 'MICROPHONE' ], [ Blockly.Msg.SENSOR_TIME, 'TIME' ], [ Blockly.Msg.SENSOR_TEMPERATURE, 'TEMPERATURE' ],
                [ Blockly.Msg.MODE_AMBIENTLIGHT, 'LIGHT_LEVEL' ], [ Blockly.Msg.SENSOR_JOYSTICK, 'JOYSTICK' ] ],
        // [ Blockly.Msg.MODE_ACCELERATION, 'ACCELERATION' ], [ Blockly.Msg.MODE_ORIENTATION, 'ORIENTATION' ] ]
        function(option) {
            if (option && this.sourceBlock_.getFieldValue('SENSORTYPE') !== option) {
                this.sourceBlock_.updateShape_(option);
            }
        });
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
        var axis = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ] ]);
        var sensorPort = new Blockly.FieldDropdown([ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ]);
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
        } else if (this.sensorType_ == 'ORIENTATION') {
            input.appendField(orientation, 'ORIENTATION');
            this.appendValue_('NUM_REV', 20);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'MICROPHONE') {
            this.appendValue_('NUM', 512);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'JOYSTICK') {
            input.appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(axis, 'JOYSTICKAXIS').appendField('on').appendField(sensorPort, 'SENSORPORT');
            this.appendValue_('NUM', 512);
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

Blockly.Blocks['arduSensors_joystick_getSample'] = {
    /**
     * Get the current position of the joystick.
     *
     * @constructs arduSensors_joystick_getSample
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            JOYSTICKAXIS - X or Y axis of the joystick
     * @param {String/dropdown}
     *            SENSORPORT - 1, 2, 3 or 4
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var axis = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ] ]);
        var sensorPort = new Blockly.FieldDropdown([ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(axis, 'JOYSTICKAXIS').appendField(Blockly.Msg.SENSOR_JOYSTICK).appendField(sensorPort, 'SENSORPORT');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.JOYSTICK_GETSAMPLE_TOOLTIP);
    }
};
