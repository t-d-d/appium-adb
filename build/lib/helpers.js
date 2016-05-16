'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appiumSupport = require('appium-support');

var _loggerJs = require('./logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _admZip = require('adm-zip');

var _admZip2 = _interopRequireDefault(_admZip);

var _teen_process = require('teen_process');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var rootDir = _path2['default'].resolve(__dirname, process.env.NO_PRECOMPILE ? '..' : '../..');
var androidPlatforms = ['android-4.2', 'android-17', 'android-4.3', 'android-18', 'android-4.4', 'android-19', 'android-L', 'android-20', 'android-5.0', 'android-21', 'android-22', 'android-MNC', 'android-23', 'android-6.0'];

function getDirectories(rootPath) {
  var files, dirs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, pathString;

  return _regeneratorRuntime.async(function getDirectories$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readdir(rootPath));

      case 2:
        files = context$1$0.sent;
        dirs = [];
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 7;
        _iterator = _getIterator(files);

      case 9:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 19;
          break;
        }

        file = _step.value;
        pathString = _path2['default'].resolve(rootPath, file);
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.lstat(pathString));

      case 14:
        if (!context$1$0.sent.isDirectory()) {
          context$1$0.next = 16;
          break;
        }

        dirs.push(file);

      case 16:
        _iteratorNormalCompletion = true;
        context$1$0.next = 9;
        break;

      case 19:
        context$1$0.next = 25;
        break;

      case 21:
        context$1$0.prev = 21;
        context$1$0.t0 = context$1$0['catch'](7);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 25:
        context$1$0.prev = 25;
        context$1$0.prev = 26;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 28:
        context$1$0.prev = 28;

        if (!_didIteratorError) {
          context$1$0.next = 31;
          break;
        }

        throw _iteratorError;

      case 31:
        return context$1$0.finish(28);

      case 32:
        return context$1$0.finish(25);

      case 33:
        return context$1$0.abrupt('return', dirs.sort());

      case 34:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[7, 21, 25, 33], [26,, 28, 32]]);
}

function getAndroidPlatformAndPath() {
  var androidHome, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, platform, platforms, platformPath;

  return _regeneratorRuntime.async(function getAndroidPlatformAndPath$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        androidHome = process.env.ANDROID_HOME;

        if (_lodash2['default'].isString(androidHome)) {
          context$1$0.next = 4;
          break;
        }

        _loggerJs2['default'].error("ANDROID_HOME was not exported!");
        return context$1$0.abrupt('return', null);

      case 4:
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 7;
        _iterator2 = _getIterator(_lodash2['default'].clone(androidPlatforms).reverse());

      case 9:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 20;
          break;
        }

        platform = _step2.value;
        platforms = _path2['default'].resolve(androidHome, 'platforms');
        platformPath = _path2['default'].resolve(platforms, platform);
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(platformPath));

      case 15:
        if (!context$1$0.sent) {
          context$1$0.next = 17;
          break;
        }

        return context$1$0.abrupt('return', { platform: platform, platformPath: platformPath });

      case 17:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 9;
        break;

      case 20:
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](7);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError2) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError2;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        return context$1$0.abrupt('return', null);

      case 35:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[7, 22, 26, 34], [27,, 29, 33]]);
}

function unzipFile(zipPath) {
  var zip;
  return _regeneratorRuntime.async(function unzipFile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Unzipping ' + zipPath);
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(assertZipArchive(zipPath));

      case 4:
        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 10;
          break;
        }

        zip = new _admZip2['default'](zipPath);

        zip.extractAllTo(_path2['default'].dirname(zipPath), true);
        _loggerJs2['default'].debug("Unzip successful");
        context$1$0.next = 13;
        break;

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('unzip', ['-o', zipPath], { cwd: _path2['default'].dirname(zipPath) }));

      case 12:
        _loggerJs2['default'].debug("Unzip successful");

      case 13:
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](1);
        throw new Error('Error occurred while unzipping. Original error: ' + context$1$0.t0.message);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 15]]);
}

