'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumSupport = require('appium-support');

var _helpers = require('../helpers');

var _teen_process = require('teen_process');

var _asyncbox = require('asyncbox');

var systemCallMethods = {};

var DEFAULT_ADB_EXEC_TIMEOUT = 120000; // in milliseconds

systemCallMethods.getSdkBinaryPath = function callee$0$0(binaryName) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].info('Checking whether ' + binaryName + ' is present');

        if (!this.sdkRoot) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt('return', this.getBinaryFromSdkRoot(binaryName));

      case 5:
        _loggerJs2['default'].warn('The ANDROID_HOME environment variable is not set to the Android SDK ' + 'root directory path. ANDROID_HOME is required for compatibility ' + ('with SDK 23+. Checking along PATH for ' + binaryName + '.'));
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.getBinaryFromPath(binaryName));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.getCommandForOS = function () {
  var cmd = "which";
  if (_appiumSupport.system.isWindows()) {
    cmd = "where";
  }
  return cmd;
};

systemCallMethods.getBinaryNameForOS = function (binaryName) {
  if (_appiumSupport.system.isWindows()) {
    if (binaryName === "android") {
      binaryName += ".bat";
    } else {
      if (binaryName.indexOf(".exe", binaryName.length - 4) === -1) {
        binaryName += ".exe";
      }
    }
  }
  return binaryName;
};

systemCallMethods.getBinaryFromSdkRoot = function callee$0$0(binaryName) {
  var binaryLoc, binaryLocs, buildToolDirs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, versionDir, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, loc, flag;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        binaryLoc = null;

        binaryName = this.getBinaryNameForOS(binaryName);
        binaryLocs = [_path2['default'].resolve(this.sdkRoot, "platform-tools", binaryName), _path2['default'].resolve(this.sdkRoot, "tools", binaryName)];
        buildToolDirs = [];
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _helpers.getDirectories)(_path2['default'].resolve(this.sdkRoot, "build-tools")));

      case 6:
        buildToolDirs = context$1$0.sent;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 10;

        for (_iterator = _getIterator(buildToolDirs); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          versionDir = _step.value;

          binaryLocs.push(_path2['default'].resolve(this.sdkRoot, "build-tools", versionDir, binaryName));
        }
        context$1$0.next = 18;
        break;

      case 14:
        context$1$0.prev = 14;
        context$1$0.t0 = context$1$0['catch'](10);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 18:
        context$1$0.prev = 18;
        context$1$0.prev = 19;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 21:
        context$1$0.prev = 21;

        if (!_didIteratorError) {
          context$1$0.next = 24;
          break;
        }

        throw _iteratorError;

      case 24:
        return context$1$0.finish(21);

      case 25:
        return context$1$0.finish(18);

      case 26:
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 29;
        _iterator2 = _getIterator(binaryLocs);

      case 31:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 40;
          break;
        }

        loc = _step2.value;
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(loc));

      case 35:
        flag = context$1$0.sent;

        if (flag) {
          binaryLoc = loc;
        }

      case 37:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 31;
        break;

      case 40:
        context$1$0.next = 46;
        break;

      case 42:
        context$1$0.prev = 42;
        context$1$0.t1 = context$1$0['catch'](29);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t1;

      case 46:
        context$1$0.prev = 46;
        context$1$0.prev = 47;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 49:
        context$1$0.prev = 49;

        if (!_didIteratorError2) {
          context$1$0.next = 52;
          break;
        }

        throw _iteratorError2;

      case 52:
        return context$1$0.finish(49);

      case 53:
        return context$1$0.finish(46);

      case 54:
        if (!(binaryLoc === null)) {
          context$1$0.next = 56;
          break;
        }

        throw new Error('Could not find ' + binaryName + ' in tools, platform-tools, ' + ('or supported build-tools under ' + this.sdkRoot + ' ') + 'do you have the Android SDK installed at this location?');

      case 56:
        binaryLoc = binaryLoc.trim();
        _loggerJs2['default'].info('Using ' + binaryName + ' from ' + binaryLoc);
        return context$1$0.abrupt('return', binaryLoc);

      case 59:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[10, 14, 18, 26], [19,, 21, 25], [29, 42, 46, 54], [47,, 49, 53]]);
};

systemCallMethods.getBinaryFromPath = function callee$0$0(binaryName) {
  var binaryLoc, cmd, _ref, stdout;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        binaryLoc = null;
        cmd = this.getCommandForOS();
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, [binaryName]));

      case 5:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;

        _loggerJs2['default'].info('Using ' + binaryName + ' from ' + stdout);
        // TODO write a test for binaries with spaces.
        binaryLoc = stdout.trim();
        return context$1$0.abrupt('return', binaryLoc);

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](2);

        _loggerJs2['default'].errorAndThrow('Could not find ' + binaryName + ' Please set the ANDROID_HOME ' + 'environment variable with the Android SDK root directory path.');

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 12]]);
};

systemCallMethods.getConnectedDevices = function callee$0$0() {
  var _ref2, stdout, startingIndex, devices, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, line, lineInfo;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Getting connected devices...");
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, ['devices']));

      case 4:
        _ref2 = context$1$0.sent;
        stdout = _ref2.stdout;
        startingIndex = stdout.indexOf("List of devices");

        if (!(startingIndex === -1)) {
          context$1$0.next = 11;
          break;
        }

        throw new Error('Unexpected output while trying to get devices. output was: ' + stdout);

      case 11:
        // slicing ouput we care about.
        stdout = stdout.slice(startingIndex);
        devices = [];
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 16;

        for (_iterator3 = _getIterator(stdout.split("\n")); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          line = _step3.value;

          if (line.trim() !== "" && line.indexOf("List of devices") === -1 && line.indexOf("* daemon") === -1 && line.indexOf("offline") === -1) {
            lineInfo = line.split("\t");

            // state is either "device" or "offline", afaict
            devices.push({ udid: lineInfo[0], state: lineInfo[1] });
          }
        }
        context$1$0.next = 24;
        break;

      case 20:
        context$1$0.prev = 20;
        context$1$0.t0 = context$1$0['catch'](16);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 24:
        context$1$0.prev = 24;
        context$1$0.prev = 25;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 27:
        context$1$0.prev = 27;

        if (!_didIteratorError3) {
          context$1$0.next = 30;
          break;
        }

        throw _iteratorError3;

      case 30:
        return context$1$0.finish(27);

      case 31:
        return context$1$0.finish(24);

      case 32:
        _loggerJs2['default'].debug(devices.length + ' device(s) connected');
        return context$1$0.abrupt('return', devices);

      case 34:
        context$1$0.next = 39;
        break;

      case 36:
        context$1$0.prev = 36;
        context$1$0.t1 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error while getting connected devices. Original error: ' + context$1$0.t1.message);

      case 39:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 36], [16, 20, 24, 32], [25,, 27, 31]]);
};

systemCallMethods.getDevicesWithRetry = function callee$0$0() {
  var timeoutMs = arguments.length <= 0 || arguments[0] === undefined ? 20000 : arguments[0];
  var start, getDevices;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        start = Date.now();

        _loggerJs2['default'].debug("Trying to find a connected android device");

        getDevices = function getDevices() {
          var devices;
          return _regeneratorRuntime.async(function getDevices$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                if (!(Date.now() - start > timeoutMs)) {
                  context$2$0.next = 2;
                  break;
                }

                throw new Error("Could not find a connected Android device.");

              case 2:
                context$2$0.prev = 2;
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(this.getConnectedDevices());

              case 5:
                devices = context$2$0.sent;

                if (!(devices.length < 1)) {
                  context$2$0.next = 15;
                  break;
                }

                _loggerJs2['default'].debug("Could not find devices, restarting adb server...");
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap(this.restartAdb());

              case 10:
                context$2$0.next = 12;
                return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(200));

              case 12:
                context$2$0.next = 14;
                return _regeneratorRuntime.awrap(getDevices());

              case 14:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 15:
                return context$2$0.abrupt('return', devices);

              case 18:
                context$2$0.prev = 18;
                context$2$0.t0 = context$2$0['catch'](2);

                _loggerJs2['default'].debug("Could not find devices, restarting adb server...");
                context$2$0.next = 23;
                return _regeneratorRuntime.awrap(this.restartAdb());

              case 23:
                context$2$0.next = 25;
                return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(200));

              case 25:
                context$2$0.next = 27;
                return _regeneratorRuntime.awrap(getDevices());

              case 27:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 28:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[2, 18]]);
        };

        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(getDevices());

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.restartAdb = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (this.suppressKillServer) {
          context$1$0.next = 10;
          break;
        }

        _loggerJs2['default'].debug('Restarting adb');
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, ['kill-server']));

      case 5:
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](2);

        _loggerJs2['default'].error("Error killing ADB server, going to see if it's online anyway");

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 7]]);
};

