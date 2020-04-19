/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview List blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.lists');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.lists.HUE = 260;

Blockly.Blocks['lists_create_empty'] = {
    /**
     * Block for creating an empty list. The 'list_create_with' block is
     * preferred as it is more flexible. <block type="lists_create_with">
     * <mutation items="0"></mutation> </block>
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.jsonInit({
            "message0" : Blockly.Msg.LISTS_CREATE_EMPTY_TITLE,
            "output" : "Array",
            "colour" : Blockly.CAT_LIST_RGB,
            "tooltip" : Blockly.Msg.LISTS_CREATE_EMPTY_TOOLTIP,
            "helpUrl" : Blockly.Msg.LISTS_CREATE_EMPTY_HELPURL
        });
    }
};

Blockly.Blocks['lists_create_with'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
        this.setColour(Blockly.CAT_LIST_RGB);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, 'Array');
        this.setMutator(new Blockly.Mutator([ 'lists_create_with_item' ]));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
    },
    /**
     * Create XML to represent list inputs.
     * 
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * 
     * @param {!Blockly.Workspace}
     *            workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose : function(workspace) {
        var containerBlock = workspace.newBlock('lists_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('lists_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * 
     * @param {!Blockly.Block}
     *            containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose : function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * 
     * @param {!Blockly.Block}
     *            containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections : function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * 
     * @private
     * @this Blockly.Block
     */
    updateShape_ : function() {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY').appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
    }
};

Blockly.Blocks['lists_create_with_container'] = {
    /**
     * Mutator block for list container.
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.setColour(Blockly.CAT_LIST_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['lists_create_with_item'] = {
    /**
     * Mutator bolck for adding items.
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.setColour(Blockly.CAT_LIST_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
            this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['lists_repeat'] = {
    /**
     * Block for creating a list with one element repeated.
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.jsonInit({
            "message0" : Blockly.Msg.LISTS_REPEAT_TITLE,
            "args0" : [ {
                "type" : "input_value",
                "name" : "ITEM"
            }, {
                "type" : "input_value",
                "name" : "NUM",
                "check" : "Number"
            } ],
            "output" : "Array",
            "colour" : Blockly.CAT_LIST_RGB,
            "tooltip" : Blockly.Msg.LISTS_REPEAT_TOOLTIP,
            "helpUrl" : Blockly.Msg.LISTS_REPEAT_HELPURL
        });
    }
};

Blockly.Blocks['lists_length'] = {
    /**
     * Block for list length.
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.jsonInit({
            "message0" : Blockly.Msg.LISTS_LENGTH_TITLE,
            "args0" : [ {
                "type" : "input_value",
                "name" : "VALUE",
                "check" : [ 'String', 'Array' ]
            } ],
            "output" : 'Number',
            "colour" : Blockly.CAT_LIST_RGB,
            "tooltip" : Blockly.Msg.LISTS_LENGTH_TOOLTIP,
            "helpUrl" : Blockly.Msg.LISTS_LENGTH_HELPURL
        });
    }
};

Blockly.Blocks['lists_isEmpty'] = {
    /**
     * Block for is the list empty?
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.jsonInit({
            "message0" : Blockly.Msg.LISTS_ISEMPTY_TITLE,
            "args0" : [ {
                "type" : "input_value",
                "name" : "VALUE",
                "check" : [ 'String', 'Array' ]
            } ],
            "output" : 'Boolean',
            "colour" : Blockly.CAT_LIST_RGB,
            "tooltip" : Blockly.Msg.LISTS_ISEMPTY_TOOLTIP,
            "helpUrl" : Blockly.Msg.LISTS_ISEMPTY_HELPURL
        });
    }
};

Blockly.Blocks['lists_indexOf'] = {
    /**
     * Block for finding an item in the list.
     * 
     * @this Blockly.Block
     */
    init : function() {
        var OPERATORS = [ [ Blockly.Msg.LISTS_INDEX_OF_FIRST, 'FIRST' ], [ Blockly.Msg.LISTS_INDEX_OF_LAST, 'LAST' ] ];
        this.setHelpUrl(Blockly.Msg.LISTS_INDEX_OF_HELPURL);
        this.setColour(Blockly.CAT_LIST_RGB);
        this.setOutput(true, 'Number');
        this.appendValueInput('VALUE').setCheck('Array').appendField(Blockly.Msg.LISTS_INDEX_OF_INPUT_IN_LIST);
        this.appendValueInput('FIND').appendField(new Blockly.FieldDropdown(OPERATORS), 'END');
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.LISTS_INDEX_OF_TOOLTIP);
    }
};

