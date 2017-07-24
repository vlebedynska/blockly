/**
 * @fileoverview Sensor blocks for Bob3.
 * @requires Blockly.Blocks
 * @author Evgeniya
 */
 'use strict';

 goog.provide('Blockly.Blocks.bob3Sensors');

 goog.require('Blockly.Blocks');

 Blockly.Blocks['bob3Sensors_ambientlight'] = {
     /**
      *
      * @constructs bob3Sensors_ambientlight
      * @this.Blockly.Block
      * @returns immediately
      * @returns {Number}
      * @memberof Block
      */

     init : function() {
         this.setColour(Blockly.CAT_SENSOR_RGB);
         this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.SENSOR_AMBIENTLIGHT);
         this.setOutput(true, 'Number');
     }
 };

 Blockly.Blocks['bob3Sensors_temperature_getSample'] = {
     /**
      * Get the current reading from the temperature sensor.
      *
      * @constructs bob3Sensors_temperature_getSample
      * @this.Blockly.Block
      * @returns immediately
      * @returns {Number}
      * @memberof Block
      */

     init : function() {
         this.setColour(Blockly.CAT_SENSOR_RGB);
         this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.SENSOR_TEMPERATURE);
         this.setOutput(true, 'Number');
         this.setTooltip(Blockly.Msg.TEMPERATURE_GETSAMPLE_TOOLTIP);
     }
 };

 Blockly.Blocks['bob3Sensors_getCode'] = {
     /**
      * Get the current reading from the code pad.
      *
      * @constructs bob3Sensors_getCode
      * @this.Blockly.Block
      * @returns immediately
      * @returns {Number}
      * @memberof Block
      */

     init : function() {
         this.setColour(Blockly.CAT_SENSOR_RGB);
         this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(Blockly.Msg.SENSOR_CODE);
         this.setOutput(true, 'Number');
         this.setTooltip(Blockly.Msg.GET_CODE_TOOLTIP);
     }
 };

 Blockly.Blocks['bob3Sensors_touch_getSample'] = {
     /**
      * Get the current touch state of the bob3 arm.
      *
      * @constructs bob3Sensors_touch_getSample
      * @this.Blockly.Block
      * @param {String/dropdown}
      *            ARM - LEFT or RIGHT arm of bob3
      * @param {String/dropdown}
      *            PAIR - contacts pair being touched
      * @returns immediately
      * @returns {Number}
      * @memberof Block
      */

     init : function() {
         this.setColour(Blockly.CAT_SENSOR_RGB);
         var arm = new Blockly.FieldDropdown([ [ 'Left', '1' ], [ 'Right', '2' ] ]);
         var pair = new Blockly.FieldDropdown([ [ 'Bottom', '1' ], [ 'Lower middle', '2' ], [ 'Upper middle', '3' ], [ 'Upper', '4' ] ]);
         this.appendDummyInput().appendField(Blockly.Msg.SENSOR_GET_SAMPLE).appendField(arm, 'ARM').appendField(Blockly.Msg.BOB3_ARM).appendField(pair, 'ARMPAIR').appendField(Blockly.Msg.BOB3_ARM_PAIR);
         this.setOutput(true, 'Boolean');
         this.setTooltip(Blockly.Msg.TOUCH_TOOLTIP);
     }
 };
