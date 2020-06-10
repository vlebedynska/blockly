/**
 * @fileoverview AI blocks
 * @requires Blockly.Blocks
 * @author vlebedynska
 */

'use strict';

goog.provide('Blockly.Blocks.ai');

goog.require('Blockly.Blocks');

//Blockly.Blocks.lists.HUE = 260;


Blockly.Blocks['ai_neural_network'] = {
    /**
     * TODO Write a block description
     */

    init : function () {

        this.appendDummyInput().appendField( 'Input Layer');
        this.appendValueInput("INPUT_LAYER").setCheck("Array_InputNode");
        this.appendDummyInput().appendField( '--------');
        this.appendDummyInput().appendField( 'Output Layer');
        this.appendValueInput("OUTPUT_LAYER").setCheck("Array_OutputNode");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NEURAL_NETWORK_TOOLTIP);
    }

}

Blockly.Blocks['ai_nn_input_node_ultrasonic'] = {
    /**
     * TODO Write a block description
     * TODO SwitchCase for DropDowns or dynamically access device.
     * This is the input layer node
     */

    init:function () {
        var aiInput = new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 1", 'ULTRASONIC_PORT_1'],
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 2", 'ULTRASONIC_PORT_2'],
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 3", 'ULTRASONIC_PORT_3'],
            [Blockly.Msg.SENSOR_ULTRASONIC + " " + Blockly.Msg.PORT + " 4", 'ULTRASONIC_PORT_4']
        ]);
        this.setOutput(true, 'InputNode');
        this.appendDummyInput().appendField(aiInput, "INPUTNODE")
            .appendField(Blockly.Msg.THRESHOLD)
            .appendField(new Blockly.FieldNumber(0), "THRESHOLD");
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
        this.setColour(Blockly.CAT_AI_RGB);
        var colorField = new Blockly.FieldColour('#DC143C');
        colorField
            .setColours([ Blockly.Msg.RED, '#0057A6', '#00FF00'])
            .setColumns(3);

        var port = new Blockly.FieldDropdown([
               [Blockly.Msg.PORT + " 1", '1'],
               [Blockly.Msg.PORT + " 2", '2'],
               [Blockly.Msg.PORT + " 3", '3'],
               [Blockly.Msg.PORT + " 4", '4']
            ]);

        this.setOutput(true, 'InputNode');
        this.appendDummyInput()
            .appendField(Blockly.Msg.SENSOR_COLOUR)
            .appendField(colorField, "COLOUR")
            .appendField(Blockly.Msg.SENSOR_COLOUR_PERSENTAGE)
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
        this.appendDummyInput().appendField(Blockly.Msg.MAP);

        var start = new Blockly.FieldDropdown([
            ["A", 'A'],
            ["B", 'B'],
            ["C", 'C'],
            ["D", 'D'],
            ["E", 'E'],
            ["F", 'F'],
            ["G", 'G'],
            ["H", 'H'],
            ["I", 'I'],

        ]);

        var finish = new Blockly.FieldDropdown([
            ["I", 'I'],
            ["A", 'A'],
            ["B", 'B'],
            ["C", 'C'],
            ["D", 'D'],
            ["E", 'E'],
            ["F", 'F'],
            ["G", 'G'],
            ["H", 'H'],
        ]);


        this.appendDummyInput()
            .appendField(Blockly.Msg.RL_STARTING_POSITION)
            .appendField(start, 'START')
            .appendField(Blockly.Msg.RL_FINISH_POSITION)
            .appendField( finish,'FINISH');

        this.appendValueInput("OBSTACLE").appendField(Blockly.Msg.RL_PLACE_OBSTACLE).setCheck("Array_Obstacle");
        // this.appendDummyInput()
        //     .appendField(new Blockly.FieldImage("./map(2).svg ", 100, 100, { alt: "*", flipRtl: "FALSE" }));

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.RL_STATES_AND_ACTIONS_MATRIX_TOOLTIP);
    }
}

