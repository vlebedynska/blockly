/**
 * @fileoverview Sensor blocks for all systems.
 * @requires Blockly.Blocks
 * @author Beate
 */

'use strict';

goog.provide('Blockly.Blocks.robSensors');

goog.require('Blockly.Blocks.robSensorDefinitions');
goog.require('Blockly.Blocks');

// define non standard sensor blocks here e.g.**********************************************************

Blockly.Blocks['robSensors_encoder_reset'] = {
    /**
     * Reset the motor encoder.
     * 
     * @constructs robSensors_encoder_reset
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - A, B, C or D
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var motorport = new Blockly.FieldDropdown([ [ 'A', 'A' ], [ 'B', 'B' ], [ 'C', 'C' ], [ 'D', 'D' ] ]);
        if (this.workspace.device === 'ardu') {
            motorport = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'B' ], [ Blockly.Msg.MOTOR_RIGHT, 'C' ] ]);
        }
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_RESET).appendField(Blockly.Msg.SENSOR_ENCODER).appendField(motorport, 'SENSORPORT').appendField(Blockly.Msg.SENSOR_RESET_II);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.ENCODER_RESET_TOOLTIP);
    }
};

Blockly.Blocks['robSensors_gyro_reset'] = {

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        // this.setInputsInline(true);
        var sensorPort = new Blockly.FieldDropdown([ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_RESET).appendField(Blockly.Msg.SENSOR_GYRO).appendField(sensorPort, 'SENSORPORT').appendField(Blockly.Msg.SENSOR_RESET_II);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.GYRO_RESET_TOOLTIP);
    }
};

Blockly.Blocks['robSensors_timer_reset'] = {
    /**
     * Reset the timer.
     * 
     * @constructs robSensors_timer_reset
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            TIMER - 1-10
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var sensorNum;
        if (this.workspace.device === 'nxt' || this.workspace.device === 'ardu' || this.workspace.device === 'bob3') {
            sensorNum = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_TIMER + ' 1', '1' ] ]);
        } else {
            sensorNum = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_TIMER + ' 1', '1' ], [ Blockly.Msg.SENSOR_TIMER + ' 2', '2' ],
                    [ Blockly.Msg.SENSOR_TIMER + ' 3', '3' ], [ Blockly.Msg.SENSOR_TIMER + ' 4', '4' ], [ Blockly.Msg.SENSOR_TIMER + ' 5', '5' ] ]);
        }
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_RESET).appendField(sensorNum, 'SENSORPORT').appendField(Blockly.Msg.SENSOR_RESET_II);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.TIMER_RESET_TOOLTIP);
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
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_RESET).appendField(sensorNum, 'SENSORPORT').appendField(Blockly.Msg.SENSOR_RESET_II);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.TIMER_RESET_TOOLTIP);
    }
};

Blockly.Blocks['robSensors_generic'] = {
    /*- Generic sensor definition. Will create e.g. the following xml: 
     *
     * <block type="robSensors_ultrasonic_getSample" id="vG?X/lTw]%:p!z.},u;r" intask="false">
     *     <mutation mode="DISTANCE"></mutation> 
     *     <field name="MODE">DISTANCE</field> 
     *     <field name="SENSORPORT">4</field> 
     *     <field name="slots"></field> 
     * </block> 
     *
     */
    /**
     * @param {Object
     *            sensor}
     * 
     * @memberof Block
     */
    init : function(sensor) {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        // do what kind of modes do we have?
        var modes;
        if (sensor.modes[0].name && !sensor.modes[0].question) {
            var modes = [];
            for (var i = 0; i < sensor.modes.length; i++) {
                modes.push([ Blockly.Msg['MODE_' + sensor.modes[i].name] || sensor.modes[i].name, sensor.modes[i].name ]);
            }
            modes = new Blockly.FieldDropdown(modes, function(option) {
                if (option && this.sourceBlock_.getFieldValue('MODE') !== option) {
                    this.sourceBlock_.updateShape_(option);
                }
            });
        } else {
            modes = new Blockly.FieldHidden(sensor.modes[0].name);
        }
        // do we have ports?
        var ports;
        if (sensor.ports) {
            var portList = [];
            for (var i = 0; i < sensor.ports.length; i++) {
                portList.push([ Blockly.Msg[sensor.ports[i][0]] || sensor.ports[i][0], sensor.ports[i][1] ]);
            }
            ports = new Blockly.FieldDropdown(portList);
        } else if (sensor.modes && sensor.modes[0].ports) {
            var portList = [];
            for (var i = 0; i < sensor.modes[0].ports.length; i++) {
                portList.push([ Blockly.Msg[sensor.modes[0].ports[i][0]] || sensor.modes[0].ports[i][0], sensor.modes[0].ports[i][1] ]);
            }
            ports = new Blockly.FieldDropdown(portList);
        } else {
            ports = new Blockly.FieldHidden();
        }
        // do we have a slots?
        var slots;
        if (sensor.slots) {
            var portsList = [];
            for (var i = 0; i < sensor.slots.length; i++) {
                portsList.push([ Blockly.Msg[sensor.slots[i][0]] || sensor.slots[i][0], sensor.slots[i][1] ]);
            }
            slots = new Blockly.FieldDropdown(portsList);
        } else {
            slots = new Blockly.FieldHidden();
        }

        var firstMode = sensor.modes[0];
        // question or not?
        if (firstMode.question) {
            this.appendDummyInput('ROW').appendField(Blockly.Msg['SENSOR_' + sensor.title + '_' + this.workspace.device.toUpperCase()]
                    || Blockly.Msg['SENSOR_' + sensor.title] || sensor.title, 'SENSORTITLE').appendField(modes, 'MODE').appendField(ports, 'SENSORPORT').appendField(slots, 'SLOTS').appendField(Blockly.Msg['SENSOR_IS_'
                    + firstMode.name]
                    || firstMode.name);
        } else {
            this.appendDummyInput('ROW').appendField(Blockly.Msg.GET).appendField(modes, 'MODE').appendField(Blockly.Msg['SENSOR_UNIT_' + firstMode.unit]
                    || firstMode.unit || '', 'UNIT').appendField(Blockly.Msg['SENSOR_' + sensor.title + '_' + this.workspace.device.toUpperCase()]
                    || Blockly.Msg['SENSOR_' + sensor.title] || sensor.title, 'SENSORTITLE').appendField(ports, 'SENSORPORT').appendField(slots, 'SLOTS');
        }
        if (sensor.standardPort) {
            ports.setValue(sensor.standardPort);
        }
        this.sensorMode_ = firstMode.name;
        this.setOutput(true, firstMode.type);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('MODE');
            return Blockly.Msg[sensor.title + '_' + mode + '_GETSAMPLE_TOOLTIP'] || Blockly.Msg[sensor.title + '_GETSAMPLE_TOOLTIP'] || sensor.title + '_'
                    + mode + '_GETSAMPLE_TOOLTIP';
        });
        this.type = 'robSensors_' + sensor.title.toLowerCase() + '_getSample';

        if (this.sensorMode_) {
            this.mutationToDom = function() {
                var container = document.createElement('mutation');
                container.setAttribute('mode', this.sensorMode_);
                return container;
            }
            this.domToMutation = function(xmlElement) {
                var mode = xmlElement.getAttribute('mode');
                this.sensorMode_ = mode;
                this.updateShape_(this.sensorMode_);
            }
            this.updateShape_ = function(option) {
                for (var i = 0; i < sensor.modes.length; i++) {
                    if (sensor.modes[i].name === option) {
                        this.setOutput(true, sensor.modes[i].type);
                        var unit = this.getField('UNIT');
                        if (unit) {
                            unit.setText(Blockly.Msg['SENSOR_UNIT_' + sensor.modes[i].unit] || sensor.modes[i].unit || '');
                        }
                        // this is a really special case for calliope so far
                        if (sensor.modes[i].ports) {
                            var input = this.getInput('ROW');
                            var toRemove = [];
                            for (var j = input.fieldRow.length - 1; j > 0; j--) {
                                if (input.fieldRow[j].name === 'SENSORTITLE') {
                                    break;
                                }
                                toRemove.push(input.fieldRow[j].name);
                            }
                            for (var j = 0; j < toRemove.length; j++) {
                                input.removeField(toRemove[j]);
                            }
                            // add new ports
                            var portList = [];
                            for (var j = 0; j < sensor.modes[i].ports.length; j++) {
                                portList.push([ Blockly.Msg[sensor.modes[i].ports[j][0]] || sensor.modes[i].ports[j][0], sensor.modes[i].ports[j][1] ]);
                            }
                            input.appendField(new Blockly.FieldDropdown(portList), 'SENSORPORT').appendField(new Blockly.FieldHidden(), 'SLOTS');
                        }
                    }
                }
                this.sensorMode_ = option;
            }
        }
    }
};

