'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _helpersJs = require('../helpers.js');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _logcat = require('../logcat');

var _logcat2 = _interopRequireDefault(_logcat);

var _asyncbox = require('asyncbox');

var _teen_process = require('teen_process');

var methods = {};

methods.getAdbWithCorrectAdbPath = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath("adb"));

      case 2:
        this.executable.path = context$1$0.sent;

        this.binaries.adb = this.executable.path;
        return context$1$0.abrupt('return', this.adb);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.initAapt = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath("aapt"));

      case 2:
        this.binaries.aapt = context$1$0.sent;

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.initZipAlign = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath("zipalign"));

      case 2:
        this.binaries.zipalign = context$1$0.sent;

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.getApiLevel = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (this._apiLevel) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['getprop', 'ro.build.version.sdk']));

      case 4:
        this._apiLevel = context$1$0.sent;
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error getting device API level. Original error: ' + context$1$0.t0.message);

      case 10:
        _loggerJs2['default'].debug('Device API level: ' + this._apiLevel);
        return context$1$0.abrupt('return', this._apiLevel);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
};

methods.getPlatformVersion = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].info("Getting device platform version");
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['getprop', 'ro.build.version.release']));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error getting device platform version. Original error: ' + context$1$0.t0.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
};

methods.isDeviceConnected = function callee$0$0() {
  var devices;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getConnectedDevices());

      case 2:
        devices = context$1$0.sent;
        return context$1$0.abrupt('return', devices.length > 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.mkdir = function callee$0$0(remotePath) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['mkdir', '-p', remotePath]));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.isValidClass = function (classString) {
  // some.package/some.package.Activity
  return new RegExp(/^[a-zA-Z0-9\./_]+$/).exec(classString);
};

methods.forceStop = function callee$0$0(pkg) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['am', 'force-stop', pkg]));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.clear = function callee$0$0(pkg) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'clear', pkg]));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.stopAndClear = function callee$0$0(pkg) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.forceStop(pkg));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.clear(pkg));

      case 5:
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Cannot stop and clear ' + pkg + '. Original error: ' + context$1$0.t0.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 7]]);
};

methods.availableIMEs = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['ime', 'list', '-a']));

      case 3:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt('return', (0, _helpersJs.getIMEListFromOutput)(context$1$0.t0));

      case 7:
        context$1$0.prev = 7;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting available IME\'s. Original error: ' + context$1$0.t1.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 7]]);
};

methods.enabledIMEs = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['ime', 'list']));

      case 3:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt('return', (0, _helpersJs.getIMEListFromOutput)(context$1$0.t0));

      case 7:
        context$1$0.prev = 7;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting enabled IME\'s. Original error: ' + context$1$0.t1.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 7]]);
};

methods.enableIME = function callee$0$0(imeId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['ime', 'enable', imeId]));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.disableIME = function callee$0$0(imeId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['ime', 'disable', imeId]));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.setIME = function callee$0$0(imeId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['ime', 'set', imeId]));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.defaultIME = function callee$0$0() {
  var engine;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['settings', 'get', 'secure', 'default_input_method']));

      case 3:
        engine = context$1$0.sent;
        return context$1$0.abrupt('return', engine.trim());

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting default IME. Original error: ' + context$1$0.t0.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 7]]);
};

methods.keyevent = function callee$0$0(keycode) {
  var code;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        code = parseInt(keycode, 10);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['input', 'keyevent', code]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.inputText = function callee$0$0(text) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        /* jshint ignore:start */
        // need to escape whitespace and ( ) < > | ; & * \ ~ " '
        text = text.replace('\\', '\\\\').replace('(', '\(').replace(')', '\)').replace('<', '\<').replace('>', '\>').replace('|', '\|').replace(';', '\;').replace('&', '\&').replace('*', '\*').replace('~', '\~').replace('"', '\"').replace("'", "\'").replace(' ', '%s');
        /* jshint ignore:end */
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['input', 'text', text]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.lock = function callee$0$0() {
  var locked;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.isScreenLocked());

      case 2:
        locked = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.isScreenLocked());

      case 5:
        locked = context$1$0.sent;

        if (locked) {
          context$1$0.next = 14;
          break;
        }

        _loggerJs2['default'].debug("Pressing the KEYCODE_POWER button to lock screen");
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.keyevent(26));

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 500, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.isScreenLocked());

              case 2:
                locked = context$2$0.sent;

                if (!locked) {
                  _loggerJs2['default'].errorAndThrow("Waiting for screen to lock.");
                }

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 12:
        context$1$0.next = 15;
        break;

      case 14:
        _loggerJs2['default'].debug("Screen is already locked. Doing nothing.");

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.back = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Pressing the BACK button");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.keyevent(4));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.goToHome = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Pressing the HOME button");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.keyevent(3));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.getAdbPath = function () {
  return this.executable.path;
};

methods.isScreenLocked = function callee$0$0() {
  var stdout, dumpsysFile;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['dumpsys', 'window']));

      case 2:
        stdout = context$1$0.sent;

        if (!process.env.APPIUM_LOG_DUMPSYS) {
          context$1$0.next = 8;
          break;
        }

        dumpsysFile = _path2['default'].resolve(process.cwd(), "dumpsys.log");

        _loggerJs2['default'].debug('Writing dumpsys output to ' + dumpsysFile);
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.writeFile(dumpsysFile, stdout));

      case 8:
        return context$1$0.abrupt('return', (0, _helpersJs.isShowingLockscreen)(stdout) || (0, _helpersJs.isCurrentFocusOnKeyguard)(stdout) || !(0, _helpersJs.isScreenOnFully)(stdout));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.isSoftKeyboardPresent = function callee$0$0() {
  var stdout, isKeyboardShown, canCloseKeyboard, inputShownMatch, isInputViewShownMatch;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['dumpsys', 'input_method']));

      case 3:
        stdout = context$1$0.sent;
        isKeyboardShown = false, canCloseKeyboard = false, inputShownMatch = /mInputShown=\w+/gi.exec(stdout);

        if (inputShownMatch && inputShownMatch[0]) {
          isKeyboardShown = inputShownMatch[0].split('=')[1] === 'true';
          isInputViewShownMatch = /mIsInputViewShown=\w+/gi.exec(stdout);

          if (isInputViewShownMatch && isInputViewShownMatch[0]) {
            canCloseKeyboard = isInputViewShownMatch[0].split('=')[1] === 'true';
          }
        }
        return context$1$0.abrupt('return', { isKeyboardShown: isKeyboardShown, canCloseKeyboard: canCloseKeyboard });

      case 9:
        context$1$0.prev = 9;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error finding softkeyboard. Original error: ' + context$1$0.t0.message);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 9]]);
};

methods.sendTelnetCommand = function callee$0$0(command) {
  var port;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Sending telnet command to device: ' + command);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getEmulatorPort());

      case 3:
        port = context$1$0.sent;
        return context$1$0.abrupt('return', new _Promise(function (resolve, reject) {
          var conn = _net2['default'].createConnection(port, 'localhost'),
              connected = false,
              readyRegex = /^OK$/m,
              dataStream = "",
              res = null;
          conn.on('connect', function () {
            _loggerJs2['default'].debug("Socket connection to device created");
          });
          conn.on('data', function (data) {
            data = data.toString('utf8');
            if (!connected) {
              if (readyRegex.test(data)) {
                connected = true;
                _loggerJs2['default'].debug("Socket connection to device ready");
                conn.write(command + "\n");
              }
            } else {
              dataStream += data;
              if (readyRegex.test(data)) {
                res = dataStream.replace(readyRegex, "").trim();
                res = _lodash2['default'].last(res.trim().split('\n'));
                _loggerJs2['default'].debug('Telnet command got response: ' + res);
                conn.write("quit\n");
              }
            }
          });
          conn.on('close', function () {
            if (res === null) {
              reject(new Error("Never got a response from command"));
            } else {
              resolve(res);
            }
          });
        }));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.isAirplaneModeOn = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['settings', 'get', 'global', 'airplane_mode_on']));

      case 2:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('return', parseInt(stdout, 10) !== 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/*
 * on: true (to turn on) or false (to turn off)
 */
methods.setAirplaneMode = function callee$0$0(on) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['settings', 'put', 'global', 'airplane_mode_on', on ? 1 : 0]));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/*
 * on: true (to turn on) or false (to turn off)
 */
