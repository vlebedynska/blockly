/**
 * @fileoverview Sensor blocks for all systems.
 * @requires Blockly.Blocks
 * @author Beate
 */

'use strict';

goog.provide('Blockly.Blocks.robSensors');

goog.require('Blockly.Blocks');

// define sensors here as a property of sensors  ********************************************************************************

/*- minimal example:
 * 
 * sensors.ultrasonic.ev3 = { 
 *     title : 'ULTRASONIC', 
 *     modes : [ { 
 *         name : 'PRESENCE', 
 *         type : 'Boolean', 
 *     } ], 
 * }; 
 * 
 */

/*- all supported properties: 
 * 
 * title,  
 * ports,  
 * modes,  
 *     name,  
 *     type,  
 *     value, 
 *     unit, 
 *     op, 
 * standardPort 
 */

var sensors = {};
sensors.battery = {};
sensors.battery.ardu = {
    title : 'BATTERY',
    modes : [ {
        name : 'VALUE',
        type : 'Number',
        unit : 'VOLT',
    } ]
};

sensors.code = {};
sensors.code.bob3 = {
    title : 'CODE',
    modes : [ {
        name : 'VALUE',
        type : 'Number',
        value : '11'
    } ]
};

sensors.colour = {};
sensors.colour.ardu = {
    title : 'COLOUR',
    ports : [ [ 'MOTOR_LEFT', '1' ], [ 'MOTOR_RIGHT', '2' ] ],
    modes : [ {
        name : 'VALUE',
        type : 'Colour',
        value : '#b30006'
    }, {
        name : 'LIGHT',
        type : 'Number',
        unit : 'PERCENT',
    }, {
        name : 'RGB',
        type : 'Array_Number',
    } ]
};
sensors.colour.ev3 = {
    title : 'COLOUR',
    ports : [ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ],
    modes : [ {
        name : 'COLOUR',
        type : 'Colour',
        value : '#b30006'
    }, {
        name : 'LIGHT',
        type : 'Number',
        unit : 'PERCENT',
        value : 50
    }, {
        name : 'AMBIENTLIGHT',
        type : 'Number',
        unit : 'PERCENT',
        value : 50
    }, {
        name : 'RGB',
        type : 'Array_Number',
    } ],
    standardPort : '3',
};
sensors.colour.nxt = sensors.colour.ev3;

sensors.compass = {};
sensors.compass.ardu = {
    title : 'COMPASS',
    modes : [ {
        name : 'ANGLE',
        type : 'Number',
        unit : 'DEGREE',
    } ]
};
sensors.compass.mbed = sensors.compass.ardu;
sensors.encoder = {};
sensors.encoder.ardu = {
    title : 'ENCODER',
    modes : [ {
        name : 'DEGREE',
        type : 'Number',
        unit : 'DEGREE',
    }, {
        name : 'ROTATION',
        type : 'Number',
        unit : '',
    }, {
        name : 'DISTANCE',
        type : 'Number',
        unit : 'CM',
    } ],
    ports : [ [ 'A', 'A' ], [ 'B', 'B' ], [ 'C', 'C' ], [ 'D', 'D' ] ]
};
sensors.encoder.ev3 = {
    title : 'ENCODER',
    modes : [ {
        name : 'DEGREE',
        type : 'Number',
        unit : 'DEGREE',
        op : 'NUM_REV',
        value : 180
    }, {
        name : 'ROTATION',
        type : 'Number',
        unit : '',
        op : 'NUM_REV',
        value : 2
    }, {
        name : 'DISTANCE',
        type : 'Number',
        unit : 'CM',
    } ],
    ports : [ [ 'A', 'A' ], [ 'B', 'B' ], [ 'C', 'C' ], [ 'D', 'D' ] ]
};
sensors.encoder.nxt = {
    title : 'ENCODER',
    modes : [ {
        name : 'DEGREE',
        type : 'Number',
        unit : 'DEGREE',
        op : 'NUM_REV',
        value : 180
    }, {
        name : 'ROTATION',
        type : 'Number',
        unit : '',
        op : 'NUM_REV',
        value : 2
    }, {
        name : 'DISTANCE',
        type : 'Number',
        unit : 'CM',
    } ],
    ports : [ [ 'A', 'A' ], [ 'B', 'B' ], [ 'C', 'C' ] ]
};

