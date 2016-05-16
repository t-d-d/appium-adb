'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersJs = require('../helpers.js');

var _teen_process = require('teen_process');

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _asyncbox = require('asyncbox');

var _appiumSupport = require('appium-support');

var apkUtilsMethods = {};

apkUtilsMethods.isAppInstalled = function callee$0$0(pkg) {
  var installed, apiLevel, thirdparty, stdout, apkInstalledRgx;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        installed = false;

        _loggerJs2['default'].debug('Getting install status for ' + pkg);
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 5:
        apiLevel = context$1$0.sent;
        thirdparty = apiLevel >= 15 ? "-3" : "";
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'list', 'packages', thirdparty, pkg]));

      case 9:
        stdout = context$1$0.sent;
        apkInstalledRgx = new RegExp('^package:' + pkg.replace(/(\.)/g, "\\$1") + '$', 'm');

        installed = apkInstalledRgx.test(stdout);
        _loggerJs2['default'].debug('App is ' + (!installed ? " not" : "") + ' installed');
        return context$1$0.abrupt('return', installed);

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error finding if app is installed. Original error: ' + context$1$0.t0.message);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 16]]);
};

apkUtilsMethods.startUri = function callee$0$0(uri, pkg) {
  var args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!uri || !pkg) {
          _loggerJs2['default'].errorAndThrow("URI and package arguments are required");
        }
        context$1$0.prev = 1;
        args = ["am", "start", "-W", "-a", "android.intent.action.VIEW", "-d", uri, pkg];
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell(args));

      case 5:
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error attempting to start URI. Original error: ' + context$1$0.t0);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
};

apkUtilsMethods.startApp = function callee$0$0() {
  var startAppOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var apiLevel, cmd, stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        if (!startAppOptions.activity || !startAppOptions.pkg) {
          _loggerJs2['default'].errorAndThrow("activity and pkg is required for launching application");
        }
        startAppOptions = _lodash2['default'].clone(startAppOptions);
        // initializing defaults
        _lodash2['default'].defaults(startAppOptions, {
          waitPkg: startAppOptions.pkg,
          waitActivity: false,
          retry: true,
          stopApp: true
        });
        // preventing null waitpkg
        startAppOptions.waitPkg = startAppOptions.waitPkg || startAppOptions.pkg;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 7:
        apiLevel = context$1$0.sent;
        cmd = (0, _helpersJs.buildStartCmd)(startAppOptions, apiLevel);
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.shell(cmd));

      case 11:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf("Error: Activity class") !== -1 && stdout.indexOf("does not exist") !== -1)) {
          context$1$0.next = 23;
          break;
        }

        if (!(startAppOptions.retry && startAppOptions.activity[0] !== ".")) {
          context$1$0.next = 20;
          break;
        }

        _loggerJs2['default'].debug("We tried to start an activity that doesn't exist, " + "retrying with . prepended to activity");
        startAppOptions.activity = '.' + startAppOptions.activity;
        startAppOptions.retry = false;
        return context$1$0.abrupt('return', this.startApp(startAppOptions));

      case 20:
        _loggerJs2['default'].errorAndThrow("Activity used to start app doesn't exist or cannot be " + "launched! Make sure it exists and is a launchable activity");

      case 21:
        context$1$0.next = 24;
        break;

      case 23:
        if (stdout.indexOf("java.lang.SecurityException") !== -1) {
          // if the app is disabled on a real device it will throw a security exception
          _loggerJs2['default'].errorAndThrow("Permission to start activity denied.");
        }

      case 24:
        if (!startAppOptions.waitActivity) {
          context$1$0.next = 27;
          break;
        }

        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(this.waitForActivity(startAppOptions.waitPkg, startAppOptions.waitActivity, startAppOptions.waitDuration));

      case 27:
        context$1$0.next = 32;
        break;

      case 29:
        context$1$0.prev = 29;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error occured while starting App. Original error: ' + context$1$0.t0.message);

      case 32:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 29]]);
};

apkUtilsMethods.getFocusedPackageAndActivity = function callee$0$0() {
  var cmd, nullRe, searchRe, stdout, foundNullMatch, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, foundMatch;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Getting focused package and activity");
        cmd = ['dumpsys', 'window', 'windows'];
        nullRe = new RegExp(/mFocusedApp=null/);
        searchRe = new RegExp('mFocusedApp.+Record\\{.*\\s([^\\s\\/\\}]+)' + '\\/([^\\s\\/\\}\\,]+)\\,?(\\s[^\\s\\/\\}]+)*\\}');
        context$1$0.prev = 4;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.shell(cmd));

      case 7:
        stdout = context$1$0.sent;
        foundNullMatch = false;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 12;
        _iterator = _getIterator(stdout.split("\n"));

      case 14:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 25;
          break;
        }

        line = _step.value;
        foundMatch = searchRe.exec(line);

        if (!foundMatch) {
          context$1$0.next = 21;
          break;
        }

        return context$1$0.abrupt('return', { appPackage: foundMatch[1].trim(), appActivity: foundMatch[2].trim() });

      case 21:
        if (nullRe.test(line)) {
          foundNullMatch = true;
        }

      case 22:
        _iteratorNormalCompletion = true;
        context$1$0.next = 14;
        break;

      case 25:
        context$1$0.next = 31;
        break;

      case 27:
        context$1$0.prev = 27;
        context$1$0.t0 = context$1$0['catch'](12);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 31:
        context$1$0.prev = 31;
        context$1$0.prev = 32;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 34:
        context$1$0.prev = 34;

        if (!_didIteratorError) {
          context$1$0.next = 37;
          break;
        }

        throw _iteratorError;

      case 37:
        return context$1$0.finish(34);

      case 38:
        return context$1$0.finish(31);

      case 39:
        if (!foundNullMatch) {
          context$1$0.next = 43;
          break;
        }

        return context$1$0.abrupt('return', { appPackage: null, appActivity: null });

      case 43:
        _loggerJs2['default'].errorAndThrow("Could not parse activity from dumpsys");

      case 44:
        context$1$0.next = 49;
        break;

      case 46:
        context$1$0.prev = 46;
        context$1$0.t1 = context$1$0['catch'](4);

        _loggerJs2['default'].errorAndThrow('Could not get focusPackageAndActivity. Original error: ' + context$1$0.t1.message);

      case 49:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 46], [12, 27, 31, 39], [32,, 34, 38]]);
};

