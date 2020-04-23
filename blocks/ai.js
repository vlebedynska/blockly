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
        this.setTooltip(Blockly.Msg.NEURAL_NETWORK_TOOLTIP);
    }

}

Blockly.Blocks['ai_sensor'] = {
    /**
     * TODO Write a block description
     * TODO SwitchCase for DropDowns or dynamically access device.
     * This is the input layer node
     */

    init:function () {
        var aiSensor = new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 1", 'ULTRASONIC_PORT_1'],
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 2", 'ULTRASONIC_PORT_2'],
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 3", 'ULTRASONIC_PORT_3'],
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 4", 'ULTRASONIC_PORT_4']
        ]);
        this.setOutput(true, 'Sensor');
        this.appendDummyInput().appendField(aiSensor, "SENSOR")
            .appendField(Blockly.Msg.THRESHOLD)
            .appendField(new Blockly.FieldNumber(0), "THRESHOLD");
        this.setTooltip(Blockly.Msg.ARRAY_SENSOR_TOOLTIP);
    }

}

Blockly.Blocks['ai_actor'] = {
    /**
     * TODO Write a block description
     * TODO SwitchCase for DropDowns or dynamically access device.
     * This is the output layer node
     */
    
    init: function () {
/*      var ports = [];
        switch (this.workspace.device) {
                    case 'ev3':
                        ports = [ [ Blockly.Msg.MOTOR_PORT + ' A', 'A' ], [ Blockly.Msg.MOTOR_PORT + ' B', 'B' ], [ Blockly.Msg.MOTOR_PORT + ' C', 'C' ],
                            [ Blockly.Msg.MOTOR_PORT + ' D', 'D' ] ];
                        break;*/
        //TODO it's now done only for EV3 - add other robot systems in the future
        var ports = [];
        ports = [
            [ Blockly.Msg.MOTOR_PORT + ' A', 'MOTORPORT_A' ],
            [ Blockly.Msg.MOTOR_PORT + ' B', 'MOTORPORT_B' ],
            [ Blockly.Msg.MOTOR_PORT + ' C', 'MOTORPORT_C' ],
            [ Blockly.Msg.MOTOR_PORT + ' D', 'MOTORPORT_D' ]
        ];
        var aiActor = new Blockly.FieldDropdown(ports);
        this.setOutput(true, 'Actor');
        this.appendDummyInput()
            .appendField(aiActor, 'ACTOR')
        this.setTooltip(Blockly.Msg.ARRAY_ACTOR_TOOLTIP);
    }

}



Blockly.Blocks['ai_hidden'] = {
    /**
     * TODO define ai_hiddens block for the hidden layer nodes
      */
    init: function () {

    }
}