/**
 * @fileoverview AI blocks
 * @requires Blockly.Blocks
 * @author vlebedynska
 */

'use strict';

goog.provide('Blockly.Blocks.ai');

goog.require('Blockly.Blocks');

Blockly.Blocks.lists.HUE = 260;


Blockly.Blocks['ai_neural_network'] = {
    /**
     * TODO Write a block description
     */

    init : function () {

        this.appendDummyInput().appendField( 'Input Layer');
        this.appendValueInput("INPUT_LAYER").setCheck("Array_Sensor");
        this.appendDummyInput().appendField( '--------');
        this.appendDummyInput().appendField( 'Output Layer');
        this.appendValueInput("OUTPUT_LAYER").setCheck("Array_Actor");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_ON_WHITE_TOOLTIP); //FIXME check Tooltips Feature
    }

}


Blockly.Blocks['ai_actor'] = {
    /**
     * TODO Write a block description
     * TODO SwitchCase for DropDowns or dynamically access device.
     */
    
    init: function () {
/*        var ports = [];
        switch (this.workspace.device) {
                    case 'ev3':
                        ports = [ [ Blockly.Msg.MOTOR_PORT + ' A', 'A' ], [ Blockly.Msg.MOTOR_PORT + ' B', 'B' ], [ Blockly.Msg.MOTOR_PORT + ' C', 'C' ],
                            [ Blockly.Msg.MOTOR_PORT + ' D', 'D' ] ];
                        break;*/

        var aiActor = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'MOTOR_A' ], [ Blockly.Msg.MOTOR_RIGHT, 'MOTOR_B' ] ])//TODO Fill with correct values
        this.setOutput(true, 'Actor');
        this.appendDummyInput()
            .appendField(aiActor, 'ACTOR')
        this.setTooltip(Blockly.Msg.LED_ON_WHITE_TOOLTIP);
    }

}

Blockly.Blocks['ai_sensor'] = {
    /**
     * TODO Write a block description
     * TODO SwitchCase for DropDowns or dynamically access device.
     */

    init:function () {
        var aiSensor = new Blockly.FieldDropdown([[Blockly.Msg.SENSOR_ACCELEROMETER, 'SENSOR1'], [Blockly.Msg.SENSOR_COLOUR, 'SENSOR2'], [Blockly.Msg.SENSOR_ULTRASONIC, 'SENSOR3'] ])
        this.setOutput(true, 'Sensor');
        this.appendDummyInput().appendField(aiSensor, "SENSOR")
            .appendField("Schwellenwert") //TODO Replace this dummy text with a Blockly.MSG.Block
            .appendField(new Blockly.FieldNumber(0), "NUMBER");
        this.setTooltip(Blockly.Msg.LED_ON_WHITE_TOOLTIP);
    }

}