apkUtilsMethods.waitForActivityOrNot = function callee$0$0(pkg, activity, not) {
  var waitMs = arguments.length <= 3 || arguments[3] === undefined ? 20000 : arguments[3];

  var endAt, possibleActivityNames, allActivities, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, oneActivity, _loop, _ret, activityMessage;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(!pkg || !activity)) {
          context$1$0.next = 2;
          break;
        }

        throw new Error("Package and activity required.");

      case 2:
        _loggerJs2['default'].debug('Waiting for pkg: \'' + pkg + '\' and activity: \'' + activity + '\'' + ((not ? ' not' : '') + ' to be focused'));
        endAt = Date.now() + waitMs;
        possibleActivityNames = [];
        allActivities = activity.split(",");
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 9;

        for (_iterator2 = _getIterator(allActivities); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          oneActivity = _step2.value;

          oneActivity = oneActivity.trim();
          possibleActivityNames.push.apply(possibleActivityNames, _toConsumableArray((0, _helpersJs.getPossibleActivityNames)(pkg, oneActivity)));
        }
        context$1$0.next = 17;
        break;

      case 13:
        context$1$0.prev = 13;
        context$1$0.t0 = context$1$0['catch'](9);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 17:
        context$1$0.prev = 17;
        context$1$0.prev = 18;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 20:
        context$1$0.prev = 20;

        if (!_didIteratorError2) {
          context$1$0.next = 23;
          break;
        }

        throw _iteratorError2;

      case 23:
        return context$1$0.finish(20);

      case 24:
        return context$1$0.finish(17);

      case 25:
        _loggerJs2['default'].debug('Possible activities, to be checked: ' + possibleActivityNames.join(', '));

        _loop = function callee$1$0() {
          var _ref, appPackage, appActivity, foundAct;

          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.getFocusedPackageAndActivity());

              case 2:
                _ref = context$2$0.sent;
                appPackage = _ref.appPackage;
                appActivity = _ref.appActivity;

                _loggerJs2['default'].debug('Found package: \'' + appPackage + '\' and activity: \'' + appActivity + '\'');
                foundAct = appPackage === pkg && _lodash2['default'].findIndex(possibleActivityNames, function (possibleActivity) {
                  return possibleActivity === appActivity;
                }) !== -1;

                if (!(!not && foundAct || not && !foundAct)) {
                  context$2$0.next = 9;
                  break;
                }

                return context$2$0.abrupt('return', {
                  v: undefined
                });

              case 9:
                _loggerJs2['default'].debug('Incorrect package and activity. Retrying.');
                // cool down so we're not overloading device with requests
                context$2$0.next = 12;
                return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(750));

              case 12:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        };

      case 27:
        if (!(Date.now() < endAt)) {
          context$1$0.next = 35;
          break;
        }

        context$1$0.next = 30;
        return _regeneratorRuntime.awrap(_loop());

      case 30:
        _ret = context$1$0.sent;

        if (!(typeof _ret === 'object')) {
          context$1$0.next = 33;
          break;
        }

        return context$1$0.abrupt('return', _ret.v);

      case 33:
        context$1$0.next = 27;
        break;

      case 35:
        activityMessage = possibleActivityNames.join(" or ");

        _loggerJs2['default'].errorAndThrow(pkg + '/' + activityMessage + ' never ' + (not ? 'stopped' : 'started'));

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[9, 13, 17, 25], [18,, 20, 24]]);
};

apkUtilsMethods.waitForActivity = function callee$0$0(pkg, act) {
  var waitMs = arguments.length <= 2 || arguments[2] === undefined ? 20000 : arguments[2];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.waitForActivityOrNot(pkg, act, false, waitMs));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

apkUtilsMethods.waitForNotActivity = function callee$0$0(pkg, act) {
  var waitMs = arguments.length <= 2 || arguments[2] === undefined ? 20000 : arguments[2];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.waitForActivityOrNot(pkg, act, true, waitMs));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

apkUtilsMethods.uninstallApk = function callee$0$0(pkg) {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Uninstalling ' + pkg);
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.forceStop(pkg));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adbExec(['uninstall', pkg], { timeout: 20000 }));

      case 6:
        stdout = context$1$0.sent;

        stdout = stdout.trim();
        // stdout may contain warnings meaning success is not on the first line.

        if (!(stdout.indexOf("Success") !== -1)) {
          context$1$0.next = 13;
          break;
        }

        _loggerJs2['default'].info("App was uninstalled");
        return context$1$0.abrupt('return', true);

      case 13:
        _loggerJs2['default'].info("App was not uninstalled, maybe it wasn't on device?");
        return context$1$0.abrupt('return', false);

      case 15:
        context$1$0.next = 20;
        break;

      case 17:
        context$1$0.prev = 17;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Unable to uninstall APK. Original error: ' + context$1$0.t0.message);

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 17]]);
};