sensors.gyro = {};
sensors.gyro.ev3 = {
    title : 'GYRO',
    modes : [ {
        name : 'ANGLE',
        type : 'Number',
        unit : 'DEGREE',
        op : 'NUM_REV',
        value : 90
    }, {
        name : 'RATE',
        type : 'Number',
        unit : 'OMEGA',
        op : 'NUM_REV',
        value : 90
    } ],
    ports : [ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ],
    standardPort : '2',
};

sensors.infrared = {};
sensors.infrared.ardu = {
    title : 'INFRARED',
    ports : [ [ 'MOTOR_LEFT', '1' ], [ 'MOTOR_RIGHT', '2' ], [ 'BOTH', 'BOTH' ] ],
    modes : [ {
        name : 'OBSTACLE',
        type : 'Boolean',
    }, {
        name : 'PRESENCE',
        type : 'Boolean',
    } ]
};

sensors.infrared.bob3 = {
    title : 'INFRARED',
    modes : [ {
        name : 'AMBIENTLIGHT',
        type : 'Number',
        unit : 'PERCENT'
    } ]
};

sensors.infrared.ev3 = {
    title : 'INFRARED',
    ports : [ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ],
    modes : [ {
        name : 'DISTANCE',
        type : 'Number',
        unit : 'CM'
    }, {
        name : 'PRESENCE',
        type : 'Array_Number',
    } ]
};

sensors.key = {};
sensors.key.ardu = {
    title : 'KEY',
    modes : [ {
        name : 'PRESSED',
        type : 'Boolean',
        question : true
    } ],
    ports : [ [ '1', 'LEFT' ], [ '2', 'ENTER' ], [ '3', 'RIGHT' ], [ 'SENSOR_KEY_ANY', 'ANY' ] ]
};
sensors.key.calliope = {
    title : 'KEY',
    modes : [ {
        name : 'PRESSED',
        type : 'Boolean',
        question : true
    } ],
    ports : [ [ 'A', 'button_a' ], [ 'B', 'button_b' ] ]
};

sensors.key.ev3 = {
    title : 'KEY',
    modes : [ {
        name : 'PRESSED',
        type : 'Boolean',
        question : true
    } ],
    ports : [ [ 'SENSOR_KEY_ENTER', 'ENTER' ], [ 'SENSOR_KEY_UP', 'UP' ], [ 'SENSOR_KEY_DOWN', 'DOWN' ], [ 'SENSOR_KEY_LEFT', 'LEFT' ],
            [ 'SENSOR_KEY_RIGHT', 'RIGHT' ], [ 'SENSOR_KEY_ESCAPE', 'ESCAPE' ], [ 'SENSOR_KEY_ANY', 'ANY' ] ]
};

sensors.key.nxt = {
    title : 'KEY',
    modes : [ {
        name : 'PRESSED',
        type : 'Boolean',
        question : true
    } ],
    ports : [ [ 'SENSOR_KEY_ENTER', 'ENTER' ], [ 'SENSOR_KEY_LEFT', 'LEFT' ], [ 'SENSOR_KEY_RIGHT', 'RIGHT' ] ]
};

sensors.light = {};
sensors.light.ardu = {
    title : 'LIGHT',
    modes : [ {
        name : 'LIGHT',
        type : 'Number',
        unit : 'PERCENT'
    } ],
    ports : [ [ '0', '0' ], [ '1', '1' ], [ '2', '2' ], [ '3', '3' ], [ '4', '4' ], [ '5', '5' ], [ '6', '6' ], [ '7', '7' ] ]
};

