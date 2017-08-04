/**
 * @fileoverview Communication blocks for Bob3.
 * @requires Blockly.Blocks
 * @author Evgeniya
 */
'use strict';

goog.provide('Blockly.Blocks.bob3Communication');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

Blockly.Blocks['bob3Communication_sendBlock'] = {
    /**
     * Send a message to another device, maybe via the roberta lab server.
     *
     * @this.Blockly.Block
     * @param {data}
     *            DATA - message content (numbers only)
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_COMMUNICATION_RGB);
        var dataType = new Blockly.FieldDropdown([[ Blockly.Msg.VARIABLES_TYPE_NUMBER, 'Number' ]], function(option) {
            if (option && this.sourceBlock_.getFieldValue('TYPE') !== option) {
                this.sourceBlock_.updateType_(option);
            }
        });
        this.dataType_ = 'Number';
        this.appendValueInput('sendData').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.CONNECTION_SEND_DATA).setCheck(this.dataType_);
        this.setTooltip(Blockly.Msg.CONNECTION_MBED_SEND_TOOLTIP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(false);
    },
    mutationToDom : function() {
        if (this.dataType_ === undefined) {
            return false;
        }
        var container = document.createElement('mutation');
        container.setAttribute('datatype', this.dataType_);
        return container;
    },
    domToMutation : function(xmlElement) {
        this.dataType_ = xmlElement.getAttribute('datatype');
        if (this.dataType_) {
            this.getInput('sendData').setCheck(this.dataType_);
        }
    },
    updateType_ : function(option) {
        this.dataType_ = option;
        this.getInput('sendData').setCheck(this.dataType_);
    },
};

Blockly.Blocks['bob3Communication_receiveBlock'] = {
    /**
     * Send a message to another device, maybe via the roberta lab server.
     *
     * @constructs bob3Communication_receiveBlock
     * @this.Blockly.Block
     * @param {data}
     *            DATA - message content (numbers only)
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_COMMUNICATION_RGB);
        var dataType = new Blockly.FieldDropdown([ [ Blockly.Msg.VARIABLES_TYPE_NUMBER, 'Number' ] ], function(option) {
            if (option && this.sourceBlock_.getFieldValue('TYPE') !== option) {
                this.sourceBlock_.updateType_(option);
            }
        });
        this.dataType_ = 'Number';
        this.appendValueInput('receiveData').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.CONNECTION_RECEIVED_DATA).appendField(Blockly.Msg.TIMEOUT).setCheck(this.dataType_);
        this.setOutput(true, this.dataType_);
        this.setTooltip(Blockly.Msg.CONNECTION_MBED_RECEIVE_TOOLTIP);
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
    mutationToDom : function() {
        if (this.dataType_ === undefined) {
            return false;
        }
        var container = document.createElement('mutation');
        container.setAttribute('datatype', this.dataType_);
        return container;
    },
    domToMutation : function(xmlElement) {
        this.dataType_ = xmlElement.getAttribute('datatype');
        if (this.dataType_) {
            this.setOutput(true, this.dataType_);
        }
    },
    updateType_ : function(option) {
        this.dataType_ = option;
        this.setOutput(true, this.dataType_);
    },
};