apkUtilsMethods.installFromDevicePath = function callee$0$0(apkPathOnDevice) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'install', '-r', apkPathOnDevice], opts));

      case 2:
        stdout = context$1$0.sent;

        if (stdout.indexOf("Failure") !== -1) {
          _loggerJs2['default'].errorAndThrow('Remote install failed: ' + stdout);
        }

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

apkUtilsMethods.install = function callee$0$0(apk) {
  var replace = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
  var timeout = arguments.length <= 2 || arguments[2] === undefined ? 300000 : arguments[2];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!replace) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExec(['install', '-r', apk], { timeout: timeout }));

      case 3:
        context$1$0.next = 7;
        break;

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adbExec(['install', apk], { timeout: timeout }));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

apkUtilsMethods.extractStringsFromApk = function callee$0$0(apk, language, out) {
  var stringsJson, localPath, apkTools, args, fileData, apkStrings, msg;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Extracting strings for language: ' + (language || "default"));
        stringsJson = 'strings.json';
        localPath = undefined;

        if (language) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getDeviceLanguage());

      case 6:
        language = context$1$0.sent;

      case 7:
        apkTools = this.jars['appium_apk_tools.jar'];
        args = ['-jar', apkTools, 'stringsFromApk', apk, out, language];
        fileData = undefined, apkStrings = undefined;
        context$1$0.prev = 10;
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', args));

      case 13:
        context$1$0.next = 21;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](10);

        _loggerJs2['default'].debug('No strings.xml for language \'' + language + '\', getting default ' + 'strings.xml');
        args.pop();
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', args));

      case 21:
        context$1$0.prev = 21;

        _loggerJs2['default'].debug("Reading strings from converted strings.json");
        localPath = _path2['default'].join(out, stringsJson);
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(localPath, 'utf8'));

      case 26:
        fileData = context$1$0.sent;

        apkStrings = JSON.parse(fileData);
        context$1$0.next = 35;
        break;

      case 30:
        context$1$0.prev = 30;
        context$1$0.t1 = context$1$0['catch'](21);

        if (fileData) {
          _loggerJs2['default'].debug('Content started with: ' + fileData.slice(0, 300));
        }
        msg = 'Could not parse strings from strings.json. Original ' + ('error: ' + context$1$0.t1.message);

        _loggerJs2['default'].errorAndThrow(msg);

      case 35:
        return context$1$0.abrupt('return', { apkStrings: apkStrings, localPath: localPath });

      case 36:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[10, 15], [21, 30]]);
};

apkUtilsMethods.getDeviceLanguage = function callee$0$0() {
  var language;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        language = undefined;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 3:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 < 23)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.getDeviceSysLanguage());

      case 7:
        language = context$1$0.sent;

        if (language) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.getDeviceProductLanguage());

      case 11:
        language = context$1$0.sent;

      case 12:
        context$1$0.next = 17;
        break;

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(this.getDeviceLocale());

      case 16:
        language = context$1$0.sent.split("-")[0];

      case 17:
        return context$1$0.abrupt('return', language);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

apkUtilsMethods.setDeviceLanguage = function callee$0$0(language) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceSysLanguage(language));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

apkUtilsMethods.getDeviceCountry = function callee$0$0() {
  var country;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceSysCountry());

      case 2:
        country = context$1$0.sent;

        if (country) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getDeviceProductCountry());

      case 6:
        country = context$1$0.sent;

      case 7:
        return context$1$0.abrupt('return', country);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

apkUtilsMethods.setDeviceCountry = function callee$0$0(country) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceSysCountry(country));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

apkUtilsMethods.getDeviceLocale = function callee$0$0() {
  var locale;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceSysLocale());

      case 2:
        locale = context$1$0.sent;

        if (locale) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getDeviceProductLocale());

      case 6:
        locale = context$1$0.sent;

      case 7:
        return context$1$0.abrupt('return', locale);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

apkUtilsMethods.setDeviceLocale = function callee$0$0(locale) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceSysLocale(locale));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = apkUtilsMethods;
module.exports = exports['default'];
// https://regex101.com/r/xZ8vF7/1

// this method is only used in API < 23

// this method is only used in API < 23

// this method is only used in API < 23

// this method is only used in API >= 23