systemCallMethods.adbExec = function callee$0$0(cmd) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var execFunc;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (cmd) {
          context$1$0.next = 2;
          break;
        }

        throw new Error("You need to pass in a command to adbExec()");

      case 2:
        // setting default timeout for each command to prevent infinite wait.
        opts.timeout = opts.timeout || DEFAULT_ADB_EXEC_TIMEOUT;

        execFunc = function execFunc() {
          var args, _ref3, stdout, linkerWarningRe, protocolFaultError, deviceNotFoundError;

          return _regeneratorRuntime.async(function execFunc$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;

                if (!(cmd instanceof Array)) {
                  cmd = [cmd];
                }
                args = this.executable.defaultArgs.concat(cmd);

                _loggerJs2['default'].debug('Running ' + this.executable.path + ' with args: ' + ('' + JSON.stringify(args)));
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, args, opts));

              case 6:
                _ref3 = context$2$0.sent;
                stdout = _ref3.stdout;
                linkerWarningRe = /^WARNING: linker.+$/m;

                stdout = stdout.replace(linkerWarningRe, '').trim();
                return context$2$0.abrupt('return', stdout);

              case 13:
                context$2$0.prev = 13;
                context$2$0.t0 = context$2$0['catch'](0);
                protocolFaultError = new RegExp("protocol fault \\(no status\\)", "i").test(context$2$0.t0);
                deviceNotFoundError = new RegExp("error: device not found", "i").test(context$2$0.t0);

                if (!(protocolFaultError || deviceNotFoundError)) {
                  context$2$0.next = 23;
                  break;
                }

                _loggerJs2['default'].info('error sending command, reconnecting device and retrying: ' + cmd);
                context$2$0.next = 21;
                return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(1000));

              case 21:
                context$2$0.next = 23;
                return _regeneratorRuntime.awrap(this.getDevicesWithRetry());

              case 23:
                throw new Error('Error executing adbExec. Original error: ' + context$2$0.t0.message + JSON.stringify(context$2$0.t0));

              case 24:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2, [[0, 13]]);
        };

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(2, execFunc));

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.shell = function callee$0$0(cmd) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var execCmd;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.isDeviceConnected());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 4;
          break;
        }

        throw new Error('No device connected, cannot run adb shell command "' + cmd.join(' ') + '"');

      case 4:
        execCmd = ['shell'];

        if (cmd instanceof Array) {
          execCmd = execCmd.concat(cmd);
        } else {
          execCmd.push(cmd);
        }
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.adbExec(execCmd, opts));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.createSubProcess = function () {
  var args = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  // add the default arguments
  args = this.executable.defaultArgs.concat(args);
  _loggerJs2['default'].debug('Creating ADB subprocess with args: ' + args.join(', '));
  return new _teen_process.SubProcess(this.getAdbPath(), args);
};

// TODO can probably deprecate this now that the logic is just to read
// this.adbPort
systemCallMethods.getAdbServerPort = function () {
  return this.adbPort;
};

systemCallMethods.getEmulatorPort = function callee$0$0() {
  var devices, port;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Getting running emulator port");

        if (!(this.emulatorPort !== null)) {
          context$1$0.next = 3;
          break;
        }

        return context$1$0.abrupt('return', this.emulatorPort);

      case 3:
        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getConnectedDevices());

      case 6:
        devices = context$1$0.sent;
        port = this.getPortFromEmulatorString(devices[0].udid);

        if (!port) {
          context$1$0.next = 12;
          break;
        }

        return context$1$0.abrupt('return', port);

      case 12:
        throw new Error('Emulator port not found');

      case 13:
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](3);

        _loggerJs2['default'].errorAndThrow('No devices connected. Original error: ' + context$1$0.t0.message);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 15]]);
};

systemCallMethods.getPortFromEmulatorString = function (emStr) {
  var portPattern = /emulator-(\d+)/;
  if (portPattern.test(emStr)) {
    return parseInt(portPattern.exec(emStr)[1], 10);
  }
  return false;
};

systemCallMethods.getConnectedEmulators = function callee$0$0() {
  var devices, emulators, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, device, port;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        _loggerJs2['default'].debug("Getting connected emulators");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getConnectedDevices());

      case 4:
        devices = context$1$0.sent;
        emulators = [];
        _iteratorNormalCompletion4 = true;
        _didIteratorError4 = false;
        _iteratorError4 = undefined;
        context$1$0.prev = 9;

        for (_iterator4 = _getIterator(devices); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          device = _step4.value;
          port = this.getPortFromEmulatorString(device.udid);

          if (port) {
            device.port = port;
            emulators.push(device);
          }
        }
        context$1$0.next = 17;
        break;

      case 13:
        context$1$0.prev = 13;
        context$1$0.t0 = context$1$0['catch'](9);
        _didIteratorError4 = true;
        _iteratorError4 = context$1$0.t0;

      case 17:
        context$1$0.prev = 17;
        context$1$0.prev = 18;

        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }

      case 20:
        context$1$0.prev = 20;

        if (!_didIteratorError4) {
          context$1$0.next = 23;
          break;
        }

        throw _iteratorError4;

      case 23:
        return context$1$0.finish(20);

      case 24:
        return context$1$0.finish(17);

      case 25:
        _loggerJs2['default'].debug(emulators.length + ' emulator(s) connected');
        return context$1$0.abrupt('return', emulators);

      case 29:
        context$1$0.prev = 29;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting emulators. Original error: ' + context$1$0.t1.message);

      case 32:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 29], [9, 13, 17, 25], [18,, 20, 24]]);
};

systemCallMethods.setEmulatorPort = function (emPort) {
  this.emulatorPort = emPort;
};

systemCallMethods.setDeviceId = function (deviceId) {
  _loggerJs2['default'].debug('Setting device id to ' + deviceId);
  this.curDeviceId = deviceId;
  var argsHasDevice = this.executable.defaultArgs.indexOf('-s');
  if (argsHasDevice !== -1) {
    // remove the old device id from the arguments
    this.executable.defaultArgs.splice(argsHasDevice, 2);
  }
  this.executable.defaultArgs.push('-s', deviceId);
};

systemCallMethods.setDevice = function (deviceObj) {
  var deviceId = deviceObj.udid;
  var emPort = this.getPortFromEmulatorString(deviceId);
  this.setEmulatorPort(emPort);
  this.setDeviceId(deviceId);
};

systemCallMethods.getRunningAVD = function callee$0$0(avdName) {
  var emulators, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, emulator, runningAVDName;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        _loggerJs2['default'].debug('Trying to find ' + avdName + ' emulator');
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getConnectedEmulators());

      case 4:
        emulators = context$1$0.sent;
        _iteratorNormalCompletion5 = true;
        _didIteratorError5 = false;
        _iteratorError5 = undefined;
        context$1$0.prev = 8;
        _iterator5 = _getIterator(emulators);

      case 10:
        if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
          context$1$0.next = 23;
          break;
        }

        emulator = _step5.value;

        this.setEmulatorPort(emulator.port);
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.sendTelnetCommand("avd name"));

      case 15:
        runningAVDName = context$1$0.sent;

        if (!(avdName === runningAVDName)) {
          context$1$0.next = 20;
          break;
        }

        _loggerJs2['default'].debug('Found emulator ' + avdName + ' in port ' + emulator.port);
        this.setDeviceId(emulator.udid);
        return context$1$0.abrupt('return', emulator);

      case 20:
        _iteratorNormalCompletion5 = true;
        context$1$0.next = 10;
        break;

      case 23:
        context$1$0.next = 29;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t0 = context$1$0['catch'](8);
        _didIteratorError5 = true;
        _iteratorError5 = context$1$0.t0;

      case 29:
        context$1$0.prev = 29;
        context$1$0.prev = 30;

        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
          _iterator5['return']();
        }

      case 32:
        context$1$0.prev = 32;

        if (!_didIteratorError5) {
          context$1$0.next = 35;
          break;
        }

        throw _iteratorError5;

      case 35:
        return context$1$0.finish(32);

      case 36:
        return context$1$0.finish(29);

      case 37:
        _loggerJs2['default'].debug('Emulator ' + avdName + ' not running');
        return context$1$0.abrupt('return', null);

      case 41:
        context$1$0.prev = 41;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting AVD. Original error: ' + context$1$0.t1.message);

      case 44:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 41], [8, 25, 29, 37], [30,, 32, 36]]);
};

