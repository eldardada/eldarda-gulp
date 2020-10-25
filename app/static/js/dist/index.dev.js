"use strict";

require("core-js/features/promise");

var _some = _interopRequireDefault(require("./modules/some.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log((0, _some["default"])(1, 2, 3));