Blockly.Blocks['lists_getIndex'] = {
    /**
     * Block for getting element at index.
     * 
     * @this Blockly.Block
     */
    init : function() {
        var MODE = [ [ Blockly.Msg.LISTS_GET_INDEX_GET, 'GET' ], [ Blockly.Msg.LISTS_GET_INDEX_GET_REMOVE, 'GET_REMOVE' ],
                [ Blockly.Msg.LISTS_GET_INDEX_REMOVE, 'REMOVE' ] ];
        this.WHERE_OPTIONS = [ [ Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START' ], [ Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END' ],
                [ Blockly.Msg.LISTS_GET_INDEX_FIRST, 'FIRST' ], [ Blockly.Msg.LISTS_GET_INDEX_LAST, 'LAST' ], [ Blockly.Msg.LISTS_GET_INDEX_RANDOM, 'RANDOM' ] ];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(Blockly.CAT_LIST_RGB);
        var modeMenu = new Blockly.FieldDropdown(MODE, function(value) {
            var isStatement = (value == 'REMOVE');
            this.sourceBlock_.updateStatement_(isStatement);
        });
        this.appendValueInput('VALUE').setCheck('Array').appendField(Blockly.Msg.LISTS_GET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput().appendField(modeMenu, 'MODE').appendField('', 'SPACE');
        this.appendDummyInput('AT');
        if (Blockly.Msg.LISTS_GET_INDEX_TAIL) {
            this.appendDummyInput('TAIL').appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);
        }
        this.setInputsInline(true);
        this.setOutput(true);
        this.updateAt_(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            var combo = thisBlock.getFieldValue('MODE') + '_' + thisBlock.getFieldValue('WHERE');
            return Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_' + combo];
        });
    },
    /**
     * Create XML to represent whether the block is a statement or a value. Also
     * represent whether there is an 'AT' input.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        var isStatement = !this.outputConnection;
        container.setAttribute('statement', isStatement);
        var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
        container.setAttribute('at', isAt);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' input.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        // Note: Until January 2013 this block did not have mutations,
        // so 'statement' defaults to false and 'at' defaults to true.
        var isStatement = (xmlElement.getAttribute('statement') == 'true');
        this.updateStatement_(isStatement);
        var isAt = (xmlElement.getAttribute('at') != 'false');
        this.updateAt_(isAt);
    },
    /**
     * Switch between a value block and a statement block.
     * 
     * @param {boolean}
     *            newStatement True if the block should be a statement. False if
     *            the block should be a value.
     * @private
     * @this Blockly.Block
     */
    updateStatement_ : function(newStatement) {
        var oldStatement = !this.outputConnection;
        if (newStatement != oldStatement) {
            this.unplug(true, true);
            if (newStatement) {
                this.setOutput(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
            } else {
                this.setPreviousStatement(false);
                this.setNextStatement(false);
                this.setOutput(true);
            }
        }
    },
    /**
     * Create or delete an input for the numeric index.
     * 
     * @param {boolean}
     *            isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_ : function(isAt) {
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT');
        this.removeInput('ORDINAL', true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT').setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL').appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT');
        }
        var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function(value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.sourceBlock_;
                block.updateAt_(newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });
        this.getInput('AT').appendField(menu, 'WHERE');
        if (Blockly.Msg.LISTS_GET_INDEX_TAIL) {
            this.moveInputBefore('TAIL', null);
        }
    }
};

Blockly.Blocks['lists_setIndex'] = {
    /**
     * Block for setting the element at index.
     * 
     * @this Blockly.Block
     */
    init : function() {
        var MODE = [ [ Blockly.Msg.LISTS_SET_INDEX_SET, 'SET' ], [ Blockly.Msg.LISTS_SET_INDEX_INSERT, 'INSERT' ] ];
        this.WHERE_OPTIONS = [ [ Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START' ], [ Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END' ],
                [ Blockly.Msg.LISTS_GET_INDEX_FIRST, 'FIRST' ], [ Blockly.Msg.LISTS_GET_INDEX_LAST, 'LAST' ], [ Blockly.Msg.LISTS_GET_INDEX_RANDOM, 'RANDOM' ] ];
        this.setHelpUrl(Blockly.Msg.LISTS_SET_INDEX_HELPURL);
        this.setColour(Blockly.CAT_LIST_RGB);
        this.appendValueInput('LIST').setCheck('Array').appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(MODE), 'MODE').appendField('', 'SPACE');
        this.appendDummyInput('AT');
        this.appendValueInput('TO').appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_TO);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_TOOLTIP);
        this.updateAt_(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            var combo = thisBlock.getFieldValue('MODE') + '_' + thisBlock.getFieldValue('WHERE');
            return Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_' + combo];
        });
    },
    /**
     * Create XML to represent whether there is an 'AT' input.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
        container.setAttribute('at', isAt);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' input.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        // Note: Until January 2013 this block did not have mutations,
        // so 'at' defaults to true.
        var isAt = (xmlElement.getAttribute('at') != 'false');
        this.updateAt_(isAt);
    },
    /**
     * Create or delete an input for the numeric index.
     * 
     * @param {boolean}
     *            isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_ : function(isAt) {
        // Destroy old 'AT' and 'ORDINAL' input.
        this.removeInput('AT');
        this.removeInput('ORDINAL', true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT').setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL').appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT');
        }
        var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function(value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.sourceBlock_;
                block.updateAt_(newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });
        this.moveInputBefore('AT', 'TO');
        if (this.getInput('ORDINAL')) {
            this.moveInputBefore('ORDINAL', 'TO');
        }

        this.getInput('AT').appendField(menu, 'WHERE');
    }
};

Blockly.Blocks['lists_getSublist'] = {
    /**
     * Block for getting sublist.
     * 
     * @this Blockly.Block
     */
    init : function() {
        this['WHERE_OPTIONS_1'] = [ [ Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_START, 'FROM_START' ],
                [ Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_END, 'FROM_END' ], [ Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST, 'FIRST' ] ];
        this['WHERE_OPTIONS_2'] = [ [ Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START, 'FROM_START' ], [ Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END, 'FROM_END' ],
                [ Blockly.Msg.LISTS_GET_SUBLIST_END_LAST, 'LAST' ] ];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
        this.setColour(Blockly.CAT_LIST_RGB);
        this.appendValueInput('LIST').setCheck('Array').appendField(Blockly.Msg.LISTS_GET_SUBLIST_INPUT_IN_LIST);
        this.appendDummyInput('AT1');
        this.appendDummyInput('AT2');
        if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
            this.appendDummyInput('TAIL').appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL);
        }
        this.setInputsInline(true);
        this.setOutput(true, 'Array');
        this.updateAt_(1, true);
        this.updateAt_(2, true);
        this.setTooltip(Blockly.Msg.LISTS_GET_SUBLIST_TOOLTIP);
    },
    /**
     * Create XML to represent whether there are 'AT' inputs.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
        container.setAttribute('at1', isAt1);
        var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
        container.setAttribute('at2', isAt2);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' inputs.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        var isAt1 = (xmlElement.getAttribute('at1') == 'true');
        var isAt2 = (xmlElement.getAttribute('at2') == 'true');
        this.updateAt_(1, isAt1);
        this.updateAt_(2, isAt2);
    },
    /**
     * Create or delete an input for a numeric index. This block has two such
     * inputs, independant of each other.
     * 
     * @param {number}
     *            n Specify first or second input (1 or 2).
     * @param {boolean}
     *            isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_ : function(n, isAt) {
        // Create or delete an input for the numeric index.
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT' + n);
        this.removeInput('ORDINAL' + n, true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT' + n).setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL' + n).appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT' + n);
        }
        var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n], function(value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.sourceBlock_;
                block.updateAt_(n, newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE' + n);
                return null;
            }
            return undefined;
        });
        this.getInput('AT' + n).appendField(menu, 'WHERE' + n);
        if (n == 1) {
            this.moveInputBefore('AT1', 'AT2');
            if (this.getInput('ORDINAL1')) {
                this.moveInputBefore('ORDINAL1', 'AT2');
            }
        }
        if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
            this.moveInputBefore('TAIL', null);
        }
    }
};

Blockly.Blocks['lists_sort'] = {
    /**
     * Block for sorting a list.
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.jsonInit({
            "message0" : Blockly.Msg.LISTS_SORT_TITLE,
            "args0" : [
                    {
                        "type" : "field_dropdown",
                        "name" : "TYPE",
                        "options" : [ [ Blockly.Msg.LISTS_SORT_TYPE_NUMERIC, "NUMERIC" ], [ Blockly.Msg.LISTS_SORT_TYPE_TEXT, "TEXT" ],
                                [ Blockly.Msg.LISTS_SORT_TYPE_IGNORECASE, "IGNORE_CASE" ] ]
                    }, {
                        "type" : "field_dropdown",
                        "name" : "DIRECTION",
                        "options" : [ [ Blockly.Msg.LISTS_SORT_ORDER_ASCENDING, "1" ], [ Blockly.Msg.LISTS_SORT_ORDER_DESCENDING, "-1" ] ]
                    }, {
                        "type" : "input_value",
                        "name" : "LIST",
                        "check" : "Array"
                    } ],
            "output" : "Array",
            "colour" : Blockly.Blocks.lists.HUE,
            "tooltip" : Blockly.Msg.LISTS_SORT_TOOLTIP,
            "helpUrl" : Blockly.Msg.LISTS_SORT_HELPURL
        });
    }
};

Blockly.Blocks['lists_split'] = {
    /**
     * Block for splitting text into a list, or joining a list into text.
     * 
     * @this Blockly.Block
     */
    init : function() {
        // Assign 'this' to a variable for use in the closures below.
        var thisBlock = this;
        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.LISTS_SPLIT_LIST_FROM_TEXT, 'SPLIT' ], [ Blockly.Msg.LISTS_SPLIT_TEXT_FROM_LIST, 'JOIN' ] ],
                function(newMode) {
                    thisBlock.updateType_(newMode);
                });
        this.setHelpUrl(Blockly.Msg.LISTS_SPLIT_HELPURL);
        this.setColour(Blockly.CAT_LIST_RGB);
        this.appendValueInput('INPUT').setCheck('String').appendField(dropdown, 'MODE');
        this.appendValueInput('DELIM').setCheck('String').appendField(Blockly.Msg.LISTS_SPLIT_WITH_DELIMITER);
        this.setInputsInline(true);
        this.setOutput(true, 'Array');
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('MODE');
            if (mode == 'SPLIT') {
                return Blockly.Msg.LISTS_SPLIT_TOOLTIP_SPLIT;
            } else if (mode == 'JOIN') {
                return Blockly.Msg.LISTS_SPLIT_TOOLTIP_JOIN;
            }
            throw 'Unknown mode: ' + mode;
        });
    },
    /**
     * Modify this block to have the correct input and output types.
     * 
     * @param {string}
     *            newMode Either 'SPLIT' or 'JOIN'.
     * @private
     * @this Blockly.Block
     */
    updateType_ : function(newMode) {
        if (newMode == 'SPLIT') {
            this.outputConnection.setCheck('Array');
            this.getInput('INPUT').setCheck('String');
        } else {
            this.outputConnection.setCheck('String');
            this.getInput('INPUT').setCheck('Array');
        }
    },
    /**
     * Create XML to represent the input and output types.
     * 
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('mode', this.getFieldValue('MODE'));
        return container;
    },
    /**
     * Parse XML to restore the input and output types.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        this.updateType_(xmlElement.getAttribute('mode'));
    }
};

Blockly.Blocks['robLists_create_with'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.setColour(Blockly.CAT_LIST_RGB);
        this.setInputsInline(false);
        this.setMutatorPlus(new Blockly.MutatorPlus(this));
        this.setInputsInline(false);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
        this.listType_ = 'Number';
        this.itemCount_ = 3;
    },
    /**
     * Create XML to represent list inputs.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        container.setAttribute('list_type', this.listType_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        var itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        var listType_ = xmlElement.getAttribute('list_type');
        this.createIt(itemCount_, listType_);
    },

    createIt : function(itemCount_, listType_) {
        this.itemCount_ = itemCount_;
        this.listType_ = listType_;
        var listDeclType = Blockly.LIST_TYPE_DROPDOWN(this.workspace.device);
        listDeclType.setValue(this.listType_);
        for (var x = 0; x < this.itemCount_; x++) {
            if (x == 0) {
                this.appendValueInput('ADD0').appendField(Blockly.Msg.LISTS_CREATE_TITLE).appendField(':').appendField(listDeclType, 'LIST_TYPE').appendField(Blockly.RTL ? '\u2192'
                        : '\u2190').setCheck(this.listType_);
            } else {
                this.appendValueInput('ADD' + x).setCheck(this.listType_);
            }
        }
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY').appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE).appendField(':').appendField(listDeclType, 'LIST_TYPE');
        } else {
            this.setMutatorMinus(new Blockly.MutatorMinus(this));
        }
        this.setOutput(true, 'Array_' + this.listType_);
    },

    /**
     * Update the shape according to the number of item inputs.
     * 
     * @param {Number}
     *            number of item inputs.
     * @this Blockly.Block
     */
    updateShape_ : function(num) {
        Blockly.dragMode_ = Blockly.DRAG_NONE;
        var listDeclType = Blockly.LIST_TYPE_DROPDOWN(this.workspace.device);
        listDeclType.setValue(this.listType_);
        if (num == 1) {
            if (this.itemCount_ == 0) {
                this.removeInput('EMPTY');
                this.appendValueInput('ADD0').appendField(Blockly.Msg.LISTS_CREATE_TITLE).appendField(':').appendField(listDeclType, 'LIST_TYPE').appendField(Blockly.RTL ? '\u2192'
                        : '\u2190').setCheck(this.listType_);
                this.setInputsInline(false);
                this.setMutatorMinus(new Blockly.MutatorMinus(this));
            } else {
                this.appendValueInput('ADD' + this.itemCount_).setCheck(this.listType_);
            }
            var block = this.getNewValue();
            block.initSvg();
            //block.setShadow(true);
            block.render();
            var value = this.getInput('ADD' + this.itemCount_);
            value.connection.connect(block.outputConnection);
            this.itemCount_++;
        } else if (num == -1) {
            this.itemCount_--;
            var target = this.getInputTargetBlock('ADD' + this.itemCount_);
            if (target) {
                target.unplug();
                target.bumpNeighbours_();
            }
            this.removeInput('ADD' + this.itemCount_);
        }
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY').appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE).appendField(':').appendField(listDeclType, 'LIST_TYPE');
            this.mutatorMinus.dispose();
            this.mutatorMinus = null;
        }
        this.render();
    },
    /**
     * Update input and output type according to the value of dropdown menu.
     * 
     * @param {String}
     *            option type of array fields.
     * @this Blockly.Block
     */
    updateType_ : function(option) {
        this.listType_ = option;
        // update inputs
        for (var i = 0; i < this.itemCount_; i++) {
            var target = this.getInputTargetBlock('ADD' + i);
            if (target) {
                target.dispose();
            }
            var input = this.getInput('ADD' + i);
            input.setCheck(option);
            var block = this.getNewValue();
            block.initSvg();
            block.render();
            input.connection.connect(block.outputConnection);
        }
        // update output
        this.setOutput(true, 'Array_' + this.listType_);
    },
    getNewValue : function() {
        var block;
        switch (this.listType_) {
        case 'Number':
            switch (this.workspace.device) {
            case 'edison':
                block = this.workspace.newBlock('math_integer');
                return block;
            default:
                block = this.workspace.newBlock('math_number');
                return block;
            }
        case 'String':
            block = this.workspace.newBlock('text');
            return block;
        case 'Boolean':
            block = this.workspace.newBlock('logic_boolean');
            return block;
        case 'Colour':
            switch (this.workspace.device) {
            case 'microbit':
            case 'calliope':
                block = this.workspace.newBlock('mbedColour_picker');
                break;
            case 'nao':
                block = this.workspace.newBlock('naoColour_picker');
                break;
            default:
                block = this.workspace.newBlock('robColour_picker');
            }
            return block;
        case 'Image':
            switch (this.workspace.device) {
            case 'microbit':
            case 'calliope':
                block = this.workspace.newBlock('mbedImage_get_image');
                break;
            case 'mbot':
                block = this.workspace.newBlock('mBotImage_image');
                break;
            default:
            }
            return block;
        case 'Connection':
            block = this.workspace.newBlock('logic_null');
            return block;
        case 'Actor' :
            block = this.workspace.newBlock('ai_actor');
            return block;
        case 'Sensor':
            block = this.workspace.newBlock('ai_sensor');
            return block;
        }
    },
    onchange : function(e) {
        if (!this.workspace || Blockly.Block.dragMode_ == 2 || this.workspace.device !== 'nxt') {
            // Block has been deleted or is in move or the device is not an NXT
            return;
        }
        var block = this.getSurroundParent();
        if (!block || block.type.indexOf('Variables_declare') == -1) {
            this.setErrorText(Blockly.Msg.ORA_LIST_CREATE_WITH_ERROR);
        } else {
            this.setErrorText(null);
        }
    }
};

