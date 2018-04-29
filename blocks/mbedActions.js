/**
 * @fileoverview Action blocks for MakeBlock.
 * @requires Blockly.Blocks
 * @author Artem
 */
'use strict';

goog.provide('Blockly.Blocks.mbedActions');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

Blockly.Blocks['mbedActions_motor_on'] = {
    /**
     * Turn motor on with specific power.
     * 
     * @constructs mbedActions_motor_on
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - A, B, A + B
     * @param {Number}
     *            POWER relative - 0-100
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        var ports = [ [ Blockly.Msg.MOTOR_PORT + ' A', 'A' ], [ Blockly.Msg.MOTOR_PORT + ' B', 'B' ], [ Blockly.Msg.MOTOR_PORT + ' A + B', 'AB' ] ];
        this.setColour(Blockly.CAT_ACTION_RGB);
        var motorPort = new Blockly.FieldDropdown(ports);
        this.appendValueInput('POWER').appendField(motorPort, 'MOTORPORT').appendField(Blockly.Msg.ON).appendField(Blockly.Msg.MOTOR_SPEED).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg['MOTOR_ON_TOOLTIP_' + this.workspace.device.toUpperCase()] || Blockly.Msg.MOTOR_ON_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_single_motor_on'] = {
    /**
     * Turn single motor on with specific power.
     * 
     * @constructs mbedActions_single_motor_on
     * @this.Blockly.Block
     * @param {Number}
     *            POWER relative - -100-100
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('POWER').appendField(Blockly.Msg.MOTOR).appendField(Blockly.Msg.MOTOR_ON).appendField(Blockly.Msg.ON).appendField(Blockly.Msg.MOTOR_SPEED).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg['SINGLE_MOTOR_ON_TOOLTIP_' + this.workspace.device.toUpperCase()] || Blockly.Msg.SINGLE_MOTOR_ON_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_single_motor_stop'] = {
    /**
     * Stop this motor.
     * 
     * @constructs mbedActions_single_motor_stop
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MODE - Float or Non Float
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var mode = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_FLOAT, 'FLOAT' ], [ Blockly.Msg.MOTOR_BRAKE, 'NONFLOAT' ], [ Blockly.Msg.SLEEP, 'SLEEP' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR).appendField(Blockly.Msg.MOTOR_STOP).appendField(mode, 'MODE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTOR_STOP_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_motor_stop'] = {
    /**
     * Stop this motor.
     * 
     * @constructs robActions_motor_stop
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            MOTORPORT - A, B, C, or D
     * @param {String/dropdown}
     *            MODE - Float or Non Float
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var ports = [ [ Blockly.Msg.MOTOR_PORT + ' A', 'A' ], [ Blockly.Msg.MOTOR_PORT + ' B', 'B' ], [ Blockly.Msg.MOTOR_PORT + ' A + B', 'AB' ] ];
        var motorPort = new Blockly.FieldDropdown(ports);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_STOP).appendField(motorPort, 'MOTORPORT');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MOTOR_STOP_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_display_text'] = {
    /**
     * Display a text on the screen.
     * 
     * @constructs mbedActions_display_text
     * @this.Blockly.Block
     * @param {String}
     *            OUT Text to show
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var what = new Blockly.FieldDropdown([ [ Blockly.Msg.DISPLAY_TEXT, 'TEXT' ], [ Blockly.Msg.DISPLAY_CHARACTER, 'CHARACTER' ] ]);
        this.appendValueInput('OUT').appendField(Blockly.Msg.DISPLAY_SHOW).appendField(what, 'TYPE').setCheck([ 'Number', 'Boolean', 'String' ]);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_TEXT_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_display_image'] = {
    /**
     * Display an image on the screen.
     * 
     * @constructs mbedActions_display_image
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            PICTURE - Smiley1-4
     * @param {Number}
     *            X Position on screen
     * @param {Number}
     *            Y Position on screen
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var what = new Blockly.FieldDropdown([ [ Blockly.Msg.DISPLAY_IMAGE, 'IMAGE' ], [ Blockly.Msg.DISPLAY_ANIMATION, 'ANIMATION' ] ], function(option) {
            if (option) {
                this.sourceBlock_.updateShape_(option);
            }
        });
        this.appendValueInput('VALUE').appendField(Blockly.Msg.DISPLAY_SHOW).appendField(what, 'TYPE').setCheck('Image');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_PICTURE_TOOLTIP);
    },
    /**
     * Create XML to represent the type of the element to show.
     * 
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('type', this.getFieldValue('TYPE'));
        return container;
    },
    /**
     * Parse XML to restore the type of the element to show.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        this.updateShape_(xmlElement.getAttribute('type'));
    },
    /**
     * Modify this block to have the correct number of inputs.
     * 
     * @private
     * @this Blockly.Block
     */
    updateShape_ : function(option) {
        if (!this.workspace || Blockly.Block.dragMode_ == 2) {
            // Block has been deleted or is in move
            return;
        }
        if (option === 'IMAGE') {
            this.getInput('VALUE').setCheck('Image');
        } else {
            this.getInput('VALUE').setCheck('Array_Image');
        }
    }
};

