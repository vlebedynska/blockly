/**
 * @fileoverview Action blocks for Vorwerk.
 * @requires Blockly.Blocks
 * @author Beate
 */
'use strict';

goog.provide('Blockly.Blocks.vorwerkActions');

goog.require('Blockly.Blocks');

Blockly.Blocks['vorwerkActions_play_file'] = {
    /**
     * Play a sound file.
     * 
     * @constructs robActions_play_file
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            SOUND - Soundfile0-3
     * @returns after execution (time the soundfile needs to finish)
     * @memberof Block
     */

    init : function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_FILE_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        var file = new Blockly.FieldDropdown([ [ '1', '0' ], [ '2', '1' ], [ '3', '2' ], [ '4', '3' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.PLAY + ' ' + Blockly.Msg.PLAY_FILE).appendField(file, 'FILE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PLAY_FILE_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_FILE_HELP));
    }
};

Blockly.Blocks['vorwerkActions_brush_on'] = {
    /**
     * Say a text.
     * 
     * @constructs vorwerkActions_brush_on
     * @this.Blockly.Block
     * @param {String} 
     *  turns on the brush
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('OUT').appendField(Blockly.Msg.BRUSH_ON);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.BRUSH_ON_TOOLTIP);
    }
};

Blockly.Blocks['vorwerkActions_brush_off'] = {
    /**
     * Say a text.
     * 
     * @constructs vorwerkActions_brush_off
     * @this.Blockly.Block
     * @param {String} 
     *  turns on the brush
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.BRUSH_OFF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.BRUSH_OFF_TOOLTIP);
    }
};

Blockly.Blocks['vorwerkActions_side_brush'] = {
    /**
     * Turn side brush on/off.
     * 
     * @constructs vorwerkActions_side_brush
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            BRUSH_STATE - On or Off
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var brushState = new Blockly.FieldDropdown([ [ Blockly.Msg.BRICKLIGHT_ON, 'ON' ], [ Blockly.Msg.OFF, 'OFF' ] ]);       
        this.appendDummyInput().appendField(Blockly.Msg.SIDE_BRUSH_STATUS).appendField(brushState, 'BRUSH_STATE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.SIDE_BRUSH_TOOLTIP);
    }
};

Blockly.Blocks['vorwerkActions_vacuum_on'] = {
    /**
     * Turn on the vacuum.
     * 
     * @constructs vorwerkActions_vacuum_on
     * @this.Blockly.Block
     * @param {String} 
     *  turns on the vacuum
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('OUT').appendField(Blockly.Msg.VACUUM_ON);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VACUUM_ON_TOOLTIP);
    }
};

Blockly.Blocks['vorwerkActions_vacuum_off'] = {
    /**
     * Turn off the vacuum.
     * 
     * @constructs vorwerkActions_vacuum_off
     * @this.Blockly.Block
     * @param {String} 
     *  turns off the brush
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.VACUUM_OFF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VACUUM_OFF_TOOLTIP);
    }
};