systemCallMethods.getRunningAVDWithRetry = function callee$0$0(avdName) {
  var timeoutMs = arguments.length <= 1 || arguments[1] === undefined ? 20000 : arguments[1];
  var start, runningAVD;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        start = Date.now();

      case 2:
        if (!(Date.now() - start < timeoutMs)) {
          context$1$0.next = 18;
          break;
        }

        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getRunningAVD(avdName.replace('@', '')));

      case 6:
        runningAVD = context$1$0.sent;

        if (!runningAVD) {
          context$1$0.next = 9;
          break;
        }

        return context$1$0.abrupt('return', runningAVD);

      case 9:
        context$1$0.next = 14;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](3);

        // Do nothing.
        _loggerJs2['default'].info('Couldn\'t get running AVD, will retry. Error was: ' + context$1$0.t0.message);

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(200));

      case 16:
        context$1$0.next = 2;
        break;

      case 18:
        _loggerJs2['default'].errorAndThrow('Could not find ' + avdName + ' emulator.');
        context$1$0.next = 24;
        break;

      case 21:
        context$1$0.prev = 21;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting AVD with retry. Original error: ' + context$1$0.t1.message);

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 21], [3, 11]]);
};

systemCallMethods.killAllEmulators = function callee$0$0() {
  var cmd, args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cmd = undefined, args = undefined;

        if (_appiumSupport.system.isWindows()) {
          cmd = 'TASKKILL';
          args = ['TASKKILL', '/IM', 'emulator.exe'];
        } else {
          cmd = '/usr/bin/killall';
          args = ['-m', 'emulator*'];
        }
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, args));

      case 5:
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](2);

        _loggerJs2['default'].errorAndThrow('Error killing emulators. Original error: ' + context$1$0.t0.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 7]]);
};

systemCallMethods.launchAVD = function callee$0$0(avdName, avdArgs, language, country) {
  var avdLaunchTimeout = arguments.length <= 4 || arguments[4] === undefined ? 60000 : arguments[4];
  var avdReadyTimeout = arguments.length <= 5 || arguments[5] === undefined ? 60000 : arguments[5];
  var retryTimes = arguments.length <= 6 || arguments[6] === undefined ? 1 : arguments[6];
  var emulatorBinaryPath, launchArgs, locale, proc;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Launching Emulator with AVD ' + avdName + ', launchTimeout' + (avdLaunchTimeout + ' ms and readyTimeout ' + avdReadyTimeout + ' ms'));
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath("emulator"));

      case 3:
        emulatorBinaryPath = context$1$0.sent;

        if (avdName[0] === "@") {
          avdName = avdName.substr(1);
        }
        launchArgs = ["-avd", avdName];

        if (typeof language === "string") {
          _loggerJs2['default'].debug('Setting Android Device Language to ' + language);
          launchArgs.push("-prop", 'persist.sys.language=' + language.toLowerCase());
        }
        if (typeof country === "string") {
          _loggerJs2['default'].debug('Setting Android Device Country to ' + country);
          launchArgs.push("-prop", 'persist.sys.country=' + country.toUpperCase());
        }
        locale = undefined;

        if (typeof language === "string" && typeof country === "string") {
          locale = language.toLowerCase() + "-" + country.toUpperCase();
        } else if (typeof language === "string") {
          locale = language.toLowerCase();
        } else if (typeof country === "string") {
          locale = country;
        }
        if (typeof locale === "string") {
          _loggerJs2['default'].debug('Setting Android Device Locale to ' + locale);
          launchArgs.push("-prop", 'persist.sys.locale=' + locale);
        }
        if (typeof avdArgs === "string") {
          avdArgs = avdArgs.split(" ");
          launchArgs = launchArgs.concat(avdArgs);
        }
        proc = new _teen_process.SubProcess(emulatorBinaryPath, launchArgs);
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(proc.start(0));

      case 15:
        proc.on('output', function (stdout, stderr) {
          _loggerJs2['default'].info('[AVD OUTPUT] ' + (stdout || stderr));
        });
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(retryTimes, this.getRunningAVDWithRetry.bind(this), avdName, avdLaunchTimeout));

      case 18:
        context$1$0.next = 20;
        return _regeneratorRuntime.awrap(this.waitForEmulatorReady(avdReadyTimeout));

      case 20:
        return context$1$0.abrupt('return', proc);

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.waitForEmulatorReady = function callee$0$0() {
  var timeoutMs = arguments.length <= 0 || arguments[0] === undefined ? 60000 : arguments[0];
  var start, stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        start = Date.now();

        _loggerJs2['default'].debug("Waiting until emulator is ready");

      case 2:
        if (!(Date.now() - start < timeoutMs)) {
          context$1$0.next = 17;
          break;
        }

        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.shell(["getprop", "init.svc.bootanim"]));

      case 6:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf('stopped') > -1)) {
          context$1$0.next = 9;
          break;
        }

        return context$1$0.abrupt('return');

      case 9:
        context$1$0.next = 13;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](3);

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(3000));

      case 15:
        context$1$0.next = 2;
        break;

      case 17:
        _loggerJs2['default'].errorAndThrow('Emulator not ready');

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 11]]);
};

systemCallMethods.waitForDevice = function callee$0$0() {
  var appDeviceReadyTimeout = arguments.length <= 0 || arguments[0] === undefined ? 60 : arguments[0];
  var retries, timeout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.appDeviceReadyTimeout = appDeviceReadyTimeout;
        retries = 3;
        timeout = parseInt(this.appDeviceReadyTimeout, 10) / retries * 1000;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(retries, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.adbExec('wait-for-device', { timeout: timeout }));

              case 3:
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(this.ping());

              case 5:
                context$2$0.next = 14;
                break;

              case 7:
                context$2$0.prev = 7;
                context$2$0.t0 = context$2$0['catch'](0);
                context$2$0.next = 11;
                return _regeneratorRuntime.awrap(this.restartAdb());

              case 11:
                context$2$0.next = 13;
                return _regeneratorRuntime.awrap(this.getConnectedDevices());

              case 13:
                _loggerJs2['default'].errorAndThrow('Error in waiting for device. Original error: \'' + context$2$0.t0.message + '\'. ' + 'Retrying by restarting ADB');

              case 14:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3, [[0, 7]]);
        }));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.reboot = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this4 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['stop']));

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(2000));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.setDeviceProperty('sys.boot_completed', 0));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.shell(['start']));

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(180, 1000, function callee$1$0() {
          var booted;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.getDeviceProperty('sys.boot_completed'));

              case 2:
                booted = context$2$0.sent;

                if (!(booted === '1')) {
                  context$2$0.next = 7;
                  break;
                }

                return context$2$0.abrupt('return');

              case 7:
                _loggerJs2['default'].errorAndthrow('Waiting for reboot this takes time');

              case 8:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this4);
        }));

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.fileExists = function callee$0$0(remotePath) {
  var files;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.ls(remotePath));

      case 2:
        files = context$1$0.sent;
        return context$1$0.abrupt('return', files.length > 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.ls = function callee$0$0(remotePath) {
  var stdout, lines;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['ls', remotePath]));

      case 2:
        stdout = context$1$0.sent;
        lines = stdout.split("\n");
        return context$1$0.abrupt('return', lines.map(function (l) {
          return l.trim();
        }).filter(Boolean).filter(function (l) {
          return l.indexOf("No such file") === -1;
        }));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = systemCallMethods;