// this method is only used in API >= 23
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9hcGstdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7eUJBQXdELGVBQWU7OzRCQUNsRCxjQUFjOzt3QkFDbkIsY0FBYzs7OztvQkFDYixNQUFNOzs7O3NCQUNULFFBQVE7Ozs7d0JBQ0EsVUFBVTs7NkJBQ2IsZ0JBQWdCOztBQUVuQyxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7O0FBRXpCLGVBQWUsQ0FBQyxjQUFjLEdBQUcsb0JBQWdCLEdBQUc7TUFFNUMsU0FBUyxFQUVULFFBQVEsRUFDUixVQUFVLEVBQ1YsTUFBTSxFQUNOLGVBQWU7Ozs7O0FBTGYsaUJBQVMsR0FBRyxLQUFLOztBQUNyQiw4QkFBSSxLQUFLLGlDQUErQixHQUFHLENBQUcsQ0FBQzs7eUNBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUU7OztBQUFuQyxnQkFBUTtBQUNSLGtCQUFVLEdBQUcsUUFBUSxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRTs7eUNBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7OztBQUF0RSxjQUFNO0FBQ04sdUJBQWUsR0FBRyxJQUFJLE1BQU0sZUFBYSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFDeEMsR0FBRyxDQUFDOztBQUNyQyxpQkFBUyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsOEJBQUksS0FBSyxjQUFXLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUEsZ0JBQWEsQ0FBQzs0Q0FDbkQsU0FBUzs7Ozs7O0FBRWhCLDhCQUFJLGFBQWEseURBQXVELGVBQUUsT0FBTyxDQUFHLENBQUM7Ozs7Ozs7Q0FFeEYsQ0FBQzs7QUFFRixlQUFlLENBQUMsUUFBUSxHQUFHLG9CQUFnQixHQUFHLEVBQUUsR0FBRztNQUsz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RixlQUFlLENBQUMsZUFBZSxHQUFHLG9CQUFnQixNQUFNOzs7Ozt5Q0FFaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQzs7Ozs7OztDQUN0QyxDQUFDOztxQkFFYSxlQUFlIiwiZmlsZSI6ImxpYi90b29scy9hcGstdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBidWlsZFN0YXJ0Q21kLCBnZXRQb3NzaWJsZUFjdGl2aXR5TmFtZXMgfSBmcm9tICcuLi9oZWxwZXJzLmpzJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXIuanMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcblxubGV0IGFwa1V0aWxzTWV0aG9kcyA9IHt9O1xuXG5hcGtVdGlsc01ldGhvZHMuaXNBcHBJbnN0YWxsZWQgPSBhc3luYyBmdW5jdGlvbiAocGtnKSB7XG4gIHRyeSB7XG4gICAgbGV0IGluc3RhbGxlZCA9IGZhbHNlO1xuICAgIGxvZy5kZWJ1ZyhgR2V0dGluZyBpbnN0YWxsIHN0YXR1cyBmb3IgJHtwa2d9YCk7XG4gICAgbGV0IGFwaUxldmVsID0gYXdhaXQgdGhpcy5nZXRBcGlMZXZlbCgpO1xuICAgIGxldCB0aGlyZHBhcnR5ID0gYXBpTGV2ZWwgPj0gMTUgPyBcIi0zXCIgOiBcIlwiO1xuICAgIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFsncG0nLCAnbGlzdCcsICdwYWNrYWdlcycsIHRoaXJkcGFydHksIHBrZ10pO1xuICAgIGxldCBhcGtJbnN0YWxsZWRSZ3ggPSBuZXcgUmVnRXhwKGBecGFja2FnZToke3BrZy5yZXBsYWNlKC8oXFwuKS9nLCBcIlxcXFwkMVwiKX0kYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbScpO1xuICAgIGluc3RhbGxlZCA9IGFwa0luc3RhbGxlZFJneC50ZXN0KHN0ZG91dCk7XG4gICAgbG9nLmRlYnVnKGBBcHAgaXMgJHshaW5zdGFsbGVkID8gXCIgbm90XCIgOiBcIlwifSBpbnN0YWxsZWRgKTtcbiAgICByZXR1cm4gaW5zdGFsbGVkO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGZpbmRpbmcgaWYgYXBwIGlzIGluc3RhbGxlZC4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICB9XG59O1xuXG5hcGtVdGlsc01ldGhvZHMuc3RhcnRVcmkgPSBhc3luYyBmdW5jdGlvbiAodXJpLCBwa2cpIHtcbiAgaWYgKCF1cmkgfHwgIXBrZykge1xuICAgIGxvZy5lcnJvckFuZFRocm93KFwiVVJJIGFuZCBwYWNrYWdlIGFyZ3VtZW50cyBhcmUgcmVxdWlyZWRcIik7XG4gIH1cbiAgdHJ5IHtcbiAgICBsZXQgYXJncyA9IFtcImFtXCIsIFwic3RhcnRcIiwgXCItV1wiLCBcIi1hXCIsIFwiYW5kcm9pZC5pbnRlbnQuYWN0aW9uLlZJRVdcIiwgXCItZFwiLFxuICAgICAgICAgICAgICAgIHVyaSwgcGtnXTtcbiAgICBhd2FpdCB0aGlzLnNoZWxsKGFyZ3MpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGF0dGVtcHRpbmcgdG8gc3RhcnQgVVJJLiBPcmlnaW5hbCBlcnJvcjogJHtlfWApO1xuICB9XG59O1xuXG5hcGtVdGlsc01ldGhvZHMuc3RhcnRBcHAgPSBhc3luYyBmdW5jdGlvbiAoc3RhcnRBcHBPcHRpb25zID0ge30pIHtcbiAgdHJ5IHtcbiAgICBpZiAoIXN0YXJ0QXBwT3B0aW9ucy5hY3Rpdml0eSB8fCAhc3RhcnRBcHBPcHRpb25zLnBrZykge1xuICAgICAgbG9nLmVycm9yQW5kVGhyb3coXCJhY3Rpdml0eSBhbmQgcGtnIGlzIHJlcXVpcmVkIGZvciBsYXVuY2hpbmcgYXBwbGljYXRpb25cIik7XG4gICAgfVxuICAgIHN0YXJ0QXBwT3B0aW9ucyA9IF8uY2xvbmUoc3RhcnRBcHBPcHRpb25zKTtcbiAgICAvLyBpbml0aWFsaXppbmcgZGVmYXVsdHNcbiAgICBfLmRlZmF1bHRzKHN0YXJ0QXBwT3B0aW9ucywge1xuICAgICAgICB3YWl0UGtnOiBzdGFydEFwcE9wdGlvbnMucGtnLFxuICAgICAgICB3YWl0QWN0aXZpdHk6IGZhbHNlLFxuICAgICAgICByZXRyeTogdHJ1ZSxcbiAgICAgICAgc3RvcEFwcDogdHJ1ZVxuICAgIH0pO1xuICAgIC8vIHByZXZlbnRpbmcgbnVsbCB3YWl0cGtnXG4gICAgc3RhcnRBcHBPcHRpb25zLndhaXRQa2cgPSBzdGFydEFwcE9wdGlvbnMud2FpdFBrZyB8fCBzdGFydEFwcE9wdGlvbnMucGtnO1xuICAgIGxldCBhcGlMZXZlbCA9IGF3YWl0IHRoaXMuZ2V0QXBpTGV2ZWwoKTtcbiAgICBsZXQgY21kID0gYnVpbGRTdGFydENtZChzdGFydEFwcE9wdGlvbnMsIGFwaUxldmVsKTtcbiAgICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChjbWQpO1xuICAgIGlmIChzdGRvdXQuaW5kZXhPZihcIkVycm9yOiBBY3Rpdml0eSBjbGFzc1wiKSAhPT0gLTEgJiZcbiAgICAgICAgc3Rkb3V0LmluZGV4T2YoXCJkb2VzIG5vdCBleGlzdFwiKSAhPT0gLTEpIHtcbiAgICAgIGlmIChzdGFydEFwcE9wdGlvbnMucmV0cnkgJiYgc3RhcnRBcHBPcHRpb25zLmFjdGl2aXR5WzBdICE9PSBcIi5cIikge1xuICAgICAgICBsb2cuZGVidWcoXCJXZSB0cmllZCB0byBzdGFydCBhbiBhY3Rpdml0eSB0aGF0IGRvZXNuJ3QgZXhpc3QsIFwiICtcbiAgICAgICAgICAgICAgICAgIFwicmV0cnlpbmcgd2l0aCAuIHByZXBlbmRlZCB0byBhY3Rpdml0eVwiKTtcbiAgICAgICAgc3RhcnRBcHBPcHRpb25zLmFjdGl2aXR5ID0gYC4ke3N0YXJ0QXBwT3B0aW9ucy5hY3Rpdml0eX1gO1xuICAgICAgICBzdGFydEFwcE9wdGlvbnMucmV0cnkgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRBcHAoc3RhcnRBcHBPcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy5lcnJvckFuZFRocm93KFwiQWN0aXZpdHkgdXNlZCB0byBzdGFydCBhcHAgZG9lc24ndCBleGlzdCBvciBjYW5ub3QgYmUgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhdW5jaGVkISBNYWtlIHN1cmUgaXQgZXhpc3RzIGFuZCBpcyBhIGxhdW5jaGFibGUgYWN0aXZpdHlcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGRvdXQuaW5kZXhPZihcImphdmEubGFuZy5TZWN1cml0eUV4Y2VwdGlvblwiKSAhPT0gLTEpIHtcbiAgICAgIC8vIGlmIHRoZSBhcHAgaXMgZGlzYWJsZWQgb24gYSByZWFsIGRldmljZSBpdCB3aWxsIHRocm93IGEgc2VjdXJpdHkgZXhjZXB0aW9uXG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhcIlBlcm1pc3Npb24gdG8gc3RhcnQgYWN0aXZpdHkgZGVuaWVkLlwiKTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0QXBwT3B0aW9ucy53YWl0QWN0aXZpdHkpIHtcbiAgICAgIGF3YWl0IHRoaXMud2FpdEZvckFjdGl2aXR5KHN0YXJ0QXBwT3B0aW9ucy53YWl0UGtnLCBzdGFydEFwcE9wdGlvbnMud2FpdEFjdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBcHBPcHRpb25zLndhaXREdXJhdGlvbik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIG9jY3VyZWQgd2hpbGUgc3RhcnRpbmcgQXBwLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG5cblxuYXBrVXRpbHNNZXRob2RzLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxvZy5kZWJ1ZyhcIkdldHRpbmcgZm9jdXNlZCBwYWNrYWdlIGFuZCBhY3Rpdml0eVwiKTtcbiAgbGV0IGNtZCA9IFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddO1xuICBsZXQgbnVsbFJlID0gbmV3IFJlZ0V4cCgvbUZvY3VzZWRBcHA9bnVsbC8pO1xuICBsZXQgc2VhcmNoUmUgPSBuZXcgUmVnRXhwKCdtRm9jdXNlZEFwcC4rUmVjb3JkXFxcXHsuKlxcXFxzKFteXFxcXHNcXFxcL1xcXFx9XSspJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFwvKFteXFxcXHNcXFxcL1xcXFx9XFxcXCxdKylcXFxcLD8oXFxcXHNbXlxcXFxzXFxcXC9cXFxcfV0rKSpcXFxcfScpOyAvLyBodHRwczovL3JlZ2V4MTAxLmNvbS9yL3haOHZGNy8xXG4gIHRyeSB7XG4gICAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoY21kKTtcbiAgICBsZXQgZm91bmROdWxsTWF0Y2ggPSBmYWxzZTtcbiAgICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdChcIlxcblwiKSkge1xuICAgICAgbGV0IGZvdW5kTWF0Y2ggPSBzZWFyY2hSZS5leGVjKGxpbmUpO1xuICAgICAgaWYgKGZvdW5kTWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHthcHBQYWNrYWdlOiBmb3VuZE1hdGNoWzFdLnRyaW0oKSwgYXBwQWN0aXZpdHk6IGZvdW5kTWF0Y2hbMl0udHJpbSgpfTtcbiAgICAgIH0gZWxzZSBpZiAobnVsbFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgZm91bmROdWxsTWF0Y2ggPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZm91bmROdWxsTWF0Y2gpIHtcbiAgICAgIHJldHVybiB7YXBwUGFja2FnZTogbnVsbCwgYXBwQWN0aXZpdHk6IG51bGx9O1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhcIkNvdWxkIG5vdCBwYXJzZSBhY3Rpdml0eSBmcm9tIGR1bXBzeXNcIik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYENvdWxkIG5vdCBnZXQgZm9jdXNQYWNrYWdlQW5kQWN0aXZpdHkuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxufTtcblxuYXBrVXRpbHNNZXRob2RzLndhaXRGb3JBY3Rpdml0eU9yTm90ID0gYXN5bmMgZnVuY3Rpb24gKHBrZywgYWN0aXZpdHksIG5vdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0TXMgPSAyMDAwMCkge1xuICBpZiAoIXBrZyB8fCAhYWN0aXZpdHkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYWNrYWdlIGFuZCBhY3Rpdml0eSByZXF1aXJlZC5cIik7XG4gIH1cbiAgbG9nLmRlYnVnKGBXYWl0aW5nIGZvciBwa2c6ICcke3BrZ30nIGFuZCBhY3Rpdml0eTogJyR7YWN0aXZpdHl9J2AgK1xuICAgICAgICAgICAgYCR7bm90ID8gJyBub3QnIDogJyd9IHRvIGJlIGZvY3VzZWRgKTtcbiAgbGV0IGVuZEF0ID0gRGF0ZS5ub3coKSArIHdhaXRNcztcbiAgXG4gIGxldCBwb3NzaWJsZUFjdGl2aXR5TmFtZXMgPSBbXTtcbiAgbGV0IGFsbEFjdGl2aXRpZXMgPSBhY3Rpdml0eS5zcGxpdChcIixcIik7XG4gIGZvciAobGV0IG9uZUFjdGl2aXR5IG9mIGFsbEFjdGl2aXRpZXMpIHtcbiAgICBvbmVBY3Rpdml0eSA9IG9uZUFjdGl2aXR5LnRyaW0oKTtcbiAgICBwb3NzaWJsZUFjdGl2aXR5TmFtZXMucHVzaCguLi5nZXRQb3NzaWJsZUFjdGl2aXR5TmFtZXMocGtnLCBvbmVBY3Rpdml0eSkpO1xuICB9XG4gIGxvZy5kZWJ1ZyhgUG9zc2libGUgYWN0aXZpdGllcywgdG8gYmUgY2hlY2tlZDogJHtwb3NzaWJsZUFjdGl2aXR5TmFtZXMuam9pbignLCAnKX1gKTtcblxuICB3aGlsZSAoRGF0ZS5ub3coKSA8IGVuZEF0KSB7XG4gICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCB0aGlzLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICBsb2cuZGVidWcoYEZvdW5kIHBhY2thZ2U6ICcke2FwcFBhY2thZ2V9JyBhbmQgYWN0aXZpdHk6ICcke2FwcEFjdGl2aXR5fSdgKTtcbiAgICBsZXQgZm91bmRBY3QgPSAoKGFwcFBhY2thZ2UgPT09IHBrZykgJiZcbiAgICAgICAgICAgICAgICAgICAgKF8uZmluZEluZGV4KHBvc3NpYmxlQWN0aXZpdHlOYW1lcywgcG9zc2libGVBY3Rpdml0eSA9PiBwb3NzaWJsZUFjdGl2aXR5ID09PSBhcHBBY3Rpdml0eSkgIT09IC0xKSk7XG4gICAgaWYgKCghbm90ICYmIGZvdW5kQWN0KSB8fCAobm90ICYmICFmb3VuZEFjdCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nLmRlYnVnKCdJbmNvcnJlY3QgcGFja2FnZSBhbmQgYWN0aXZpdHkuIFJldHJ5aW5nLicpO1xuICAgIC8vIGNvb2wgZG93biBzbyB3ZSdyZSBub3Qgb3ZlcmxvYWRpbmcgZGV2aWNlIHdpdGggcmVxdWVzdHNcbiAgICBhd2FpdCBzbGVlcCg3NTApO1xuICB9XG4gIGxldCBhY3Rpdml0eU1lc3NhZ2UgPSBwb3NzaWJsZUFjdGl2aXR5TmFtZXMuam9pbihcIiBvciBcIik7XG4gIGxvZy5lcnJvckFuZFRocm93KGAke3BrZ30vJHthY3Rpdml0eU1lc3NhZ2V9IG5ldmVyICR7bm90ID8gJ3N0b3BwZWQnIDogJ3N0YXJ0ZWQnfWApO1xufTtcblxuYXBrVXRpbHNNZXRob2RzLndhaXRGb3JBY3Rpdml0eSA9IGFzeW5jIGZ1bmN0aW9uIChwa2csIGFjdCwgd2FpdE1zID0gMjAwMDApIHtcbiAgYXdhaXQgdGhpcy53YWl0Rm9yQWN0aXZpdHlPck5vdChwa2csIGFjdCwgZmFsc2UsIHdhaXRNcyk7XG59O1xuXG5hcGtVdGlsc01ldGhvZHMud2FpdEZvck5vdEFjdGl2aXR5ID0gYXN5bmMgZnVuY3Rpb24gKHBrZywgYWN0LCB3YWl0TXMgPSAyMDAwMCkge1xuICBhd2FpdCB0aGlzLndhaXRGb3JBY3Rpdml0eU9yTm90KHBrZywgYWN0LCB0cnVlLCB3YWl0TXMpO1xufTtcblxuYXBrVXRpbHNNZXRob2RzLnVuaW5zdGFsbEFwayA9IGFzeW5jIGZ1bmN0aW9uIChwa2cpIHtcbiAgbG9nLmRlYnVnKGBVbmluc3RhbGxpbmcgJHtwa2d9YCk7XG4gIHRyeSB7XG4gICAgYXdhaXQgdGhpcy5mb3JjZVN0b3AocGtnKTtcbiAgICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5hZGJFeGVjKFsndW5pbnN0YWxsJywgcGtnXSwge3RpbWVvdXQ6IDIwMDAwfSk7XG4gICAgc3Rkb3V0ID0gc3Rkb3V0LnRyaW0oKTtcbiAgICAvLyBzdGRvdXQgbWF5IGNvbnRhaW4gd2FybmluZ3MgbWVhbmluZyBzdWNjZXNzIGlzIG5vdCBvbiB0aGUgZmlyc3QgbGluZS5cbiAgICBpZiAoc3Rkb3V0LmluZGV4T2YoXCJTdWNjZXNzXCIpICE9PSAtMSkge1xuICAgICAgbG9nLmluZm8oXCJBcHAgd2FzIHVuaW5zdGFsbGVkXCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKFwiQXBwIHdhcyBub3QgdW5pbnN0YWxsZWQsIG1heWJlIGl0IHdhc24ndCBvbiBkZXZpY2U/XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBVbmFibGUgdG8gdW5pbnN0YWxsIEFQSy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICB9XG59O1xuXG5hcGtVdGlsc01ldGhvZHMuaW5zdGFsbEZyb21EZXZpY2VQYXRoID0gYXN5bmMgZnVuY3Rpb24gKGFwa1BhdGhPbkRldmljZSwgb3B0cyA9IHt9KSB7XG4gIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFsncG0nLCAnaW5zdGFsbCcsICctcicsIGFwa1BhdGhPbkRldmljZV0sIG9wdHMpO1xuICBpZiAoc3Rkb3V0LmluZGV4T2YoXCJGYWlsdXJlXCIpICE9PSAtMSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBSZW1vdGUgaW5zdGFsbCBmYWlsZWQ6ICR7c3Rkb3V0fWApO1xuICB9XG59O1xuXG5hcGtVdGlsc01ldGhvZHMuaW5zdGFsbCA9IGFzeW5jIGZ1bmN0aW9uIChhcGssIHJlcGxhY2UgPSB0cnVlLCB0aW1lb3V0ID0gMzAwMDAwKSB7XG4gIGlmIChyZXBsYWNlKSB7XG4gICAgYXdhaXQgdGhpcy5hZGJFeGVjKFsnaW5zdGFsbCcsICctcicsIGFwa10sIHt0aW1lb3V0fSk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgdGhpcy5hZGJFeGVjKFsnaW5zdGFsbCcsIGFwa10sIHt0aW1lb3V0fSk7XG4gIH1cbn07XG5cbmFwa1V0aWxzTWV0aG9kcy5leHRyYWN0U3RyaW5nc0Zyb21BcGsgPSBhc3luYyBmdW5jdGlvbiAoYXBrLCBsYW5ndWFnZSwgb3V0KSB7XG4gIGxvZy5kZWJ1ZyhgRXh0cmFjdGluZyBzdHJpbmdzIGZvciBsYW5ndWFnZTogJHtsYW5ndWFnZSB8fCBcImRlZmF1bHRcIn1gKTtcbiAgbGV0IHN0cmluZ3NKc29uID0gJ3N0cmluZ3MuanNvbic7XG4gIGxldCBsb2NhbFBhdGg7XG4gIGlmICghbGFuZ3VhZ2UpIHtcbiAgICBsYW5ndWFnZSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlTGFuZ3VhZ2UoKTtcbiAgfVxuICBsZXQgYXBrVG9vbHMgPSB0aGlzLmphcnNbJ2FwcGl1bV9hcGtfdG9vbHMuamFyJ107XG4gIGxldCBhcmdzID0gWyctamFyJywgYXBrVG9vbHMsICdzdHJpbmdzRnJvbUFwaycsIGFwaywgb3V0LCBsYW5ndWFnZV07XG4gIGxldCBmaWxlRGF0YSwgYXBrU3RyaW5ncztcbiAgdHJ5IHtcbiAgICBhd2FpdCBleGVjKCdqYXZhJywgYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZGVidWcoYE5vIHN0cmluZ3MueG1sIGZvciBsYW5ndWFnZSAnJHtsYW5ndWFnZX0nLCBnZXR0aW5nIGRlZmF1bHQgYCArXG4gICAgICAgICAgICAgIGBzdHJpbmdzLnhtbGApO1xuICAgIGFyZ3MucG9wKCk7XG4gICAgYXdhaXQgZXhlYygnamF2YScsIGFyZ3MpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBsb2cuZGVidWcoXCJSZWFkaW5nIHN0cmluZ3MgZnJvbSBjb252ZXJ0ZWQgc3RyaW5ncy5qc29uXCIpO1xuICAgIGxvY2FsUGF0aCA9IHBhdGguam9pbihvdXQsIHN0cmluZ3NKc29uKTtcbiAgICBmaWxlRGF0YSA9IGF3YWl0IGZzLnJlYWRGaWxlKGxvY2FsUGF0aCwgJ3V0ZjgnKTtcbiAgICBhcGtTdHJpbmdzID0gSlNPTi5wYXJzZShmaWxlRGF0YSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZmlsZURhdGEpIHtcbiAgICAgIGxvZy5kZWJ1ZyhgQ29udGVudCBzdGFydGVkIHdpdGg6ICR7ZmlsZURhdGEuc2xpY2UoMCwgMzAwKX1gKTtcbiAgICB9XG4gICAgbGV0IG1zZyA9IGBDb3VsZCBub3QgcGFyc2Ugc3RyaW5ncyBmcm9tIHN0cmluZ3MuanNvbi4gT3JpZ2luYWwgYCArXG4gICAgICAgICAgICAgIGBlcnJvcjogJHtlLm1lc3NhZ2V9YDtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhtc2cpO1xuICB9XG4gIHJldHVybiB7YXBrU3RyaW5ncywgbG9jYWxQYXRofTtcbn07XG5cbmFwa1V0aWxzTWV0aG9kcy5nZXREZXZpY2VMYW5ndWFnZSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGxhbmd1YWdlO1xuICBpZiAoYXdhaXQgdGhpcy5nZXRBcGlMZXZlbCgpIDwgMjMpIHtcbiAgICBsYW5ndWFnZSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlU3lzTGFuZ3VhZ2UoKTtcbiAgICBpZiAoIWxhbmd1YWdlKSB7XG4gICAgICBsYW5ndWFnZSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlUHJvZHVjdExhbmd1YWdlKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxhbmd1YWdlID0gKGF3YWl0IHRoaXMuZ2V0RGV2aWNlTG9jYWxlKCkpLnNwbGl0KFwiLVwiKVswXTtcbiAgfVxuICByZXR1cm4gbGFuZ3VhZ2U7XG59O1xuXG5hcGtVdGlsc01ldGhvZHMuc2V0RGV2aWNlTGFuZ3VhZ2UgPSBhc3luYyBmdW5jdGlvbiAobGFuZ3VhZ2UpIHtcbiAgLy8gdGhpcyBtZXRob2QgaXMgb25seSB1c2VkIGluIEFQSSA8IDIzXG4gIGF3YWl0IHRoaXMuc2V0RGV2aWNlU3lzTGFuZ3VhZ2UobGFuZ3VhZ2UpO1xufTtcblxuYXBrVXRpbHNNZXRob2RzLmdldERldmljZUNvdW50cnkgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIC8vIHRoaXMgbWV0aG9kIGlzIG9ubHkgdXNlZCBpbiBBUEkgPCAyM1xuICBsZXQgY291bnRyeSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlU3lzQ291bnRyeSgpO1xuICBpZiAoIWNvdW50cnkpIHtcbiAgICBjb3VudHJ5ID0gYXdhaXQgdGhpcy5nZXREZXZpY2VQcm9kdWN0Q291bnRyeSgpO1xuICB9XG4gIHJldHVybiBjb3VudHJ5O1xufTtcblxuYXBrVXRpbHNNZXRob2RzLnNldERldmljZUNvdW50cnkgPSBhc3luYyBmdW5jdGlvbiAoY291bnRyeSkge1xuICAvLyB0aGlzIG1ldGhvZCBpcyBvbmx5IHVzZWQgaW4gQVBJIDwgMjNcbiAgYXdhaXQgdGhpcy5zZXREZXZpY2VTeXNDb3VudHJ5KGNvdW50cnkpO1xufTtcblxuYXBrVXRpbHNNZXRob2RzLmdldERldmljZUxvY2FsZSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhpcyBtZXRob2QgaXMgb25seSB1c2VkIGluIEFQSSA+PSAyM1xuICBsZXQgbG9jYWxlID0gYXdhaXQgdGhpcy5nZXREZXZpY2VTeXNMb2NhbGUoKTtcbiAgaWYgKCFsb2NhbGUpIHtcbiAgICBsb2NhbGUgPSBhd2FpdCB0aGlzLmdldERldmljZVByb2R1Y3RMb2NhbGUoKTtcbiAgfVxuICByZXR1cm4gbG9jYWxlO1xufTtcblxuYXBrVXRpbHNNZXRob2RzLnNldERldmljZUxvY2FsZSA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhbGUpIHtcbiAgLy8gdGhpcyBtZXRob2QgaXMgb25seSB1c2VkIGluIEFQSSA+PSAyM1xuICBhd2FpdCB0aGlzLnNldERldmljZVN5c0xvY2FsZShsb2NhbGUpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXBrVXRpbHNNZXRob2RzO1xuIl19