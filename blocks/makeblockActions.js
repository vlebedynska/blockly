/**
 * @fileoverview Action blocks for MakeBlock.
 * @requires Blockly.Blocks
 * @author Evgeniya
 */

'use strict';

goog.provide('Blockly.Blocks.makeblockActions');

goog.require('Blockly.Blocks');

Blockly.Blocks['makeblockActions_leds_on'] = {
    /**
     * Turn brick LED on.
     *
     * @constructs makeblockActions_leds_on
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            Left, Right
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        var ledSide = new Blockly.FieldDropdown([ [ 'Left', 'Left' ], [ 'Right', 'Right' ] ]);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('COLOR').appendField(Blockly.Msg.LED_ON).appendField(Blockly.Msg.BRICKLIGHT_COLOR).setCheck('Colour').appendField(ledSide, 'LEDSIDE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_ON_TOOLTIP);
    }
};

Blockly.Blocks['makeblockActions_leds_off'] = {
    /**
     * Turn brick LED off.
     *
     * @constructs makeblockActions_brickLight_off
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        var ledSide = new Blockly.FieldDropdown([ [ 'Left', 'Left' ], [ 'Right', 'Right' ] ]);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.BRICKLIGHT).appendField(Blockly.Msg.OFF).appendField(ledSide, 'LEDSIDE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.BRICKLIGHT_OFF_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.BRICKLIGHT_OFF_HELP));
    }
};

Blockly.Blocks['makeblockActions_external_leds_on'] = {
    /**
     * Turn external LED on.
     *
     * @constructs makeblockActions_leds_on
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            Left, Right
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        var ledNumber = new Blockly.FieldDropdown([ [ 'LED 1', '1' ], [ 'LED 2', '2' ], [ 'LED 3', '3' ], [ 'LED 4', '4' ] ]);
        var actorPort = new Blockly.FieldDropdown([['Port 1', '1'], ['Port 2', '2'], ['Port 3', '3'], ['Port 4', '4']]);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('COLOR').appendField(ledNumber, 'LEDNUMBER').appendField(Blockly.Msg.ON).appendField(actorPort, 'SENSORPORT').appendField(Blockly.Msg.BRICKLIGHT_COLOR).setCheck('Colour');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_ON_TOOLTIP);
    }
};

Blockly.Blocks['makeblockActions_external_leds_off'] = {
    /**
     * Turn external brick LED off.
     *
     * @constructs makeblockActions_brickLight_off
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        var ledNumber = new Blockly.FieldDropdown([ [ 'LED 1', '1' ], [ 'LED 2', '2' ], [ 'LED 3', '3' ], [ 'LED 4', '4' ] ]);
        var actorPort = new Blockly.FieldDropdown([['Port 1', '1'], ['Port 2', '2'], ['Port 3', '3'], ['Port 4', '4']]);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(ledNumber, 'LEDNUMBER').appendField(Blockly.Msg.OFF).appendField(actorPort, 'SENSORPORT');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.BRICKLIGHT_OFF_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.BRICKLIGHT_OFF_HELP));
    }
};

Blockly.Blocks['makeblockActions_display_image'] = {
    /**
     * Display an image on the matrix.
     *
     * @constructs mbedActions_display_image
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            PICTURE - Smiley1-4
     * @param {Number}
     *            X Position on a matrix
     * @param {Number}
     *            Y Position on a matrix
     * @returns immediately
     * @memberof Block
     */

    init : function() {
      this.setColour(Blockly.CAT_ACTION_RGB);
      var actorPort = new Blockly.FieldDropdown([['Port 1', '1'], ['Port 2', '2'], ['Port 3', '3'], ['Port 4', '4']]);
      this.appendValueInput('VALUE').appendField(Blockly.Msg.DISPLAY_SHOW).appendField(Blockly.Msg.DISPLAY_IMAGE).setCheck('Image').appendField(actorPort, 'SENSORPORT');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(Blockly.Msg.DISPLAY_PICTURE_TOOLTIP);
    }
};

Blockly.Blocks['makeblockActions_display_text'] = {
    /**
     * Display a text on the screen.
     *
     * @constructs makeblockActions_display_number
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        var actorPort = new Blockly.FieldDropdown([['Port 1', '1'], ['Port 2', '2'], ['Port 3', '3'], ['Port 4', '4']]);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('VALUE').appendField(Blockly.Msg.DISPLAY_SHOW + ' ' + Blockly.Msg.DISPLAY_TEXT).setCheck([ 'Number', 'Boolean', 'String',
                'Colour', 'Connection' ]).appendField(actorPort, 'SENSORPORT');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_PICTURE_TOOLTIP);
    }
};

Blockly.Blocks['makeblokcActions_display_clear'] = {
    /**
     * Clear the display.
     *
     * @constructs mbedActions_display_clear
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        var actorPort = new Blockly.FieldDropdown([['Port 1', '1'], ['Port 2', '2'], ['Port 3', '3'], ['Port 4', '4']]);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.DISPLAY_CLEAR).appendField(actorPort, 'SENSORPORT');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_CLEAR_TOOLTIP);
    }
};
