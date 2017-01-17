'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _universalWebpack = require('universal-webpack');

var _webpackUniversalSettings = require('./webpack-universal-settings');

var _webpackUniversalSettings2 = _interopRequireDefault(_webpackUniversalSettings);

var _webpack = require('./webpack.config');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __SERVER__ = false;
exports.default = (0, _universalWebpack.clientConfiguration)(_webpack2.default, _webpackUniversalSettings2.default);

