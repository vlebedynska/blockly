/**
 * @fileoverview Utility functions for handling configuration blocks.
 * @author Beate.Jost@iais.fraunhofer.de
 */
'use strict';

goog.provide('Blockly.RobConfig');

goog.require('Blockly.Workspace');

/**
 * Find all instances of this configuration block and rename the values in the dropdown.
 * @param {string} oldName Configuration title to rename.
 * @param {string} newName New configuration name.
 * @param {!Blockly.Workspace} workspace Workspace rename variables in.
 */
Blockly.RobConfig.renameConfig = function(thatBlock, oldName, newName, workspace) {
    Blockly.Events.setGroup(true);
    var blocks = workspace.getAllBlocks();
    for (var x = 0; x < blocks.length; x++) {
        var thisBlock = blocks[x];
        if (thisBlock.dependConfig && thisBlock.sensor == thatBlock.confBlock) {
            var input = thisBlock.getInput('ROW');
            for (var j = input.fieldRow.length - 1; j > 0; j--) {
                if (input.fieldRow[j].name === 'SENSORPORT') {
                    var dropDown = input.fieldRow[j];
                    var index = -1;
                    for (var i = 0; i < dropDown.menuGenerator_.length; i++) {
                        if (dropDown.menuGenerator_[i][0] === oldName) {
                            index = i;
                            break;
                        }
                    }
                    if (dropDown.menuGenerator_[0][0] == Blockly.Msg.CONFIGURATION_NO_PORT) {
                        dropDown.menuGenerator_[0][0] = newName;
                        dropDown.menuGenerator_[0][1] = newName.toUpperCase();
                        dropDown.setValue(newName.toUpperCase());
                    } else if (index >= 0) {
                        dropDown.menuGenerator_[index][0] = newName;
                        dropDown.menuGenerator_[index][1] = newName.toUpperCase();
                        if (dropDown.value_ === oldName.toUpperCase()) {
                            dropDown.setValue(newName.toUpperCase());
                        }
                    } else {
                        var tempDropDown = dropDown.menuGenerator_;
                        var value = dropDown.getValue();
                        tempDropDown.push([ newName, newName.toUpperCase() ]);
                        input.removeField('SLOT');
                        input.removeField('SENSORPORT');
                        input.appendField(new Blockly.FieldDropdown(tempDropDown), 'SENSORPORT').appendField(new Blockly.FieldHidden(), 'SLOT');
                    }
                }
            }
        }
    }
    Blockly.Events.setGroup(false);
};

Blockly.RobConfig.disposeConfig = function(thisBlock) {
    Blockly.Events.setGroup(true);
    var blocks = Blockly.Workspace.getByContainer("blocklyDiv").getAllBlocks();
    for (var x = 0; x < blocks.length; x++) {
        var block = blocks[x];
        if (!block.dependConfig) {
            continue;
        }
        if (thisBlock.confBlock !== block.sensor) {
            continue;
        }
        var input = block.getInput('ROW');
        for (var j = input.fieldRow.length - 1; j > 0; j--) {
            if (input.fieldRow[j].name === 'SENSORPORT') {
                var dropDown = input.fieldRow[j];
                var index = -1;
                for (var i = 0; i < dropDown.menuGenerator_.length; i++) {
                    if (dropDown.menuGenerator_[i][1] === thisBlock.getFieldValue('NAME').toUpperCase()) {
                        index = i;
                        break;
                    }
                }
                if (index >= 0) {                
                    dropDown.menuGenerator_.splice(index, 1);
                    if (dropDown.menuGenerator_.length == 0) {
                        dropDown.menuGenerator_.push([ Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT'), (Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase() ]);
                        dropDown.setValue((Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase());
                    } else if (dropDown.menuGenerator_.length === 1) {
                        var tempDropDown = dropDown.menuGenerator_;
                        input.removeField('SLOT');
                        input.removeField('SENSORPORT');
                        input.appendField(new Blockly.FieldDropdown(tempDropDown), 'SENSORPORT').appendField(new Blockly.FieldHidden(), 'SLOT');
                    }
                    if (dropDown.getValue() === thisBlock.getFieldValue('NAME').toUpperCase()){
                        dropDown.setValue(dropDown.menuGenerator_[0][1]);
                    }
                }
            }
        }
    }
    Blockly.Events.setGroup(false);
}
