/**
 * @fileoverview Action blocks for Bob3.
 * @requires Blockly.Blocks
 * @author Evgeniya
 */

'use strict';

goog.provide('Blockly.Blocks.bob3Actions');

goog.require('Blockly.Blocks');

Blockly.Blocks['bob3Actions_set_led'] = {
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
        var ledSide = new Blockly.FieldDropdown([ [ 'Left', 'Left' ], [ 'Right', 'Right' ] ]);
        var ledState = new Blockly.FieldDropdown([ [ 'On', 'On' ], [ 'Off', 'Off' ] ]);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.LED_ON).appendField(Blockly.Msg.NAO_PART_BODY).appendField(ledSide, 'LEDSIDE').appendField(ledState, 'LEDSTATE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_ON_TOOLTIP);
    }
};