Blockly.Blocks['robLists_repeat'] = {
    /**
     * Block for creating a list with one element repeated.
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.jsonInit({
            "message0" : Blockly.Msg.LISTS_REPEAT_TITLE,
            "args0" : [ {
                "type" : "input_value",
                "name" : "ITEM"
            }, {
                "type" : "input_value",
                "name" : "NUM",
                "check" : "Number"
            } ],
            "output" : "Array_Number",
            "colour" : Blockly.CAT_LIST_RGB,
            "tooltip" : Blockly.Msg.LISTS_REPEAT_TOOLTIP,
            "helpUrl" : Blockly.Msg.LISTS_REPEAT_HELPURL
        });
        // workaround to reuse the text from Blockly.Msg.LISTS_REPEAT_TITLE
        var one = this.getInput("ITEM").fieldRow[0].text_;
        var two = this.getInput("NUM").fieldRow[0].text_;
        var three = this.getInput("").fieldRow[0].text_;
        this.removeInput("NUM");
        this.removeInput("ITEM");
        this.removeInput("");
        this.listDeclType_ = Blockly.LIST_TYPE_DROPDOWN(this.workspace.device);
        this.appendValueInput('ITEM').appendField(one).appendField(this.listDeclType_, 'LIST_TYPE');
        this.appendValueInput('NUM').appendField(two).setCheck('Number');
        this.appendDummyInput().appendField(three);
        this.listType_ = 'Number';
    },
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('list_type', this.listType_);
        return container;
    },
    domToMutation : function(xmlElement) {
        this.listType_ = xmlElement.getAttribute('list_type');
        this.updateType_(this.listType_);
    },
    /**
     * Update input and output type according to the value of dropdown menu.
     * 
     * @param {String}
     *            option type of array fields.
     * @this Blockly.Block
     */
    updateType_ : function(option) {
        this.listType_ = option;
        // update input
        var input = this.getInput('ITEM');
        input.setCheck(option);
        // update output
        this.setOutput(true, 'Array_' + this.listType_);
    }
};