sensors.light.nxt = {
    title : 'LIGHT',
    modes : [ {
        name : 'LIGHT',
        type : 'Number',
        unit : 'PERCENT',
        value : 50
    }, {
        name : 'AMBIENTLIGHT',
        type : 'Number',
        unit : 'PERCENT',
        value : 50
    } ],
    ports : [ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ],
    standardPort : '3',
};

sensors.sound = {};
sensors.sound.ev3 = {
    title : 'SOUND',
    modes : [ {
        name : 'SOUND',
        type : 'Number',
        unit : 'PERCENT',
        op : 'NUM_REV',
        value : 50
    } ],
    ports : [ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ]
}
sensors.sound.nxt = {
    title : 'SOUND',
    modes : [ {
        name : 'SOUND',
        type : 'Number',
        unit : 'PERCENT',
        op : 'NUM_REV',
        value : 50
    } ],
    ports : [ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ],
    standardPort : '2',
}

sensors.temperature = {};
sensors.temperature.bob3 = {
    title : 'TEMPERATURE',
    modes : [ {
        name : 'VALUE',
        type : 'Number',
        unit : 'DEGREE',
        value : 20
    } ]
};

sensors.timer = {};
sensors.timer.ardu = {
    title : 'TIMER',
    modes : [ {
        name : 'VALUE',
        type : 'Number',
        unit : 'MS',
        op : 'NUM_REV',
        value : 500
    } ],
    ports : [ [ ' 1', '1' ] ]
};

sensors.timer.bob3 = sensors.timer.ardu;
sensors.timer.calliope = sensors.timer.ardu;
sensors.timer.nxt = sensors.timer.ardu;
sensors.timer.microbit = sensors.timer.ardu;
sensors.timer.ev3 = {
    title : 'TIMER',
    modes : [ {
        name : 'VALUE',
        type : 'Number',
        unit : 'MS',
        op : 'NUM_REV',
        value : 500
    } ],
    ports : [ [ ' 1', '1' ], [ ' 2', '2' ], [ ' 3', '3' ], [ ' 4', '4' ], [ ' 5', '5' ] ]
};

sensors.pinTouch = {};
sensors.pinTouch.bob3 = {
    title : 'PIN_TOUCH',
    ports : [ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ],
    modes : [ {
        name : 'PRESSED',
        type : 'Boolean',
        question : true,
    } ],
    standardPort : '1'
};
sensors.touch = {};
sensors.touch.bob3 = {
    title : 'TOUCH',
    ports : [ [ 'MOTOR_LEFT', '2' ], [ 'MOTOR_RIGHT', '1' ] ],
    slot : [ [ 'SENSOR_TOP', '1' ], [ 'CENTER', '2' ], [ 'SENSOR_BOTTOM', '3' ], [ 'SENSOR_ANY', '0' ] ],
    modes : [ {
        name : 'PRESSED',
        type : 'Boolean',
        question : true,
    } ]
};
sensors.touch.ev3 = {
    title : 'TOUCH',
    ports : [ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ],
    modes : [ {
        name : 'PRESSED',
        type : 'Boolean',
        question : true,
    } ],
    standardPort : '1'
};
sensors.touch.nxt = sensors.touch.ev3;

sensors.ultrasonic = {};
sensors.ultrasonic.ardu = {
    title : 'ULTRASONIC',
    ports : [ [ 'MOTOR_LEFT', '0' ], [ 'CENTER', '1' ], [ 'MOTOR_RIGHT', '2' ], [ 'SENSOR_SONAR', '3' ] ],
    modes : [ {
        name : 'DISTANCE',
        type : 'Number',
        unit : 'CM',
    } ]
};

sensors.ultrasonic.ev3 = {
    title : 'ULTRASONIC',
    ports : [ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ],
    modes : [ {
        name : 'DISTANCE',
        type : 'Number',
        unit : 'CM',
    }, {
        name : 'PRESENCE',
        type : 'Boolean',
    } ],
    standardPort : '4'
};