Blockly.Blocks['robSensors_generic_all'] = {
    /*- Generic sensor definition. Will create the following xml: 
     *
     * <block type="robSensors_getSample" id=",eb_si_guT_Xi24OesW" intask="false">
     *     <mutation input="COLOUR_COLOUR"></mutation> 
     *     <fieldname="SENSORTYPE">COLOUR_COLOUR</field> 
     *     <field name="SENSORPORT">3</field> 
     *     <field name="slots"></field> 
     * </block> 
     *
     */

    /**
     * 
     * @param {Object
     *            sensors} /* /*
     * @memberof Block /
     */
    init : function(sensors) {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.sensors = [];
        this.ports = [];
        this.slots = [];

        var modeSensor = [];
        for (var i = 0; i < sensors.length; i++) {
            for (var j = 0; j < sensors[i].modes.length; j++) {
                // we can not provide sensors in this block with array output
                if (sensors[i].modes[j].type.indexOf('Array') > -1) {
                    continue;
                }
                modeSensor.push([
                        (Blockly.Msg['MODE_' + sensors[i].modes[j].name] || sensors[i].modes[j].name)
                                + ' '
                                + (Blockly.Msg['SENSOR_UNIT_' + sensors[i].modes[j].unit] || sensors[i].modes[j].unit || '')
                                + ' '
                                + (Blockly.Msg['SENSOR_' + sensors[i].title + '_' + this.workspace.device.toUpperCase()]
                                        || Blockly.Msg['SENSOR_' + sensors[i].title] || sensors[i].title), sensors[i].title + '_' + sensors[i].modes[j].name ]);
                if (sensors[i].ports) {
                    var portsList = [];
                    for (var k = 0; k < sensors[i].ports.length; k++) {
                        portsList.push([ Blockly.Msg[sensors[i].ports[k][0]] || sensors[i].ports[k][0], sensors[i].ports[k][1] ]);
                    }
                    this.ports.push(new Blockly.FieldDropdown(portsList));
                } else if (sensors[i].modes && sensors[i].modes[j].ports) {
                    var portList = [];
                    for (var l = 0; l < sensors[i].modes[j].ports.length; l++) {
                        portList.push([ Blockly.Msg[sensors[i].modes[j].ports[l][0]] || sensors[i].modes[j].ports[l][0], sensors[i].modes[j].ports[l][1] ]);
                    }
                    this.ports.push(new Blockly.FieldDropdown(portList));
                } else {
                    this.ports.push(new Blockly.FieldHidden());
                }
                if (sensors[i].slots) {
                    var portsList = [];
                    for (var l = 0; l < sensors[i].slots.length; l++) {
                        portsList.push([ Blockly.Msg[sensors[i].slots[l][0]] || sensors[i].slots[l][0], sensors[i].slots[l][1] ]);
                    }
                    this.slots.push(new Blockly.FieldDropdown(portsList));
                } else {
                    this.slots.push(new Blockly.FieldHidden());
                }
                this.sensors.push({
                    name : sensors[i].title,
                    mode : sensors[i].modes[j].name,
                    type : sensors[i].modes[j].type,
                    standardPort : sensors[i].standardPort,
                    unit : sensors[i].modes[j].unit,
                    op : sensors[i].modes[j].op,
                    value : sensors[i].modes[j].value
                });
            }
        }
        var dropdownModes = new Blockly.FieldDropdown(modeSensor, function(option) {
            if (option && this.sourceBlock_.getFieldValue('SENSORTYPE') !== option) {
                this.sourceBlock_.updateShape_(option);
            }
        });

        this.appendDummyInput('ROW').appendField(Blockly.Msg.GET, 'GET').appendField(dropdownModes, 'SENSORTYPE').appendField(this.ports[0], 'SENSORPORT').appendField(this.slots[0], 'SLOTS');

        this.setOutput(true, sensors[0].modes[0].type);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('SENSORTYPE');
            return Blockly.Msg[mode + '_GETSAMPLE_TOOLTIP'] || Blockly.Msg[mode.substr(0, mode.indexOf('_')) + '_GETSAMPLE_TOOLTIP'] || mode
                    + '_GETSAMPLE_TOOLTIP';
        });
        this.type = 'robSensors_getSample';
        this.sensorType_ = modeSensor[0][1];

        this.mutationToDom = function() {
            var container = document.createElement('mutation');
            container.setAttribute('input', this.sensorType_);
            return container;
        };
        this.domToMutation = function(xmlElement) {
            this.sensorType_ = xmlElement.getAttribute('input');
            this.updateShape_(this.sensorType_);
        };
        this.updateShape_ = function(option) {
            this.sensorType_ = option;
            // remove all dynamic fields
            var input = this.getInput('ROW');
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
            // define in which sensor / mode we are => index
            var sensorType = this.getField('SENSORTYPE');
            var sensorTypeOptions = sensorType.getOptions_();
            var index = 0;
            for (var i = 0; i < sensorTypeOptions.length; i++) {
                if (sensorTypeOptions[i][1] == this.sensorType_) {
                    index = i;
                    break;
                }
            }
            // add ports again
            input.appendField(this.ports[index], 'SENSORPORT').appendField(this.slots[index], 'SLOTS');
            if (this.sensors[index].standardPort) {
                this.ports[index].setValue(this.sensors[index].standardPort);
            }
            // set output
            this.setOutput(true, this.sensors[index].type);
            // update the surrounding logic_compare block
            var value = this.sensors[index].value || 30;
            var logComp = this.getParent();
            if (logComp && logComp.type != 'logic_compare')
                logComp = null;
            if (logComp) {
                // change inputs, if block is in logic_compare and not rebuild from mutation.
                if (logComp.getInputTargetBlock('B')) {
                    logComp.getInputTargetBlock('B').dispose();
                }
                var block = null;
                if (this.sensors[index].type == 'Number') {
                    logComp.updateShape(this.sensors[index].op || 'NUM');
                    block = this.workspace.newBlock('math_number');
                    block.setFieldValue(value.toString(), 'NUM');
                } else if (this.sensors[index].type == 'Boolean') {
                    logComp.updateShape('BOOL');
                    block = this.workspace.newBlock('logic_boolean');
                } else if (this.sensors[index].type == 'Colour') {
                    logComp.updateShape('COLOUR');
                    block = this.workspace.newBlock('robColour_picker');
                    block.setFieldValue(this.sensors[index].value, 'COLOUR')
                } else {
                    logComp.updateShape('BOOL');
                    block = this.workspace.newBlock('logic_boolean');
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
    }
};
