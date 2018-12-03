/**
 * @fileoverview Communication blocks for Bob3.
 * @requires Blockly.Blocks
 * @author Evgeniya
 */
'use strict';

goog.provide('Blockly.Blocks.makeblockCommunication');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

Blockly.Blocks['makeblockCommunication_sendBlock'] = {
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
        this.appendValueInput('sendData').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.CONNECTION_SEND_DATA).setCheck('String');
        this.setTooltip(Blockly.Msg.CONNECTION_MAKEBLOCK_SEND_TOOLTIP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(false);
    },
};

Blockly.Blocks['makeblockCommunication_receiveBlock'] = {
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
        this.appendDummyInput('receiveData').appendField(Blockly.Msg.CONNECTION_RECEIVED_DATA);
        this.setOutput(true, 'String');
        this.setTooltip(Blockly.Msg.CONNECTION_MAKEBLOCK_RECEIVE_TOOLTIP);
        this.setInputsInline(false);
    },
};