sensors.ultrasonic.nxt = {
    title : 'ULTRASONIC',
    ports : [ [ 'Port 1', '1' ], [ 'Port 2', '2' ], [ 'Port 3', '3' ], [ 'Port 4', '4' ] ],
    modes : [ {
        name : 'DISTANCE',
        type : 'Number',
        unit : 'CM',
    } ],
    standardPort : '4'
};
sensors.ultrasonic.mbot = sensors.ultrasonic.nxt;

var sensorsAll = [];
sensorsAll.ev3 = [ sensors.touch.ev3, sensors.ultrasonic.ev3, sensors.colour.ev3, sensors.infrared.ev3, sensors.encoder.ev3, sensors.key.ev3, sensors.gyro.ev3,
        sensors.timer.ev3 ];
sensorsAll.nxt = [ sensors.touch.nxt, sensors.sound.nxt, sensors.light.nxt, sensors.ultrasonic.nxt, sensors.encoder.nxt, sensors.key.nxt, sensors.colour.nxt,
        sensors.timer.nxt ];
sensorsAll.bob3 = [ sensors.touch.bob3, sensors.infrared.bob3, sensors.temperature.bob3, sensors.timer.bob3 ];

function initSensors() {
    for ( var sensor in sensors) {
        if (sensors.hasOwnProperty(sensor)) {
            Blockly.Blocks['robSensors_' + sensor + '_getSample'] = {
                sensor : sensor,
                init : function() {
                    Blockly.Blocks['robSensors_generic'].init.call(this, sensors[this.sensor][this.workspace.device]);
                }
            };
        }
    }
};

initSensors();

Blockly.Blocks['robSensors_getSample'] = {
    init : function() {
        Blockly.Blocks['robSensors_generic_all'].init.call(this, sensorsAll[this.workspace.device]);
    }
};

// map other names to the available ones here ***********************************************************************************

Blockly.Blocks['robSensors_battery_voltage'] = Blockly.Blocks['robSensors_battery_getSample'];
Blockly.Blocks['robSensors_key_isPressed'] = Blockly.Blocks['robSensors_key_getSample'];
Blockly.Blocks['robSensors_touch_isPressed'] = Blockly.Blocks['robSensors_touch_getSample'];
//Blockly.Blocks['mbedSensors_compass_getSample'] = Blockly.Blocks['robSensors_compass_getSample'];

Blockly.Blocks['bob3Sensors_ambientlight'] = Blockly.Blocks['robSensors_infrared_getSample'];
Blockly.Blocks['bob3Sensors_temperature_getSample'] = Blockly.Blocks['robSensors_temperature_getSample'];
Blockly.Blocks['bob3Sensors_getCode'] = Blockly.Blocks['robSensors_code_getSample'];
Blockly.Blocks['bob3Sensors_touch_getSample'] = Blockly.Blocks['robSensors_touch_getSample'];
Blockly.Blocks['bob3Sensors_getSample_bob3'] = Blockly.Blocks['robSensors_getSample'];

//Blockly.Blocks['mbedSensors_key_isPressed'] = Blockly.Blocks['robSensors_key_getSample'];
//Blockly.Blocks['mbedSensors_pin_isTouched'] = Blockly.Blocks['robSensors_pin_getSample'];
//Blockly.Blocks['mbedSensors_gesture_isActive'] = Blockly.Blocks['robSensors_gesture_getSample'];
//Blockly.Blocks['mbedSensors_compass_getSample'] = Blockly.Blocks['robSensors_compass_getSample'];
//Blockly.Blocks['mbedSensors_microphone_getSample'] = Blockly.Blocks['robSensors_microphone_getSample'];
Blockly.Blocks['mbedSensors_timer_getSample'] = Blockly.Blocks['robSensors_timer_getSample'];
//Blockly.Blocks['mbedSensors_microphone_getSample'] = Blockly.Blocks['robSensors_microphone_getSample'];
//Blockly.Blocks['mbedSensors_temperature_getSample'] = Blockly.Blocks['robSensors_temperature_getSample'];
//Blockly.Blocks['mbedSensors_getRssi'] = Blockly.Blocks['robSensors_rssi_getSample'];
//Blockly.Blocks['mbedSensors_ambientLight_getSample'] = Blockly.Blocks['robSensors_light_getSample'];
//Blockly.Blocks['mbedSensors_pin_getSample'] = Blockly.Blocks['robSensors_pin_getSample'];
//Blockly.Blocks['mbedSensors_rotation_getSample'] = Blockly.Blocks['robSensors_rotation_getSample'];
//Blockly.Blocks['mbedSensors_acceleration_getSample'] = Blockly.Blocks['robSensors_acceleration_getSample'];

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