Blockly.Blocks['mbedActions_display_clear'] = {
    /**
     * Clear the display.
     * 
     * @constructs mbedActions_display_clear
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        // this.setHelpUrl(Blockly.Msg.DISPLAY_CLEAR_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.DISPLAY_CLEAR);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_CLEAR_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.DISPLAY_CLEAR_HELP));
    }
};

Blockly.Blocks['mbedActions_display_getPixel'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('X').setCheck('Number').appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.DISPLAY_PIXEL_TITLE).appendField(Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.X);
        this.appendValueInput('Y').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Y);
        this.setTooltip(Blockly.Msg.DISPLAY_GET_PIXEL_TOOLTIP);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks['mbedActions_display_setPixel'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('X').setCheck('Number').appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.DISPLAY_PIXEL_TITLE).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.X);
        this.appendValueInput('Y').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.Y);
        this.appendValueInput('BRIGHTNESS').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_SET_PIXEL_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_ledBar_set'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('X').setCheck('Number').appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.LEDBAR).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.X);
        this.appendValueInput('BRIGHTNESS').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LEDBAR_SET_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_display_getBrightness'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS);
        this.setTooltip(Blockly.Msg.DISPLAY_GET_BRIGHTNESS_TOOLTIP);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks['mbedActions_display_setBrightness'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('BRIGHTNESS').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.SET + ' '
                + Blockly.Msg.DISPLAY_PIXEL_BRIGHTNESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DISPLAY_SET_BRIGHTNESS_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_fourDigitDisplay_show'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('VALUE').appendField(Blockly.Msg.DISPLAY_SHOW + " " + Blockly.Msg.FOURDIGITDISPLAY).appendField(Blockly.Msg.VARIABLES_TYPE_NUMBER).setCheck('Number');
        this.appendValueInput('POSITION').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.FROM_POSITION).setCheck('Number');
        this.appendValueInput('COLON').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLON).setCheck('Boolean');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.FOURDIGITDISPLAY_SHOW_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_fourDigitDisplay_clear'] = {
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.DISPLAY_CLEAR).appendField(Blockly.Msg.FOURDIGITDISPLAY);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.FOURDIGITDISPLAY_CLEAR_TOOLTIP);
    }
};

Blockly.Blocks['mbedActions_play_tone'] = {
    /**
     * Play a tone.
     * 
     * @constructs robActions_play_tone
     * @this.Blockly.Block
     * @param {Number}
     *            FREQUENCE Frequence
     * @todo
     * @param {Number}
     *            DURATION Time in milliseconds
     * @returns after execution (after DURATION)
     * @memberof Block
     */
    init : function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_TONE_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('FREQUENCE').appendField(Blockly.Msg.PLAY).appendField(Blockly.Msg.PLAY_FREQUENZ).setCheck('Number');
        this.appendValueInput('DURATION').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PLAY_DURATION);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PLAY_TONE_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_TONE_HELP));
    }
};

