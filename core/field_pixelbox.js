/**
 * @fileoverview Pixelbox field. Valid characters are ' ', 0 - 9 and #. Fixed size of 16 x 16 pixel.
 *               Modified copy from field_checkbox
 * @author Beate Jost, beate.jost@iais.fraunhofer.de
 */
'use strict';

goog.provide('Blockly.FieldPixelbox');

goog.require('Blockly.FieldTextInput');

/**
 * Class for a checkbox field.
 * 
 * @param {string}
 *            state The initial state of the field ('TRUE' or 'FALSE').
 * @param {Function=}
 *            opt_validator A function that is executed when a new option is
 *            selected. Its sole argument is the new checkbox state. If it
 *            returns a value, this becomes the new checkbox state, unless the
 *            value is null, in which case the change is aborted.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldPixelbox = function(text, opt_validator) {
    Blockly.FieldPixelbox.superClass_.constructor.call(this, text, opt_validator);
    // force showing number keyboard on mobile devices
    this.inputType = 'number';
};
goog.inherits(Blockly.FieldPixelbox, Blockly.FieldTextInput);

/**
 * Install this pixelbox on a block.
 */
Blockly.FieldPixelbox.prototype.init = function() {
    if (this.fieldGroup_) {
        // Field has already been initialized once.
        return;
    }
    // Build the DOM.
    this.fieldGroup_ = Blockly.createSvgElement('g', {}, null);
    if (!this.visible_) {
        this.fieldGroup_.style.display = 'none';
    }
    this.borderRect_ = Blockly.createSvgElement('rect', {
        'rx' : 2,
        'ry' : 2,
        'x' : -Blockly.BlockSvg.SEP_SPACE_X / 2,
        'y' : 0,
        'height' : 16,
        'width' : 16
    }, this.fieldGroup_, this.sourceBlock_.workspace);
    /** @type {!Element} */
    this.textElement_ = Blockly.createSvgElement('text', {
        'class' : 'blocklyText blocklyPixel',
        'y' : this.size_.height - 12.5
    }, this.fieldGroup_);

    this.updateEditable();
    this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
    this.mouseUpWrapper_ = Blockly.bindEvent_(this.fieldGroup_, 'mouseup', this, this.onMouseUp_);
    // Force a render.
    this.updateTextNode_();
    if (Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, '', this.getValue()));
    }

    /**
     * Update the text node of this field to display the current text.
     * 
     * @private
     */
    Blockly.FieldPixelbox.prototype.updateTextNode_ = function() {
        if (!this.textElement_) {
            // Not rendered yet.
            return;
        }
        var text = this.text_;
        // Empty the text element.
        goog.dom.removeChildren(/** @type {!Element} */(this.textElement_));
        // Replace whitespace with non-breaking spaces so the text doesn't collapse.
        text = text.trim();

        if (!text) {
            // Prevent the field from disappearing if empty.
            text = ' ';
        }
        var textNode = document.createTextNode(text);
        this.textElement_.appendChild(textNode);

        this.size_.width = 16;
    };
};
