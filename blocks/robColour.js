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
        var colorField = new Blockly.FieldColour('#FFFFFF');
        if (this.workspace.device === 'nxt') {
            colorField.setColours(["#585858", "#000000", "#0057a6", "#00642e", "#f7d117", "#b30006", "#FFFFFF", "#EE82EE", "#800080", "#00FF00", "#FFA500", "#DC143C", "#FF00FF"]).setColumns(13);
        }
        else if (this.workspace.device === 'bob3') {
            colorField.setColours(["#DD4422", "#0000FF", "#00FF00", "#FFFF00", "#FF0000", "#FFFFFF", "#6633AA", "#FF0088", "#00FFFF", "#FF8800", "#FF00FF", "#77FFDD", "#FF7755", "#6699EE", "#4488AA", "#4466EE", "#228822", "#55FF99", "#000000"]).setColumns(19);
        }
        else {
            colorField.setColours(["#585858", "#000000", "#0057a6", "#00642e", "#f7d117", "#b30006", "#FFFFFF", "#532115"]).setColumns(8);
        }
        this.appendDummyInput().appendField(colorField, 'COLOUR');
        this.setOutput(true, 'Colour');
        this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP);
    }
};
