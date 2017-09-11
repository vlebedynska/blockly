/**
 * @fileoverview Sensor blocks for Bob3.
 * @requires Blockly.Blocks
 * @author Evgeniya
 */
'use strict';

goog.provide('Blockly.Blocks.bob3Sensors');

goog.require('Blockly.Blocks');

Blockly.Blocks['bob3Sensors_ambientlight'] = {
    /**
     * 
     * @constructs bob3Sensors_ambientlight
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.SENSOR_AMBIENTLIGHT);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks['bob3Sensors_temperature_getSample'] = {
    /**
     * Get the current reading from the temperature sensor.
     * 
     * @constructs bob3Sensors_temperature_getSample
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

Blockly.Blocks['bob3Sensors_getCode'] = {
    /**
     * Get the current reading from the code pad.
     * 
     * @constructs bob3Sensors_getCode
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.SENSOR_CODE);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.GET_CODE_TOOLTIP);
    }
};

Blockly.Blocks['bob3Sensors_touch_getSample'] = {
    /**
     * Get the current touch state of the bob3 arm.
     * 
     * @constructs bob3Sensors_touch_getSample
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            ARM - LEFT or RIGHT arm of bob3
     * @param {String/dropdown}
     *            PAIR - contacts pair being touched
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var arm = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, '1' ], [ Blockly.Msg.MOTOR_RIGHT, '2' ] ]);
        var pair = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_TOP, '4' ], [ Blockly.Msg.CENTER, '2' ], [ Blockly.Msg.SENSOR_BOTTOM, '1' ],
                [ Blockly.Msg.SENSOR_ANY, '3' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_IS_ARM).appendField(arm, 'ARM').appendField(pair, 'ARMPAIR').appendField(Blockly.Msg.SENSOR_IS_TOUCHED);
        this.setOutput(true, 'Boolean');
        this.setTooltip(Blockly.Msg.SENSOR_ARM_TOOLTIP);
    }
};

Blockly.Blocks['bob3Sensors_getSample_bob3'] = {
    /**
     * Get the current reading from choosen sensor.
     * 
     * @constructs robSensors_getSample_bob3
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var arm = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, '1' ], [ Blockly.Msg.MOTOR_RIGHT, '2' ] ]);
        var pair = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_TOP, '4' ], [ Blockly.Msg.CENTER, '2' ], [ Blockly.Msg.SENSOR_BOTTOM, '1' ],
                [ Blockly.Msg.SENSOR_ANY, '3' ] ]);
        var sensorType = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_PART_ARM + ' ' + Blockly.Msg.SENSOR_PRESSED, 'TOUCH' ],
                [ Blockly.Msg.MODE_AMBIENTLIGHT, 'LIGHT_LEVEL' ], [ Blockly.Msg.SENSOR_TEMPERATURE, 'TEMPERATURE' ] ],
                function(option) {
                    if (option && this.sourceBlock_.getFieldValue('SENSORTYPE') !== option) {
                        this.sourceBlock_.updateShape_(option);
                    }
                });
        this.appendDummyInput('DROPDOWN').appendField(Blockly.Msg.GET, 'GET').appendField(sensorType, 'SENSORTYPE').appendField(arm, 'ARM').appendField(Blockly.Msg.BOB3_ARM).appendField(pair, 'ARMPAIR').appendField(Blockly.Msg.BOB3_ARM_PAIR);
        this.setOutput(true, 'Boolean');
        this.sensorType_ = 'TOUCH';
        this.setTooltip(Blockly.Msg.GETSAMPLE_TOOLTIP);
        this.setMovable(false);
        this.setDeletable(false);
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
        var arm = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, '1' ], [ Blockly.Msg.MOTOR_RIGHT, '2' ] ]);
        var pair = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_TOP, '4' ], [ Blockly.Msg.CENTER, '2' ], [ Blockly.Msg.SENSOR_BOTTOM, '1' ],
                [ Blockly.Msg.SENSOR_ANY, '3' ] ]);

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
        if (this.sensorType_ == 'TOUCH') {
            input.appendField(arm, 'ARM').appendField(Blockly.Msg.BOB3_ARM).appendField(pair, 'ARMPAIR').appendField(Blockly.Msg.BOB3_ARM_PAIR);
            this.appendValue_('BOOL');
            this.setOutput(true, 'Boolean');
        } else {
            this.appendValue_('NUM_REV', 10);
            this.setOutput(true, 'Number');
        }
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
