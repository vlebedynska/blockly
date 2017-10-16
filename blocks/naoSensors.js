/**
 * @fileoverview Sensor blocks for NAO.
 * @requires Blockly.Blocks
 * @author Janis
 */

'use strict';

goog.provide('Blockly.Blocks.naoSensors');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

Blockly.Blocks['naoSensors_getSample'] = {
    /**
     * Get the current reading from chosen sensor.
     *
     * @constructs naoSensors_getSample
     * @this.Blockly.Block
     * @param {String/dropdown}
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var position = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_TOUCH_HAND, 'HAND' ], [ Blockly.Msg.NAO_TOUCH_BUMPER, 'BUMPER' ],
                [ Blockly.Msg.NAO_HEADSENSOR, 'HEAD' ] ]);
        var touchSide = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'LEFT' ], [ Blockly.Msg.MOTOR_RIGHT, 'RIGHT' ],
                [ Blockly.Msg.NAO_TOUCH_FRONT, 'FRONT' ], [ Blockly.Msg.MOTOR_MIDDLE, 'MIDDLE' ], [ Blockly.Msg.NAO_TOUCH_REAR, 'REAR' ] ]);
        var touchHeadSide = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'LEFT' ], [ Blockly.Msg.MOTOR_RIGHT, 'RIGHT' ],
                [ Blockly.Msg.NAO_TOUCH_FRONT, 'FRONT' ], [ Blockly.Msg.MOTOR_MIDDLE, 'MIDDLE' ], [ Blockly.Msg.NAO_TOUCH_REAR, 'REAR' ] ]);
        var sensorType = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_TOUCH, 'NAO_TOUCHSENSOR' ], [ Blockly.Msg.NAO_DETECTFACE, 'NAO_DETECTFACE' ],
                [ Blockly.Msg.NAO_NAOMARK, 'NAO_NAOMARK' ], [ Blockly.Msg.SENSOR_SONAR, 'NAO_SONAR' ], [ Blockly.Msg.NAO_GYROMETER, 'NAO_GYROMETER' ],
                [ Blockly.Msg.NAO_ACCELEROMETER, 'NAO_ACCELEROMETER' ], [ Blockly.Msg.NAO_FSR, 'NAO_FSR' ], [ Blockly.Msg.NAO_RECOGNIZEWORD, 'NAO_RECOGNIZEWORD' ] ],
       function(option) {
            if (option && this.sourceBlock_.getFieldValue('SENSORTYPE') !== option ) {
                this.sourceBlock_.updateShape_(option);
            }
        });
        this.appendDummyInput('DROPDOWN').appendField(Blockly.Msg.GET, 'GET').appendField(sensorType, 'SENSORTYPE').appendField(position, 'POSITION').appendField(touchSide, 'SIDE');
        this.setOutput(true, 'Boolean');
        this.sensorType_ = 'NAO_TOUCHSENSOR';
        this.setTooltip(Blockly.Msg.GETSAMPLE_TOOLTIP);
        this.setMovable(false);
        this.setDeletable(false);
        //this.updateShape_(this.sensorType_);
    },
    /**
     * Create XML to represent whether the sensor type has changed.
     *
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        var container = document.createElement('mutation');
        container.setAttribute('input', this.sensorType_);
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
        var input = xmlElement.getAttribute('input');
        this.sensorType_ = input;
        this.updateShape_(this.sensorType_, true);
    },

    /**
     * Called whenever anything on the workspace changes.
     *
     * @this Blockly.Block
     */
    /*
     * onchange : function() { if (!this.workspace) { // Block has been deleted.
     * return; } else if (this.update) this.updateShape_(); },
     */
    /**
     * Called whenever the shape has to change.
     *
     * @this Blockly.Block
     */
    updateShape_ : function(option, fromMutation) {
        this.sensorType_ = option;
        var position = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_TOUCH_HAND, 'HAND' ], [ Blockly.Msg.NAO_TOUCH_BUMPER, 'BUMPER' ],
                [ Blockly.Msg.NAO_HEADSENSOR, 'HEAD' ] ], function(touchPosition) {
            if (touchPosition && this.sourceBlock_.getFieldValue('POSITION') !== touchPosition) {
                this.sourceBlock_.updateShape__(touchPosition);
            }
        });
        var gyrocoord = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ] ]);
        var accelcoord = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ], [ 'Z', 'Z' ] ]);
        var side = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'LEFT' ], [ Blockly.Msg.MOTOR_RIGHT, 'RIGHT' ] ]);
        var sensorType = new Blockly.FieldDropdown([ [ Blockly.Msg.SENSOR_TOUCH, 'NAO_TOUCHSENSOR' ], [ Blockly.Msg.NAO_DETECTFACE, 'NAO_DETECTFACE' ],
                [ Blockly.Msg.NAO_NAOMARK, 'NAO_NAOMARK' ], [ Blockly.Msg.SENSOR_SONAR, 'NAO_SONAR' ], [ Blockly.Msg.NAO_GYROMETER, 'NAO_GYROMETER' ],
                [ Blockly.Msg.NAO_ACCELEROMETER, 'NAO_ACCELEROMETER' ], [ Blockly.Msg.NAO_FSR, 'NAO_FSR' ],
                [ Blockly.Msg.NAO_RECOGNIZEWORD, 'NAO_RECOGNIZEWORD' ] ], function(option) {
            if (option && this.sourceBlock_.getFieldValue('SENSORTYPE') !== option ) {
                this.sourceBlock_.updateShape_(option);
            }
        });

        var input = this.getInput('DROPDOWN');
        if (input != null) {
            var toRemove = [];
            for (var i = 0, field; field = input.fieldRow[i]; i++) {
                if (field.name === 'SENSORTYPE' || field.name === 'GET') {
                    continue;
                }
                toRemove.push(field.name);
            }
            for (var j = 0; j < toRemove.length; j++) {
                input.removeField(toRemove[j]);
            }
        } else {
            var target = this.getInputTargetBlock('WORD');
            if (target) {
                target.dispose();
            }
            this.removeInput('WORD', true);
            this.appendDummyInput('DROPDOWN').appendField(Blockly.Msg.GET, 'GET').appendField(sensorType, 'SENSORTYPE');
            input = this.getInput('DROPDOWN');
        }
        if (this.sensorType_ == 'NAO_DETECTFACE') {
            this.appendValue_('TEXT', 'Roberta');
            this.setOutput(true, 'String');
        } else if (this.sensorType_ == 'NAO_NAOMARK') {
            this.appendValue_('BOOL');
            this.setOutput(true, 'Boolean');
        } else if (this.sensorType_ == 'NAO_SONAR') {
            this.appendValue_('NUM_REV', 30);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'NAO_GYROMETER') {
            input.appendField(gyrocoord, 'COORDINATE');
            this.appendValue_('NUM_REV', 1);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'NAO_ACCELEROMETER') {
            input.appendField(accelcoord, 'COORDINATE');
            this.appendValue_('NUM_REV', 1);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'NAO_FSR') {
            input.appendField(side, 'SIDE');
            this.appendValue_('NUM_REV', 2);
            this.setOutput(true, 'Number');
        } else if (this.sensorType_ == 'NAO_TOUCHSENSOR') {
           input.appendField(position, 'POSITION').appendField(side, 'SIDE');
           this.appendValue_('BOOL');
           this.setOutput(true, 'Boolean');
        } else if (this.sensorType_ == 'NAO_RECOGNIZEWORD') {
            this.removeInput('DROPDOWN', true);
            this.appendValueInput('WORD').appendField(Blockly.Msg.GET, 'GET').appendField(sensorType, 'SENSORTYPE').setCheck([ 'Array_String', 'String' ]);
            this.appendValue_('TEXT', 'OpenRoberta');
            this.setOutput(true, 'String');
            if (!fromMutation) {
                var list = this.workspace.newBlock('robLists_create_with');
                list.setFieldValue('String', 'LIST_TYPE');
                list.listType_ = 'String';
                list.setOutput(true, 'Array_String');
                list.getInput('ADD0').setCheck('String');
                list.initSvg();
                list.render();
                list.updateShape_(-1);
                list.updateShape_(-1);
                if (!this.inTask) {
                    list.setInTask(false);
                }
                var wordList = this.getInput('WORD');
                wordList.connection.connect(list.outputConnection);
                var block = this.workspace.newBlock('text');
                block.setFieldValue('OpenRoberta', 'TEXT');
                block.initSvg();
                block.render();
                if (!this.inTask) {
                    block.setInTask(false);
                }
                var list0 = list.getInput('ADD0');
                list0.connection.connect(block.outputConnection);
            }
        }
        sensorType.setValue(this.sensorType_);
    },

    updateShape__ : function(touchPosition) {
        var bodyPart = touchPosition;
        var side = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'LEFT' ], [ Blockly.Msg.MOTOR_RIGHT, 'RIGHT' ] ]);
        var headSide = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_TOUCH_FRONT, 'FRONT' ], [ Blockly.Msg.MOTOR_MIDDLE, 'MIDDLE' ], [ Blockly.Msg.NAO_TOUCH_REAR, 'REAR' ] ]);

        var input = this.getInput('DROPDOWN');
        var toRemove = [];
        for (var i = 0, field; field = input.fieldRow[i]; i++) {
            if (field.name === 'SENSORTYPE' || field.name === 'GET' || field.name === 'POSITION') {
                continue;
            }
            toRemove.push(field.name);
        }
        for (var j = 0; j < toRemove.length; j++) {
            input.removeField(toRemove[j]);
        }
        if ( bodyPart == 'HEAD') {
            input.appendField(headSide, 'SIDE');
        } else {
            input.appendField(side, 'SIDE');
        }
    },

    /**
     * Called whenever the blocks shape has changed.
     *
     * @this Blockly.Block
     */
    appendValue_ : function(type, value) {
        value = value || 30;
        var logComp = this.getParent();
        if (logComp && logComp.type != 'logic_compare')
            logComp = null;
        if (logComp) {
            // change inputs, if block is in logic_compare and not rebuild from mutation.
            if (logComp.getInputTargetBlock('B')) {
                logComp.getInputTargetBlock('B').dispose();
            }
            var block = null;
            logComp.updateShape(type);
            if (type == 'NUM' || type == 'NUM_REV') {
                block = this.workspace.newBlock('math_number');
                block.setFieldValue(value.toString(), 'NUM');
            } else if (type == 'BOOL') {
                block = this.workspace.newBlock('logic_boolean');
            } else if (type == 'TEXT') {
                block = this.workspace.newBlock('text');
                block.setFieldValue(value, 'TEXT');
            }
            block.initSvg();
            block.render();
            if (!logComp.inTask) {
                block.setInTask(false);
            }
            var valueB = logComp.getInput('B');
            valueB.connection.connect(block.outputConnection);
        }
    }
};

