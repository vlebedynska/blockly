/**
 * @fileoverview AI blocks
 * @requires Blockly.Blocks
 * @author vlebedynska
 */

'use strict';

goog.provide('Blockly.Blocks.ai');

goog.require('Blockly.Blocks');

Blockly.Blocks.lists.HUE = 260;

Blockly.Blocks['first_test_block'] = {
    /**
     * Turn bricklight on.
     *
     * @constructs bob3Actions_leds_on
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            LEDSIDE - left / right
     * @param {String/dropdown}
     *            LEDSTATE - on / off
     * @returns immediately
     * @memberof Block
     */
    init : function() {

        var input = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_ULTRASONIC, 'SENSOR_ULTRASONIC' ], [ Blockly.Msg.OFF, 'OFF' ] ]);
        var output = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_PORT, 'LED_4' ], [ Blockly.Msg.MOTOR_RIGHT, 'LED_3' ]  ]);
        this.appendStatementInput('STACK');
        this.setColour(Blockly.CAT_ACTION_RGB);
        //this.appendDummyInput().appendField(Blockly.Msg.SET_LED).appendField(Blockly.Msg.NAO_PART_BODY).appendField(input, 'LEDSIDE').appendField(output, 'LEDSTATE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_ON_WHITE_TOOLTIP);
    }
};



Blockly.Blocks['ai_neural_network'] = {
    /**
     * TODO Write a block description
     */

    init : function () {

        this.appendDummyInput().appendField( 'Input Layer');
        this.appendValueInput("INPUT_LAYER").setCheck("Array_Number");
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
     */
    
    init: function () {
        var aiActor = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'MOTOR_A' ], [ Blockly.Msg.MOTOR_RIGHT, 'MOTOR_B' ] ]); //TODO Fill with correct values
        this.setOutput(true, null);
        this.appendDummyInput().appendField(aiActor, 'ACTOR');
        this.setTooltip(Blockly.Msg.LED_ON_WHITE_TOOLTIP);
    }

}