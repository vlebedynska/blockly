/**
 * @fileoverview Action blocks for NAO.
 * @requires Blockly.Blocks
 * @author Janis
 */
'use strict';

goog.provide('Blockly.Blocks.naoActions');

goog.require('Blockly.Blocks');

/**
 * @lends Block
 */

//Movement
Blockly.Blocks['naoActions_mode'] = {
    /**
     * Make NAO stand up or sit down.
     *
     * @constructs naoActions_mode
     * @this.Blockly.Block
     * @param {String}
     *            DIRECTION mode for NAO
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_MODE_ACTIVE, 'ACTIVE' ], [ Blockly.Msg.NAO_MODE_REST, 'REST' ], [ Blockly.Msg.NAO_MODE_SIT, 'SIT' ]]);
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.MODE).appendField(dropdown, 'DIRECTION');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_MODE_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_applyPosture'] = {
    /**
     * Apply a posture on NAO.
     *
     * @constructs naoActions_applyPosture
     * @this.Blockly.Block
     * @param {String}
     *            DIRECTION posture NAO goes into
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_POSTURE_STAND, 'STAND' ], [ Blockly.Msg.NAO_POSTURE_STANDINIT, 'STANDINIT' ], [ Blockly.Msg.NAO_POSTURE_STANDZERO, 'STANDZERO' ], [ Blockly.Msg.NAO_MODE_SIT, 'SIT' ], [ Blockly.Msg.NAO_POSTURE_SITRELAX, 'SITRELAX' ], [ Blockly.Msg.NAO_POSTURE_LYINGBELLY, 'LYINGBELLY' ], [ Blockly.Msg.NAO_POSTURE_LYINGBACK, 'LYINGBACK' ], [ Blockly.Msg.NAO_POSTURE_CROUCH, 'CROUCH' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_APPLYPOSTURE).appendField(dropdown, 'DIRECTION');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_APPLYPOSTURE_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_stiffness'] = {
    /**
     * Activate/Deactivate the stiffness on an effector.
     *
     * @constructs naoActions_stiffness
     * @this.Blockly.Block
     * @param {String}
     *            PART which is activated
     *            MODE turn the motor on or off
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var part = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_PART_BODY, 'BODY' ], [ Blockly.Msg.NAO_PART_HEAD, 'HEAD' ], [ Blockly.Msg.NAO_PART_ARMS, 'ARMS' ], [ Blockly.Msg.MOTOR_LEFT  + " " + Blockly.Msg.NAO_PART_ARM, 'LEFTARM' ], [ Blockly.Msg.MOTOR_RIGHT  + " " + Blockly.Msg.NAO_PART_ARM, 'RIGHTARM' ], [ Blockly.Msg.NAO_PART_LEGS, 'LEGS' ], [ Blockly.Msg.MOTOR_LEFT  + " " + Blockly.Msg.NAO_PART_LEG, 'LEFTLEG' ], [ Blockly.Msg.MOTOR_RIGHT  + " " + Blockly.Msg.NAO_PART_LEG, 'RIHTLEG' ] ]);
        var mode = new Blockly.FieldDropdown([ [ Blockly.Msg.ON, 'ON' ], [ Blockly.Msg.OFF, 'OFF' ] ])
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_STIFFNESS).appendField(part, 'PART').appendField(mode, 'MODE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_STIFFNESS_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_autonomous'] = {
    /**
     * Activate/Deactivate the autonomous life.
     *
     * @constructs naoActions_autonomous
     * @this.Blockly.Block
     * @param {String}
     *            MODE turn autonomous life on or off
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var mode = new Blockly.FieldDropdown([ [ Blockly.Msg.ON, 'ON' ], [ Blockly.Msg.OFF, 'OFF' ] ])
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_AUTONOMOUS).appendField(mode, 'MODE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_AUTONOMOUS_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_moveJoint'] = {
    /**
     * NAO moves a single joint.
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
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_JOINT_HEADYAW, 'HEADYAW' ], [ Blockly.Msg.NAO_JOINT_HEADPITCH, 'HEADPITCH' ], [ Blockly.Msg.MOTOR_LEFT  + " " + Blockly.Msg.NAO_JOINT_SHOULDERPITCH, 'LSHOULDERPITCH' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_SHOULDERROLL, 'LSHOULDERROLL' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ELBOWYAW, 'LELBOWYAW' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ELBOWROLL, 'LELBOWROLL' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_WRISTYAW, 'LWRISTYAW' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HAND, 'LHAND' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HIPYAWPITCH, 'LHIPYAWPITCH' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HIPROLL, 'LHIPROLL' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_HIPPITCH, 'LHIPPITCH' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_KNEEPITCH, 'LKNEEPITCH' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ANKLEPITCH, 'LANKLEPITCH' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ANKLEROLL, 'RANKLEROLL' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HIPYAWPITCH, 'RHIPYAWPITCH' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HIPROLL, 'RHIPROLL' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HIPPITCH, 'RHIPPITCH' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_KNEEPITCH, 'RKNEEPITCH' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ANKLEPITCH, 'RANKLEPITCH' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_JOINT_ANKLEROLL, 'LANKLEROLL' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_SHOULDERPITCH, 'RSHOULDERPITCH' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_SHOULDERROLL, 'RSHOULDERROLL' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ELBOWYAW, 'RELBOWYAW' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_ELBOWROLL, 'RELBOWROLL' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_WRISTYAW, 'RWRISTYAW' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_JOINT_HAND, 'RHAND' ] ]);
        var mode = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_ABSOLUTE, 'ABSOLUTE' ], [ Blockly.Msg.NAO_RELATIVE, 'RELATIVE' ] ]);
        this.appendValueInput('POWER').appendField(Blockly.Msg.NAO_MOVE).appendField(dropdown, 'joint').appendField(mode, 'MODE').appendField(Blockly.Msg.MODE_DEGREE).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_MOVEJOINT_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_hand'] = {
    /**
     * NAO turns for a number of degrees.
     *
     * @constructs naoActions_hand
     * @this.Blockly.Block
     * @param {String}
     *            SIDE on which the hand moves
     *            MODE the hand is set to
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var side = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_RIGHT, 'RIGHT' ], [ Blockly.Msg.MOTOR_LEFT, 'LEFT' ] ]);
        var mode = new Blockly.FieldDropdown([ [ Blockly.Msg.MODE_OPEN, 'OPEN' ], [ Blockly.Msg.MODE_CLOSE, 'CLOSE' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_HAND).appendField(side, 'SIDE').appendField(mode, 'MODE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_HAND_TOOLTIP);
    }
};

//Walk

Blockly.Blocks['naoActions_walk'] = {
    /**
     * NAO walks for a given distance.
     *
     * @constructs naoActions_walk
     * @this.Blockly.Block
     * @param {String}
     *            DIRECTION in which NAO walks
     * @param {Number}
     *            POWER distance NAO walks
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_FOREWARD, 'FOREWARD' ], [ Blockly.Msg.MOTOR_BACKWARD, 'BACKWARD' ] ]);
        this.appendValueInput('POWER').appendField(Blockly.Msg.NAO_WALK).appendField(dropdown, 'DIRECTION').appendField(Blockly.Msg.MOTOR_DISTANCE).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_WALK_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_turn'] = {
    /**
     * NAO turns for a number of degrees.
     *
     * @constructs naoActions_turn
     * @this.Blockly.Block
     * @param {String}
     *            DIRECTION in which NAO turns
     * @param {Number}
     *            POWER degrees NAO turns
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.MOTOR_LEFT, 'LEFT' ], [ Blockly.Msg.MOTOR_RIGHT, 'RIGHT' ] ]);
        this.appendValueInput('POWER').appendField(Blockly.Msg.MOTOR_TURN).appendField(dropdown, 'DIRECTION').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_DEGREE).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_TURN_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_walkTo'] = {
    /**
     * NAO walks to a position.
     *
     * @constructs naoActions_walkTo
     * @this.Blockly.Block
     * @param {Number}
     *            X,Y,Theta coordinates
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_WALKTO)
        this.appendValueInput('X').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("x");
        this.appendValueInput('Y').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("y");
        this.appendValueInput('Theta').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("theta");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_WALKTO_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_walk_async'] = {
    /**
     * NAO walks infinitely.
     *
     * @constructs naoActions_walk_async
     * @this.Blockly.Block
     * @param {Number}
     *            X, Y, Turn speeds
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_WALK)
        this.appendValueInput('XSpeed').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("x speed");
        this.appendValueInput('YSpeed').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("y speed");
        this.appendValueInput('ZSpeed').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("turn speed");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_WALK_ASYNC_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_stop'] = {
    /**
     * NAO stops all movement
     *
     * @constructs naoActions_stop
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_STOP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_STOP_TOOLTIP);
    }
};

//Animations

Blockly.Blocks['naoActions_animation'] = {
    /**
     * NAo performs an animation.
     *
     * @constructs naoActions_animation
     * @this.Blockly.Block
     * @param {String}
     *            MOVE animation NAO performs
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_TAI_CHI, 'TAICHI' ], [ Blockly.Msg.NAO_WAVE, 'WAVE' ], [ Blockly.Msg.NAO_BLINK, 'BLINK' ], [ Blockly.Msg.NAO_WIPE_FOREHEAD, 'WIPEFOREHEAD' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_PERFORM).appendField(dropdown, 'MOVE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_ANIMATION_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_pointLookAt'] = {
    /**
     * Make NAO point/look at a specified position.
     *
     * @constructs naoActions_pointLookAt
     * @this.Blockly.Block
     * @param {String}
     *            MODE look or point at
     *            DIRECTION the frame the coordinates are in
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_FRAME_TORSO, '0' ], [ Blockly.Msg.NAO_FRAME_WORLD, '1' ], [ Blockly.Msg.MENU_ROBOT, '2' ] ]);
        var mode = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_POINTAT, '0' ], [ Blockly.Msg.NAO_LOOKAT, '1' ] ]);
        this.appendDummyInput().appendField(mode, 'MODE');
        this.appendDummyInput().appendField(Blockly.Msg.NAO_FRAME).appendField(dropdown, 'DIRECTION');
        this.appendValueInput('X').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("x");
        this.appendValueInput('Y').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("y");
        this.appendValueInput('Z').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("z");
        this.appendValueInput('Speed').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField("speed");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_POINTLOOKAT_TOOLTIP);
    }
};

//Sounds

Blockly.Blocks['naoActions_playFile'] = {
    /**
     * Play a sound file from the robots file system.
     *
     * @constructs naoActions_playFile
     * @this.Blockly.Block
     * @param {String}
     *            OUT File to play
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('OUT').appendField(Blockly.Msg.NAO_PLAY_FILE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_PLAYFILE_TOOLTIP);
    }
};


Blockly.Blocks['naoActions_setVolume'] = {
    /**
     * Set volume.
     *
     * @constructs naoActions_setVolume
     * @this.Blockly.Block
     * @param {Number}
     *            VOLUME 0-100, default 50
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('VOLUME').appendField(Blockly.Msg.SET + ' ' + Blockly.Msg.PLAY_VOLUME).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_SETVOLUME_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_getVolume'] = {
    /**
     * Get current volume
     *
     * @constructs naoActions_getVolume
     * @this.Blockly.Block
     * @returns immediately
     * @returns {Number}
     * @memberof Block
     * @see {@link naoActions_getVolume}
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.GET + ' ' + Blockly.Msg.PLAY_VOLUME);
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.NAO_GETVOLUME_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_getLanguage'] = {
    /**
     * Block to get the currently active language.
     *
     * @constructs naoActions_getLanguage
     * @this.Blockly.Block
     * @returns immediately
     * @returns {String}
     * @memberof Block
     * @see {@link naoActions_getLanguage}
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_GETLANGUAGE);
        this.setOutput(true, 'String');
        this.setTooltip(Blockly.Msg.NAO_GETLANGUAGE_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_setLanguage'] = {
    /**
     * Sets the language NAO uses.
     *
     * @constructs naoActions_setLanguage
     * @this.Blockly.Block
     * @param {String}
     *            LANGUAGE
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var dropdown = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_LANGUAGE_GERMAN, 'GERMAN' ], [ Blockly.Msg.NAO_LANGUAGE_ENGLISH, 'ENGLISH' ], [ Blockly.Msg.NAO_LANGUAGE_FRENCH, 'FRENCH' ], [ Blockly.Msg.NAO_LANGUAGE_JAPANESE, 'JAPANESE' ], [ Blockly.Msg.NAO_LANGUAGE_CHINESE, 'CHINESE' ], [ Blockly.Msg.NAO_LANGUAGE_SPANISH, 'SPANISH' ], [ Blockly.Msg.NAO_LANGUAGE_KOREAN, 'KOREAN' ], [ Blockly.Msg.NAO_LANGUAGE_ITALIAN, 'ITALIAN' ], [ Blockly.Msg.NAO_LANGUAGE_DUTCH, 'DUTCH' ], [ Blockly.Msg.NAO_LANGUAGE_FINNISH, 'FINNISH' ], [ Blockly.Msg.NAO_LANGUAGE_POLISH, 'POLISH' ], [ Blockly.Msg.NAO_LANGUAGE_RUSSIAN, 'RUSSIAN' ], [ Blockly.Msg.NAO_LANGUAGE_TURKISH, 'TURKISH' ], [ Blockly.Msg.NAO_LANGUAGE_ARABIC, 'ARABIC' ], [ Blockly.Msg.NAO_LANGUAGE_CZECH, 'CZECH' ], [ Blockly.Msg.NAO_LANGUAGE_PORTUGUESE, 'PORTUGUESE' ], [ Blockly.Msg.NAO_LANGUAGE_BRAZILIAN, 'BRAZILIAN' ], [ Blockly.Msg.NAO_LANGUAGE_SWEDISH, 'SWEDISH' ], [ Blockly.Msg.NAO_LANGUAGE_DANISH, 'DANISH' ], [ Blockly.Msg.NAO_LANGUAGE_NORWEGIAN, 'NORWEGIAN' ], [ Blockly.Msg.NAO_LANGUAGE_GREEK, 'GREEK' ], ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_SETLANGUAGE).appendField(dropdown, 'LANGUAGE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_SETLANGUAGE_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_sayText'] = {
    /**
     * Say a text.
     *
     * @constructs naoActions_sayText
     * @this.Blockly.Block
     * @param {String}
     *            OUT Text to say
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('OUT').appendField(Blockly.Msg.NAO_SAY);
	this.appendValueInput('SPEED').appendField(Blockly.Msg.MOTOR_SPEED).setCheck('Number')
	this.appendValueInput('SHAPE').appendField(Blockly.Msg.NAO_SHAPE).setCheck('Number')
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_SAY_TOOLTIP);
    }
};

//Vision

Blockly.Blocks['naoActions_takePicture'] = {
    /**
     * Take a picture and save it on the robot.
     *
     * @constructs naoActions_takePicture
     * @this.Blockly.Block
     * @param {Number}
     *            CAMERA
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var camera = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_CAMERA_TOP, '0' ], [ Blockly.Msg.NAO_CAMERA_BOTTOM, '1' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_TAKEPICTURE);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_CAMERA).appendField(camera, 'CAMERA');
        this.appendValueInput('FILENAME').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NAO_FILENAME);
        this.setTooltip(Blockly.Msg.NAO_TAKEPICTURE_TOOLTIP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['naoActions_recordVideo'] = {
    /**
     * Record a video.
     *
     * @constructs naoActions_recordVideo
     * @this.Blockly.Block
     * @param {Number}
     *            RESOLUTION the video will be recorded in
     *            CAMERA that is used for the recording
     *            DURATION the video will be recorded
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var resolution = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_QQVGA, '0' ], [ Blockly.Msg.NAO_QVGA, '1' ], [ Blockly.Msg.NAO_VGA, '2' ] ]);
        var camera = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_CAMERA_TOP, '0' ], [ Blockly.Msg.NAO_CAMERA_BOTTOM, '1' ] ]);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_RECORDVIDEO);
        this.appendDummyInput().appendField(Blockly.Msg.NAO_RESOLUTION).appendField(resolution, 'RESOLUTION');
        this.appendDummyInput().appendField(Blockly.Msg.NAO_CAMERA).appendField(camera, 'CAMERA');
        this.appendValueInput('DURATION').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PLAY_DURATION).setCheck('Number');
        this.appendValueInput('FILENAME').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NAO_FILENAME);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_RECORDVIDEO_TOOLTIP);
    }
};

//Lights

Blockly.Blocks['naoActions_rgbLeds'] = {
    /**
     * Set a group of RGB-LEDs to a colour.
     *
     * @constructs naoActions_leds
     * @this.Blockly.Block
     * @param {Number}
     *            LED that is altered
     *            COLOR the LED is set to
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var led = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_LED_EYES, 'EYES' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_LED_EYE , 'LEFTEYE' ], [ Blockly.Msg.MOTOR_RIGHT  + " " + Blockly.Msg.NAO_LED_EYE, 'RIGHTEYE' ], [ Blockly.Msg.MOTOR_LEFT  + " " + Blockly.Msg.NAO_LED_FOOT, 'LEFTFOOT' ], [ Blockly.Msg.MOTOR_RIGHT  + " " + Blockly.Msg.NAO_LED_FOOT, 'RIGHTFOOT' ], [ Blockly.Msg.NAO_LED_ALL, 'ALL' ] ]);
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NAO_LED).appendField(led, 'LED');
        this.appendValueInput('COLOR').setCheck('Colour').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.BRICKLIGHT_COLOR);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_LED_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_setIntensity'] = {
    /**
     * Set the intensity of a group of Non-RGB-LEDs.
     *
     * @constructs naoActions_leds
     * @this.Blockly.Block
     * @param {Number}
     *            LED that is altered
     *            INTENSITY the LED is set to
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        var led = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_LED_EARS, 'EARS' ], [ Blockly.Msg.MOTOR_LEFT + " " + Blockly.Msg.NAO_LED_EAR, 'LEFTEAR' ], [ Blockly.Msg.MOTOR_RIGHT + " " + Blockly.Msg.NAO_LED_EAR, 'RIGHTEAR' ], [ Blockly.Msg.NAO_LED_CHEST, 'CHEST' ], [ Blockly.Msg.NAO_LED_HEAD, 'HEAD' ] ]);
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NAO_LED).appendField(led, 'LED');
        this.appendValueInput('INTENSITY').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NAO_INTENSITY);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_SETINTENSITY_TOOLTIP);
    }
};


Blockly.Blocks['naoActions_ledOff'] = {
    /**
     * Turn LEDs off.
     *
     * @constructs naoActions_ledOff
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
	var led = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_LED_EYES, 'EYES' ], [ Blockly.Msg.MOTOR_LEFT  + " " + Blockly.Msg.NAO_LED_EYE, 'LEFTEYE' ], [ Blockly.Msg.MOTOR_RIGHT  + " " + Blockly.Msg.NAO_LED_EYE, 'RIGHTEYE' ], [ Blockly.Msg.MOTOR_LEFT  + " " + Blockly.Msg.NAO_LED_FOOT, 'LEFTFOOT' ], [ Blockly.Msg.MOTOR_RIGHT  + " " + Blockly.Msg.NAO_LED_FOOT, 'RIGHTFOOT' ], [ Blockly.Msg.NAO_LED_EARS, 'EARS' ], [ Blockly.Msg.MOTOR_LEFT  + " " + Blockly.Msg.NAO_LED_EAR, 'LEFTEAR' ], [ Blockly.Msg.MOTOR_RIGHT  + " " + Blockly.Msg.NAO_LED_EAR, 'RIGHTEAR' ], [ Blockly.Msg.NAO_LED_CHEST, 'CHEST' ], [ Blockly.Msg.NAO_LED_HEAD, 'HEAD' ], [ Blockly.Msg.NAO_LED_ALL, 'ALL' ] ]);
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NAO_LED).appendField(led, 'LED');
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.OFF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_LEDOFF_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_ledReset'] = {
    /**
     * Reset all LEDs to initial setup.
     *
     * @constructs naoActions_ledReset
     * @this.Blockly.Block
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
	var led = new Blockly.FieldDropdown([ [ Blockly.Msg.NAO_LED_EYES, 'EYES' ], [ Blockly.Msg.MOTOR_LEFT  + " " + Blockly.Msg.NAO_LED_EYE, 'LEFTEYE' ], [ Blockly.Msg.MOTOR_RIGHT  + " " + Blockly.Msg.NAO_LED_EYE, 'RIGHTEYE' ], [ Blockly.Msg.MOTOR_LEFT  + " " + Blockly.Msg.NAO_LED_FOOT, 'LEFTFOOT' ], [ Blockly.Msg.MOTOR_RIGHT  + " " + Blockly.Msg.NAO_LED_FOOT, 'RIGHTFOOT' ], [ Blockly.Msg.NAO_LED_EARS, 'EARS' ], [ Blockly.Msg.MOTOR_LEFT  + " " + Blockly.Msg.NAO_LED_EAR, 'LEFTEAR' ], [ Blockly.Msg.MOTOR_RIGHT  + " " + Blockly.Msg.NAO_LED_EAR, 'RIGHTEAR' ], [ Blockly.Msg.NAO_LED_CHEST, 'CHEST' ], [ Blockly.Msg.NAO_LED_HEAD, 'HEAD' ], [ Blockly.Msg.NAO_LED_ALL, 'ALL' ] ]);
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NAO_LED).appendField(led, 'LED');
        this.setInputsInline(true);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_RESET);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_LEDRESET_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_randomEyes'] = {
    /**
     * Color the eyes randomly.
     *
     * @constructs naoActions_randomEyes
     * @this.Blockly.Block
     * @param {Number}
     *            DURATION the eyes are colored
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('DURATION').appendField(Blockly.Msg.NAO_RANDOMEYES + ' ' + Blockly.Msg.PLAY_DURATION).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_RANDOMEYES_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_rasta'] = {
    /**
     * Color the eyes in red, green and yellow.
     *
     * @constructs naoActions_rasta
     * @param {Number}
     *            DURATION the eyes are colored
     * @returns immediately
     * @memberof Block
     */
    init : function() {
        this.setColour(Blockly.CAT_ACTION_RGB);
        this.appendValueInput('DURATION').appendField(Blockly.Msg.NAO_RASTA + ' ' + Blockly.Msg.PLAY_DURATION).setCheck('Number');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.NAO_RASTA_TOOLTIP);
    }
};

Blockly.Blocks['naoActions_learnFace'] = {
	    init : function() {
	        this.setColour(Blockly.CAT_ACTION_RGB);
	        this.appendValueInput('NAME').appendField(Blockly.Msg.NAO_LEARNFACEOF);
          this.setOutput(true, 'Boolean');
	        this.setTooltip(Blockly.Msg.NAO_LEARNFACE_TOOLTIP);
	    }
};

Blockly.Blocks['naoActions_forgetFace'] = {
	    init : function() {
	        this.setColour(Blockly.CAT_ACTION_RGB);
	        this.appendValueInput('NAME').appendField(Blockly.Msg.NAO_FORGETFACEOF);
          this.setOutput(true, 'Boolean');
	        this.setTooltip(Blockly.Msg.NAO_FORGETFACE_TOOLTIP);
	    }
};