Blockly.Blocks['robLists_length'] = {
    /**
     * Block for list length.
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.jsonInit({
            "message0" : Blockly.Msg.LISTS_LENGTH_TITLE,
            "args0" : [ {
                "type" : "input_value",
                "name" : "VALUE",
                "check" : [ 'Array_Number', 'Array_String', 'Array_Boolean', 'Array_Colour', 'Array_Connection', 'Array_Image' ]
            } ],
            "output" : 'Number',
            "colour" : Blockly.CAT_LIST_RGB,
            "tooltip" : Blockly.Msg.LISTS_LENGTH_TOOLTIP,
            "helpUrl" : Blockly.Msg.LISTS_LENGTH_HELPURL
        });
    }
};

Blockly.Blocks['robLists_isEmpty'] = {
    /**
     * Block for is the list empty?
     * 
     * @this Blockly.Block
     */
    init : function() {
        this.jsonInit({
            "message0" : Blockly.Msg.LISTS_ISEMPTY_TITLE,
            "args0" : [ {
                "type" : "input_value",
                "name" : "VALUE",
                "check" : [ 'Array_Number', 'Array_String', 'Array_Boolean', 'Array_Colour', 'Array_Connection', 'Array_Image' ]
            } ],
            "output" : 'Boolean',
            "colour" : Blockly.CAT_LIST_RGB,
            "tooltip" : Blockly.Msg.LISTS_ISEMPTY_TOOLTIP,
            "helpUrl" : Blockly.Msg.LISTS_ISEMPTY_HELPURL
        });
    }
};

