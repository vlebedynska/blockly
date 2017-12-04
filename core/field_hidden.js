/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Google Inc.
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
 * @fileoverview Number input field
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.FieldHidden');

goog.require('Blockly.Field');

/**
 * Class for an editable number field.
 * @param {string} text The initial content of the field.
 * @param {Function=} opt_validator An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns either the accepted text, a replacement
 *     text, or null to abort the change.
 * @extends {Blockly.FieldTextInput}
 * @constructor
 */
Blockly.FieldHidden = function(text) {
	Blockly.FieldHidden.superClass_.constructor.call(this, '');
	this.size_ = new goog.math.Size(0, 0);
};
goog.inherits(Blockly.FieldHidden, Blockly.Field);

/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 */

Blockly.FieldHidden.prototype.init = function() {
	if (this.textElement_) {
		// Text has already been initialized once.
		return;
	}
	// do nothing.
};

Blockly.FieldHidden.prototype.isVisible = function() {
  return false;
};

Blockly.FieldHidden.prototype.updateTextNode_ = function() {
	//
}

/**
 * Draws the border with the correct width.
 * Saves the computed width in a property.
 * @private
 */
Blockly.FieldHidden.prototype.render_ = function() {
	// nothing to render.
}