Blockly.Blocks['naoSensors_dialog'] = {
    /**
     * Tries to recognize a phrase and says the answer on success.
     *
     * @constructs naoActions_dialog
     * @this.Blockly.Block
     * @param {String}
     *            PHRASE Phrase that is recognized ANSWER NAOs answer
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('PHRASE').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NAO_PHRASE);
        this.appendValueInput('ANSWER').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NAO_ANSWER);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_DIALOG_TOOLTIP);
    }
};

Blockly.Blocks['naoSensors_recognizeWord'] = {
    /**
     * Recognize a word.
     *
     * @constructs naoActions_recognizeWord
     * @this.Blockly.Block
     * @param {String}
     *            WORD Word to recognize
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendValueInput('WORD').appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.NAO_RECOGNIZEWORD).setCheck([ 'Array_String', 'String' ]);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, 'String');
        this.setTooltip(Blockly.Msg.NAO_RECOGNIZEWORD_TOOLTIP);
    }
};

Blockly.Blocks['naoSensors_touchsensors'] = {
    /**
     * Get the current reading from one of the touchsensors.
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var side = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'LEFT' ], [ Blockly.Msg.MOTOR_RIGHT, 'RIGHT' ] ]);
        var position = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_TOUCH_HAND, 'HAND' ], [ Blockly.Msg.NAO_TOUCH_BUMPER, 'BUMPER' ], [ Blockly.Msg.NAO_HEADSENSOR, 'HEAD' ] ],
            function(option) {
                if (option && this.sourceBlock_.getFieldValue('POSITION') !== option) {
                    this.sourceBlock_.updateShape_(option);
                }
            });

        this.appendDummyInput('DROPDOWN').appendField(Blockly.Msg.SENSOR_IS_PIN + ' ' + Blockly.Msg.SENSOR_TOUCH, 'TEXTFIELD').appendField(position, 'POSITION').appendField(side, 'SIDE').appendField(Blockly.Msg.SENSOR_IS_TOUCHED);
        this.setOutput(true, 'Boolean');
        this.setTooltip(Blockly.Msg.NAO_TOUCHSENSOR_TOOLTIP);
    },
    updateShape_ : function(option) {
        var bodyPart = option;
        var side = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'LEFT' ], [ Blockly.Msg.MOTOR_RIGHT, 'RIGHT' ] ]);
        var headSide = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_TOUCH_FRONT, 'FRONT' ], [ Blockly.Msg.MOTOR_MIDDLE, 'MIDDLE' ], [ Blockly.Msg.NAO_TOUCH_REAR, 'REAR' ] ]);

        var input = this.getInput('DROPDOWN');
        var toRemove = [];
        for (var i = 0, field; field = input.fieldRow[i]; i++) {
            if (field.name === 'POSITION' || field.name ===  'TEXTFIELD') {
                continue;
            }
            toRemove.push(field.name);
        }
        for (var j = 0; j < toRemove.length; j++) {
            input.removeField(toRemove[j]);
        }
        if ( bodyPart == 'HEAD') {
            input.appendField(headSide, 'SIDE').appendField(Blockly.Msg.SENSOR_IS_TOUCHED);
        } else {
            input.appendField(side, 'SIDE').appendField(Blockly.Msg.SENSOR_IS_TOUCHED);
        }
    }
};

Blockly.Blocks['naoSensors_sonar'] = {
    /**
     * Get the current reading from the sonar.
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.MODE_DISTANCE).appendField(Blockly.Msg.SENSOR_ULTRASONIC)
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.ULTRASONIC_GETSAMPLE_TOOLTIP);
    }
};

Blockly.Blocks['naoSensors_gyrometer'] = {
    /**
     * Get the current reading from the gyro sensor.
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var dropdown = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.NAO_GYROMETER).appendField(dropdown, 'COORDINATE');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.NAO_GYROMETER_TOOLTIP);
    }
};

Blockly.Blocks['naoSensors_accelerometer'] = {
    /**
     * Get the current reading from the accelerometer.
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var dropdown = new Blockly.FieldDropdown([ [ 'X', 'X' ], [ 'Y', 'Y' ], [ 'Z', 'Z' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.NAO_ACCELEROMETER).appendField(dropdown, 'COORDINATE');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.NAO_ACCELEROMETER_TOOLTIP);
    }
};

Blockly.Blocks['naoSensors_fsr'] = {
    /**
     * Get the current reading from the accelerometer.
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var side = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'LEFT' ], [ Blockly.Msg.MOTOR_RIGHT, 'RIGHT' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.NAO_FSR).appendField(side, 'SIDE');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.NAO_FSR_TOOLTIP);
    }
};

Blockly.Blocks['naoSensors_getCurrent'] = {
    /**
     * NAO returns the voltage of a joint
     *
     * @constructs naoActions_moveJoint
     * @this.Blockly.Block
     * @param {String}
     *            JOINT that is moved
     * @param {Number}
     *            POWER degrees the joint is moved
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_JOINT_HEADYAW, 'HEADYAW' ], [ Blockly.Msg.NAO_JOINT_HEADPITCH, 'HEADPITCH' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_SHOULDERPITCH, 'LSHOULDERPITCH' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_SHOULDERROLL, 'LSHOULDERROLL' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ELBOWYAW, 'LELBOWYAW' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ELBOWROLL, 'LELBOWROLL' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_WRISTYAW, 'LWRISTYAW' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HAND, 'LHAND' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HIPYAWPITCH, 'LHIPYAWPITCH' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HIPROLL, 'LHIPROLL' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HIPPITCH, 'LHIPPITCH' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_KNEEPITCH, 'LKNEEPITCH' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ANKLEPITCH, 'LANKLEPITCH' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ANKLEROLL, 'RANKLEROLL' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HIPYAWPITCH, 'RHIPYAWPITCH' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HIPROLL, 'RHIPROLL' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HIPPITCH, 'RHIPPITCH' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_KNEEPITCH, 'RKNEEPITCH' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ANKLEPITCH, 'RANKLEPITCH' ],
                [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ANKLEROLL, 'LANKLEROLL' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_SHOULDERPITCH, 'RSHOULDERPITCH' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_SHOULDERROLL, 'RSHOULDERROLL' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ELBOWYAW, 'RELBOWYAW' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ELBOWROLL, 'RELBOWROLL' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_WRISTYAW, 'RWRISTYAW' ],
                [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HAND, 'RHAND' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.NAO_CURRENT).appendField(dropdown, 'joint');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.NAO_GETCURRENT_TOOLTIP);
    }
};

/**
 * Block waiting for a word recognition
 *
 * @constructs naoSensors_chat
 * @param {Boolean} -
 *            any condition.
 * @returns after (first) condition is true.
 * @memberof Block
 */

Blockly.Blocks['naoSensors_chat'] = {

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        // this.setInputsInline(true);
        this.appendValueInput('WAIT0').appendField(Blockly.Msg.NAO_RECOGNIZEWORD).setCheck('String');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.lineCount_ = 0;
        this.setMutatorPlus(new Blockly.MutatorPlus(this));
        this.setTooltip(Blockly.Msg.NAO_CHAT_TOOLTIP);
    },
    /**
     * Create XML to represent the number of wait counts.
     *
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom : function() {
        if (!this.lineCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.lineCount_) {
            container.setAttribute('wait', this.lineCount_);
        }
        return container;
    },

    /**
     * Parse XML to restore the wait inputs.
     *
     * @param {!Element}
     *            xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation : function(xmlElement) {
        this.lineCount_ = parseInt(xmlElement.getAttribute('wait'), 10);
        for (var x = 1; x <= this.lineCount_; x++) {
            if (x == 1) {
                this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
            }
            this.appendValueInput('WAIT' + x).appendField(Blockly.Msg.NAO_RECOGNIZEWORDOR).setCheck('String');
            this.appendStatementInput('DO' + x).appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        }
        if (this.lineCount_ >= 1) {
            this.setMutatorMinus(new Blockly.MutatorMinus(this));
        }
    },
    /**
     * Update the shape according to the number of wait inputs.
     *
     * @param {Number}
     *            number of waits inputs.
     * @this Blockly.Block
     */
    updateShape_ : function(num) {
        Blockly.dragMode_ = Blockly.DRAG_NONE;
        if (num == 1) {
            this.lineCount_++;
            if (this.lineCount_ == 1)
                this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
            this.appendValueInput('WAIT' + this.lineCount_).appendField(Blockly.Msg.NAO_RECOGNIZEWORDOR).setCheck('String');
            this.appendStatementInput('DO' + this.lineCount_).appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        } else if (num == -1) {
            var target = this.getInputTargetBlock('DO' + this.lineCount_);
            if (target) {
                target.unplug();
                target.bumpNeighbours_();
            }
            var target = this.getInputTargetBlock('WAIT' + this.lineCount_);
            if (target) {
                target.unplug();
                target.bumpNeighbours_();
            }
            this.removeInput('DO' + this.lineCount_);
            this.removeInput('WAIT' + this.lineCount_);
            this.lineCount_--;
            if (this.lineCount_ == 0) {
                this.removeInput('DO0');
            }
            this.itemCount_--;
            this.removeInput('ADD' + this.itemCount_);
        }
        if (this.waitCount_ >= 1) {
            if (this.waitCount_ == 1) {
                this.setMutatorMinus(new Blockly.MutatorMinus(this));
                this.render();
            }
        } else {
            this.mutatorMinus.dispose();
            this.mutatorMinus = null;
            this.render();
        }
    }
};

Blockly.Blocks['naoSensors_naoMark'] = {
    /**
     * Get the number of a detected NAOMark.
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_NAOMARK);
        this.setOutput(true, 'Array_Number');
        this.setTooltip(Blockly.Msg.NAO_NAOMARK_TOOLTIP);
    }
};

Blockly.Blocks['naoSensors_detectFace'] = {
    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_DETECTFACE);
        this.setOutput(true, 'String');
        this.setTooltip(Blockly.Msg.NAO_DETECTFACE_TOOLTIP);
    }
};


Blockly.Blocks['naoSensors_getMarkInformation'] = {
    /**
     * Get the information about given NaoMark.
     */

    init : function() {
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.appendValueInput('VALUE').setCheck('Number').appendField(Blockly.Msg.NAO_MARK_GET_INFORMATION);
        this.setOutput(true, 'Array_Number');
        this.setTooltip(Blockly.Msg.NAO_MARK_GET_INFORMATION_TOOLTIP);
    }
};