methods.broadcastAirplaneMode = function callee$0$0(on) {
  var args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        args = ['am', 'broadcast', '-a', 'android.intent.action.AIRPLANE_MODE', '--ez', 'state', on ? 'true' : 'false'];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(args));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.isWifiOn = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['settings', 'get', 'global', 'wifi_on']));

      case 2:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('return', parseInt(stdout, 10) !== 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/*
 * on: true (to turn on) or false (to turn off)
 */
methods.setWifiState = function callee$0$0(on) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['am', 'start', '-n', 'io.appium.settings/.Settings', '-e', 'wifi', on ? 'on' : 'off']));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.isDataOn = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['settings', 'get', 'global', 'mobile_data']));

      case 2:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('return', parseInt(stdout, 10) !== 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/*
 * on: true (to turn on) or false (to turn off)
 */
methods.setDataState = function callee$0$0(on) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['am', 'start', '-n', 'io.appium.settings/.Settings', '-e', 'data', on ? 'on' : 'off']));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/*
 * opts: { wifi: true/false, data true/false } (true to turn on, false to turn off)
 */
methods.setWifiAndData = function callee$0$0(_ref) {
  var wifi = _ref.wifi;
  var data = _ref.data;
  var wifiOpts, dataOpts, opts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        wifiOpts = [], dataOpts = [];

        if (!_lodash2['default'].isUndefined(wifi)) {
          wifiOpts = ['-e', 'wifi', wifi ? 'on' : 'off'];
        }
        if (!_lodash2['default'].isUndefined(data)) {
          dataOpts = ['-e', 'data', data ? 'on' : 'off'];
        }
        opts = ['am', 'start', '-n', 'io.appium.settings/.Settings'];
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.shell(opts.concat(wifiOpts, dataOpts)));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.rimraf = function callee$0$0(path) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['rm', '-rf', path]));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.push = function callee$0$0(localPath, remotePath, opts) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adbExec(['push', localPath, remotePath], opts));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.pull = function callee$0$0(remotePath, localPath) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adbExec(['pull', remotePath, localPath], { timeout: 300000 }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.processExists = function callee$0$0(processName) {
  var stdout, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, pkgColumn;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        if (this.isValidClass(processName)) {
          context$1$0.next = 3;
          break;
        }

        throw new Error('Invalid process name: ' + processName);

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell("ps"));

      case 5:
        stdout = context$1$0.sent;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 9;
        _iterator = _getIterator(stdout.split(/\r?\n/));

      case 11:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 20;
          break;
        }

        line = _step.value;

        line = line.trim().split(/\s+/);
        pkgColumn = line[line.length - 1];

        if (!(pkgColumn && pkgColumn.indexOf(processName) !== -1)) {
          context$1$0.next = 17;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 17:
        _iteratorNormalCompletion = true;
        context$1$0.next = 11;
        break;

      case 20:
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](9);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        return context$1$0.abrupt('return', false);

      case 37:
        context$1$0.prev = 37;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error finding if process exists. Original error: ' + context$1$0.t1.message);

      case 40:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 37], [9, 22, 26, 34], [27,, 29, 33]]);
};

methods.forwardPort = function callee$0$0(systemPort, devicePort) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Forwarding system: ' + systemPort + ' to device: ' + devicePort);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExec(['forward', 'tcp:' + systemPort, 'tcp:' + devicePort]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.forwardAbstractPort = function callee$0$0(systemPort, devicePort) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Forwarding system: ' + systemPort + ' to abstract device: ' + devicePort);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExec(['forward', 'tcp:' + systemPort, 'localabstract:' + devicePort]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.ping = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(["echo", "ping"]));

      case 2:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf("ping") === 0)) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 5:
        throw new Error('ADB ping failed, returned ' + stdout);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.restart = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.stopLogcat());

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.restartAdb());

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.waitForDevice(300));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.startLogcat());

      case 9:
        context$1$0.next = 14;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Restart failed. Orginial error: ' + context$1$0.t0.message);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 11]]);
};

methods.startLogcat = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (this.logcat !== null) {
          _loggerJs2['default'].errorAndThrow("Trying to start logcat capture but it's already started!");
        }
        this.logcat = new _logcat2['default']({
          adb: this.executable,
          debug: false,
          debugTrace: false
        });
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.logcat.startCapture());

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.stopLogcat = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(this.logcat !== null)) {
          context$1$0.next = 4;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.logcat.stopCapture());

      case 3:
        this.logcat = null;

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.getLogcatLogs = function () {
  if (this.logcat === null) {
    _loggerJs2['default'].errorAndThrow("Can't get logcat logs since logcat hasn't started");
  }
  return this.logcat.getLogs();
};

methods.getPIDsByName = function callee$0$0(name) {
  var stdout, pids, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, line, match;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Getting all processes with ' + name);
        context$1$0.prev = 1;

        // ps <comm> where comm is last 15 characters of package name
        if (name.length > 15) {
          name = name.substr(name.length - 15);
        }
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell(["ps", name]));

      case 5:
        stdout = context$1$0.sent;

        stdout = stdout.trim();
        pids = [];
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 11;
        _iterator2 = _getIterator(stdout.split("\n"));

      case 13:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 25;
          break;
        }

        line = _step2.value;

        if (!(line.indexOf(name) !== -1)) {
          context$1$0.next = 22;
          break;
        }

        match = /[^\t ]+[\t ]+([0-9]+)/.exec(line);

        if (!match) {
          context$1$0.next = 21;
          break;
        }

        pids.push(parseInt(match[1], 10));
        context$1$0.next = 22;
        break;

      case 21:
        throw new Error('Could not extract PID from ps output: ' + line);

      case 22:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 13;
        break;

      case 25:
        context$1$0.next = 31;
        break;

      case 27:
        context$1$0.prev = 27;
        context$1$0.t0 = context$1$0['catch'](11);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 31:
        context$1$0.prev = 31;
        context$1$0.prev = 32;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 34:
        context$1$0.prev = 34;

        if (!_didIteratorError2) {
          context$1$0.next = 37;
          break;
        }

        throw _iteratorError2;

      case 37:
        return context$1$0.finish(34);

      case 38:
        return context$1$0.finish(31);

      case 39:
        return context$1$0.abrupt('return', pids);

      case 42:
        context$1$0.prev = 42;
        context$1$0.t1 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Unable to get pids for ' + name + '. Orginial error: ' + context$1$0.t1.message);

      case 45:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 42], [11, 27, 31, 39], [32,, 34, 38]]);
};

methods.killProcessesByName = function callee$0$0(name) {
  var pids, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, pid;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        _loggerJs2['default'].debug('Attempting to kill all ' + name + ' processes');
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getPIDsByName(name));

      case 4:
        pids = context$1$0.sent;

        if (!(pids.length < 1)) {
          context$1$0.next = 8;
          break;
        }

        _loggerJs2['default'].info('No ' + name + ' process found to kill, continuing...');
        return context$1$0.abrupt('return');

      case 8:
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 11;
        _iterator3 = _getIterator(pids);

      case 13:
        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
          context$1$0.next = 20;
          break;
        }

        pid = _step3.value;
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(this.killProcessByPID(pid));

      case 17:
        _iteratorNormalCompletion3 = true;
        context$1$0.next = 13;
        break;

      case 20:
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](11);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError3) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError3;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        context$1$0.next = 39;
        break;

      case 36:
        context$1$0.prev = 36;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Unable to kill ' + name + ' processes. Original error: ' + context$1$0.t1.message);

      case 39:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 36], [11, 22, 26, 34], [27,, 29, 33]]);
};

methods.killProcessByPID = function callee$0$0(pid) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Attempting to kill process ' + pid);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['kill', pid]));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.broadcastProcessEnd = function callee$0$0(intent, processName) {
  var start, timeoutMs;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // start the broadcast without waiting for it to finish.
        this.broadcast(intent);
        // wait for the process to end
        start = Date.now();
        timeoutMs = 40000;
        context$1$0.prev = 3;

      case 4:
        if (!(Date.now() - start < timeoutMs)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.processExists(processName));

      case 7:
        if (!context$1$0.sent) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 10;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(400));

      case 10:
        return context$1$0.abrupt('continue', 4);

      case 11:
        return context$1$0.abrupt('return');

      case 14:
        throw new Error('Process never died within ' + timeoutMs + ' ms');

      case 17:
        context$1$0.prev = 17;
        context$1$0.t0 = context$1$0['catch'](3);

        _loggerJs2['default'].errorAndThrow('Unable to broadcast process end. Original error: ' + context$1$0.t0.message);

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 17]]);
};