Blockly.Blocks['robLists_indexOf'] = {
    /**
     * Block for finding an item in the list.
     * 
     * @this Blockly.Block
     */
    init : function() {
        var OPERATORS = [ [ Blockly.Msg.LISTS_INDEX_OF_FIRST, 'FIRST' ], [ Blockly.Msg.LISTS_INDEX_OF_LAST, 'LAST' ] ];
        this.setHelpUrl(Blockly.Msg.LISTS_INDEX_OF_HELPURL);
        this.setColour(Blockly.CAT_LIST_RGB);
        this.setOutput(true, 'Number');
        this.appendValueInput('VALUE').setCheck([ 'Array_Number', 'Array_String', 'Array_Boolean', 'Array_Colour', 'Array_Connection', 'Array_Image' ]).appendField(Blockly.Msg.LISTS_INDEX_OF_INPUT_IN_LIST);
        this.appendValueInput('FIND').appendField(new Blockly.FieldDropdown(OPERATORS), 'END');
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.LISTS_INDEX_OF_TOOLTIP);
    },
    onchange : function() {
        if (!this.workspace || Blockly.Block.dragMode_ == 2) {
            // Block has been deleted or is in move
            return;
        }
        var blockValue = this.getInputTargetBlock('VALUE');
        var blockFind = this.getInputTargetBlock('FIND');
        if (blockValue) {
            this.getInput('FIND').setCheck(blockValue.outputConnection.check_[0].replace('Array_', ''));
        } else {
            this.getInput('FIND').setCheck([ 'Number', 'String', 'Boolean', 'Colour', 'Connection', 'String', 'Image' ]);
        }
        if (blockFind) {
            this.getInput('VALUE').setCheck('Array_' + blockFind.outputConnection.check_[0]);
        } else {
            this.getInput('VALUE').setCheck([ 'Array_Number', 'Array_String', 'Array_Boolean', 'Array_Colour', 'Array_Connection', 'Array_Image' ]);
        }
        this.render();
    }
};

