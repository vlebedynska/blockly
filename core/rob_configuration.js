/**
 * @fileoverview Utility functions for handling configuration blocks.
 * @author Beate.Jost@iais.fraunhofer.de
 */
'use strict';

goog.provide('Blockly.RobConfig');

goog.require('Blockly.Workspace');

/**
 * Find all instances of this configuration block and rename the values in the
 * dropdown.
 * 
 * @param {string}
 *            oldName Configuration title to rename.
 * @param {string}
 *            newName New configuration name.
 * @param {!Blockly.Workspace}
 *            workspace Workspace rename variables in.
 */
Blockly.RobConfig.renameConfig = function(thatBlock, oldName, newName, workspace) {
    Blockly.Events.setGroup(true);
    var blocks = workspace.getAllBlocks();
    for (var x = 0; x < blocks.length; x++) {
        var block = blocks[x];
        if (!block.dependConfig) {
            continue;
        }
        var dependConfig;
        if (typeof block.dependConfig === "function") {
            dependConfig = block.dependConfig();
        } else {
            dependConfig = block.dependConfig;
        }
        if (thatBlock.confBlock !== dependConfig.type) {
            continue;
        }

        var dropDown = dependConfig.dropDown;
        var index = -1;
        for (var i = 0; i < dropDown.menuGenerator_.length; i++) {
            if (dropDown.menuGenerator_[i][1] === thatBlock.getFieldValue('NAME').toUpperCase()) {
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
            dropDown.menuGenerator_.push([ newName, newName.toUpperCase() ]);
            dropDown.arrow_.replaceChild(document.createTextNode(dropDown.sourceBlock_.RTL ? Blockly.FieldDropdown.ARROW_CHAR + ' ' : ' '
                    + Blockly.FieldDropdown.ARROW_CHAR), dropDown.arrow_.childNodes[0]);
            var temp = dropDown.getText();
            dropDown.setText(temp + "'");
            dropDown.setText(temp);
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
        var dependConfig;
        if (typeof block.dependConfig === "function") {
            dependConfig = block.dependConfig();
        } else {
            dependConfig = block.dependConfig;
        }
        if (thisBlock.confBlock !== dependConfig.type) {
            continue;
        }

        var dropDown = dependConfig.dropDown;
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
                dropDown.menuGenerator_.push([ Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT'),
                        (Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase() ]);
                dropDown.setValue((Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase());
            } else if (dropDown.menuGenerator_.length == 1) {
                dropDown.arrow_.replaceChild(document.createTextNode(''), dropDown.arrow_.childNodes[0]);
                // force render
                var temp = dropDown.getText();
                dropDown.setText(temp + "'");
                dropDown.setText(temp);
            }
            if (dropDown.getValue() === thisBlock.getFieldValue('NAME').toUpperCase()) {
                dropDown.setValue(dropDown.menuGenerator_[0][1]);
            }
        }
    }
    Blockly.Events.setGroup(false);
}

/**
 * Ensure two identically-named configuration blocks don't exist.
 * 
 * @param {string}
 *            name Proposed variable name.
 * @param {!Blockly.Block}
 *            block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Blockly.RobConfig.findLegalName = function(name, block) {
    while (!Blockly.RobConfig.isLegalName(name, block) || Blockly.Variables.isReservedName(name, block)) {
        // Collision with another variable.
        var r = name.match(/^(.*?)(\d+)$/);
        if (!r) {
            name += '2';
        } else {
            name = r[1] + (parseInt(r[2], 10) + 1);
        }
    }
    return name;
};

Blockly.RobConfig.isLegalName = function(name, block) {
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    // Iterate through every block.
    for (var x = 0; x < blocks.length; x++) {
        if (blocks[x] == block) {
            continue;
        }
        var func = blocks[x].getConfigDecl;
        if (func) {
            var varName = func.call(blocks[x]);
            if (Blockly.Names.equals(name, varName.name)) {
                return false;
            }
        }
    }
    return true;
};