methods.broadcast = function callee$0$0(intent) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isValidClass(intent)) {
          _loggerJs2['default'].errorAndThrow('Invalid intent ' + intent);
        }
        _loggerJs2['default'].debug('Broadcasting: ' + intent);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['am', 'broadcast', '-a', intent]));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.endAndroidCoverage = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.instrumentProc) {
          context$1$0.next = 3;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.instrumentProc.stop());

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.instrument = function callee$0$0(pkg, activity, instrumentWith) {
  var pkgActivity, stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (activity[0] !== ".") {
          pkg = "";
        }
        pkgActivity = (pkg + activity).replace(/\.+/g, '.');
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['am', 'instrument', '-e', 'main_activity', pkgActivity, instrumentWith]));

      case 4:
        stdout = context$1$0.sent;

        if (stdout.indexOf("Exception") !== -1) {
          _loggerJs2['default'].errorAndThrow('Unknown exception during instrumentation. ' + ('Original error ' + stdout.split("\n")[0]));
        }

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.androidCoverage = function callee$0$0(instrumentClass, waitPkg, waitActivity) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isValidClass(instrumentClass)) {
          _loggerJs2['default'].errorAndThrow('Invalid class ' + instrumentClass);
        }
        return context$1$0.abrupt('return', new _Promise(function callee$1$0(resolve, reject) {
          var args;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                args = this.executable.defaultArgs.concat(['shell', 'am', 'instrument', '-e', 'coverage', 'true', '-w']).concat([instrumentClass]);

                _loggerJs2['default'].debug('Collecting coverage data with: ' + [this.executable.path].concat(args).join(' '));
                context$2$0.prev = 2;

                // am instrument runs for the life of the app process.
                this.instrumentProc = new _teen_process.SubProcess(this.executable.path, args);
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap(this.instrumentProc.start(0));

              case 6:
                this.instrumentProc.on('output', function (stdout, stderr) {
                  if (stderr) {
                    reject(new Error('Failed to run instrumentation. Original error: ' + stderr));
                  }
                });
                context$2$0.next = 9;
                return _regeneratorRuntime.awrap(this.waitForActivity(waitPkg, waitActivity));

              case 9:
                resolve();
                context$2$0.next = 15;
                break;

              case 12:
                context$2$0.prev = 12;
                context$2$0.t0 = context$2$0['catch'](2);

                reject(new Error('Android coverage failed. Original error: ' + context$2$0.t0.message));

              case 15:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2, [[2, 12]]);
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.getDeviceProperty = function callee$0$0(property) {
  var stdout, val;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['getprop', property]));

      case 2:
        stdout = context$1$0.sent;
        val = stdout.trim();

        _loggerJs2['default'].debug('Current device property \'' + property + '\': ' + val);
        return context$1$0.abrupt('return', val);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.setDeviceProperty = function callee$0$0(prop, val) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Setting device property \'' + prop + '\' to \'' + val + '\'');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['setprop', prop, val]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.getDeviceSysLanguage = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("persist.sys.language"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.setDeviceSysLanguage = function callee$0$0(language) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceProperty("persist.sys.language", language.toLowerCase()));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.getDeviceSysCountry = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("persist.sys.country"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.setDeviceSysCountry = function callee$0$0(country) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceProperty("persist.sys.country", country.toUpperCase()));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.getDeviceSysLocale = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("persist.sys.locale"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.setDeviceSysLocale = function callee$0$0(locale) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceProperty("persist.sys.locale", locale));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.getDeviceProductLanguage = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("ro.product.locale.language"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.getDeviceProductCountry = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("ro.product.locale.region"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

methods.getDeviceProductLocale = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("ro.product.locale"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = methods;
module.exports = exports['default'];

// keycode must be an int.

// wait for the screen to lock

// optional debugging
// if the method is not working, turn it on and send us the output

// pull folder can take more time, increasing time out to 300 secs

// cool down
// Fix pkg..activity error
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9hZGItY29tbWFuZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7d0JBQWdCLGNBQWM7Ozs7eUJBRUUsZUFBZTs7b0JBQzlCLE1BQU07Ozs7c0JBQ1QsUUFBUTs7Ozs2QkFDSCxnQkFBZ0I7O21CQUNuQixLQUFLOzs7O3NCQUNGLFdBQVc7Ozs7d0JBQ08sVUFBVTs7NEJBQ3BCLGNBQWM7O0FBR3pDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFakIsT0FBTyxDQUFDLHdCQUF3QixHQUFHOzs7Ozt5Q0FDSixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDOzs7QUFBekQsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJOztBQUNwQixZQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzs0Q0FDbEMsSUFBSSxDQUFDLEdBQUc7Ozs7Ozs7Q0FDaEIsQ0FBQzs7QUFFRixPQUFPLENBQUMsUUFBUSxHQUFHOzs7Ozt5Q0FDVSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDOzs7QUFBeEQsWUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7Ozs7O0NBQ25CLENBQUM7O0FBRUYsT0FBTyxDQUFDLFlBQVksR0FBRzs7Ozs7eUNBQ1UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQzs7O0FBQWhFLFlBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTs7Ozs7OztDQUN2QixDQUFDOztBQUVGLE9BQU8sQ0FBQyxXQUFXLEdBQUc7Ozs7WUFDZixJQUFJLENBQUMsU0FBUzs7Ozs7Ozt5Q0FFUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLHNCQUFzQixDQUFDLENBQUM7OztBQUF0RSxZQUFJLENBQUMsU0FBUzs7Ozs7Ozs7QUFFZCw4QkFBSSxhQUFhLHNEQUFvRCxlQUFFLE9BQU8sQ0FBRyxDQUFDOzs7QUFHdEYsOEJBQUksS0FBSyx3QkFB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RixPQUFPLENBQUMsdUJBQXVCLEdBQUc7Ozs7O3lDQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7Q0FDaEUsQ0FBQzs7QUFFRixPQUFPLENBQUMsc0JBQXNCLEdBQUc7Ozs7O3lDQUNsQixJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUM7Ozs7Ozs7Ozs7Q0FDekQsQ0FBQzs7cUJBRWEsT0FBTyIsImZpbGUiOiJsaWIvdG9vbHMvYWRiLWNvbW1hbmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXIuanMnO1xuaW1wb3J0IHsgZ2V0SU1FTGlzdEZyb21PdXRwdXQsIGlzU2hvd2luZ0xvY2tzY3JlZW4sIGlzQ3VycmVudEZvY3VzT25LZXlndWFyZCxcbiAgICAgICAgIGlzU2NyZWVuT25GdWxseSB9IGZyb20gJy4uL2hlbHBlcnMuanMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgbmV0IGZyb20gJ25ldCc7XG5pbXBvcnQgTG9nY2F0IGZyb20gJy4uL2xvZ2NhdCc7XG5pbXBvcnQgeyBzbGVlcCwgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcbmltcG9ydCB7IFN1YlByb2Nlc3MgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuXG5cbmxldCBtZXRob2RzID0ge307XG5cbm1ldGhvZHMuZ2V0QWRiV2l0aENvcnJlY3RBZGJQYXRoID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0aGlzLmV4ZWN1dGFibGUucGF0aCA9IGF3YWl0IHRoaXMuZ2V0U2RrQmluYXJ5UGF0aChcImFkYlwiKTtcbiAgdGhpcy5iaW5hcmllcy5hZGIgPSB0aGlzLmV4ZWN1dGFibGUucGF0aDtcbiAgcmV0dXJuIHRoaXMuYWRiO1xufTtcblxubWV0aG9kcy5pbml0QWFwdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5iaW5hcmllcy5hYXB0ID0gYXdhaXQgdGhpcy5nZXRTZGtCaW5hcnlQYXRoKFwiYWFwdFwiKTtcbn07XG5cbm1ldGhvZHMuaW5pdFppcEFsaWduID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0aGlzLmJpbmFyaWVzLnppcGFsaWduID0gYXdhaXQgdGhpcy5nZXRTZGtCaW5hcnlQYXRoKFwiemlwYWxpZ25cIik7XG59O1xuXG5tZXRob2RzLmdldEFwaUxldmVsID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuX2FwaUxldmVsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2FwaUxldmVsID0gYXdhaXQgdGhpcy5zaGVsbChbJ2dldHByb3AnLCAncm8uYnVpbGQudmVyc2lvbi5zZGsnXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgZGV2aWNlIEFQSSBsZXZlbC4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICAgIH1cbiAgfVxuICBsb2cuZGVidWcoYERldmljZSBBUEkgbGV2ZWw6ICR7dGhpcy5fYXBpTGV2ZWx9YCk7XG4gIHJldHVybiB0aGlzLl9hcGlMZXZlbDtcbn07XG5cbm1ldGhvZHMuZ2V0UGxhdGZvcm1WZXJzaW9uID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsb2cuaW5mbyhcIkdldHRpbmcgZGV2aWNlIHBsYXRmb3JtIHZlcnNpb25cIik7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hlbGwoWydnZXRwcm9wJywgJ3JvLmJ1aWxkLnZlcnNpb24ucmVsZWFzZSddKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBnZXR0aW5nIGRldmljZSBwbGF0Zm9ybSB2ZXJzaW9uLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbm1ldGhvZHMuaXNEZXZpY2VDb25uZWN0ZWQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCBkZXZpY2VzID0gYXdhaXQgdGhpcy5nZXRDb25uZWN0ZWREZXZpY2VzKCk7XG4gIHJldHVybiBkZXZpY2VzLmxlbmd0aCA+IDA7XG59O1xuXG5tZXRob2RzLm1rZGlyID0gYXN5bmMgZnVuY3Rpb24gKHJlbW90ZVBhdGgpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2hlbGwoWydta2RpcicsICctcCcsIHJlbW90ZVBhdGhdKTtcbn07XG5cbm1ldGhvZHMuaXNWYWxpZENsYXNzID0gZnVuY3Rpb24gKGNsYXNzU3RyaW5nKSB7XG4gIC8vIHNvbWUucGFja2FnZS9zb21lLnBhY2thZ2UuQWN0aXZpdHlcbiAgcmV0dXJuIG5ldyBSZWdFeHAoL15bYS16QS1aMC05XFwuL19dKyQvKS5leGVjKGNsYXNzU3RyaW5nKTtcbn07XG5cbm1ldGhvZHMuZm9yY2VTdG9wID0gYXN5bmMgZnVuY3Rpb24gKHBrZykge1xuICByZXR1cm4gYXdhaXQgdGhpcy5zaGVsbChbJ2FtJywgJ2ZvcmNlLXN0b3AnLCBwa2ddKTtcbn07XG5cbm1ldGhvZHMuY2xlYXIgPSBhc3luYyBmdW5jdGlvbiAocGtnKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnNoZWxsKFsncG0nLCAnY2xlYXInLCBwa2ddKTtcbn07XG5cbm1ldGhvZHMuc3RvcEFuZENsZWFyID0gYXN5bmMgZnVuY3Rpb24gKHBrZykge1xuICB0cnkge1xuICAgIGF3YWl0IHRoaXMuZm9yY2VTdG9wKHBrZyk7XG4gICAgYXdhaXQgdGhpcy5jbGVhcihwa2cpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYENhbm5vdCBzdG9wIGFuZCBjbGVhciAke3BrZ30uIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxubWV0aG9kcy5hdmFpbGFibGVJTUVzID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIHJldHVybiBnZXRJTUVMaXN0RnJvbU91dHB1dChhd2FpdCB0aGlzLnNoZWxsKFsnaW1lJywgJ2xpc3QnLCAnLWEnXSkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgYXZhaWxhYmxlIElNRSdzLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbm1ldGhvZHMuZW5hYmxlZElNRXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdldElNRUxpc3RGcm9tT3V0cHV0KGF3YWl0IHRoaXMuc2hlbGwoWydpbWUnLCAnbGlzdCddKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgZ2V0dGluZyBlbmFibGVkIElNRSdzLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbm1ldGhvZHMuZW5hYmxlSU1FID0gYXN5bmMgZnVuY3Rpb24gKGltZUlkKSB7XG4gIGF3YWl0IHRoaXMuc2hlbGwoWydpbWUnLCAnZW5hYmxlJywgaW1lSWRdKTtcbn07XG5cbm1ldGhvZHMuZGlzYWJsZUlNRSA9IGFzeW5jIGZ1bmN0aW9uIChpbWVJZCkge1xuICBhd2FpdCB0aGlzLnNoZWxsKFsnaW1lJywgJ2Rpc2FibGUnLCBpbWVJZF0pO1xufTtcblxubWV0aG9kcy5zZXRJTUUgPSBhc3luYyBmdW5jdGlvbiAoaW1lSWQpIHtcbiAgYXdhaXQgdGhpcy5zaGVsbChbJ2ltZScsICdzZXQnLCBpbWVJZF0pO1xufTtcblxubWV0aG9kcy5kZWZhdWx0SU1FID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGxldCBlbmdpbmUgPSBhd2FpdCB0aGlzLnNoZWxsKFsnc2V0dGluZ3MnLCAnZ2V0JywgJ3NlY3VyZScsICdkZWZhdWx0X2lucHV0X21ldGhvZCddKTtcbiAgICByZXR1cm4gZW5naW5lLnRyaW0oKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgZGVmYXVsdCBJTUUuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxubWV0aG9kcy5rZXlldmVudCA9IGFzeW5jIGZ1bmN0aW9uIChrZXljb2RlKSB7XG4gIC8vIGtleWNvZGUgbXVzdCBiZSBhbiBpbnQuXG4gIGxldCBjb2RlID0gcGFyc2VJbnQoa2V5Y29kZSwgMTApO1xuICBhd2FpdCB0aGlzLnNoZWxsKFsnaW5wdXQnLCAna2V5ZXZlbnQnLCBjb2RlXSk7XG59O1xuXG5tZXRob2RzLmlucHV0VGV4dCA9IGFzeW5jIGZ1bmN0aW9uICh0ZXh0KSB7XG4gIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgLy8gbmVlZCB0byBlc2NhcGUgd2hpdGVzcGFjZSBhbmQgKCApIDwgPiB8IDsgJiAqIFxcIH4gXCIgJ1xuICB0ZXh0ID0gdGV4dFxuICAgICAgICAgIC5yZXBsYWNlKCdcXFxcJywgJ1xcXFxcXFxcJylcbiAgICAgICAgICAucmVwbGFjZSgnKCcsICdcXCgnKVxuICAgICAgICAgIC5yZXBsYWNlKCcpJywgJ1xcKScpXG4gICAgICAgICAgLnJlcGxhY2UoJzwnLCAnXFw8JylcbiAgICAgICAgICAucmVwbGFjZSgnPicsICdcXD4nKVxuICAgICAgICAgIC5yZXBsYWNlKCd8JywgJ1xcfCcpXG4gICAgICAgICAgLnJlcGxhY2UoJzsnLCAnXFw7JylcbiAgICAgICAgICAucmVwbGFjZSgnJicsICdcXCYnKVxuICAgICAgICAgIC5yZXBsYWNlKCcqJywgJ1xcKicpXG4gICAgICAgICAgLnJlcGxhY2UoJ34nLCAnXFx+JylcbiAgICAgICAgICAucmVwbGFjZSgnXCInLCAnXFxcIicpXG4gICAgICAgICAgLnJlcGxhY2UoXCInXCIsIFwiXFwnXCIpXG4gICAgICAgICAgLnJlcGxhY2UoJyAnLCAnJXMnKTtcbiAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgYXdhaXQgdGhpcy5zaGVsbChbJ2lucHV0JywgJ3RleHQnLCB0ZXh0XSk7XG59O1xuXG5tZXRob2RzLmxvY2sgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCBsb2NrZWQgPSBhd2FpdCB0aGlzLmlzU2NyZWVuTG9ja2VkKCk7XG4gIGxvY2tlZCA9IGF3YWl0IHRoaXMuaXNTY3JlZW5Mb2NrZWQoKTtcbiAgaWYgKCFsb2NrZWQpIHtcbiAgICBsb2cuZGVidWcoXCJQcmVzc2luZyB0aGUgS0VZQ09ERV9QT1dFUiBidXR0b24gdG8gbG9jayBzY3JlZW5cIik7XG4gICAgYXdhaXQgdGhpcy5rZXlldmVudCgyNik7XG5cbiAgICAvLyB3YWl0IGZvciB0aGUgc2NyZWVuIHRvIGxvY2tcbiAgICBhd2FpdCByZXRyeUludGVydmFsKDEwLCA1MDAsIGFzeW5jICgpID0+IHtcbiAgICAgIGxvY2tlZCA9IGF3YWl0IHRoaXMuaXNTY3JlZW5Mb2NrZWQoKTtcbiAgICAgIGlmICghbG9ja2VkKSB7XG4gICAgICAgIGxvZy5lcnJvckFuZFRocm93KFwiV2FpdGluZyBmb3Igc2NyZWVuIHRvIGxvY2suXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxvZy5kZWJ1ZyhcIlNjcmVlbiBpcyBhbHJlYWR5IGxvY2tlZC4gRG9pbmcgbm90aGluZy5cIik7XG4gIH1cbn07XG5cbm1ldGhvZHMuYmFjayA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbG9nLmRlYnVnKFwiUHJlc3NpbmcgdGhlIEJBQ0sgYnV0dG9uXCIpO1xuICBhd2FpdCB0aGlzLmtleWV2ZW50KDQpO1xufTtcblxubWV0aG9kcy5nb1RvSG9tZSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbG9nLmRlYnVnKFwiUHJlc3NpbmcgdGhlIEhPTUUgYnV0dG9uXCIpO1xuICBhd2FpdCB0aGlzLmtleWV2ZW50KDMpO1xufTtcblxubWV0aG9kcy5nZXRBZGJQYXRoID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5leGVjdXRhYmxlLnBhdGg7XG59O1xuXG5tZXRob2RzLmlzU2NyZWVuTG9ja2VkID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbJ2R1bXBzeXMnLCAnd2luZG93J10pO1xuICBpZiAocHJvY2Vzcy5lbnYuQVBQSVVNX0xPR19EVU1QU1lTKSB7XG4gICAgLy8gb3B0aW9uYWwgZGVidWdnaW5nXG4gICAgLy8gaWYgdGhlIG1ldGhvZCBpcyBub3Qgd29ya2luZywgdHVybiBpdCBvbiBhbmQgc2VuZCB1cyB0aGUgb3V0cHV0XG4gICAgbGV0IGR1bXBzeXNGaWxlID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwiZHVtcHN5cy5sb2dcIik7XG4gICAgbG9nLmRlYnVnKGBXcml0aW5nIGR1bXBzeXMgb3V0cHV0IHRvICR7ZHVtcHN5c0ZpbGV9YCk7XG4gICAgYXdhaXQgZnMud3JpdGVGaWxlKGR1bXBzeXNGaWxlLCBzdGRvdXQpO1xuICB9XG4gIHJldHVybiAoaXNTaG93aW5nTG9ja3NjcmVlbihzdGRvdXQpIHx8IGlzQ3VycmVudEZvY3VzT25LZXlndWFyZChzdGRvdXQpIHx8XG4gICAgICAgICAgIWlzU2NyZWVuT25GdWxseShzdGRvdXQpKTtcbn07XG5cbm1ldGhvZHMuaXNTb2Z0S2V5Ym9hcmRQcmVzZW50ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFsnZHVtcHN5cycsICdpbnB1dF9tZXRob2QnXSk7XG4gICAgbGV0IGlzS2V5Ym9hcmRTaG93biA9IGZhbHNlLFxuICAgICAgICBjYW5DbG9zZUtleWJvYXJkID0gZmFsc2UsXG4gICAgICAgIGlucHV0U2hvd25NYXRjaCA9IC9tSW5wdXRTaG93bj1cXHcrL2dpLmV4ZWMoc3Rkb3V0KTtcbiAgICBpZiAoaW5wdXRTaG93bk1hdGNoICYmIGlucHV0U2hvd25NYXRjaFswXSkge1xuICAgICAgaXNLZXlib2FyZFNob3duID0gaW5wdXRTaG93bk1hdGNoWzBdLnNwbGl0KCc9JylbMV0gPT09ICd0cnVlJztcbiAgICAgIGxldCBpc0lucHV0Vmlld1Nob3duTWF0Y2ggPSAvbUlzSW5wdXRWaWV3U2hvd249XFx3Ky9naS5leGVjKHN0ZG91dCk7XG4gICAgICBpZiAoaXNJbnB1dFZpZXdTaG93bk1hdGNoICYmIGlzSW5wdXRWaWV3U2hvd25NYXRjaFswXSkge1xuICAgICAgICBjYW5DbG9zZUtleWJvYXJkID0gaXNJbnB1dFZpZXdTaG93bk1hdGNoWzBdLnNwbGl0KCc9JylbMV0gPT09ICd0cnVlJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtpc0tleWJvYXJkU2hvd24sIGNhbkNsb3NlS2V5Ym9hcmR9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGZpbmRpbmcgc29mdGtleWJvYXJkLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbm1ldGhvZHMuc2VuZFRlbG5ldENvbW1hbmQgPSBhc3luYyBmdW5jdGlvbiAoY29tbWFuZCkge1xuICBsb2cuZGVidWcoYFNlbmRpbmcgdGVsbmV0IGNvbW1hbmQgdG8gZGV2aWNlOiAke2NvbW1hbmR9YCk7XG4gIGxldCBwb3J0ID0gYXdhaXQgdGhpcy5nZXRFbXVsYXRvclBvcnQoKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgY29ubiA9IG5ldC5jcmVhdGVDb25uZWN0aW9uKHBvcnQsICdsb2NhbGhvc3QnKSxcbiAgICAgICAgY29ubmVjdGVkID0gZmFsc2UsXG4gICAgICAgIHJlYWR5UmVnZXggPSAvXk9LJC9tLFxuICAgICAgICBkYXRhU3RyZWFtID0gXCJcIixcbiAgICAgICAgcmVzID0gbnVsbDtcbiAgICBjb25uLm9uKCdjb25uZWN0JywgKCkgPT4ge1xuICAgICAgbG9nLmRlYnVnKFwiU29ja2V0IGNvbm5lY3Rpb24gdG8gZGV2aWNlIGNyZWF0ZWRcIik7XG4gICAgfSk7XG4gICAgY29ubi5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICBkYXRhID0gZGF0YS50b1N0cmluZygndXRmOCcpO1xuICAgICAgaWYgKCFjb25uZWN0ZWQpIHtcbiAgICAgICAgaWYgKHJlYWR5UmVnZXgudGVzdChkYXRhKSkge1xuICAgICAgICAgIGNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgICAgbG9nLmRlYnVnKFwiU29ja2V0IGNvbm5lY3Rpb24gdG8gZGV2aWNlIHJlYWR5XCIpO1xuICAgICAgICAgIGNvbm4ud3JpdGUoY29tbWFuZCArIFwiXFxuXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhU3RyZWFtICs9IGRhdGE7XG4gICAgICAgIGlmIChyZWFkeVJlZ2V4LnRlc3QoZGF0YSkpIHtcbiAgICAgICAgICByZXMgPSBkYXRhU3RyZWFtLnJlcGxhY2UocmVhZHlSZWdleCwgXCJcIikudHJpbSgpO1xuICAgICAgICAgIHJlcyA9IF8ubGFzdChyZXMudHJpbSgpLnNwbGl0KCdcXG4nKSk7XG4gICAgICAgICAgbG9nLmRlYnVnKGBUZWxuZXQgY29tbWFuZCBnb3QgcmVzcG9uc2U6ICR7cmVzfWApO1xuICAgICAgICAgIGNvbm4ud3JpdGUoXCJxdWl0XFxuXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29ubi5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICBpZiAocmVzID09PSBudWxsKSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJOZXZlciBnb3QgYSByZXNwb25zZSBmcm9tIGNvbW1hbmRcIikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbm1ldGhvZHMuaXNBaXJwbGFuZU1vZGVPbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoWydzZXR0aW5ncycsICdnZXQnLCAnZ2xvYmFsJywgJ2FpcnBsYW5lX21vZGVfb24nXSk7XG4gIHJldHVybiBwYXJzZUludChzdGRvdXQsIDEwKSAhPT0gMDtcbn07XG5cbi8qXG4gKiBvbjogdHJ1ZSAodG8gdHVybiBvbikgb3IgZmFsc2UgKHRvIHR1cm4gb2ZmKVxuICovXG5tZXRob2RzLnNldEFpcnBsYW5lTW9kZSA9IGFzeW5jIGZ1bmN0aW9uIChvbikge1xuICBhd2FpdCB0aGlzLnNoZWxsKFsnc2V0dGluZ3MnLCAncHV0JywgJ2dsb2JhbCcsICdhaXJwbGFuZV9tb2RlX29uJywgb24gPyAxIDogMF0pO1xufTtcblxuLypcbiAqIG9uOiB0cnVlICh0byB0dXJuIG9uKSBvciBmYWxzZSAodG8gdHVybiBvZmYpXG4gKi9cbm1ldGhvZHMuYnJvYWRjYXN0QWlycGxhbmVNb2RlID0gYXN5bmMgZnVuY3Rpb24gKG9uKSB7XG4gIGxldCBhcmdzID0gWydhbScsICdicm9hZGNhc3QnLCAnLWEnLCAnYW5kcm9pZC5pbnRlbnQuYWN0aW9uLkFJUlBMQU5FX01PREUnLFxuICAgICAgICAgICAgICAnLS1leicsICdzdGF0ZScsIG9uID8gJ3RydWUnIDogJ2ZhbHNlJ107XG4gIGF3YWl0IHRoaXMuc2hlbGwoYXJncyk7XG59O1xuXG5tZXRob2RzLmlzV2lmaU9uID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbJ3NldHRpbmdzJywgJ2dldCcsICdnbG9iYWwnLCAnd2lmaV9vbiddKTtcbiAgcmV0dXJuIChwYXJzZUludChzdGRvdXQsIDEwKSAhPT0gMCk7XG59O1xuXG4vKlxuICogb246IHRydWUgKHRvIHR1cm4gb24pIG9yIGZhbHNlICh0byB0dXJuIG9mZilcbiAqL1xubWV0aG9kcy5zZXRXaWZpU3RhdGUgPSBhc3luYyBmdW5jdGlvbiAob24pIHtcbiAgYXdhaXQgdGhpcy5zaGVsbChbJ2FtJywgJ3N0YXJ0JywgJy1uJywgJ2lvLmFwcGl1bS5zZXR0aW5ncy8uU2V0dGluZ3MnLCAnLWUnLFxuICAgICAgICAgICAgICAgICAgICAnd2lmaScsIG9uID8gJ29uJyA6ICdvZmYnXSk7XG59O1xuXG5tZXRob2RzLmlzRGF0YU9uID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbJ3NldHRpbmdzJywgJ2dldCcsICdnbG9iYWwnLCAnbW9iaWxlX2RhdGEnXSk7XG4gIHJldHVybiAocGFyc2VJbnQoc3Rkb3V0LCAxMCkgIT09IDApO1xufTtcblxuLypcbiAqIG9uOiB0cnVlICh0byB0dXJuIG9uKSBvciBmYWxzZSAodG8gdHVybiBvZmYpXG4gKi9cbm1ldGhvZHMuc2V0RGF0YVN0YXRlID0gYXN5bmMgZnVuY3Rpb24gKG9uKSB7XG4gIGF3YWl0IHRoaXMuc2hlbGwoWydhbScsICdzdGFydCcsICctbicsICdpby5hcHBpdW0uc2V0dGluZ3MvLlNldHRpbmdzJywgJy1lJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEnLCBvbiA/ICdvbicgOiAnb2ZmJ10pO1xufTtcblxuLypcbiAqIG9wdHM6IHsgd2lmaTogdHJ1ZS9mYWxzZSwgZGF0YSB0cnVlL2ZhbHNlIH0gKHRydWUgdG8gdHVybiBvbiwgZmFsc2UgdG8gdHVybiBvZmYpXG4gKi9cbm1ldGhvZHMuc2V0V2lmaUFuZERhdGEgPSBhc3luYyBmdW5jdGlvbiAoe3dpZmksIGRhdGF9KSB7XG4gIGxldCB3aWZpT3B0cyA9IFtdLFxuICAgICAgZGF0YU9wdHMgPSBbXTtcbiAgaWYgKCFfLmlzVW5kZWZpbmVkKHdpZmkpKSB7XG4gICAgd2lmaU9wdHMgPSBbJy1lJywgJ3dpZmknLCAod2lmaSA/ICdvbicgOiAnb2ZmJyldO1xuICB9XG4gIGlmICghXy5pc1VuZGVmaW5lZChkYXRhKSkge1xuICAgIGRhdGFPcHRzID0gWyctZScsICdkYXRhJywgKGRhdGEgPyAnb24nIDogJ29mZicpXTtcbiAgfVxuICBsZXQgb3B0cyA9IFsnYW0nLCAnc3RhcnQnLCAnLW4nLCAnaW8uYXBwaXVtLnNldHRpbmdzLy5TZXR0aW5ncyddO1xuICBhd2FpdCB0aGlzLnNoZWxsKG9wdHMuY29uY2F0KHdpZmlPcHRzLCBkYXRhT3B0cykpO1xufTtcblxubWV0aG9kcy5yaW1yYWYgPSBhc3luYyBmdW5jdGlvbiAocGF0aCkge1xuICBhd2FpdCB0aGlzLnNoZWxsKFsncm0nLCAnLXJmJywgcGF0aF0pO1xufTtcblxubWV0aG9kcy5wdXNoID0gYXN5bmMgZnVuY3Rpb24gKGxvY2FsUGF0aCwgcmVtb3RlUGF0aCwgb3B0cykge1xuICBhd2FpdCB0aGlzLmFkYkV4ZWMoWydwdXNoJywgbG9jYWxQYXRoLCByZW1vdGVQYXRoXSwgb3B0cyk7XG59O1xuXG5tZXRob2RzLnB1bGwgPSBhc3luYyBmdW5jdGlvbiAocmVtb3RlUGF0aCwgbG9jYWxQYXRoKSB7XG4gIC8vIHB1bGwgZm9sZGVyIGNhbiB0YWtlIG1vcmUgdGltZSwgaW5jcmVhc2luZyB0aW1lIG91dCB0byAzMDAgc2Vjc1xuICBhd2FpdCB0aGlzLmFkYkV4ZWMoWydwdWxsJywgcmVtb3RlUGF0aCwgbG9jYWxQYXRoXSwge3RpbWVvdXQ6IDMwMDAwMH0pO1xufTtcblxubWV0aG9kcy5wcm9jZXNzRXhpc3RzID0gYXN5bmMgZnVuY3Rpb24gKHByb2Nlc3NOYW1lKSB7XG4gIHRyeSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWRDbGFzcyhwcm9jZXNzTmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwcm9jZXNzIG5hbWU6ICR7cHJvY2Vzc05hbWV9YCk7XG4gICAgfVxuICAgIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFwicHNcIik7XG4gICAgZm9yIChsZXQgbGluZSBvZiBzdGRvdXQuc3BsaXQoL1xccj9cXG4vKSkge1xuICAgICAgbGluZSA9IGxpbmUudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgICBsZXQgcGtnQ29sdW1uID0gbGluZVtsaW5lLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKHBrZ0NvbHVtbiAmJiBwa2dDb2x1bW4uaW5kZXhPZihwcm9jZXNzTmFtZSkgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgZmluZGluZyBpZiBwcm9jZXNzIGV4aXN0cy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICB9XG59O1xuXG5tZXRob2RzLmZvcndhcmRQb3J0ID0gYXN5bmMgZnVuY3Rpb24gKHN5c3RlbVBvcnQsIGRldmljZVBvcnQpIHtcbiAgbG9nLmRlYnVnKGBGb3J3YXJkaW5nIHN5c3RlbTogJHtzeXN0ZW1Qb3J0fSB0byBkZXZpY2U6ICR7ZGV2aWNlUG9ydH1gKTtcbiAgYXdhaXQgdGhpcy5hZGJFeGVjKFsnZm9yd2FyZCcsIGB0Y3A6JHtzeXN0ZW1Qb3J0fWAsIGB0Y3A6JHtkZXZpY2VQb3J0fWBdKTtcbn07XG5cbm1ldGhvZHMuZm9yd2FyZEFic3RyYWN0UG9ydCA9IGFzeW5jIGZ1bmN0aW9uIChzeXN0ZW1Qb3J0LCBkZXZpY2VQb3J0KSB7XG4gIGxvZy5kZWJ1ZyhgRm9yd2FyZGluZyBzeXN0ZW06ICR7c3lzdGVtUG9ydH0gdG8gYWJzdHJhY3QgZGV2aWNlOiAke2RldmljZVBvcnR9YCk7XG4gIGF3YWl0IHRoaXMuYWRiRXhlYyhbJ2ZvcndhcmQnLCBgdGNwOiR7c3lzdGVtUG9ydH1gLCBgbG9jYWxhYnN0cmFjdDoke2RldmljZVBvcnR9YF0pO1xufTtcblxubWV0aG9kcy5waW5nID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbXCJlY2hvXCIsIFwicGluZ1wiXSk7XG4gIGlmIChzdGRvdXQuaW5kZXhPZihcInBpbmdcIikgPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYEFEQiBwaW5nIGZhaWxlZCwgcmV0dXJuZWQgJHtzdGRvdXR9YCk7XG59O1xuXG5tZXRob2RzLnJlc3RhcnQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgdGhpcy5zdG9wTG9nY2F0KCk7XG4gICAgYXdhaXQgdGhpcy5yZXN0YXJ0QWRiKCk7XG4gICAgYXdhaXQgdGhpcy53YWl0Rm9yRGV2aWNlKDMwMCk7XG4gICAgYXdhaXQgdGhpcy5zdGFydExvZ2NhdCgpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFJlc3RhcnQgZmFpbGVkLiBPcmdpbmlhbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbm1ldGhvZHMuc3RhcnRMb2djYXQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmxvZ2NhdCAhPT0gbnVsbCkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KFwiVHJ5aW5nIHRvIHN0YXJ0IGxvZ2NhdCBjYXB0dXJlIGJ1dCBpdCdzIGFscmVhZHkgc3RhcnRlZCFcIik7XG4gIH1cbiAgdGhpcy5sb2djYXQgPSBuZXcgTG9nY2F0KHtcbiAgICBhZGI6IHRoaXMuZXhlY3V0YWJsZVxuICAsIGRlYnVnOiBmYWxzZVxuICAsIGRlYnVnVHJhY2U6IGZhbHNlXG4gIH0pO1xuICBhd2FpdCB0aGlzLmxvZ2NhdC5zdGFydENhcHR1cmUoKTtcbn07XG5cbm1ldGhvZHMuc3RvcExvZ2NhdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMubG9nY2F0ICE9PSBudWxsKSB7XG4gICAgYXdhaXQgdGhpcy5sb2djYXQuc3RvcENhcHR1cmUoKTtcbiAgICB0aGlzLmxvZ2NhdCA9IG51bGw7XG4gIH1cbn07XG5cbm1ldGhvZHMuZ2V0TG9nY2F0TG9ncyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMubG9nY2F0ID09PSBudWxsKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coXCJDYW4ndCBnZXQgbG9nY2F0IGxvZ3Mgc2luY2UgbG9nY2F0IGhhc24ndCBzdGFydGVkXCIpO1xuICB9XG4gIHJldHVybiB0aGlzLmxvZ2NhdC5nZXRMb2dzKCk7XG59O1xuXG5tZXRob2RzLmdldFBJRHNCeU5hbWUgPSBhc3luYyBmdW5jdGlvbiAobmFtZSkge1xuICBsb2cuZGVidWcoYEdldHRpbmcgYWxsIHByb2Nlc3NlcyB3aXRoICR7bmFtZX1gKTtcbiAgdHJ5IHtcbiAgICAvLyBwcyA8Y29tbT4gd2hlcmUgY29tbSBpcyBsYXN0IDE1IGNoYXJhY3RlcnMgb2YgcGFja2FnZSBuYW1lXG4gICAgaWYgKG5hbWUubGVuZ3RoID4gMTUpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cihuYW1lLmxlbmd0aCAtIDE1KTtcbiAgICB9XG4gICAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoW1wicHNcIiwgbmFtZV0pO1xuICAgIHN0ZG91dCA9IHN0ZG91dC50cmltKCk7XG4gICAgbGV0IHBpZHMgPSBbXTtcbiAgICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdChcIlxcblwiKSkge1xuICAgICAgaWYgKGxpbmUuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgbGV0IG1hdGNoID0gL1teXFx0IF0rW1xcdCBdKyhbMC05XSspLy5leGVjKGxpbmUpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICBwaWRzLnB1c2gocGFyc2VJbnQobWF0Y2hbMV0sIDEwKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZXh0cmFjdCBQSUQgZnJvbSBwcyBvdXRwdXQ6ICR7bGluZX1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGlkcztcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBVbmFibGUgdG8gZ2V0IHBpZHMgZm9yICR7bmFtZX0uIE9yZ2luaWFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxubWV0aG9kcy5raWxsUHJvY2Vzc2VzQnlOYW1lID0gYXN5bmMgZnVuY3Rpb24gKG5hbWUpIHtcbiAgdHJ5IHtcbiAgICBsb2cuZGVidWcoYEF0dGVtcHRpbmcgdG8ga2lsbCBhbGwgJHtuYW1lfSBwcm9jZXNzZXNgKTtcbiAgICBsZXQgcGlkcyA9IGF3YWl0IHRoaXMuZ2V0UElEc0J5TmFtZShuYW1lKTtcbiAgICBpZiAocGlkcy5sZW5ndGggPCAxKSB7XG4gICAgICBsb2cuaW5mbyhgTm8gJHtuYW1lfSBwcm9jZXNzIGZvdW5kIHRvIGtpbGwsIGNvbnRpbnVpbmcuLi5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChsZXQgcGlkIG9mIHBpZHMpIHtcbiAgICAgIGF3YWl0IHRoaXMua2lsbFByb2Nlc3NCeVBJRChwaWQpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBVbmFibGUgdG8ga2lsbCAke25hbWV9IHByb2Nlc3Nlcy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICB9XG59O1xuXG5tZXRob2RzLmtpbGxQcm9jZXNzQnlQSUQgPSBhc3luYyBmdW5jdGlvbiAocGlkKSB7XG4gIGxvZy5kZWJ1ZyhgQXR0ZW1wdGluZyB0byBraWxsIHByb2Nlc3MgJHtwaWR9YCk7XG4gIHJldHVybiBhd2FpdCB0aGlzLnNoZWxsKFsna2lsbCcsIHBpZF0pO1xufTtcblxubWV0aG9kcy5icm9hZGNhc3RQcm9jZXNzRW5kID0gYXN5bmMgZnVuY3Rpb24gKGludGVudCwgcHJvY2Vzc05hbWUpIHtcbiAgLy8gc3RhcnQgdGhlIGJyb2FkY2FzdCB3aXRob3V0IHdhaXRpbmcgZm9yIGl0IHRvIGZpbmlzaC5cbiAgdGhpcy5icm9hZGNhc3QoaW50ZW50KTtcbiAgLy8gd2FpdCBmb3IgdGhlIHByb2Nlc3MgdG8gZW5kXG4gIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gIGxldCB0aW1lb3V0TXMgPSA0MDAwMDtcbiAgdHJ5IHtcbiAgICB3aGlsZSAoKERhdGUubm93KCkgLSBzdGFydCkgPCB0aW1lb3V0TXMpIHtcbiAgICAgIGlmIChhd2FpdCB0aGlzLnByb2Nlc3NFeGlzdHMocHJvY2Vzc05hbWUpKSB7XG4gICAgICAgIC8vIGNvb2wgZG93blxuICAgICAgICBhd2FpdCBzbGVlcCg0MDApO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBQcm9jZXNzIG5ldmVyIGRpZWQgd2l0aGluICR7dGltZW91dE1zfSBtc2ApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFVuYWJsZSB0byBicm9hZGNhc3QgcHJvY2VzcyBlbmQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxubWV0aG9kcy5icm9hZGNhc3QgPSBhc3luYyBmdW5jdGlvbiAoaW50ZW50KSB7XG4gIGlmICghdGhpcy5pc1ZhbGlkQ2xhc3MoaW50ZW50KSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBJbnZhbGlkIGludGVudCAke2ludGVudH1gKTtcbiAgfVxuICBsb2cuZGVidWcoYEJyb2FkY2FzdGluZzogJHtpbnRlbnR9YCk7XG4gIGF3YWl0IHRoaXMuc2hlbGwoWydhbScsICdicm9hZGNhc3QnLCAnLWEnLCBpbnRlbnRdKTtcbn07XG5cbm1ldGhvZHMuZW5kQW5kcm9pZENvdmVyYWdlID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5pbnN0cnVtZW50UHJvYykge1xuICAgIGF3YWl0IHRoaXMuaW5zdHJ1bWVudFByb2Muc3RvcCgpO1xuICB9XG59O1xuXG5tZXRob2RzLmluc3RydW1lbnQgPSBhc3luYyBmdW5jdGlvbiAocGtnLCBhY3Rpdml0eSwgaW5zdHJ1bWVudFdpdGgpIHtcbiAgaWYgKGFjdGl2aXR5WzBdICE9PSBcIi5cIikge1xuICAgIHBrZyA9IFwiXCI7XG4gIH1cbiAgbGV0IHBrZ0FjdGl2aXR5ID0gKHBrZyArIGFjdGl2aXR5KS5yZXBsYWNlKC9cXC4rL2csICcuJyk7IC8vIEZpeCBwa2cuLmFjdGl2aXR5IGVycm9yXG4gIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFsnYW0nLCAnaW5zdHJ1bWVudCcsICctZScsICdtYWluX2FjdGl2aXR5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBrZ0FjdGl2aXR5LCBpbnN0cnVtZW50V2l0aF0pO1xuICBpZiAoc3Rkb3V0LmluZGV4T2YoXCJFeGNlcHRpb25cIikgIT09IC0xKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFVua25vd24gZXhjZXB0aW9uIGR1cmluZyBpbnN0cnVtZW50YXRpb24uIGAgK1xuICAgICAgICAgICAgICAgICAgICAgIGBPcmlnaW5hbCBlcnJvciAke3N0ZG91dC5zcGxpdChcIlxcblwiKVswXX1gKTtcbiAgfVxufTtcblxubWV0aG9kcy5hbmRyb2lkQ292ZXJhZ2UgPSBhc3luYyBmdW5jdGlvbiAoaW5zdHJ1bWVudENsYXNzLCB3YWl0UGtnLCB3YWl0QWN0aXZpdHkpIHtcbiAgaWYgKCF0aGlzLmlzVmFsaWRDbGFzcyhpbnN0cnVtZW50Q2xhc3MpKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEludmFsaWQgY2xhc3MgJHtpbnN0cnVtZW50Q2xhc3N9YCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgYXJncyA9IHRoaXMuZXhlY3V0YWJsZS5kZWZhdWx0QXJnc1xuICAgICAgLmNvbmNhdChbJ3NoZWxsJywgJ2FtJywgJ2luc3RydW1lbnQnLCAnLWUnLCAnY292ZXJhZ2UnLCAndHJ1ZScsICctdyddKVxuICAgICAgLmNvbmNhdChbaW5zdHJ1bWVudENsYXNzXSk7XG4gICAgbG9nLmRlYnVnKGBDb2xsZWN0aW5nIGNvdmVyYWdlIGRhdGEgd2l0aDogJHtbdGhpcy5leGVjdXRhYmxlLnBhdGhdLmNvbmNhdChhcmdzKS5qb2luKCcgJyl9YCk7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGFtIGluc3RydW1lbnQgcnVucyBmb3IgdGhlIGxpZmUgb2YgdGhlIGFwcCBwcm9jZXNzLlxuICAgICAgdGhpcy5pbnN0cnVtZW50UHJvYyA9IG5ldyBTdWJQcm9jZXNzKHRoaXMuZXhlY3V0YWJsZS5wYXRoLCBhcmdzKTtcbiAgICAgIGF3YWl0IHRoaXMuaW5zdHJ1bWVudFByb2Muc3RhcnQoMCk7XG4gICAgICB0aGlzLmluc3RydW1lbnRQcm9jLm9uKCdvdXRwdXQnLCAoc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgaWYgKHN0ZGVycikge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYEZhaWxlZCB0byBydW4gaW5zdHJ1bWVudGF0aW9uLiBPcmlnaW5hbCBlcnJvcjogJHtzdGRlcnJ9YCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IHRoaXMud2FpdEZvckFjdGl2aXR5KHdhaXRQa2csIHdhaXRBY3Rpdml0eSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihgQW5kcm9pZCBjb3ZlcmFnZSBmYWlsZWQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKSk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1ldGhvZHMuZ2V0RGV2aWNlUHJvcGVydHkgPSBhc3luYyBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoWydnZXRwcm9wJywgcHJvcGVydHldKTtcbiAgbGV0IHZhbCA9IHN0ZG91dC50cmltKCk7XG4gIGxvZy5kZWJ1ZyhgQ3VycmVudCBkZXZpY2UgcHJvcGVydHkgJyR7cHJvcGVydHl9JzogJHt2YWx9YCk7XG4gIHJldHVybiB2YWw7XG59O1xuXG5tZXRob2RzLnNldERldmljZVByb3BlcnR5ID0gYXN5bmMgZnVuY3Rpb24gKHByb3AsIHZhbCkge1xuICBsb2cuZGVidWcoYFNldHRpbmcgZGV2aWNlIHByb3BlcnR5ICcke3Byb3B9JyB0byAnJHt2YWx9J2ApO1xuICBhd2FpdCB0aGlzLnNoZWxsKFsnc2V0cHJvcCcsIHByb3AsIHZhbF0pO1xufTtcblxubWV0aG9kcy5nZXREZXZpY2VTeXNMYW5ndWFnZSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0RGV2aWNlUHJvcGVydHkoXCJwZXJzaXN0LnN5cy5sYW5ndWFnZVwiKTtcbn07XG5cbm1ldGhvZHMuc2V0RGV2aWNlU3lzTGFuZ3VhZ2UgPSBhc3luYyBmdW5jdGlvbiAobGFuZ3VhZ2UpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2V0RGV2aWNlUHJvcGVydHkoXCJwZXJzaXN0LnN5cy5sYW5ndWFnZVwiLCBsYW5ndWFnZS50b0xvd2VyQ2FzZSgpKTtcbn07XG5cbm1ldGhvZHMuZ2V0RGV2aWNlU3lzQ291bnRyeSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0RGV2aWNlUHJvcGVydHkoXCJwZXJzaXN0LnN5cy5jb3VudHJ5XCIpO1xufTtcblxubWV0aG9kcy5zZXREZXZpY2VTeXNDb3VudHJ5ID0gYXN5bmMgZnVuY3Rpb24gKGNvdW50cnkpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2V0RGV2aWNlUHJvcGVydHkoXCJwZXJzaXN0LnN5cy5jb3VudHJ5XCIsIGNvdW50cnkudG9VcHBlckNhc2UoKSk7XG59O1xuXG5tZXRob2RzLmdldERldmljZVN5c0xvY2FsZSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0RGV2aWNlUHJvcGVydHkoXCJwZXJzaXN0LnN5cy5sb2NhbGVcIik7XG59O1xuXG5tZXRob2RzLnNldERldmljZVN5c0xvY2FsZSA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhbGUpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2V0RGV2aWNlUHJvcGVydHkoXCJwZXJzaXN0LnN5cy5sb2NhbGVcIiwgbG9jYWxlKTtcbn07XG5cbm1ldGhvZHMuZ2V0RGV2aWNlUHJvZHVjdExhbmd1YWdlID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5nZXREZXZpY2VQcm9wZXJ0eShcInJvLnByb2R1Y3QubG9jYWxlLmxhbmd1YWdlXCIpO1xufTtcblxubWV0aG9kcy5nZXREZXZpY2VQcm9kdWN0Q291bnRyeSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0RGV2aWNlUHJvcGVydHkoXCJyby5wcm9kdWN0LmxvY2FsZS5yZWdpb25cIik7XG59O1xuXG5tZXRob2RzLmdldERldmljZVByb2R1Y3RMb2NhbGUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmdldERldmljZVByb3BlcnR5KFwicm8ucHJvZHVjdC5sb2NhbGVcIik7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZXRob2RzO1xuIl19