Blockly.Blocks['robSensors_generic'] = {
    /*- Generic sensor definition. Will create e.g. the following xml: 
     *
     * <block type="robSensors_ultrasonic_getSample" id="vG?X/lTw]%:p!z.},u;r" intask="false">
     *     <mutation mode="DISTANCE"></mutation> 
     *     <field name="MODE">DISTANCE</field> 
     *     <field name="SENSORPORT">4</field> 
     *     <field name="SLOT"></field> 
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
        // do we have ports?
        var ports;
        if (sensor.ports) {
            var portsList = [];
            for (var i = 0; i < sensor.ports.length; i++) {
                portsList.push([ Blockly.Msg[sensor.ports[i][0]] || sensor.ports[i][0], sensor.ports[i][1] ]);
            }
            ports = new Blockly.FieldDropdown(portsList);
        } else {
            ports = new Blockly.FieldHidden();
        }
        // do we have a slot?
        var slot;
        if (sensor.slot) {
            var portsList = [];
            for (var i = 0; i < sensor.slot.length; i++) {
                portsList.push([ Blockly.Msg[sensor.slot[i][0]] || sensor.slot[i][0], sensor.slot[i][1] ]);
            }
            slot = new Blockly.FieldDropdown(portsList);
        } else {
            slot = new Blockly.FieldHidden();
        }
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
        var firstMode = sensor.modes[0];
        // question or not?
        if (firstMode.question) {
            this.appendDummyInput().appendField(Blockly.Msg['SENSOR_' + sensor.title + '_' + this.workspace.device.toUpperCase()]
                    || Blockly.Msg['SENSOR_' + sensor.title] || sensor.title).appendField(modes, 'MODE').appendField(ports, 'SENSORPORT').appendField(slot, 'SLOT').appendField(Blockly.Msg['SENSOR_IS_'
                    + firstMode.name]
                    || firstMode.name);
        } else {
            this.appendDummyInput().appendField(Blockly.Msg.GET).appendField(modes, 'MODE').appendField(Blockly.Msg['SENSOR_UNIT_' + firstMode.unit]
                    || firstMode.unit || '', 'UNIT').appendField(Blockly.Msg['SENSOR_' + sensor.title + '_' + this.workspace.device.toUpperCase()]
                    || Blockly.Msg['SENSOR_' + sensor.title] || sensor.title).appendField(ports, 'SENSORPORT').appendField(slot, 'SLOT');
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
                        break;
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
     *     <field name="SLOT"></field> 
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
        this.slot = [];

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
                } else {
                    this.ports.push(new Blockly.FieldHidden());
                }
                if (sensors[i].slot) {
                    var portsList = [];
                    for (var l = 0; l < sensors[i].slot.length; l++) {
                        portsList.push([ Blockly.Msg[sensors[i].slot[l][0]] || sensors[i].slot[l][0], sensors[i].slot[l][1] ]);
                    }
                    this.slot.push(new Blockly.FieldDropdown(portsList));
                } else {
                    this.slot.push(new Blockly.FieldHidden());
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

        this.appendDummyInput('ROW').appendField(Blockly.Msg.GET, 'GET').appendField(dropdownModes, 'SENSORTYPE').appendField(this.ports[0], 'SENSORPORT').appendField(this.slot[0], 'SLOT');

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
            input.appendField(this.ports[index], 'SENSORPORT').appendField(this.slot[index], 'SLOT');
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
