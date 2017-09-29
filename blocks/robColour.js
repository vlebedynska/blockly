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
            colorField.setColours(['#000000', '#0057A6', '#00642E', '#00FF00', '#585858', '#800080', '#B30006', '#DC143C', '#EE82EE', '#F7D117', '#FF00FF', '#FFA500', '#FFFFFF']).setColumns(13);
        }
        else if (this.workspace.device === 'bob3') {
            colorField.setColours(['#000000', '#0000FF', '#228822', '#4466EE', '#4488AA', '#6633AA', '#6699EE', '#55FF99', '#00FF00', '#77FFDD', '#00FFFF', '#DD4422', '#FF0000', '#FF0088', '#FF00FF', '#FF7755', '#FF8800', '#FFFF00', '#FFFFFF']).setColumns(19);
        }
        else {
            colorField.setColours(['#000000', '#0057A6', '#00642E', '#532115', '#585858', '#B30006', '#F7D117', '#FFFFFF']).setColumns(8);
        }
        this.appendDummyInput().appendField(colorField, 'COLOUR');
        this.setOutput(true, 'Colour');
        this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP);
    }
};
