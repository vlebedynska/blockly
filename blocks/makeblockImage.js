/**
 * @fileoverview Image blocks for MekeBlock.
 * @requires Blockly.Blocks
 * @author Evgeniya
 */
'use strict';

goog.provide('Blockly.Blocks.makeblockImage');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

Blockly.Blocks['makeblockImage_image'] = {
    /**
     * Represents an image.
     *
     * @constructs mbedImage_image
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_IMAGE_RGB);
        this.appendDummyInput().appendField("    0      1      2      3     4     5     6     7     8      9      10      11     12     13     14     15");
        for (var i = 0; i < 8; i++){
          this.appendDummyInput().appendField(i.toString()).appendField(new Blockly.FieldTextInput('  ', this.validate_), "P0" + i).appendField(' ').appendField(new Blockly.FieldTextInput(
                  '  ', this.validate_), "P1" + i).appendField(' ').appendField(new Blockly.FieldTextInput('  ', this.validate_), "P2" + i).appendField(' ').appendField(new Blockly.FieldTextInput(
                  '  ', this.validate_), "P3" + i).appendField(' ').appendField(new Blockly.FieldTextInput('  ', this.validate_), "P4" + i).appendField(new Blockly.FieldTextInput(
                  '  ', this.validate_), "P5" + i).appendField(new Blockly.FieldTextInput('  ', this.validate_), "P6" + i).appendField(new Blockly.FieldTextInput('  ', this.validate_), "P7" + i ).appendField(new Blockly.FieldTextInput(
                  '  ', this.validate_), "P8" + i).appendField(' ').appendField(new Blockly.FieldTextInput(
                  '  ', this.validate_), "P9" + i).appendField(' ').appendField(new Blockly.FieldTextInput('  ', this.validate_), "P10" + i).appendField(' ').appendField(new Blockly.FieldTextInput(
                  '  ', this.validate_), "P11" + i).appendField(' ').appendField(new Blockly.FieldTextInput('  ', this.validate_), "P12" + i).appendField(new Blockly.FieldTextInput(
                  '  ', this.validate_), "P13" + i).appendField(new Blockly.FieldTextInput('  ', this.validate_), "P14" + i).appendField(new Blockly.FieldTextInput('  ', this.validate_), "P15" + i );
        }

  this.setOutput(true, 'Image');
        this.setTooltip(Blockly.Msg.IMAGE_TOOLTIP);
    },
    validate_ : function(p) {
        if (!Bl== Blockly.FieldTextInput.htmlInput_.value) {
            if (p == '  ') {
                Blockly.FieldTextInput.htmlInput_.value = '#';
                return '#';
            } else if (p == '#') {
                Blockly.FieldTextInput.htmlInput_.value = '  ';
                return '  ';
            } else if (p.match(/^[1-16]$/)) {
                Blockly.FieldTextInput.htmlInput_.value = p;
                return p;
            } else if (p == ' ' || p == '0') {
                Blockly.FieldTextInput.htmlInput_.value = '  ';
                return '  ';
            } else if (p.substring(0, 2) == '  ') {
                Blockly.FieldTextInput.htmlInput_.value = p.substr(2);
                return p.substr(2);
            } else if (p.substring(0, 1) == '#') {
                Blockly.FieldTextInput.htmlInput_.value = p.substr(1);
                return p.substr(1);
            } else if (!p.match(/^[1-16]$/)) {
                Blockly.FieldTextInput.htmlInput_.value = '#';
                return '#';
            } else {
                Blockly.FieldTextInput.htmlInput_.value = '  ';
                return '  ';
            }
        }
        Blockly.FieldTextInput.htmlInput_.value = '';
        return p;
    }
};
