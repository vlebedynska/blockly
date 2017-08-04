/**
 * @fileoverview Colour block for EV3.
 * @requires Blockly.Blocks
 * @author Beate
 */
'use strict';

goog.provide('Blockly.Blocks.robColour');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

Blockly.Blocks['robColour_picker'] = {
    /**
     * Pick a colour from the EV3 colour palette.
     *
     * @constructs robColour_picker
     * @this.Blockly.Block
     * @param {Colour/Palette}
     *            COLOUR - gray (undefined), black, blue, green, yellow, red,
     *            white or brown
     * @returns immediately
     * @returns {Colour} Possible colours are: <br>
     *          gray (undefined), black, blue, green, yellow, red, white or
     *          brown
     * @memberof Block
     */

    init : function() {
        this.setHelpUrl(Blockly.Msg.COLOUR_PICKER_HELPURL);
        this.setColour(Blockly.CAT_COLOUR_RGB);
        var colorField = new Blockly.FieldColour('#585858');
        if (this.workspace.device === 'nxt') {
            Blockly.FieldColour.COLUMNS = 13;
            Blockly.FieldColour.COLOURS = new Array("#585858", "#000000", "#0057a6", "#00642e", "#f7d117", "#b30006", "#FFFFFF", "#EE82EE", "#800080", "#00FF00", "#FFA500", "#DC143C", '#FF00FF' );
        }
        else if (this.workspace.device === 'nibo') {
            colorField = new Blockly.FieldColour('#0000FF');
            Blockly.FieldColour.COLUMNS = 19;
            Blockly.FieldColour.COLOURS = new Array("#DD4422", "#0000FF", "#00FF00", "#FFFF00", "#FF0000", "#FFFFFF", "#6633AA", "#FF0088", "#00FFFF", "#FF8800", "#FF00FF", "#77FFDD", '#FF7755', '#6699EE', '#4488AA', '#4466EE', '#228822', '#55FF99', '#000000');
        }
        else {
            Blockly.FieldColour.COLUMNS = 8;
            Blockly.FieldColour.COLOURS = new Array("#585858", "#000000", "#0057a6", "#00642e", "#f7d117", "#b30006", "#FFFFFF", "#532115");
        }
        this.appendDummyInput().appendField(colorField, 'COLOUR');
        this.setOutput(true, 'Colour');
        this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP);
    }
};
