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




Blockly.Blocks['ai_q_learning_states_and_actions_matrix'] = {
    init : function () {
        this.setInputsInline(false);

        this.setColour(Blockly.CAT_AI_RGB);
        this.appendDummyInput().appendField( 'Gestalte die Karte 3x3')

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

        var goal = new Blockly.FieldDropdown([
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
            .appendField("Start")
            .appendField(start, 'Start')
            .appendField("Ziel")
            .appendField( goal,'Ziel');

        this.appendValueInput("OUTPUT_LAYER").appendField('Setze Hindernisse').setCheck("Array_OutputNode");
        // this.appendDummyInput()
        //     .appendField(new Blockly.FieldImage("./map(2).svg ", 100, 100, { alt: "*", flipRtl: "FALSE" }));

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NEURAL_NETWORK_TOOLTIP);
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

        var goal = new Blockly.FieldDropdown([
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
            .appendField("Berg zwischen ")
            .appendField(start, 'Start')
            .appendField("und")
            .appendField( goal,'Ziel');

        this.setOutput(true, 'OutputNode');


    }
}


Blockly.Blocks['ai_q_drive_the_best_way'] = {
    init : function () {

        this.appendValueInput("OUTPUT_LAYER").appendField('Fahre den optimalen Weg mit der Geschwindigkeit ').setCheck('Number');

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NEURAL_NETWORK_TOOLTIP);
    }
    }

Blockly.Blocks['ai_q_apply_learning_rule'] = {
    init : function () {

        this.appendDummyInput().appendField("Führe einen Lernschritt aus");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NEURAL_NETWORK_TOOLTIP);
    }
}


Blockly.Blocks['ai_q_learner_config'] = {
    init : function () {
        this.setInputsInline(false);

        this.appendDummyInput()
            .appendField("Set up the learning behaviour")

        var alpha = new Blockly.FieldDropdown([
            ["langsam", '0.1'],
            ["mittel", '0.5'],
            ["schnell", '0.9'],

        ]);

        var gamma = new Blockly.FieldDropdown([
            ["sofort", '0.2'],
            ["später", '0.8'],
        ]);

        var nu = new Blockly.FieldDropdown([
            ["Bleib auf dem Pfad", 'zufällig'],
            ["Suche den Startpunkt zufällig", 'nicht zufallig'],
        ]);

        var rho = new Blockly.FieldDropdown([
            ["Keine: auf zu den neuen Ufern! ", '0.1'],
            ["Teils/Teils", '0.5'],
            ["Viel: Nutze dein bestehendes Wissen aus", '0.9'],
        ]);




        this.appendDummyInput()
            .appendField("Lerntempo")
            .appendField(alpha, 'alpha')
        this.appendDummyInput()
            .appendField("Belohnung")
            .appendField(gamma, 'gamma')
        this.appendDummyInput()
            .appendField("Startposition")
            .appendField(nu, 'nu')
        this.appendDummyInput()
            .appendField("Erfahrung")
            .appendField(rho, 'rho')



        //this.appendValueInput("OUTPUT_LAYER").appendField('Fahre den optimalen Weg mit der Geschwindigkeit ').setCheck('Number');


        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NEURAL_NETWORK_TOOLTIP);
    }
}