module.exports = exports['default'];

// get subpaths for currently installed build tool directories

// expecting adb devices to return output as
// List of devices attached
// emulator-5554	device

// cool down

// cool down

// sometimes ADB prints out stupid stdout warnings that we don't want
// to include in any of the response data, so let's strip it out

// cool down

// do nothing
// let the emu finish stopping;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9zeXN0ZW0tY2FsbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7O3dCQUNQLGNBQWM7Ozs7d0JBQ2hCLFVBQVU7Ozs7NkJBQ0csZ0JBQWdCOzt1QkFDWixZQUFZOzs0QkFDdEIsY0FBYzs7d0JBQ1MsVUFBVTs7QUFHdEQsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7O0FBRTNCLElBQU0sd0JBQXdCLEdBQUcsTUFBTSxDQUFDOztBQUV4QyxpQkFBaUIsQ0FBQyxnQkFBZ0IsR0FBRyxvQkFBZ0IsVUFBVTs7OztBQUM3RCw4QkFBSSxJQUFJLHVCQUFxQixVQUFVLGlCQUFjLENBQUM7O2FBQ2xELElBQUksQ0FBQyxPQUFPOzs7Ozs0Q0FDUCxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDOzs7QUFFNUMsOEJBQUksSUFBSSxDQUFDLDJJQUNrRSwrQ0FDekIsVUFBVSxPQUFHLENBQUMsQ0FBQzs7eUNBQ3BELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7Ozs7Q0FHbEQsQ0FBQzs7QUFFRixpQkFBaUIsQ0FBQyxlQUFlLEdBQUcsWUFBWTtBQUM5QyxNQUFJLEdBQUcsR0FBRyxPQUFPLENBQUM7QUFDbEIsTUFBSSxzQkFBTyxTQUFTLEVBQUUsRUFBRTtBQUN0QixPQUFHLEdBQUcsT0FBTyxDQUFDO0dBQ2Y7QUFDRCxTQUFPLEdBQUcsQ0FBQztDQUNaLENBQUM7O0FBRUYsaUJBQWlCLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxVQUFVLEVBQUU7QUFDM0QsTUFBSSxzQkFBTyxTQUFTLEVBQUUsRUFBRTtBQUN0QixRQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7QUFDNUIsZ0JBQVUsSUFBSSxNQUFNLENBQUM7S0FDdEIsTUFBTTtBQUNMLFVBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFD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QUFhLENBQUMsb0NBQW9DLENBQUMsQ0FBQzs7Ozs7OztTQUUzRCxDQUFDOzs7Ozs7O0NBQ0gsQ0FBQzs7QUFFRixpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsb0JBQWdCLFVBQVU7TUFDbkQsS0FBSzs7Ozs7eUNBQVMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7OztBQUFqQyxhQUFLOzRDQUNGLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7Ozs7OztDQUN4QixDQUFDOztBQUVGLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxvQkFBZ0IsVUFBVTtNQUMzQyxNQUFNLEVBQ04sS0FBSzs7Ozs7eUNBRFUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzs7O0FBQTdDLGNBQU07QUFDTixhQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7NENBQ3ZCLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2lCQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7U0FBQSxDQUFDLENBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FDZixNQUFNLENBQUMsVUFBQSxDQUFDO2lCQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQUEsQ0FBQzs7Ozs7OztDQUMzRCxDQUFDOztxQkFFYSxpQkFBaUIiLCJmaWxlIjoibGliL3Rvb2xzL3N5c3RlbS1jYWxscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXIuanMnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgc3lzdGVtLCBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IGdldERpcmVjdG9yaWVzIH0gZnJvbSAnLi4vaGVscGVycyc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcbmltcG9ydCB7IHNsZWVwLCByZXRyeSwgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcbmltcG9ydCB7IFN1YlByb2Nlc3MgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuXG5sZXQgc3lzdGVtQ2FsbE1ldGhvZHMgPSB7fTtcblxuY29uc3QgREVGQVVMVF9BREJfRVhFQ19USU1FT1VUID0gMTIwMDAwOyAvLyBpbiBtaWxsaXNlY29uZHNcblxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0U2RrQmluYXJ5UGF0aCA9IGFzeW5jIGZ1bmN0aW9uIChiaW5hcnlOYW1lKSB7XG4gIGxvZy5pbmZvKGBDaGVja2luZyB3aGV0aGVyICR7YmluYXJ5TmFtZX0gaXMgcHJlc2VudGApO1xuICBpZiAodGhpcy5zZGtSb290KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QmluYXJ5RnJvbVNka1Jvb3QoYmluYXJ5TmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nLndhcm4oYFRoZSBBTkRST0lEX0hPTUUgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IHNldCB0byB0aGUgQW5kcm9pZCBTREsgYCArXG4gICAgICAgICAgICAgYHJvb3QgZGlyZWN0b3J5IHBhdGguIEFORFJPSURfSE9NRSBpcyByZXF1aXJlZCBmb3IgY29tcGF0aWJpbGl0eSBgICtcbiAgICAgICAgICAgICBgd2l0aCBTREsgMjMrLiBDaGVja2luZyBhbG9uZyBQQVRIIGZvciAke2JpbmFyeU5hbWV9LmApO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEJpbmFyeUZyb21QYXRoKGJpbmFyeU5hbWUpO1xuXG4gIH1cbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLmdldENvbW1hbmRGb3JPUyA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGNtZCA9IFwid2hpY2hcIjtcbiAgaWYgKHN5c3RlbS5pc1dpbmRvd3MoKSkge1xuICAgIGNtZCA9IFwid2hlcmVcIjtcbiAgfVxuICByZXR1cm4gY21kO1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0QmluYXJ5TmFtZUZvck9TID0gZnVuY3Rpb24gKGJpbmFyeU5hbWUpIHtcbiAgaWYgKHN5c3RlbS5pc1dpbmRvd3MoKSkge1xuICAgIGlmIChiaW5hcnlOYW1lID09PSBcImFuZHJvaWRcIikge1xuICAgICAgYmluYXJ5TmFtZSArPSBcIi5iYXRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGJpbmFyeU5hbWUuaW5kZXhPZihcIi5leGVcIiwgYmluYXJ5TmFtZS5sZW5ndGggLSA0KSA9PT0gLTEpIHtcbiAgICAgICAgYmluYXJ5TmFtZSArPSBcIi5leGVcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJpbmFyeU5hbWU7XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRCaW5hcnlGcm9tU2RrUm9vdCA9IGFzeW5jIGZ1bmN0aW9uIChiaW5hcnlOYW1lKSB7XG4gIGxldCBiaW5hcnlMb2MgPSBudWxsO1xuICBiaW5hcnlOYW1lID0gdGhpcy5nZXRCaW5hcnlOYW1lRm9yT1MoYmluYXJ5TmFtZSk7XG4gIGxldCBiaW5hcnlMb2NzID0gW3BhdGgucmVzb2x2ZSh0aGlzLnNka1Jvb3QsIFwicGxhdGZvcm0tdG9vbHNcIiwgYmluYXJ5TmFtZSksXG4gICAgICAgICAgICAgICAgICAgIHBhdGgucmVzb2x2ZSh0aGlzLnNka1Jvb3QsIFwidG9vbHNcIiwgYmluYXJ5TmFtZSldO1xuICAvLyBnZXQgc3VicGF0aHMgZm9yIGN1cnJlbnRseSBpbnN0YWxsZWQgYnVpbGQgdG9vbCBkaXJlY3Rvcmllc1xuICBsZXQgYnVpbGRUb29sRGlycyA9IFtdO1xuICBidWlsZFRvb2xEaXJzID0gYXdhaXQgZ2V0RGlyZWN0b3JpZXMocGF0aC5yZXNvbHZlKHRoaXMuc2RrUm9vdCwgXCJidWlsZC10b29sc1wiKSk7XG4gIGZvciAobGV0IHZlcnNpb25EaXIgb2YgYnVpbGRUb29sRGlycykge1xuICAgIGJpbmFyeUxvY3MucHVzaChwYXRoLnJlc29sdmUodGhpcy5zZGtSb290LCBcImJ1aWxkLXRvb2xzXCIsIHZlcnNpb25EaXIsIGJpbmFyeU5hbWUpKTtcbiAgfVxuICBmb3IgKGxldCBsb2Mgb2YgYmluYXJ5TG9jcykge1xuICAgIGxldCBmbGFnID0gYXdhaXQgZnMuZXhpc3RzKGxvYyk7XG4gICAgaWYgKGZsYWcpIHtcbiAgICAgIGJpbmFyeUxvYyA9IGxvYztcbiAgICB9XG4gIH1cbiAgaWYgKGJpbmFyeUxvYyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgJHtiaW5hcnlOYW1lfSBpbiB0b29scywgcGxhdGZvcm0tdG9vbHMsIGAgK1xuICAgICAgICAgICAgICAgICAgICBgb3Igc3VwcG9ydGVkIGJ1aWxkLXRvb2xzIHVuZGVyICR7dGhpcy5zZGtSb290fSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGRvIHlvdSBoYXZlIHRoZSBBbmRyb2lkIFNESyBpbnN0YWxsZWQgYXQgdGhpcyBsb2NhdGlvbj9gKTtcbiAgfVxuICBiaW5hcnlMb2MgPSBiaW5hcnlMb2MudHJpbSgpO1xuICBsb2cuaW5mbyhgVXNpbmcgJHtiaW5hcnlOYW1lfSBmcm9tICR7YmluYXJ5TG9jfWApO1xuICByZXR1cm4gYmluYXJ5TG9jO1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0QmluYXJ5RnJvbVBhdGggPSBhc3luYyBmdW5jdGlvbiAoYmluYXJ5TmFtZSkge1xuICBsZXQgYmluYXJ5TG9jID0gbnVsbDtcbiAgbGV0IGNtZCA9IHRoaXMuZ2V0Q29tbWFuZEZvck9TKCk7XG4gIHRyeSB7XG4gICAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYyhjbWQsIFtiaW5hcnlOYW1lXSk7XG4gICAgbG9nLmluZm8oYFVzaW5nICR7YmluYXJ5TmFtZX0gZnJvbSAke3N0ZG91dH1gKTtcbiAgICAvLyBUT0RPIHdyaXRlIGEgdGVzdCBmb3IgYmluYXJpZXMgd2l0aCBzcGFjZXMuXG4gICAgYmluYXJ5TG9jID0gc3Rkb3V0LnRyaW0oKTtcbiAgICByZXR1cm4gYmluYXJ5TG9jO1xuICB9IGNhdGNoKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGZpbmQgJHtiaW5hcnlOYW1lfSBQbGVhc2Ugc2V0IHRoZSBBTkRST0lEX0hPTUUgYCArXG4gICAgICAgICAgICAgIGBlbnZpcm9ubWVudCB2YXJpYWJsZSB3aXRoIHRoZSBBbmRyb2lkIFNESyByb290IGRpcmVjdG9yeSBwYXRoLmApO1xuICB9XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRDb25uZWN0ZWREZXZpY2VzID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsb2cuZGVidWcoXCJHZXR0aW5nIGNvbm5lY3RlZCBkZXZpY2VzLi4uXCIpO1xuICB0cnkge1xuICAgIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWModGhpcy5leGVjdXRhYmxlLnBhdGgsIFsnZGV2aWNlcyddKTtcbiAgICAvLyBleHBlY3RpbmcgYWRiIGRldmljZXMgdG8gcmV0dXJuIG91dHB1dCBhc1xuICAgIC8vIExpc3Qgb2YgZGV2aWNlcyBhdHRhY2hlZFxuICAgIC8vIGVtdWxhdG9yLTU1NTRcdGRldmljZVxuICAgIGxldCBzdGFydGluZ0luZGV4ID0gc3Rkb3V0LmluZGV4T2YoXCJMaXN0IG9mIGRldmljZXNcIik7XG4gICAgaWYgKHN0YXJ0aW5nSW5kZXggPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgb3V0cHV0IHdoaWxlIHRyeWluZyB0byBnZXQgZGV2aWNlcy4gb3V0cHV0IHdhczogJHtzdGRvdXR9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNsaWNpbmcgb3VwdXQgd2UgY2FyZSBhYm91dC5cbiAgICAgIHN0ZG91dCA9IHN0ZG91dC5zbGljZShzdGFydGluZ0luZGV4KTtcbiAgICAgIGxldCBkZXZpY2VzID0gW107XG4gICAgICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdChcIlxcblwiKSkge1xuICAgICAgICBpZiAobGluZS50cmltKCkgIT09IFwiXCIgJiZcbiAgICAgICAgICAgIGxpbmUuaW5kZXhPZihcIkxpc3Qgb2YgZGV2aWNlc1wiKSA9PT0gLTEgJiZcbiAgICAgICAgICAgIGxpbmUuaW5kZXhPZihcIiogZGFlbW9uXCIpID09PSAtMSAmJlxuICAgICAgICAgICAgbGluZS5pbmRleE9mKFwib2ZmbGluZVwiKSA9PT0gLTEpIHtcbiAgICAgICAgICBsZXQgbGluZUluZm8gPSBsaW5lLnNwbGl0KFwiXFx0XCIpO1xuICAgICAgICAgIC8vIHN0YXRlIGlzIGVpdGhlciBcImRldmljZVwiIG9yIFwib2ZmbGluZVwiLCBhZmFpY3RcbiAgICAgICAgICBkZXZpY2VzLnB1c2goe3VkaWQ6IGxpbmVJbmZvWzBdLCBzdGF0ZTogbGluZUluZm9bMV19KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbG9nLmRlYnVnKGAke2RldmljZXMubGVuZ3RofSBkZXZpY2UocykgY29ubmVjdGVkYCk7XG4gICAgICByZXR1cm4gZGV2aWNlcztcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3Igd2hpbGUgZ2V0dGluZyBjb25uZWN0ZWQgZGV2aWNlcy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICB9XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXREZXZpY2VzV2l0aFJldHJ5ID0gYXN5bmMgZnVuY3Rpb24gKHRpbWVvdXRNcyA9IDIwMDAwKSB7XG4gIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gIGxvZy5kZWJ1ZyhcIlRyeWluZyB0byBmaW5kIGEgY29ubmVjdGVkIGFuZHJvaWQgZGV2aWNlXCIpO1xuICBsZXQgZ2V0RGV2aWNlcyA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoKERhdGUubm93KCkgLSBzdGFydCkgPiB0aW1lb3V0TXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGEgY29ubmVjdGVkIEFuZHJvaWQgZGV2aWNlLlwiKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGxldCBkZXZpY2VzID0gYXdhaXQgdGhpcy5nZXRDb25uZWN0ZWREZXZpY2VzKCk7XG4gICAgICBpZiAoZGV2aWNlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIGxvZy5kZWJ1ZyhcIkNvdWxkIG5vdCBmaW5kIGRldmljZXMsIHJlc3RhcnRpbmcgYWRiIHNlcnZlci4uLlwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZXN0YXJ0QWRiKCk7XG4gICAgICAgIC8vIGNvb2wgZG93blxuICAgICAgICBhd2FpdCBzbGVlcCgyMDApO1xuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0RGV2aWNlcygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRldmljZXM7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nLmRlYnVnKFwiQ291bGQgbm90IGZpbmQgZGV2aWNlcywgcmVzdGFydGluZyBhZGIgc2VydmVyLi4uXCIpO1xuICAgICAgYXdhaXQgdGhpcy5yZXN0YXJ0QWRiKCk7XG4gICAgICAvLyBjb29sIGRvd25cbiAgICAgIGF3YWl0IHNsZWVwKDIwMCk7XG4gICAgICByZXR1cm4gYXdhaXQgZ2V0RGV2aWNlcygpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGF3YWl0IGdldERldmljZXMoKTtcbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLnJlc3RhcnRBZGIgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5zdXBwcmVzc0tpbGxTZXJ2ZXIpIHtcbiAgICBsb2cuZGVidWcoJ1Jlc3RhcnRpbmcgYWRiJyk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGV4ZWModGhpcy5leGVjdXRhYmxlLnBhdGgsIFsna2lsbC1zZXJ2ZXInXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nLmVycm9yKFwiRXJyb3Iga2lsbGluZyBBREIgc2VydmVyLCBnb2luZyB0byBzZWUgaWYgaXQncyBvbmxpbmUgYW55d2F5XCIpO1xuICAgIH1cbiAgfVxufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuYWRiRXhlYyA9IGFzeW5jIGZ1bmN0aW9uIChjbWQsIG9wdHMgPSB7fSkge1xuICBpZiAoIWNtZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBuZWVkIHRvIHBhc3MgaW4gYSBjb21tYW5kIHRvIGFkYkV4ZWMoKVwiKTtcbiAgfVxuICAvLyBzZXR0aW5nIGRlZmF1bHQgdGltZW91dCBmb3IgZWFjaCBjb21tYW5kIHRvIHByZXZlbnQgaW5maW5pdGUgd2FpdC5cbiAgb3B0cy50aW1lb3V0ID0gb3B0cy50aW1lb3V0IHx8IERFRkFVTFRfQURCX0VYRUNfVElNRU9VVDtcbiAgbGV0IGV4ZWNGdW5jID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIShjbWQgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgY21kID0gW2NtZF07XG4gICAgICB9XG4gICAgICBsZXQgYXJncyA9IHRoaXMuZXhlY3V0YWJsZS5kZWZhdWx0QXJncy5jb25jYXQoY21kKTtcbiAgICAgIGxvZy5kZWJ1ZyhgUnVubmluZyAke3RoaXMuZXhlY3V0YWJsZS5wYXRofSB3aXRoIGFyZ3M6IGAgK1xuICAgICAgICAgICAgICAgIGAke0pTT04uc3RyaW5naWZ5KGFyZ3MpfWApO1xuICAgICAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYyh0aGlzLmV4ZWN1dGFibGUucGF0aCwgYXJncywgb3B0cyk7XG4gICAgICAvLyBzb21ldGltZXMgQURCIHByaW50cyBvdXQgc3R1cGlkIHN0ZG91dCB3YXJuaW5ncyB0aGF0IHdlIGRvbid0IHdhbnRcbiAgICAgIC8vIHRvIGluY2x1ZGUgaW4gYW55IG9mIHRoZSByZXNwb25zZSBkYXRhLCBzbyBsZXQncyBzdHJpcCBpdCBvdXRcbiAgICAgIGxldCBsaW5rZXJXYXJuaW5nUmUgPSAvXldBUk5JTkc6IGxpbmtlci4rJC9tO1xuICAgICAgc3Rkb3V0ID0gc3Rkb3V0LnJlcGxhY2UobGlua2VyV2FybmluZ1JlLCAnJykudHJpbSgpO1xuICAgICAgcmV0dXJuIHN0ZG91dDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsZXQgcHJvdG9jb2xGYXVsdEVycm9yID0gbmV3IFJlZ0V4cChcInByb3RvY29sIGZhdWx0IFxcXFwobm8gc3RhdHVzXFxcXClcIiwgXCJpXCIpLnRlc3QoZSk7XG4gICAgICBsZXQgZGV2aWNlTm90Rm91bmRFcnJvciA9IG5ldyBSZWdFeHAoXCJlcnJvcjogZGV2aWNlIG5vdCBmb3VuZFwiLCBcImlcIikudGVzdChlKTtcbiAgICAgIGlmIChwcm90b2NvbEZhdWx0RXJyb3IgfHwgZGV2aWNlTm90Rm91bmRFcnJvcikge1xuICAgICAgICBsb2cuaW5mbyhgZXJyb3Igc2VuZGluZyBjb21tYW5kLCByZWNvbm5lY3RpbmcgZGV2aWNlIGFuZCByZXRyeWluZzogJHtjbWR9YCk7XG4gICAgICAgIGF3YWl0IHNsZWVwKDEwMDApO1xuICAgICAgICBhd2FpdCB0aGlzLmdldERldmljZXNXaXRoUmV0cnkoKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3IgZXhlY3V0aW5nIGFkYkV4ZWMuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gICtcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGUpKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBhd2FpdCByZXRyeSgyLCBleGVjRnVuYyk7XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5zaGVsbCA9IGFzeW5jIGZ1bmN0aW9uIChjbWQsIG9wdHMgPSB7fSkge1xuICBpZiAoIWF3YWl0IHRoaXMuaXNEZXZpY2VDb25uZWN0ZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gZGV2aWNlIGNvbm5lY3RlZCwgY2Fubm90IHJ1biBhZGIgc2hlbGwgY29tbWFuZCBcIiR7Y21kLmpvaW4oJyAnKX1cImApO1xuICB9XG4gIGxldCBleGVjQ21kID0gWydzaGVsbCddO1xuICBpZiAoY21kIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBleGVjQ21kID0gZXhlY0NtZC5jb25jYXQoY21kKTtcbiAgfSBlbHNlIHtcbiAgICBleGVjQ21kLnB1c2goY21kKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgdGhpcy5hZGJFeGVjKGV4ZWNDbWQsIG9wdHMpO1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuY3JlYXRlU3ViUHJvY2VzcyA9IGZ1bmN0aW9uIChhcmdzID0gW10pIHtcbiAgLy8gYWRkIHRoZSBkZWZhdWx0IGFyZ3VtZW50c1xuICBhcmdzID0gdGhpcy5leGVjdXRhYmxlLmRlZmF1bHRBcmdzLmNvbmNhdChhcmdzKTtcbiAgbG9nLmRlYnVnKGBDcmVhdGluZyBBREIgc3VicHJvY2VzcyB3aXRoIGFyZ3M6ICR7YXJncy5qb2luKCcsICcpfWApO1xuICByZXR1cm4gbmV3IFN1YlByb2Nlc3ModGhpcy5nZXRBZGJQYXRoKCksIGFyZ3MpO1xufTtcblxuLy8gVE9ETyBjYW4gcHJvYmFibHkgZGVwcmVjYXRlIHRoaXMgbm93IHRoYXQgdGhlIGxvZ2ljIGlzIGp1c3QgdG8gcmVhZFxuLy8gdGhpcy5hZGJQb3J0XG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRBZGJTZXJ2ZXJQb3J0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5hZGJQb3J0O1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0RW11bGF0b3JQb3J0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsb2cuZGVidWcoXCJHZXR0aW5nIHJ1bm5pbmcgZW11bGF0b3IgcG9ydFwiKTtcbiAgaWYgKHRoaXMuZW11bGF0b3JQb3J0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHRoaXMuZW11bGF0b3JQb3J0O1xuICB9XG4gIHRyeSB7XG4gICAgbGV0IGRldmljZXMgPSBhd2FpdCB0aGlzLmdldENvbm5lY3RlZERldmljZXMoKTtcbiAgICBsZXQgcG9ydCA9IHRoaXMuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyhkZXZpY2VzWzBdLnVkaWQpO1xuICAgIGlmIChwb3J0KSB7XG4gICAgICByZXR1cm4gcG9ydDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFbXVsYXRvciBwb3J0IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBObyBkZXZpY2VzIGNvbm5lY3RlZC4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICB9XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRQb3J0RnJvbUVtdWxhdG9yU3RyaW5nID0gZnVuY3Rpb24gKGVtU3RyKSB7XG4gIGxldCBwb3J0UGF0dGVybiA9IC9lbXVsYXRvci0oXFxkKykvO1xuICBpZiAocG9ydFBhdHRlcm4udGVzdChlbVN0cikpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQocG9ydFBhdHRlcm4uZXhlYyhlbVN0cilbMV0sIDEwKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRDb25uZWN0ZWRFbXVsYXRvcnMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgbG9nLmRlYnVnKFwiR2V0dGluZyBjb25uZWN0ZWQgZW11bGF0b3JzXCIpO1xuICAgIGxldCBkZXZpY2VzID0gYXdhaXQgdGhpcy5nZXRDb25uZWN0ZWREZXZpY2VzKCk7XG4gICAgbGV0IGVtdWxhdG9ycyA9IFtdO1xuICAgIGZvciAobGV0IGRldmljZSBvZiBkZXZpY2VzKSB7XG4gICAgICBsZXQgcG9ydCA9IHRoaXMuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyhkZXZpY2UudWRpZCk7XG4gICAgICBpZiAocG9ydCkge1xuICAgICAgICBkZXZpY2UucG9ydCA9IHBvcnQ7XG4gICAgICAgIGVtdWxhdG9ycy5wdXNoKGRldmljZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZy5kZWJ1ZyhgJHtlbXVsYXRvcnMubGVuZ3RofSBlbXVsYXRvcihzKSBjb25uZWN0ZWRgKTtcbiAgICByZXR1cm4gZW11bGF0b3JzO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgZW11bGF0b3JzLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLnNldEVtdWxhdG9yUG9ydCA9IGZ1bmN0aW9uIChlbVBvcnQpIHtcbiAgdGhpcy5lbXVsYXRvclBvcnQgPSBlbVBvcnQ7XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5zZXREZXZpY2VJZCA9IGZ1bmN0aW9uIChkZXZpY2VJZCkge1xuICBsb2cuZGVidWcoYFNldHRpbmcgZGV2aWNlIGlkIHRvICR7ZGV2aWNlSWR9YCk7XG4gIHRoaXMuY3VyRGV2aWNlSWQgPSBkZXZpY2VJZDtcbiAgbGV0IGFyZ3NIYXNEZXZpY2UgPSB0aGlzLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3MuaW5kZXhPZignLXMnKTtcbiAgaWYgKGFyZ3NIYXNEZXZpY2UgIT09IC0xKSB7XG4gICAgLy8gcmVtb3ZlIHRoZSBvbGQgZGV2aWNlIGlkIGZyb20gdGhlIGFyZ3VtZW50c1xuICAgIHRoaXMuZXhlY3V0YWJsZS5kZWZhdWx0QXJncy5zcGxpY2UoYXJnc0hhc0RldmljZSwgMik7XG4gIH1cbiAgdGhpcy5leGVjdXRhYmxlLmRlZmF1bHRBcmdzLnB1c2goJy1zJywgZGV2aWNlSWQpO1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuc2V0RGV2aWNlID0gZnVuY3Rpb24gKGRldmljZU9iaikge1xuICBsZXQgZGV2aWNlSWQgPSBkZXZpY2VPYmoudWRpZDtcbiAgbGV0IGVtUG9ydCA9IHRoaXMuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyhkZXZpY2VJZCk7XG4gIHRoaXMuc2V0RW11bGF0b3JQb3J0KGVtUG9ydCk7XG4gIHRoaXMuc2V0RGV2aWNlSWQoZGV2aWNlSWQpO1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0UnVubmluZ0FWRCA9IGFzeW5jIGZ1bmN0aW9uIChhdmROYW1lKSB7XG4gIHRyeSB7XG4gICAgbG9nLmRlYnVnKGBUcnlpbmcgdG8gZmluZCAke2F2ZE5hbWV9IGVtdWxhdG9yYCk7XG4gICAgbGV0IGVtdWxhdG9ycyA9IGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGVkRW11bGF0b3JzKCk7XG4gICAgZm9yIChsZXQgZW11bGF0b3Igb2YgZW11bGF0b3JzKSB7XG4gICAgICB0aGlzLnNldEVtdWxhdG9yUG9ydChlbXVsYXRvci5wb3J0KTtcbiAgICAgIGxldCBydW5uaW5nQVZETmFtZSA9IGF3YWl0IHRoaXMuc2VuZFRlbG5ldENvbW1hbmQoXCJhdmQgbmFtZVwiKTtcbiAgICAgIGlmIChhdmROYW1lID09PSBydW5uaW5nQVZETmFtZSkge1xuICAgICAgICBsb2cuZGVidWcoYEZvdW5kIGVtdWxhdG9yICR7YXZkTmFtZX0gaW4gcG9ydCAke2VtdWxhdG9yLnBvcnR9YCk7XG4gICAgICAgIHRoaXMuc2V0RGV2aWNlSWQoZW11bGF0b3IudWRpZCk7XG4gICAgICAgIHJldHVybiBlbXVsYXRvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nLmRlYnVnKGBFbXVsYXRvciAke2F2ZE5hbWV9IG5vdCBydW5uaW5nYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgZ2V0dGluZyBBVkQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0UnVubmluZ0FWRFdpdGhSZXRyeSA9IGFzeW5jIGZ1bmN0aW9uIChhdmROYW1lLCB0aW1lb3V0TXMgPSAyMDAwMCkge1xuICB0cnkge1xuICAgIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgd2hpbGUgKChEYXRlLm5vdygpIC0gc3RhcnQpIDwgdGltZW91dE1zKSB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgcnVubmluZ0FWRCA9IGF3YWl0IHRoaXMuZ2V0UnVubmluZ0FWRChhdmROYW1lLnJlcGxhY2UoJ0AnLCAnJykpO1xuICAgICAgICBpZiAocnVubmluZ0FWRCkge1xuICAgICAgICAgIHJldHVybiBydW5uaW5nQVZEO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIERvIG5vdGhpbmcuXG4gICAgICAgIGxvZy5pbmZvKGBDb3VsZG4ndCBnZXQgcnVubmluZyBBVkQsIHdpbGwgcmV0cnkuIEVycm9yIHdhczogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgICAvLyBjb29sIGRvd25cbiAgICAgIGF3YWl0IHNsZWVwKDIwMCk7XG4gICAgfVxuICAgIGxvZy5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgZmluZCAke2F2ZE5hbWV9IGVtdWxhdG9yLmApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgQVZEIHdpdGggcmV0cnkuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMua2lsbEFsbEVtdWxhdG9ycyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGNtZCwgYXJncztcbiAgaWYgKHN5c3RlbS5pc1dpbmRvd3MoKSkge1xuICAgIGNtZCA9ICdUQVNLS0lMTCc7XG4gICAgYXJncyA9IFsnVEFTS0tJTEwnICwnL0lNJywgJ2VtdWxhdG9yLmV4ZSddO1xuICB9IGVsc2Uge1xuICAgIGNtZCA9ICcvdXNyL2Jpbi9raWxsYWxsJztcbiAgICBhcmdzID0gWyctbScsICdlbXVsYXRvcionXTtcbiAgfVxuICB0cnkge1xuICAgIGF3YWl0IGV4ZWMoY21kLCBhcmdzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBraWxsaW5nIGVtdWxhdG9ycy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICB9XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5sYXVuY2hBVkQgPSBhc3luYyBmdW5jdGlvbiAoYXZkTmFtZSwgYXZkQXJncywgbGFuZ3VhZ2UsIGNvdW50cnksXG4gIGF2ZExhdW5jaFRpbWVvdXQgPSA2MDAwMCwgYXZkUmVhZHlUaW1lb3V0ID0gNjAwMDAsIHJldHJ5VGltZXMgPSAxKSB7XG4gIGxvZy5kZWJ1ZyhgTGF1bmNoaW5nIEVtdWxhdG9yIHdpdGggQVZEICR7YXZkTmFtZX0sIGxhdW5jaFRpbWVvdXRgICtcbiAgICAgICAgICAgIGAke2F2ZExhdW5jaFRpbWVvdXR9IG1zIGFuZCByZWFkeVRpbWVvdXQgJHthdmRSZWFkeVRpbWVvdXR9IG1zYCk7XG4gIGxldCBlbXVsYXRvckJpbmFyeVBhdGggPSBhd2FpdCB0aGlzLmdldFNka0JpbmFyeVBhdGgoXCJlbXVsYXRvclwiKTtcbiAgaWYgKGF2ZE5hbWVbMF0gPT09IFwiQFwiKSB7XG4gICAgYXZkTmFtZSA9IGF2ZE5hbWUuc3Vic3RyKDEpO1xuICB9XG4gIGxldCBsYXVuY2hBcmdzID0gW1wiLWF2ZFwiLCBhdmROYW1lXTtcbiAgaWYgKHR5cGVvZiBsYW5ndWFnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGxvZy5kZWJ1ZyhgU2V0dGluZyBBbmRyb2lkIERldmljZSBMYW5ndWFnZSB0byAke2xhbmd1YWdlfWApO1xuICAgIGxhdW5jaEFyZ3MucHVzaChcIi1wcm9wXCIsIGBwZXJzaXN0LnN5cy5sYW5ndWFnZT0ke2xhbmd1YWdlLnRvTG93ZXJDYXNlKCl9YCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjb3VudHJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgbG9nLmRlYnVnKGBTZXR0aW5nIEFuZHJvaWQgRGV2aWNlIENvdW50cnkgdG8gJHtjb3VudHJ5fWApO1xuICAgIGxhdW5jaEFyZ3MucHVzaChcIi1wcm9wXCIsIGBwZXJzaXN0LnN5cy5jb3VudHJ5PSR7Y291bnRyeS50b1VwcGVyQ2FzZSgpfWApO1xuICB9XG4gIGxldCBsb2NhbGU7XG4gIGlmICh0eXBlb2YgbGFuZ3VhZ2UgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGNvdW50cnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICBsb2NhbGUgPSBsYW5ndWFnZS50b0xvd2VyQ2FzZSgpICsgXCItXCIgKyBjb3VudHJ5LnRvVXBwZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGxhbmd1YWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgbG9jYWxlID0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY291bnRyeSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGxvY2FsZSA9IGNvdW50cnk7XG4gIH1cbiAgaWYgKHR5cGVvZiBsb2NhbGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBsb2cuZGVidWcoYFNldHRpbmcgQW5kcm9pZCBEZXZpY2UgTG9jYWxlIHRvICR7bG9jYWxlfWApO1xuICAgIGxhdW5jaEFyZ3MucHVzaChcIi1wcm9wXCIsIGBwZXJzaXN0LnN5cy5sb2NhbGU9JHtsb2NhbGV9YCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBhdmRBcmdzID09PSBcInN0cmluZ1wiKSB7XG4gICAgYXZkQXJncyA9IGF2ZEFyZ3Muc3BsaXQoXCIgXCIpO1xuICAgIGxhdW5jaEFyZ3MgPSBsYXVuY2hBcmdzLmNvbmNhdChhdmRBcmdzKTtcbiAgfVxuICBsZXQgcHJvYyA9IG5ldyBTdWJQcm9jZXNzKGVtdWxhdG9yQmluYXJ5UGF0aCwgbGF1bmNoQXJncyk7XG4gIGF3YWl0IHByb2Muc3RhcnQoMCk7XG4gIHByb2Mub24oJ291dHB1dCcsIChzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgIGxvZy5pbmZvKGBbQVZEIE9VVFBVVF0gJHtzdGRvdXQgfHwgc3RkZXJyfWApO1xuICB9KTtcbiAgYXdhaXQgcmV0cnkocmV0cnlUaW1lcywgdGhpcy5nZXRSdW5uaW5nQVZEV2l0aFJldHJ5LmJpbmQodGhpcyksIGF2ZE5hbWUsIGF2ZExhdW5jaFRpbWVvdXQpO1xuICBhd2FpdCB0aGlzLndhaXRGb3JFbXVsYXRvclJlYWR5KGF2ZFJlYWR5VGltZW91dCk7XG4gIHJldHVybiBwcm9jO1xufTtcblxuc3lzdGVtQ2FsbE1ldGhvZHMud2FpdEZvckVtdWxhdG9yUmVhZHkgPSBhc3luYyBmdW5jdGlvbiAodGltZW91dE1zID0gNjAwMDApIHtcbiAgbGV0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgbG9nLmRlYnVnKFwiV2FpdGluZyB1bnRpbCBlbXVsYXRvciBpcyByZWFkeVwiKTtcbiAgd2hpbGUgKChEYXRlLm5vdygpIC0gc3RhcnQpIDwgdGltZW91dE1zKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFtcImdldHByb3BcIiwgXCJpbml0LnN2Yy5ib290YW5pbVwiXSk7XG4gICAgICBpZiAoc3Rkb3V0LmluZGV4T2YoJ3N0b3BwZWQnKSA+IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICAgIGF3YWl0IHNsZWVwKDMwMDApO1xuICB9XG4gIGxvZy5lcnJvckFuZFRocm93KCdFbXVsYXRvciBub3QgcmVhZHknKTtcbn07XG5cbnN5c3RlbUNhbGxNZXRob2RzLndhaXRGb3JEZXZpY2UgPSBhc3luYyBmdW5jdGlvbiAoYXBwRGV2aWNlUmVhZHlUaW1lb3V0ID0gNjApIHtcbiAgdGhpcy5hcHBEZXZpY2VSZWFkeVRpbWVvdXQgPSBhcHBEZXZpY2VSZWFkeVRpbWVvdXQ7XG4gIGNvbnN0IHJldHJpZXMgPSAzO1xuICBjb25zdCB0aW1lb3V0ID0gcGFyc2VJbnQodGhpcy5hcHBEZXZpY2VSZWFkeVRpbWVvdXQsIDEwKSAvIHJldHJpZXMgKiAxMDAwO1xuICBhd2FpdCByZXRyeShyZXRyaWVzLCBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuYWRiRXhlYygnd2FpdC1mb3ItZGV2aWNlJywge3RpbWVvdXR9KTtcbiAgICAgIGF3YWl0IHRoaXMucGluZygpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGF3YWl0IHRoaXMucmVzdGFydEFkYigpO1xuICAgICAgYXdhaXQgdGhpcy5nZXRDb25uZWN0ZWREZXZpY2VzKCk7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgaW4gd2FpdGluZyBmb3IgZGV2aWNlLiBPcmlnaW5hbCBlcnJvcjogJyR7ZS5tZXNzYWdlfScuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIGBSZXRyeWluZyBieSByZXN0YXJ0aW5nIEFEQmApO1xuICAgIH1cbiAgfSk7XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5yZWJvb3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGF3YWl0IHRoaXMuc2hlbGwoWydzdG9wJ10pO1xuICBhd2FpdCBCLmRlbGF5KDIwMDApOyAvLyBsZXQgdGhlIGVtdSBmaW5pc2ggc3RvcHBpbmc7XG4gIGF3YWl0IHRoaXMuc2V0RGV2aWNlUHJvcGVydHkoJ3N5cy5ib290X2NvbXBsZXRlZCcsIDApO1xuICBhd2FpdCB0aGlzLnNoZWxsKFsnc3RhcnQnXSk7XG4gIGF3YWl0IHJldHJ5SW50ZXJ2YWwoMTgwLCAxMDAwLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGJvb3RlZCA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlUHJvcGVydHkoJ3N5cy5ib290X2NvbXBsZXRlZCcpO1xuICAgIGlmIChib290ZWQgPT09ICcxJykge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuZXJyb3JBbmR0aHJvdygnV2FpdGluZyBmb3IgcmVib290IHRoaXMgdGFrZXMgdGltZScpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5maWxlRXhpc3RzID0gYXN5bmMgZnVuY3Rpb24gKHJlbW90ZVBhdGgpIHtcbiAgbGV0IGZpbGVzID0gYXdhaXQgdGhpcy5scyhyZW1vdGVQYXRoKTtcbiAgcmV0dXJuIGZpbGVzLmxlbmd0aCA+IDA7XG59O1xuXG5zeXN0ZW1DYWxsTWV0aG9kcy5scyA9IGFzeW5jIGZ1bmN0aW9uIChyZW1vdGVQYXRoKSB7XG4gIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFsnbHMnLCByZW1vdGVQYXRoXSk7XG4gIGxldCBsaW5lcyA9IHN0ZG91dC5zcGxpdChcIlxcblwiKTtcbiAgcmV0dXJuIGxpbmVzLm1hcChsID0+IGwudHJpbSgpKVxuICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgIC5maWx0ZXIobCA9PiBsLmluZGV4T2YoXCJObyBzdWNoIGZpbGVcIikgPT09IC0xKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHN5c3RlbUNhbGxNZXRob2RzO1xuIl19