Blockly.Blocks['robLists_getIndex'] = {
    /**
     * Block for getting element at index.
     * 
     * @this Blockly.Block
     */
    init : function() {
        var MODE;
        if (this.workspace.device === 'nxt' || this.workspace.device === 'edison') {
            MODE = [ [ Blockly.Msg.LISTS_GET_INDEX_GET, 'GET' ] ];
        } else {
            MODE = [ [ Blockly.Msg.LISTS_GET_INDEX_GET, 'GET' ], [ Blockly.Msg.LISTS_GET_INDEX_GET_REMOVE, 'GET_REMOVE' ],
                    [ Blockly.Msg.LISTS_GET_INDEX_REMOVE, 'REMOVE' ] ];
        }

        if (this.workspace.device === 'edison') {
            this.WHERE_OPTIONS = [ [ Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START' ] ];
        } else {
            this.WHERE_OPTIONS = [ [ Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START' ], [ Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END' ],
                    [ Blockly.Msg.LISTS_GET_INDEX_FIRST, 'FIRST' ], [ Blockly.Msg.LISTS_GET_INDEX_LAST, 'LAST' ] ];
        }
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(Blockly.CAT_LIST_RGB);
        var modeMenu = new Blockly.FieldDropdown(MODE, function(value) {
            var isStatement = (value == 'REMOVE');
            this.sourceBlock_.updateStatement_(isStatement);
        });
        this.appendValueInput('VALUE').setCheck([ 'Array_Number', 'Array_String', 'Array_Boolean', 'Array_Colour', 'Array_Connection', 'Array_Image' ]).appendField(Blockly.Msg.LISTS_GET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput().appendField(modeMenu, 'MODE').appendField('', 'SPACE');
        this.appendDummyInput('AT');
        if (Blockly.Msg.LISTS_GET_INDEX_TAIL) {
            this.appendDummyInput('TAIL').appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);
        }
        this.setInputsInline(true);
        this.dataType_ = 'Number';
        this.setOutput(true, this.dataType_);
        this.updateAt_(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            var combo = thisBlock.getFieldValue('MODE') + '_' + thisBlock.getFieldValue('WHERE');
            return Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_' + combo];
        });
    },
    /**
     * Create XML to represent whether the block is a statement or a value. Also
     * represent whether there is an 'AT' input.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        var isStatement = !this.outputConnection;
        container.setAttribute('statement', isStatement);
        var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
        container.setAttribute('at', isAt);
        container.setAttribute('datatype', this.dataType_);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' input.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        this.dataType_ = xmlElement.getAttribute('datatype');
        if (this.dataType_) {
            this.setOutput(true, this.dataType_);
        }
        var isStatement = (xmlElement.getAttribute('statement') == 'true');
        this.updateStatement_(isStatement);
        var isAt = (xmlElement.getAttribute('at') != 'false');
        this.updateAt_(isAt);
    },
    /**
     * Switch between a value block and a statement block.
     * 
     * @param {boolean}
     *            newStatement True if the block should be a statement. False if
     *            the block should be a value.
     * @private
     * @this Blockly.Block
     */
    updateStatement_ : function(newStatement) {
        var oldStatement = !this.outputConnection;
        if (newStatement != oldStatement) {
            var block = this;
            block.unplug(true, true);
            block.bumpNeighbours_();
            if (newStatement) {
                block.setOutput(false);
                block.setPreviousStatement(true);
                block.setNextStatement(true);
            } else {
                block.setPreviousStatement(false);
                block.setNextStatement(false);
                block.setOutput(true);
            }
        }
    },
    /**
     * Create or delete an input for the numeric index.
     * 
     * @param {boolean}
     *            isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_ : function(isAt) {
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT');
        this.removeInput('ORDINAL', true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT').setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL').appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT');
        }
        var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function(value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.sourceBlock_;
                block.updateAt_(newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });
        this.getInput('AT').appendField(menu, 'WHERE');
        if (Blockly.Msg.LISTS_GET_INDEX_TAIL) {
            this.moveInputBefore('TAIL', null);
        }
    },
    onchange : function() {
        if (!this.workspace || Blockly.Block.dragMode_ == 2) {
            // Block has been deleted or is in move
            return;
        }
        if (!this.previousConnection) {
            var blockA = this.getInputTargetBlock('VALUE');
            if (blockA) {
                this.setOutput(true, blockA.outputConnection.check_[0].replace('Array_', ''));
                this.dataType_ = blockA.outputConnection.check_[0].replace('Array_', '');
            } else {
                this.setOutput(true, 'Number');
                this.dataType_ = 'Number';
            }
            this.render();
        }
    }
};

Blockly.Blocks['robLists_setIndex'] = {
    /**
     * Block for setting the element at index.
     * 
     * @this Blockly.Block
     */
    init : function() {
        var MODE
        if (this.workspace.device === 'nxt' || this.workspace.device === 'edison') {
            MODE = [ [ Blockly.Msg.LISTS_SET_INDEX_SET, 'SET' ] ];
        } else {
            MODE = [ [ Blockly.Msg.LISTS_SET_INDEX_SET, 'SET' ], [ Blockly.Msg.LISTS_SET_INDEX_INSERT, 'INSERT' ] ];
        }
        if (this.workspace.device === 'edison') {
            this.WHERE_OPTIONS = [ [ Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START' ] ];
        } else {
            this.WHERE_OPTIONS = [ [ Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START' ], [ Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END' ],
                    [ Blockly.Msg.LISTS_GET_INDEX_FIRST, 'FIRST' ], [ Blockly.Msg.LISTS_GET_INDEX_LAST, 'LAST' ] ];
        }
        this.setHelpUrl(Blockly.Msg.LISTS_SET_INDEX_HELPURL);
        this.setColour(Blockly.CAT_LIST_RGB);
        this.appendValueInput('LIST').setCheck([ 'Array_Number', 'Array_String', 'Array_Boolean', 'Array_Colour', 'Array_Connection', 'String', 'Array_Image' ]).appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(MODE), 'MODE').appendField('', 'SPACE');
        this.appendDummyInput('AT');
        this.appendValueInput('TO').appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_TO);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_TOOLTIP);
        this.updateAt_(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            var combo = thisBlock.getFieldValue('MODE') + '_' + thisBlock.getFieldValue('WHERE');
            return Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_' + combo];
        });
    },
    /**
     * Create XML to represent whether there is an 'AT' input.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
        container.setAttribute('at', isAt);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' input.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        // Note: Until January 2013 this block did not have mutations,
        // so 'at' defaults to true.
        var isAt = (xmlElement.getAttribute('at') != 'false');
        this.updateAt_(isAt);
    },
    /**
     * Create or delete an input for the numeric index.
     * 
     * @param {boolean}
     *            isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_ : function(isAt) {
        // Destroy old 'AT' and 'ORDINAL' input.
        this.removeInput('AT');
        this.removeInput('ORDINAL', true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT').setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL').appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT');
        }
        var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function(value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.sourceBlock_;
                block.updateAt_(newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });
        this.moveInputBefore('AT', 'TO');
        if (this.getInput('ORDINAL')) {
            this.moveInputBefore('ORDINAL', 'TO');
        }
        this.getInput('AT').appendField(menu, 'WHERE');
    },
    onchange : function() {
        if (!this.workspace || Blockly.Block.dragMode_ == 2) {
            // Block has been deleted or is in move
            return;
        }
        var blockList = this.getInputTargetBlock('LIST');
        var blockTo = this.getInputTargetBlock('TO');
        if (blockList) {
            this.getInput('TO').setCheck(blockList.outputConnection.check_[0].replace('Array_', ''));
        } else {
            this.getInput('TO').setCheck([ 'Number', 'String', 'Boolean', 'Colour', 'Connection', 'String', 'Image' ]);
        }
        if (blockTo) {
            this.getInput('LIST').setCheck('Array_' + blockTo.outputConnection.check_[0]);
        } else {
            this.getInput('LIST').setCheck([ 'Array_Number', 'Array_String', 'Array_Boolean', 'Array_Colour', 'Array_Connection', 'String', 'Array_Image' ]);
        }
        this.render();
    }
};

Blockly.Blocks['robLists_getSublist'] = {
    /**
     * Block for getting sublist.
     * 
     * @this Blockly.Block
     */
    init : function() {
        this['WHERE_OPTIONS_1'] = [ [ Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_START, 'FROM_START' ],
                [ Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_END, 'FROM_END' ], [ Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST, 'FIRST' ] ];
        this['WHERE_OPTIONS_2'] = [ [ Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START, 'FROM_START' ], [ Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END, 'FROM_END' ],
                [ Blockly.Msg.LISTS_GET_SUBLIST_END_LAST, 'LAST' ] ];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
        this.setColour(Blockly.CAT_LIST_RGB);
        this.appendValueInput('LIST').setCheck([ 'Array_Number', 'Array_String', 'Array_Boolean', 'Array_Colour', 'Array_Connection', 'String', 'Array_Image' ]).appendField(Blockly.Msg.LISTS_GET_SUBLIST_INPUT_IN_LIST);
        this.appendDummyInput('AT1');
        this.appendDummyInput('AT2');
        if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
            this.appendDummyInput('TAIL').appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL);
        }
        this.setInputsInline(true);
        this.setOutput(true, [ 'Array_Number', 'Array_String', 'Array_Boolean', 'Array_Colour', 'Array_Connection', 'String', 'Array_Image' ]);
        this.updateAt_(1, true);
        this.updateAt_(2, true);
        this.setTooltip(Blockly.Msg.LISTS_GET_SUBLIST_TOOLTIP);
    },
    /**
     * Create XML to represent whether there are 'AT' inputs.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
        container.setAttribute('at1', isAt1);
        var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
        container.setAttribute('at2', isAt2);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' inputs.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        var isAt1 = (xmlElement.getAttribute('at1') == 'true');
        var isAt2 = (xmlElement.getAttribute('at2') == 'true');
        this.updateAt_(1, isAt1);
        this.updateAt_(2, isAt2);
    },
    /**
     * Create or delete an input for a numeric index. This block has two such
     * inputs, independant of each other.
     * 
     * @param {number}
     *            n Specify first or second input (1 or 2).
     * @param {boolean}
     *            isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_ : function(n, isAt) {
        // Create or delete an input for the numeric index.
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT' + n);
        this.removeInput('ORDINAL' + n, true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT' + n).setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL' + n).appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT' + n);
        }
        var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n], function(value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.sourceBlock_;
                block.updateAt_(n, newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE' + n);
                return null;
            }
            return undefined;
        });
        this.getInput('AT' + n).appendField(menu, 'WHERE' + n);
        if (n == 1) {
            this.moveInputBefore('AT1', 'AT2');
            if (this.getInput('ORDINAL1')) {
                this.moveInputBefore('ORDINAL1', 'AT2');
            }
        }
        if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
            this.moveInputBefore('TAIL', null);
        }
    },
    onchange : function() {
        if (!this.workspace || Blockly.Block.dragMode_ == 2) {
            // Block has been deleted or is in move
            return;
        }
        var blockList = this.getInputTargetBlock('LIST');
        if (blockList) {
            this.setOutput(true, blockList.outputConnection.check_[0]);
        } else {
            this.setOutput(true, [ 'Array_Number', 'Array_String', 'Array_Boolean', 'Array_Colour', 'Array_Connection', 'String', 'Array_Image' ]);
        }
        this.render();
    }
};