Blockly.Blocks['mbedActions_play_note'] = {
    /**
     * Play a tone.
     * 
     * @constructs mbedActions_play_tone
     * @this.Blockly.Block
     * @param {Number}
     *            FREQUENCE Frequence
     * @todo
     * @param {Number}
     *            DURATION Time in milliseconds
     * @returns after execution (after DURATION)
     * @memberof Block
     */
    init : function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_TONE_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        var frequence = new Blockly.FieldNote('261.626');
        var duration = new Blockly.FieldDropdown([ [ Blockly.Msg.PLAY_WHOLE, '2000' ], [ Blockly.Msg.PLAY_HALF, '1000' ], [ Blockly.Msg.PLAY_QUARTER, '500' ],
                [ Blockly.Msg.PLAY_EIGHTH, '250' ], [ Blockly.Msg.PLAY_SIXTEENTH, '125' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.PLAY).appendField(duration, 'DURATION').appendField(frequence, 'FREQUENCE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PLAY_NOTE_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_TONE_HELP));
    }
};

Blockly.Blocks['mbedActions_play_setVolume'] = {
    /**
     * Set volume.
     * 
     * @constructs mbedActions_play_setVolume
     * @this.Blockly.Block
     * @param {Number}
     *            VOLUME 0-100, default 50
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_SETVOLUME_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('VOLUME').appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.PLAY_VOLUME).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PLAY_SETVOLUME_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_SETVOLUME_HELP));
    }
};

Blockly.Blocks['mbedActions_play_getVolume'] = {
    /**
     * Get current volume
     * 
     * @constructs mbedActions_play_getVolume
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     * @see {@link mbedActions_play_setVolume}
     */
    init : function() {
        // this.setHelpUrl(Blockly.Msg.PLAY_GETVOLUME_HELPURL);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.PLAY_VOLUME);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.PLAY_GETVOLUME_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.PLAY_GETVOLUME_HELP));
    }
};

Blockly.Blocks['mbedActions_leds_on'] = {
    /**
     * Turn bricklight on.
     * 
     * @constructs mbedActions_brickLight_on
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            SWITCH_COLOR - Green, Orange or Red
     * @param {Boolean/dropdown}
     *            SWITCH_BLINK - True or False
     * @returns immediately
     * @memberof Block
     */
    init : function() {

        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('COLOR').appendField(Blockly.Msg.LED_ON).appendField(Blockly.Msg.BRICKLIGHT_COLOR).setCheck('Colour');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_ON_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.BRICKLIGHT_ON_HELP));
    }
};

Blockly.Blocks['mbedActions_leds_off'] = {
    /**
     * Turn bricklight off.
     * 
     * @constructs mbedActions_brickLight_off
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        // this.setHelpUrl(Blockly.Msg.BRICKLIGHT_OFF_HELP);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.LED_OFF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LED_OFF_TOOLTIP);
        // this.setHelp(new Blockly.Help(Blockly.Msg.BRICKLIGHT_OFF_HELP));
    }
};

Blockly.Blocks['mbedActions_write_to_pin'] = {
    /**
     * Sends to choosen pin value.
     * 
     * @constructs mbedActions_write_to_pin
     * @this.Blockly.Block
     * @param {String/dropdown}
     *            VALUETYPE - analog, digital
     * @param {String/dropdown}
     *            PIN - 0-3
     * @param {Number}
     *            VALUE
     * @returns immediately
     * @memberof Block
     */

    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var valueType = new Blockly.FieldDropdown([ [ Blockly.Msg.ANALOG, 'ANALOG' ], [ Blockly.Msg.DIGITAL, 'DIGITAL' ] ], function(option) {
            if (option && this.sourceBlock_.getFieldValue('VALUETYPE') !== option) {
                this.sourceBlock_.updatePins_(option);
            }
        });
        this.appendValueInput('VALUE').appendField(Blockly.Msg.PIN_WRITE).appendField(valueType, 'VALUETYPE').appendField(Blockly.Msg.VALUE_TO + ' '
                + Blockly.Msg.SENSOR_PIN).appendField(new Blockly.FieldDropdown([ [ "dummy", '0' ] ]), 'PIN').setCheck('Number');
        this.protocol_ = 'ANALOG';
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.WRITE_TO_PIN_TOOLTIP);
        this.updatePins_(this.protocol_);
    },
    /**
     * Create XML to represent whether the sensor type has changed.
     * 
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('protocol', this.protocol_);
        return container;
    },
    /**
     * Parse XML to restore the sensor type.
     * 
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        var input = xmlElement.getAttribute('protocol');
        this.protocol_ = input;
        this.updatePins_(this.protocol_);
    },
    updatePins_ : function(protocol) {
        this.protocol_ = protocol;
        if (this.workspace.device === 'microbit') {
            var pins = [ [ '0', '0' ], [ '1', '1' ], [ '2', '2' ] ];
            var pinField = this.getField("PIN");
            pinField.menuGenerator_ = pins;
            pinField.setValue("0");
            pinField.setText('0');
            return;
        }
        if (protocol === 'ANALOG') {
            var pins = [ [ '1', '1' ], [ '2', '2' ], [ 'A1', '5' ] ];
            var pinField = this.getField("PIN");
            pinField.menuGenerator_ = pins;
            pinField.setValue("1");
            pinField.setText('1');
        } else if (protocol === 'DIGITAL') {
            var pins = [ [ '0', '0' ], [ '1', '1' ], [ '2', '2' ], [ '3', '3' ], [ 'A0', '4' ], [ 'A1', '5' ] ];
            var pinField = this.getField("PIN");
            pinField.menuGenerator_ = pins;
            pinField.setValue("0");
            pinField.setText('0');
        }
    }
};
