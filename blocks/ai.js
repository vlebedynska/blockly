/**
 * @fileoverview AI blocks
 * @requires Blockly.Blocks
 * @author vlebedynska
 */

'use strict';

goog.provide('Blockly.Blocks.ai');

goog.require('Blockly.Blocks');

//Blockly.Blocks.lists.HUE = 260;


Blockly.Blocks['ai_neural_network'] = {
    /**
     * TODO Write a block description
     */

    init : function () {

        this.appendDummyInput().appendField( 'Input Layer');
        this.appendValueInput("INPUT_LAYER").setCheck("Array_InputNode");
        this.appendDummyInput().appendField( '--------');
        this.appendDummyInput().appendField( 'Output Layer');
        this.appendValueInput("OUTPUT_LAYER").setCheck("Array_OutputNode");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NEURAL_NETWORK_TOOLTIP);
    }

}

Blockly.Blocks['ai_nn_input_node_ultrasonic'] = {
    /**
     * TODO Write a block description
     * TODO SwitchCase for DropDowns or dynamically access device.
     * This is the input layer node
     */

    init:function () {
        var aiInput = new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 1", 'ULTRASONIC_PORT_1'],
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 2", 'ULTRASONIC_PORT_2'],
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 3", 'ULTRASONIC_PORT_3'],
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 4", 'ULTRASONIC_PORT_4']
        ]);
        this.setOutput(true, 'InputNode');
        this.appendDummyInput().appendField(aiInput, "INPUTNODE")
            .appendField(Blockly.Msg.THRESHOLD)
            .appendField(new Blockly.FieldNumber(0), "THRESHOLD");
        this.setTooltip(Blockly.Msg.VARIABLE_TYPE_NN_INPUT_TOOLTIP);
    }

}

Blockly.Blocks['ai_nn_input_node_coloursensor_rgb_channel'] = {
    /**
     * Block for composing a colour from RGB components.
     *
     * @this Blockly.Block
     */
    init : function() {
        this.setColour(Blockly.CAT_AI_RGB);
        var colorField = new Blockly.FieldColour('#DC143C');
        colorField
            .setColours([ '#DC143C', '#0057A6', '#00FF00'])
            .setColumns(3);

        var port = new Blockly.FieldDropdown([
               [Blockly.Msg.PORT + " 1", '1'],
               [Blockly.Msg.PORT + " 2", '2'],
               [Blockly.Msg.PORT + " 3", '3'],
               [Blockly.Msg.PORT + " 4", '4']
            ]);

        this.setOutput(true, 'InputNode');
        this.appendDummyInput()
            .appendField(Blockly.Msg.SENSOR_COLOUR)
            .appendField(colorField, "COLOUR")
            .appendField(Blockly.Msg.SENSOR_COLOUR_PERSENTAGE)
            .appendField(port, "SENSORPORT");

        this.setTooltip(Blockly.Msg.COLOUR_RGB_TOOLTIP);
    }
}

Blockly.Blocks['ai_nn_output_node'] = {
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
        var aiOutput = new Blockly.FieldDropdown(ports);
        this.setOutput(true, 'OutputNode');
        this.appendDummyInput()
            .appendField(aiOutput, 'OUTPUTNODE')
        this.setTooltip(Blockly.Msg.VARIABLE_TYPE_NN_OUTPUT_TOOLTIP);
    }

}



Blockly.Blocks['ai_hidden'] = {
    /**
     * TODO define ai_hiddens block for the hidden layer nodes
      */
    init: function () {

    }
}