Blockly.Blocks['ai_q_barrier_mountain'] = {
    init : function () {

        var start = new Blockly.FieldDropdown([
            ["A", 'A'],
            ["B", 'B'],
            ["C", 'C'],
            ["D", 'D'],
            ["E", 'E'],
            ["F", 'F'],
            ["G", 'G'],
            ["H", 'H'],
            ["I", 'I'],

        ]);

        var finish = new Blockly.FieldDropdown([
            ["I", 'I'],
            ["A", 'A'],
            ["B", 'B'],
            ["C", 'C'],
            ["D", 'D'],
            ["E", 'E'],
            ["F", 'F'],
            ["G", 'G'],
            ["H", 'H'],
        ]);

        this.appendDummyInput()
            .appendField(Blockly.Msg.RL_BARRIER_MOUNTAIN)
            .appendField(start, 'START')
            .appendField(Blockly.Msg.AND)
            .appendField( finish,'FINISH');

        this.setOutput(true, 'Obstacle');
        this.setTooltip(Blockly.Msg.RL_BARRIER_MOUNTAIN_TOOLTIP);

    }
}


Blockly.Blocks['ai_q_drive_the_best_way'] = {
    init : function () {

        this.appendValueInput("POWER").appendField(Blockly.Msg.RL_DRIVE_OPTIMA_PATH).appendField(Blockly.Msg.MOTOR_SPEED).setCheck('Number');

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.RL_DRIVE_OPTIMA_PATH_TOOLTIP);
    }
    }


Blockly.Blocks['ai_q_draw_the_best_way'] = {
    init : function () {

        this.appendDummyInput().appendField(Blockly.Msg.RL_DRAW_OPTIMAL_PATH);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.RL_DRAW_OPTIMA_PATH_TOOLTIP);
    }
}

Blockly.Blocks['ai_q_apply_learning_rule'] = {
    init : function () {

        this.appendDummyInput().appendField(Blockly.Msg.RL_GAIN_EXPERIENCE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.RL_GAIN_EXPERIENCE_TOOLTIP);
    }
}


Blockly.Blocks['ai_q_learner_config'] = {
    init : function () {
        this.setInputsInline(false);

        this.appendDummyInput()
            .appendField(Blockly.Msg.RL_Q_LEARNER_CONFIG_SET_UP_LEARNING_BEHAVIOUR)

        var alpha = new Blockly.FieldDropdown([
            [Blockly.Msg.RL_SLOW, '0.1'],
            [Blockly.Msg.RL_MEDIUM, '0.5'],
            [Blockly.Msg.RL_FAST, '0.9'],

        ]);

        var gamma = new Blockly.FieldDropdown([
            [Blockly.Msg.RL_REWARD_IMMEDIATE, '0.2'],
            [Blockly.Msg.RL_REWARD_LATER, '0.8'],
        ]);

        var nu = new Blockly.FieldDropdown([
            [Blockly.Msg.RL_STARTING_POSITION_ACHIEVED_IN_PREVIOUS_STATE, '0.1'],
            [Blockly.Msg.RL_STARTING_POSITION_RANDOM, '0.9'],
        ]);

        var rho = new Blockly.FieldDropdown([
            [Blockly.Msg.RL_EXPERIENCE_NONE, '0.1'],
            [Blockly.Msg.RL_EXPERIENCE_SOME, '0.5'],
            [Blockly.Msg.RL_EXPERIENCE_MUCH, '0.9'],
        ]);



        this.appendDummyInput()
            .appendField(Blockly.Msg.RL_LEARNING_SPEED)
            .appendField(alpha, 'ALPHA')
        this.appendDummyInput()
            .appendField(Blockly.Msg.RL_REWARD)
            .appendField(gamma, 'GAMMA')
        this.appendDummyInput()
            .appendField(Blockly.Msg.RL_START_POSITION)
            .appendField(nu, 'NU')
        this.appendDummyInput()
            .appendField(Blockly.Msg.RL_EXPERIENCE)
            .appendField(rho, 'RHO')


        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.RL_Q_LEARNER_CONFIG_TOOLTIP);
    }
}