/**
 * @fileoverview AI blocks
 * @requires Blockly.Blocks
 * @author vlebedynska
 */

'use strict';

goog.provide('Blockly.Blocks.ai');

goog.require('Blockly.Blocks');

//Blockly.Blocks.lists.HUE = 260;


var numberStar = "→ ";

Blockly.Blocks['ai_neural_network'] = {
    /**
     * TODO Write a block description
     */

    init : function () {
        this.setColour(Blockly.CAT_AI_RGB);
        this.appendDummyInput().appendField( 'Eingabe: ');

        this.appendValueInput("INPUT_LAYER").setCheck("Array_InputNode");
        this.appendDummyInput().appendField( '  ');
        this.appendDummyInput().appendField( 'Ausgabe: ');
        this.appendValueInput("OUTPUT_LAYER").setCheck("Array_OutputNode");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NEURAL_NETWORK_TOOLTIP);
    }

}

Blockly.Blocks['ai_easy_list'] = {
    init : function () {
        this.setColour(Blockly.CAT_AI_NEURONEN);
        this.setInputsInline(false);
        this.setMutatorPlus(new Blockly.MutatorPlus(this));
        this.setInputsInline(false);
        this.listType_ = 'InputNode';
        this.itemCount_ = 1;

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
                this.appendValueInput('ADD0').appendField("Neuron").setCheck(this.listType_);
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
                this.appendValueInput('ADD0').appendField("Neuron").setCheck(this.listType_);
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
            case 'InputNode' :
                block = this.workspace.newBlock('ai_nn_input_node_ultrasonic');
                return block;
            case 'OutputNode':
                block = this.workspace.newBlock('ai_nn_output_node');
                return block;
            case 'Obstacle':
                block = this.workspace.newBlock('ai_q_barrier_mountain');
                return block;
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


}





Blockly.Blocks['ai_nn_input_node_ultrasonic'] = {
    /**
     * TODO Write a block description
     * TODO SwitchCase for DropDowns or dynamically access device.
     * This is the input layer node
     */

    init:function () {
        this.setColour(Blockly.CAT_AI_NEURONEN);

        var aiInput = new Blockly.FieldDropdown([
            ["Abstand " + Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 1", 'ULTRASONIC_PORT_1'],
            ["Abstand " + Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 2", 'ULTRASONIC_PORT_2'],
            ["Abstand " + Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 3", 'ULTRASONIC_PORT_3'],
            ["Abstand " + Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 4", 'ULTRASONIC_PORT_4']
        ]);
        this.setOutput(true, 'InputNode');
        this.appendDummyInput().appendField(aiInput, "INPUTNODE")
        this.setTooltip(Blockly.Msg.VARIABLE_TYPE_NN_INPUT_TOOLTIP);
    }

}

Blockly.Blocks['ai_nn_input_node_coloursensor_rgb_channel'] = {
    /**
     * Block for composing a colour from RGB components.
     *
     * @this Blockly.Block
     */
    init : function() {
        this.setColour(Blockly.CAT_AI_NEURONEN);

        var colorField = new Blockly.FieldColour('#DC143C');
        colorField
            .setColours([ '#0057a6', '#00FF00', '#DC143C'])
            .setColumns(3);

        var port = new Blockly.FieldDropdown([
               [Blockly.Msg.PORT + " 1", '1'],
               [Blockly.Msg.PORT + " 2", '2'],
               [Blockly.Msg.PORT + " 3", '3'],
               [Blockly.Msg.PORT + " 4", '4']
            ]);

        this.setOutput(true, 'InputNode');
        this.appendDummyInput()
            .appendField("Anteil")
            .appendField(colorField, "COLOUR")
            .appendField(Blockly.Msg.SENSOR_COLOUR)
            .appendField(port, "SENSORPORT");

        this.setTooltip(Blockly.Msg.COLOUR_RGB_TOOLTIP);
    }
}

Blockly.Blocks['ai_nn_input_node_coloursensor_color'] = {
    /**
     * Block for composing a colour from RGB components.
     *
     * @this Blockly.Block
     */
    init : function() {
        this.setColour(Blockly.CAT_AI_NEURONEN);

        var colorField = new Blockly.FieldColour('#F7D117');
        colorField.setColours([ '#000000', '#0057A6', '#00642E', '#532115', '#585858', '#B30006', '#F7D117', '#FFFFFF' ]).setColumns(8);

        var port = new Blockly.FieldDropdown([
            [Blockly.Msg.PORT + " 1", '1'],
            [Blockly.Msg.PORT + " 2", '2'],
            [Blockly.Msg.PORT + " 3", '3'],
            [Blockly.Msg.PORT + " 4", '4']
        ]);

        this.setOutput(true, 'InputNode');
        this.appendDummyInput()
            .appendField(colorField, "COLOUR")
            .appendField(" Farbe")
            .appendField(Blockly.Msg.SENSOR_COLOUR)
            .appendField(port, "SENSORPORT");

        this.setTooltip(Blockly.Msg.COLOUR_RGB_TOOLTIP);
    }
}

Blockly.Blocks['ai_nn_input_node_coloursensor_light'] = {
    /**
     * Block for composing a colour from RGB components.
     *
     * @this Blockly.Block
     */
    init : function() {
        this.setColour(Blockly.CAT_AI_NEURONEN);


        var port = new Blockly.FieldDropdown([
            [Blockly.Msg.PORT + " 1", '1'],
            [Blockly.Msg.PORT + " 2", '2'],
            [Blockly.Msg.PORT + " 3", '3'],
            [Blockly.Msg.PORT + " 4", '4']
        ]);

        this.setOutput(true, 'InputNode');
        this.appendDummyInput()
            .appendField("Licht")
            .appendField(Blockly.Msg.SENSOR_COLOUR)
            .appendField(port, "SENSORPORT");

        this.setTooltip(Blockly.Msg.COLOUR_RGB_TOOLTIP);
    }
}

Blockly.Blocks['ai_nn_output_node'] = {
    /**
     * TODO Write a block description
     * TODO SwitchCase for DropDowns or dynamically access device.
     * This is the output layer node
     */

    init: function () {
        //TODO it's now done only for EV3 - add other robot systems in the future
        this.setColour(Blockly.CAT_AI_NEURONEN);

        var ports = [];
        ports = [
            [ Blockly.Msg.MOTOR_PORT + ' A', 'MOTORPORT_A' ],
            [ Blockly.Msg.MOTOR_PORT + ' B', 'MOTORPORT_B' ],
            [ Blockly.Msg.MOTOR_PORT + ' C', 'MOTORPORT_C' ],
            [ Blockly.Msg.MOTOR_PORT + ' D', 'MOTORPORT_D' ]
        ];
        var aiOutput = new Blockly.FieldDropdown(ports);
        this.setOutput(true, 'OutputNode');
        this.appendDummyInput()
            .appendField(aiOutput, 'OUTPUTNODE')
        this.setTooltip(Blockly.Msg.VARIABLE_TYPE_NN_OUTPUT_TOOLTIP);
    }
}

Blockly.Blocks['ai_nn_output_node_text'] = {
    /**
     * TODO Write a block description
     * TODO SwitchCase for DropDowns or dynamically access device.
     * This is the output layer node
     */

    init: function () {
        //TODO it's now done only for EV3 - add other robot systems in the future
        this.setColour(Blockly.CAT_AI_NEURONEN);

        this.setOutput(true, 'OutputNode');
        this.setTooltip(Blockly.Msg.VARIABLE_TYPE_NN_OUTPUT_TOOLTIP);


        this.appendDummyInput().appendField(this.newQuote_(true)).appendField(new Blockly.FieldTextInput('', this.validate), 'TEXT').appendField(this.newQuote_(false));
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        // Text block is trivial.  Use tooltip of parent block if it exists.
        this.setTooltip(function() {
            var parent = thisBlock.getParent();
            return (parent && parent.getInputsInline() && parent.tooltip) || Blockly.Msg.TEXT_TEXT_TOOLTIP;
        });
    },
    validate : function(content) {
        if (content && content.match(/[<>\$]/))
            return null;
        return content;
    },
    /**
     * Create an image of an open or closed quote.
     *
     * @param {boolean}
     *            open True if open quote, false if closed.
     * @return {!Blockly.FieldImage} The field image of the quote.
     * @this Blockly.Block
     * @private
     */
    newQuote_ : function(open) {
        if (open == this.RTL) {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
        } else {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
        }
        return new Blockly.FieldImage(file, 12, 12, '"');
    }


}

Blockly.Blocks['ai_nn_output_node_sound'] = {
    /**
     * TODO Write a block description
     * TODO SwitchCase for DropDowns or dynamically access device.
     * This is the output layer node
     */

    init: function () {
        //TODO it's now done only for EV3 - add other robot systems in the future
        this.setColour(Blockly.CAT_AI_NEURONEN);

        this.setOutput(true, 'OutputNode');
        this.setTooltip(Blockly.Msg.VARIABLE_TYPE_NN_OUTPUT_TOOLTIP);


        this.appendDummyInput().appendField("Ton");
    }


}

Blockly.Blocks['ai_nn_output_node_led'] = {
    /**
     * TODO Write a block description
     * TODO SwitchCase for DropDowns or dynamically access device.
     * This is the output layer node
     */

    init: function () {
        //TODO it's now done only for EV3 - add other robot systems in the future
        this.setColour(Blockly.CAT_AI_NEURONEN);

        this.setOutput(true, 'OutputNode');
        this.setTooltip(Blockly.Msg.VARIABLE_TYPE_NN_OUTPUT_TOOLTIP);


        var colorField = new Blockly.FieldColour('#00642E');
        colorField.setColours(['#B30006', '#F7D117', '#00642E' ]).setColumns(3);

        this.appendDummyInput()
            .appendField("LED")
            .appendField(colorField, "COLOUR")
        ;
    }


}

Blockly.Blocks['ai_hidden'] = {
    /**
     * TODO define ai_hiddens block for the hidden layer nodes
      */
    init: function () {

    }
}










Blockly.Blocks['ai_q_learning_states_and_actions_map'] = {
    init : function () {

        this.setInputsInline(false);

        this.setColour(Blockly.CAT_AI_RGB);

        let map = new Blockly.FieldDropdown(
            [
                ["Eisenbahn", 'MAP_RAILWAY'],
                ["Waldlabyrinth", 'MAP_FOREST'],
                ["In der Stadt", 'MAP_CITY'],
            ]
        )

        this.appendDummyInput()
            .appendField(Blockly.Msg.MAP)
            .appendField(map, 'MAP')


        // this.appendValueInput('START').appendField(Blockly.Msg.RL_STARTING_POSITION).setCheck('Number');
        // this.appendValueInput('FINISH').appendField(Blockly.Msg.RL_FINISH_POSITION).setCheck('Number');

        this.appendValueInput('START').appendField(numberStar + "lege den Start fest").setCheck('Number');
        this.appendValueInput('FINISH').appendField(numberStar + "lege das Ziel fest").setCheck('Number');

        this.appendValueInput("OBSTACLE").appendField(numberStar + "setze Sperre").setCheck("Array_Obstacle");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.RL_STATES_AND_ACTIONS_MATRIX_TOOLTIP);
    }
}

Blockly.Blocks['rl_obstacles_easy_list'] = {
    init : function () {
        this.setColour(Blockly.CAT_AI_NEURONEN);
        this.setInputsInline(false);
        this.setMutatorPlus(new Blockly.MutatorPlus(this));
        this.setInputsInline(false);
        this.listType_ = 'Obstacle';
        this.itemCount_ = 1;

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
                this.appendValueInput('ADD0').setCheck(this.listType_);
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
                this.appendValueInput('ADD0').setCheck(this.listType_);
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
            case 'InputNode' :
                block = this.workspace.newBlock('ai_nn_input_node_ultrasonic');
                return block;
            case 'OutputNode':
                block = this.workspace.newBlock('ai_nn_output_node');
                return block;
            case 'Obstacle':
                block = this.workspace.newBlock('ai_q_barrier_mountain');
                return block;
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


}


Blockly.Blocks['ai_q_barrier_mountain'] = {
    init : function () {
        this.setColour(Blockly.CAT_AI_NEURONEN);
        this.setInputsInline(true);

        this.appendValueInput('START').appendField("zwischen").setCheck('Number');

        this.appendValueInput('FINISH').appendField("und").setCheck('Number');

        // this.appendDummyInput()
        //     .appendField(Blockly.Msg.RL_BARRIER_MOUNTAIN)
        //     .appendField(start, 'START')
        //     .appendField(Blockly.Msg.AND)
        //     .appendField( finish,'FINISH');

        this.setOutput(true, 'Obstacle');
        this.setTooltip(Blockly.Msg.RL_BARRIER_MOUNTAIN_TOOLTIP);

    }
}


Blockly.Blocks['ai_q_drive_the_best_way'] = {
    init : function () {

        this.setColour(Blockly.CAT_AI_RGB);


        this.appendValueInput("POWER").appendField(Blockly.Msg.RL_DRIVE_OPTIMA_PATH).appendField(Blockly.Msg.MOTOR_SPEED).setCheck('Number');

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.RL_DRIVE_OPTIMA_PATH_TOOLTIP);
    }
    }


Blockly.Blocks['ai_q_draw_the_best_way'] = {
    init : function () {
        this.setColour(Blockly.CAT_AI_RGB);


        this.appendDummyInput().appendField(Blockly.Msg.RL_DRAW_OPTIMAL_PATH);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.RL_DRAW_OPTIMA_PATH_TOOLTIP);
    }
}

Blockly.Blocks['ai_q_apply_learning_rule'] = {
    init : function () {

        this.setColour(Blockly.CAT_AI_RGB);

        this.appendDummyInput().appendField(Blockly.Msg.RL_GAIN_EXPERIENCE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.RL_GAIN_EXPERIENCE_TOOLTIP);

        this.appendValueInput('EPISODES').appendField(numberStar + "Anzahl der Episoden:").setCheck('Number');
        this.appendValueInput('Q_LEARNER_TIME').appendField(numberStar + "Zeit in Sekunden:").setCheck('Number');
    }

}

Blockly.Blocks['ai_q_learner_config'] = {
    init : function () {
        this.setColour(Blockly.CAT_AI_RGB);

        this.setInputsInline(false);

        this.appendDummyInput()
            .appendField("setze das Lernverhalten fest")

        var alpha = new Blockly.FieldDropdown([
            [Blockly.Msg.RL_SLOW, '0.1'],
            [Blockly.Msg.RL_MEDIUM, '0.5'],
            [Blockly.Msg.RL_FAST, '0.9'],

        ]);

        var gamma = new Blockly.FieldDropdown([
            ["ja", '0.2'], //   // hole extra Belohnung vom nächsten Streckenabschnitt: ja /nein / nein nehme dazu: Belohnung vom nächsten bestmöglichen Schritt viel / wenig von diesem Schritt / von dem nächsten
            ["nein", '0.8'],
        ]);

        var nu = new Blockly.FieldDropdown([
            ["selten", '0.1'],  //Blockly.Msg.RL_STARTING_POSITION_ACHIEVED_IN_PREVIOUS_STATE
            ["oft", '0.9'], //Blockly.Msg.RL_STARTING_POSITION_RANDOM
        ]);

        var rho = new Blockly.FieldDropdown([
            ["selten", '0.1'],  //Blockly.Msg.RL_EXPERIENCE_NONE
            ["manchmal", '0.5'],  //Blockly.Msg.RL_EXPERIENCE_SOME
            ["oft", '0.9'],  //Blockly.Msg.RL_EXPERIENCE_MUCH
        ]);



        this.appendDummyInput()
            .appendField(numberStar + "lerne ")
            .appendField(alpha, 'ALPHA')
        this.appendDummyInput()
            .appendField(numberStar + "hole extra Belohnung vom nächsten Abschnitt")
            .appendField(gamma, 'GAMMA')
        this.appendDummyInput()
            .appendField(numberStar + "erlaube Teleportation")
            .appendField(nu, 'NU')
        this.appendDummyInput()
            .appendField(numberStar + "nutze deine Vorerfahrung") //Blockly.Msg.RL_EXPERIENCE
            .appendField(rho, 'RHO')


        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.RL_Q_LEARNER_CONFIG_TOOLTIP);
    }
}