function assertZipArchive(zipPath) {
  var execOpts;
  return _regeneratorRuntime.async(function assertZipArchive$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Testing zip archive: ' + zipPath);

        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(zipPath));

      case 4:
        if (!context$1$0.sent) {
          context$1$0.next = 8;
          break;
        }

        _loggerJs2['default'].debug("Zip archive tested clean");
        context$1$0.next = 9;
        break;

      case 8:
        throw new Error('Zip archive not present at ' + zipPath);

      case 9:
        context$1$0.next = 14;
        break;

      case 11:
        execOpts = { cwd: _path2['default'].dirname(zipPath) };
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('unzip', ['-tq', zipPath], execOpts));

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getIMEListFromOutput(stdout) {
  var engines = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(stdout.split('\n')), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var line = _step3.value;

      if (line.length > 0 && line[0] !== ' ') {
        // remove newline and trailing colon, and add to the list
        engines.push(line.trim().replace(/:$/, ''));
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return engines;
}

function getJavaForOs() {
  var sep = _path2['default'].sep;
  var java = '' + getJavaHome() + sep + 'bin' + sep + 'java';
  if (_appiumSupport.system.isWindows()) {
    java = java + '.exe';
  }
  return java;
}

function getJavaHome() {
  if (process.env.JAVA_HOME) {
    return process.env.JAVA_HOME;
  }
  throw new Error("JAVA_HOME is not set currently. Please set JAVA_HOME.");
}

/*
 * Checks mShowingLockscreen in dumpsys output to determine if lock screen is showing
 */
function isShowingLockscreen(dumpsys) {
  var m = /mShowingLockscreen=\w+/gi.exec(dumpsys);
  var ret = m && m.length && m[0].split('=')[1] === 'true' || false;
  return ret;
}

/*
 * Checks mCurrentFocus in dumpsys output to determine if Keyguard is activated
 */
function isCurrentFocusOnKeyguard(dumpsys) {
  var m = /mCurrentFocus.+Keyguard/gi.exec(dumpsys);
  return m && m.length && m[0] ? true : false;
}

/*
 * Checks mScreenOnFully in dumpsys output to determine if screen is showing
 * Default is true
 */
function isScreenOnFully(dumpsys) {
  var m = /mScreenOnFully=\w+/gi.exec(dumpsys);
  return !m || // if information is missing we assume screen is fully on
  m && m.length > 0 && m[0].split('=')[1] === 'true' || false;
}

function buildStartCmd(startAppOptions, apiLevel) {
  var cmd = ['am', 'start', '-n', startAppOptions.pkg + '/' + startAppOptions.activity];
  if (startAppOptions.stopApp && apiLevel >= 15) {
    cmd.push('-S');
  }
  if (startAppOptions.action) {
    cmd.push('-a', startAppOptions.action);
  }
  if (startAppOptions.category) {
    cmd.push('-c', startAppOptions.category);
  }
  if (startAppOptions.flags) {
    cmd.push('-f', startAppOptions.flags);
  }
  if (startAppOptions.optionalIntentArguments) {
    // expect optionalIntentArguments to be something like '-x options',
    // '-y option argument' or a combination of the two
    var argRe = /(-[^\s]+) ([^-]+)/g;
    while (true) {
      var optionalIntentArguments = argRe.exec(startAppOptions.optionalIntentArguments);
      if (!optionalIntentArguments) {
        break;
      }
      var flag = optionalIntentArguments[1];
      var space = optionalIntentArguments[2].indexOf(' ');
      var arg = undefined,
          value = undefined;
      if (space === -1) {
        arg = optionalIntentArguments[2];
      } else {
        arg = optionalIntentArguments[2].substring(0, space).trim();
        value = optionalIntentArguments[2].substring(space + 1).trim();
      }
      cmd.push(flag, arg);
      if (value) {
        cmd.push(value);
      }
    }
  }
  return cmd;
}

// turns pkg.activity.name to .activity.name
// also turns activity.name to .activity.name
function getPossibleActivityNames(pkgName, activityName) {
  var names = [activityName];
  // need to beware of namespaces with overlapping chars:
  //   com.foo.bar
  //   com.foo.barx
  if (activityName.indexOf(pkgName + '.') === 0) {
    names.push(activityName.substring(pkgName.length));
  }
  if (activityName[0] !== '.') {
    names.push('.' + activityName);
  }
  return names;
}

exports.getDirectories = getDirectories;
exports.getAndroidPlatformAndPath = getAndroidPlatformAndPath;
exports.unzipFile = unzipFile;
exports.assertZipArchive = assertZipArchive;
exports.getIMEListFromOutput = getIMEListFromOutput;
exports.getJavaForOs = getJavaForOs;
exports.isShowingLockscreen = isShowingLockscreen;
exports.isCurrentFocusOnKeyguard = isCurrentFocusOnKeyguard;
exports.isScreenOnFully = isScreenOnFully;
exports.buildStartCmd = buildStartCmd;
exports.getPossibleActivityNames = getPossibleActivityNames;
exports.getJavaHome = getJavaHome;
exports.rootDir = rootDir;
exports.androidPlatforms = androidPlatforms;

// It is not a clean way to sort it, but in this case would work fine because
// we have numerics and alphanumeric
// will return some thing like this
// ["17.0.0", "18.0.1", "19.0.0", "19.0.1", "19.1.0", "20.0.0",
//  "android-4.2.2", "android-4.3", "android-4.4"]

// get the latest platform and path
//# sourceMappingURL=data:application/json;base64,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aEIsZ0JBQWdCO1FBQ3RFLG9CQUFvQixHQUFwQixvQkFBb0I7UUFBRSxZQUFZLEdBQVosWUFBWTtRQUFFLG1CQUFtQixHQUFuQixtQkFBbUI7UUFBRSx3QkFBd0IsR0FBeEIsd0JBQXdCO1FBQ2pGLGVBQWUsR0FBZixlQUFlO1FBQUUsYUFBYSxHQUFiLGFBQWE7UUFBRSx3QkFBd0IsR0FBeEIsd0JBQXdCO1FBQUUsV0FBVyxHQUFYLFdBQVc7UUFDckUsT0FBTyxHQUFQLE9BQU87UUFBRSxnQkFBZ0IsR0FBaEIsZ0JBQWdCIiwiZmlsZSI6ImxpYi9oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBzeXN0ZW0sIGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlci5qcyc7XG5pbXBvcnQgQWRtWmlwIGZyb20gJ2FkbS16aXAnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5cbmNvbnN0IHJvb3REaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBwcm9jZXNzLmVudi5OT19QUkVDT01QSUxFID8gJy4uJyA6ICcuLi8uLicpO1xuY29uc3QgYW5kcm9pZFBsYXRmb3JtcyA9IFsnYW5kcm9pZC00LjInLCAnYW5kcm9pZC0xNycsICdhbmRyb2lkLTQuMycsICdhbmRyb2lkLTE4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQtNC40JywgJ2FuZHJvaWQtMTknLCAnYW5kcm9pZC1MJywgJ2FuZHJvaWQtMjAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC01LjAnLCAnYW5kcm9pZC0yMScsICdhbmRyb2lkLTIyJywgJ2FuZHJvaWQtTU5DJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQtMjMnLCAnYW5kcm9pZC02LjAnXTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0RGlyZWN0b3JpZXMgKHJvb3RQYXRoKSB7XG4gIGxldCBmaWxlcyA9IGF3YWl0IGZzLnJlYWRkaXIocm9vdFBhdGgpO1xuICBsZXQgZGlycyA9IFtdO1xuICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgbGV0IHBhdGhTdHJpbmcgPSBwYXRoLnJlc29sdmUocm9vdFBhdGgsIGZpbGUpO1xuICAgIGlmICgoYXdhaXQgZnMubHN0YXQocGF0aFN0cmluZykpLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIGRpcnMucHVzaChmaWxlKTtcbiAgICB9XG4gIH1cbiAgLy8gSXQgaXMgbm90IGEgY2xlYW4gd2F5IHRvIHNvcnQgaXQsIGJ1dCBpbiB0aGlzIGNhc2Ugd291bGQgd29yayBmaW5lIGJlY2F1c2VcbiAgLy8gd2UgaGF2ZSBudW1lcmljcyBhbmQgYWxwaGFudW1lcmljXG4gIC8vIHdpbGwgcmV0dXJuIHNvbWUgdGhpbmcgbGlrZSB0aGlzXG4gIC8vIFtcIjE3LjAuMFwiLCBcIjE4LjAuMVwiLCBcIjE5LjAuMFwiLCBcIjE5LjAuMVwiLCBcIjE5LjEuMFwiLCBcIjIwLjAuMFwiLFxuICAvLyAgXCJhbmRyb2lkLTQuMi4yXCIsIFwiYW5kcm9pZC00LjNcIiwgXCJhbmRyb2lkLTQuNFwiXVxuICByZXR1cm4gZGlycy5zb3J0KCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFuZHJvaWRQbGF0Zm9ybUFuZFBhdGggKCkge1xuICBjb25zdCBhbmRyb2lkSG9tZSA9IHByb2Nlc3MuZW52LkFORFJPSURfSE9NRTtcbiAgaWYgKCFfLmlzU3RyaW5nKGFuZHJvaWRIb21lKSkge1xuICAgIGxvZy5lcnJvcihcIkFORFJPSURfSE9NRSB3YXMgbm90IGV4cG9ydGVkIVwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIGdldCB0aGUgbGF0ZXN0IHBsYXRmb3JtIGFuZCBwYXRoXG4gIGZvciAobGV0IHBsYXRmb3JtIG9mIF8uY2xvbmUoYW5kcm9pZFBsYXRmb3JtcykucmV2ZXJzZSgpKSB7XG4gICAgbGV0IHBsYXRmb3JtcyA9IHBhdGgucmVzb2x2ZShhbmRyb2lkSG9tZSwgJ3BsYXRmb3JtcycpO1xuICAgIGxldCBwbGF0Zm9ybVBhdGggPSBwYXRoLnJlc29sdmUocGxhdGZvcm1zLCBwbGF0Zm9ybSk7XG4gICAgaWYgKGF3YWl0IGZzLmV4aXN0cyhwbGF0Zm9ybVBhdGgpKSB7XG4gICAgICByZXR1cm4ge3BsYXRmb3JtLCBwbGF0Zm9ybVBhdGh9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdW56aXBGaWxlICh6aXBQYXRoKSB7XG4gIGxvZy5kZWJ1ZyhgVW56aXBwaW5nICR7emlwUGF0aH1gKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBhc3NlcnRaaXBBcmNoaXZlKHppcFBhdGgpO1xuICAgIGlmIChzeXN0ZW0uaXNXaW5kb3dzKCkpIHtcbiAgICAgIGxldCB6aXAgPSBuZXcgQWRtWmlwKHppcFBhdGgpO1xuICAgICAgemlwLmV4dHJhY3RBbGxUbyhwYXRoLmRpcm5hbWUoemlwUGF0aCksIHRydWUpO1xuICAgICAgbG9nLmRlYnVnKFwiVW56aXAgc3VjY2Vzc2Z1bFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgZXhlYygndW56aXAnLCBbJy1vJywgemlwUGF0aF0sIHtjd2Q6IHBhdGguZGlybmFtZSh6aXBQYXRoKX0pO1xuICAgICAgbG9nLmRlYnVnKFwiVW56aXAgc3VjY2Vzc2Z1bFwiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIG9jY3VycmVkIHdoaWxlIHVuemlwcGluZy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFzc2VydFppcEFyY2hpdmUgKHppcFBhdGgpIHtcbiAgbG9nLmRlYnVnKGBUZXN0aW5nIHppcCBhcmNoaXZlOiAke3ppcFBhdGh9YCk7XG4gIGlmIChzeXN0ZW0uaXNXaW5kb3dzKCkpIHtcbiAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKHppcFBhdGgpKSB7XG4gICAgICBsb2cuZGVidWcoXCJaaXAgYXJjaGl2ZSB0ZXN0ZWQgY2xlYW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWmlwIGFyY2hpdmUgbm90IHByZXNlbnQgYXQgJHt6aXBQYXRofWApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgZXhlY09wdHMgPSB7Y3dkOiBwYXRoLmRpcm5hbWUoemlwUGF0aCl9O1xuICAgIGF3YWl0IGV4ZWMoJ3VuemlwJywgWyctdHEnLCB6aXBQYXRoXSwgZXhlY09wdHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldElNRUxpc3RGcm9tT3V0cHV0IChzdGRvdXQpIHtcbiAgbGV0IGVuZ2luZXMgPSBbXTtcbiAgZm9yIChsZXQgbGluZSBvZiBzdGRvdXQuc3BsaXQoJ1xcbicpKSB7XG4gICAgaWYgKGxpbmUubGVuZ3RoID4gMCAmJiBsaW5lWzBdICE9PSAnICcpIHtcbiAgICAgIC8vIHJlbW92ZSBuZXdsaW5lIGFuZCB0cmFpbGluZyBjb2xvbiwgYW5kIGFkZCB0byB0aGUgbGlzdFxuICAgICAgZW5naW5lcy5wdXNoKGxpbmUudHJpbSgpLnJlcGxhY2UoLzokLywgJycpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVuZ2luZXM7XG59XG5cbmZ1bmN0aW9uIGdldEphdmFGb3JPcyAoKSB7XG4gIGNvbnN0IHNlcCA9IHBhdGguc2VwO1xuICBsZXQgamF2YSA9IGAke2dldEphdmFIb21lKCl9JHtzZXB9YmluJHtzZXB9amF2YWA7XG4gIGlmIChzeXN0ZW0uaXNXaW5kb3dzKCkpIHtcbiAgICBqYXZhID0gamF2YSArICcuZXhlJztcbiAgfVxuICByZXR1cm4gamF2YTtcbn1cblxuZnVuY3Rpb24gZ2V0SmF2YUhvbWUgKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuSkFWQV9IT01FKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MuZW52LkpBVkFfSE9NRTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXCJKQVZBX0hPTUUgaXMgbm90IHNldCBjdXJyZW50bHkuIFBsZWFzZSBzZXQgSkFWQV9IT01FLlwiKTtcbn1cblxuLypcbiAqIENoZWNrcyBtU2hvd2luZ0xvY2tzY3JlZW4gaW4gZHVtcHN5cyBvdXRwdXQgdG8gZGV0ZXJtaW5lIGlmIGxvY2sgc2NyZWVuIGlzIHNob3dpbmdcbiAqL1xuZnVuY3Rpb24gaXNTaG93aW5nTG9ja3NjcmVlbiAoZHVtcHN5cykge1xuICBsZXQgbSA9IC9tU2hvd2luZ0xvY2tzY3JlZW49XFx3Ky9naS5leGVjKGR1bXBzeXMpO1xuICBsZXQgcmV0ID0gKG0gJiYgbS5sZW5ndGggJiYgbVswXS5zcGxpdCgnPScpWzFdID09PSAndHJ1ZScpIHx8IGZhbHNlO1xuICByZXR1cm4gcmV0O1xufVxuXG4vKlxuICogQ2hlY2tzIG1DdXJyZW50Rm9jdXMgaW4gZHVtcHN5cyBvdXRwdXQgdG8gZGV0ZXJtaW5lIGlmIEtleWd1YXJkIGlzIGFjdGl2YXRlZFxuICovXG5mdW5jdGlvbiBpc0N1cnJlbnRGb2N1c09uS2V5Z3VhcmQgKGR1bXBzeXMpIHtcbiAgbGV0IG0gPSAvbUN1cnJlbnRGb2N1cy4rS2V5Z3VhcmQvZ2kuZXhlYyhkdW1wc3lzKTtcbiAgcmV0dXJuIChtICYmIG0ubGVuZ3RoICYmIG1bMF0pID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG4vKlxuICogQ2hlY2tzIG1TY3JlZW5PbkZ1bGx5IGluIGR1bXBzeXMgb3V0cHV0IHRvIGRldGVybWluZSBpZiBzY3JlZW4gaXMgc2hvd2luZ1xuICogRGVmYXVsdCBpcyB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzU2NyZWVuT25GdWxseSAoZHVtcHN5cykge1xuICBsZXQgbSA9IC9tU2NyZWVuT25GdWxseT1cXHcrL2dpLmV4ZWMoZHVtcHN5cyk7XG4gIHJldHVybiAhbSB8fCAvLyBpZiBpbmZvcm1hdGlvbiBpcyBtaXNzaW5nIHdlIGFzc3VtZSBzY3JlZW4gaXMgZnVsbHkgb25cbiAgICAgICAgIChtICYmIG0ubGVuZ3RoID4gMCAmJiBtWzBdLnNwbGl0KCc9JylbMV0gPT09ICd0cnVlJykgfHwgZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkU3RhcnRDbWQgKHN0YXJ0QXBwT3B0aW9ucywgYXBpTGV2ZWwpIHtcbiAgbGV0IGNtZCA9IFsnYW0nLCAnc3RhcnQnLCAnLW4nLCBgJHtzdGFydEFwcE9wdGlvbnMucGtnfS8ke3N0YXJ0QXBwT3B0aW9ucy5hY3Rpdml0eX1gXTtcbiAgaWYgKHN0YXJ0QXBwT3B0aW9ucy5zdG9wQXBwICYmIGFwaUxldmVsID49IDE1KSB7XG4gICAgY21kLnB1c2goJy1TJyk7XG4gIH1cbiAgaWYgKHN0YXJ0QXBwT3B0aW9ucy5hY3Rpb24pIHtcbiAgICBjbWQucHVzaCgnLWEnLCBzdGFydEFwcE9wdGlvbnMuYWN0aW9uKTtcbiAgfVxuICBpZiAoc3RhcnRBcHBPcHRpb25zLmNhdGVnb3J5KSB7XG4gICAgY21kLnB1c2goJy1jJywgc3RhcnRBcHBPcHRpb25zLmNhdGVnb3J5KTtcbiAgfVxuICBpZiAoc3RhcnRBcHBPcHRpb25zLmZsYWdzKSB7XG4gICAgY21kLnB1c2goJy1mJywgc3RhcnRBcHBPcHRpb25zLmZsYWdzKTtcbiAgfVxuICBpZiAoc3RhcnRBcHBPcHRpb25zLm9wdGlvbmFsSW50ZW50QXJndW1lbnRzKSB7XG4gICAgLy8gZXhwZWN0IG9wdGlvbmFsSW50ZW50QXJndW1lbnRzIHRvIGJlIHNvbWV0aGluZyBsaWtlICcteCBvcHRpb25zJyxcbiAgICAvLyAnLXkgb3B0aW9uIGFyZ3VtZW50JyBvciBhIGNvbWJpbmF0aW9uIG9mIHRoZSB0d29cbiAgICBsZXQgYXJnUmUgPSAvKC1bXlxcc10rKSAoW14tXSspL2c7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGxldCBvcHRpb25hbEludGVudEFyZ3VtZW50cyA9IGFyZ1JlLmV4ZWMoc3RhcnRBcHBPcHRpb25zLm9wdGlvbmFsSW50ZW50QXJndW1lbnRzKTtcbiAgICAgIGlmICghb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsZXQgZmxhZyA9IG9wdGlvbmFsSW50ZW50QXJndW1lbnRzWzFdO1xuICAgICAgbGV0IHNwYWNlID0gb3B0aW9uYWxJbnRlbnRBcmd1bWVudHNbMl0uaW5kZXhPZignICcpO1xuICAgICAgbGV0IGFyZywgdmFsdWU7XG4gICAgICBpZiAoc3BhY2UgPT09IC0xKSB7XG4gICAgICAgIGFyZyA9IG9wdGlvbmFsSW50ZW50QXJndW1lbnRzWzJdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJnID0gb3B0aW9uYWxJbnRlbnRBcmd1bWVudHNbMl0uc3Vic3RyaW5nKDAsIHNwYWNlKS50cmltKCk7XG4gICAgICAgIHZhbHVlID0gb3B0aW9uYWxJbnRlbnRBcmd1bWVudHNbMl0uc3Vic3RyaW5nKHNwYWNlICsgMSkudHJpbSgpO1xuICAgICAgfVxuICAgICAgY21kLnB1c2goZmxhZywgYXJnKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBjbWQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjbWQ7XG59XG5cbi8vIHR1cm5zIHBrZy5hY3Rpdml0eS5uYW1lIHRvIC5hY3Rpdml0eS5uYW1lXG4vLyBhbHNvIHR1cm5zIGFjdGl2aXR5Lm5hbWUgdG8gLmFjdGl2aXR5Lm5hbWVcbmZ1bmN0aW9uIGdldFBvc3NpYmxlQWN0aXZpdHlOYW1lcyAocGtnTmFtZSwgYWN0aXZpdHlOYW1lKSB7XG4gIGxldCBuYW1lcyA9IFthY3Rpdml0eU5hbWVdO1xuICAvLyBuZWVkIHRvIGJld2FyZSBvZiBuYW1lc3BhY2VzIHdpdGggb3ZlcmxhcHBpbmcgY2hhcnM6XG4gIC8vICAgY29tLmZvby5iYXJcbiAgLy8gICBjb20uZm9vLmJhcnhcbiAgaWYgKGFjdGl2aXR5TmFtZS5pbmRleE9mKGAke3BrZ05hbWV9LmApID09PSAwKSB7XG4gICAgbmFtZXMucHVzaChhY3Rpdml0eU5hbWUuc3Vic3RyaW5nKHBrZ05hbWUubGVuZ3RoKSk7XG4gIH1cbiAgaWYgKGFjdGl2aXR5TmFtZVswXSAhPT0gJy4nKSB7XG4gICAgbmFtZXMucHVzaChgLiR7YWN0aXZpdHlOYW1lfWApO1xuICB9XG4gIHJldHVybiBuYW1lcztcbn1cblxuZXhwb3J0IHsgZ2V0RGlyZWN0b3JpZXMsIGdldEFuZHJvaWRQbGF0Zm9ybUFuZFBhdGgsIHVuemlwRmlsZSwgYXNzZXJ0WmlwQXJjaGl2ZSxcbiAgICAgICAgIGdldElNRUxpc3RGcm9tT3V0cHV0LCBnZXRKYXZhRm9yT3MsIGlzU2hvd2luZ0xvY2tzY3JlZW4sIGlzQ3VycmVudEZvY3VzT25LZXlndWFyZCxcbiAgICAgICAgIGlzU2NyZWVuT25GdWxseSwgYnVpbGRTdGFydENtZCwgZ2V0UG9zc2libGVBY3Rpdml0eU5hbWVzLCBnZXRKYXZhSG9tZSxcbiAgICAgICAgIHJvb3REaXIsIGFuZHJvaWRQbGF0Zm9ybXMgfTtcbiJdfQ==