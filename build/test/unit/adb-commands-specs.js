'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _libLogcatJs = require('../../lib/logcat.js');

var _libLogcatJs2 = _interopRequireDefault(_libLogcatJs);

var _libLoggerJs = require('../../lib/logger.js');

var _libLoggerJs2 = _interopRequireDefault(_libLoggerJs);

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].use(_chaiAsPromised2['default']);
var should = _chai2['default'].should();
var apiLevel = '21',
    platformVersion = '4.4.4',
    language = 'en',
    country = 'US',
    locale = 'en-US',
    IME = 'com.android.inputmethod.latin/.LatinIME',
    imeList = 'com.android.inputmethod.latin/.LatinIME:\n  mId=com.android.inputmethod.latin/.LatinIME mSettingsActivityName=com.android\n  mIsDefaultResId=0x7f070000\n  Service:\n    priority=0 preferredOrder=0 match=0x108000 specificIndex=-1 isDefault=false\n    ServiceInfo:\n      name=com.android.inputmethod.latin.LatinIME\n      packageName=com.android.inputmethod.latin\n      labelRes=0x7f0a0037 nonLocalizedLabel=null icon=0x0 banner=0x0\n      enabled=true exported=true processName=com.android.inputmethod.latin\n      permission=android.permission.BIND_INPUT_METHOD\n      flags=0x0',
    psOutput = 'USER     PID   PPID  VSIZE  RSS     WCHAN    PC   NAME\nu0_a101   5078  3129  487404 37044 ffffffff b76ce565 S com.example.android.contactmanager',
    contactManagerPackage = 'com.example.android.contactmanager';

describe('adb commands', function () {
  var adb = new _2['default']();
  var logcat = new _libLogcatJs2['default']({
    adb: adb,
    debug: false,
    debugTrace: false
  });
  describe('shell', function () {
    describe('getApiLevel', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.build.version.sdk']).returns(apiLevel);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getApiLevel());

            case 3:
              context$4$0.t0 = apiLevel;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getPlatformVersion', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.build.version.release']).returns(platformVersion);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getPlatformVersion());

            case 3:
              context$4$0.t0 = platformVersion;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceSysLanguage', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.language']).returns(language);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceSysLanguage());

            case 3:
              context$4$0.t0 = language;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setDeviceSysLanguage', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['setprop', 'persist.sys.language', language]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setDeviceSysLanguage(language));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceSysCountry', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.country']).returns(country);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceSysCountry());

            case 3:
              context$4$0.t0 = country;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setDeviceSysCountry', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['setprop', 'persist.sys.country', country]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setDeviceSysCountry(country));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceSysLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.locale']).returns(locale);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceSysLocale());

            case 3:
              context$4$0.t0 = locale;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setDeviceSysLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['setprop', 'persist.sys.locale', locale]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setDeviceSysLocale(locale));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceProductLanguage', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale.language']).returns(language);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceProductLanguage());

            case 3:
              context$4$0.t0 = language;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceProductCountry', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale.region']).returns(country);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceProductCountry());

            case 3:
              context$4$0.t0 = country;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceProductLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale']).returns(locale);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceProductLocale());

            case 3:
              context$4$0.t0 = locale;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('availableIMEs', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['ime', 'list', '-a']).returns(imeList);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.availableIMEs());

            case 3:
              context$4$0.sent.should.have.length.above(0);

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('enabledIMEs', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['ime', 'list']).returns(imeList);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.enabledIMEs());

            case 3:
              context$4$0.sent.should.have.length.above(0);

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('defaultIME', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      var defaultIME = 'com.android.inputmethod.latin/.LatinIME';
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['settings', 'get', 'secure', 'default_input_method']).returns(defaultIME);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.defaultIME());

            case 3:
              context$4$0.t0 = defaultIME;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('disableIME', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['ime', 'disable', IME]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.disableIME(IME));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('enableIME', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['ime', 'enable', IME]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.enableIME(IME));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('keyevent', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        var keycode, code;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              keycode = '29';
              code = parseInt(keycode, 10);

              mocks.adb.expects("shell").once().withExactArgs(['input', 'keyevent', code]).returns("");
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.keyevent(keycode));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('inputText', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        var text, expectedText;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              text = 'some text';
              expectedText = 'some%stext';

              mocks.adb.expects("shell").once().withExactArgs(['input', 'text', expectedText]).returns("");
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.inputText(text));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('lock', (0, _appiumTestSupport.withMocks)({ adb: adb, log: _libLoggerJs2['default'] }, function (mocks) {
      it('should call isScreenLocked, keyevent and errorAndThrow', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isScreenLocked").atLeast(2).returns(false);
              mocks.adb.expects("keyevent").once().withExactArgs(26).returns("");
              mocks.log.expects("errorAndThrow").once().returns("");
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.lock());

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('back', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call keyevent with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("keyevent").once().withExactArgs(4).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.back());

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('goToHome', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call keyevent with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("keyevent").once().withExactArgs(3).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.goToHome());

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe.skip('isScreenLocked', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call keyevent with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("keyevent").once().withExactArgs(3).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.goToHome());

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('isSoftKeyboardPresent', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should return false', function callee$3$0() {
        var _ref, isKeyboardShown, canCloseKeyboard;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['dumpsys', 'input_method']).returns("mInputShown=false");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isSoftKeyboardPresent());

            case 3:
              _ref = context$4$0.sent;
              isKeyboardShown = _ref.isKeyboardShown;
              canCloseKeyboard = _ref.canCloseKeyboard;

              canCloseKeyboard.should.be['false'];
              isKeyboardShown.should.be['false'];
              mocks.adb.verify();

            case 9:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args and should return true', function callee$3$0() {
        var _ref2, isKeyboardShown, canCloseKeyboard;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['dumpsys', 'input_method']).returns("mInputShown=true mIsInputViewShown=true");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isSoftKeyboardPresent());

            case 3:
              _ref2 = context$4$0.sent;
              isKeyboardShown = _ref2.isKeyboardShown;
              canCloseKeyboard = _ref2.canCloseKeyboard;

              isKeyboardShown.should.be['true'];
              canCloseKeyboard.should.be['true'];
              mocks.adb.verify();

            case 9:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('isAirplaneModeOn', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should be true', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['settings', 'get', 'global', 'airplane_mode_on']).returns("1");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isAirplaneModeOn());

            case 3:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args and should be false', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['settings', 'get', 'global', 'airplane_mode_on']).returns("0");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isAirplaneModeOn());

            case 3:
              context$4$0.sent.should.be['false'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setAirplaneMode', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['settings', 'put', 'global', 'airplane_mode_on', 1]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setAirplaneMode(1));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('broadcastAirplaneMode', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', 'android.intent.action.AIRPLANE_MODE', '--ez', 'state', 'true']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.broadcastAirplaneMode(true));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('isWifiOn', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should be true', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['settings', 'get', 'global', 'wifi_on']).returns("1");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isWifiOn());

            case 3:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args and should be false', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['settings', 'get', 'global', 'wifi_on']).returns("0");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isWifiOn());

            case 3:
              context$4$0.sent.should.be['false'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setWifiState', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'start', '-n', 'io.appium.settings/.Settings', '-e', 'wifi', 'on']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiState(true));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('isDataOn', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should be true', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['settings', 'get', 'global', 'mobile_data']).returns("1");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isDataOn());

            case 3:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args and should be false', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['settings', 'get', 'global', 'mobile_data']).returns("0");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isDataOn());

            case 3:
              context$4$0.sent.should.be['false'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setDataState', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'start', '-n', 'io.appium.settings/.Settings', '-e', 'data', 'on']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setDataState(true));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setWifiAndData', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args when turning only wifi on', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'start', '-n', 'io.appium.settings/.Settings', '-e', 'wifi', 'on']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ wifi: true }));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args when turning only wifi off', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'start', '-n', 'io.appium.settings/.Settings', '-e', 'wifi', 'off']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ wifi: false }));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args when turning only data on', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'start', '-n', 'io.appium.settings/.Settings', '-e', 'data', 'on']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ data: true }));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args when turning only data off', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'start', '-n', 'io.appium.settings/.Settings', '-e', 'data', 'off']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ data: false }));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args when turning both wifi and data on', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'start', '-n', 'io.appium.settings/.Settings', '-e', 'wifi', 'on', '-e', 'data', 'on']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ wifi: true, data: true }));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args when turning both wifi and data off', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'start', '-n', 'io.appium.settings/.Settings', '-e', 'wifi', 'off', '-e', 'data', 'off']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ wifi: false, data: false }));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('processExists', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should find process', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs("ps").returns(psOutput);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.processExists(contactManagerPackage));

            case 3:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args and should not find process', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs("ps").returns("foo");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.processExists(contactManagerPackage));

            case 3:
              context$4$0.sent.should.be['false'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('forwardPort', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      var sysPort = 12345,
          devicePort = 54321;
      it('forwardPort should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("adbExec").once().withExactArgs(['forward', 'tcp:' + sysPort, 'tcp:' + devicePort]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.forwardPort(sysPort, devicePort));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('forwardAbstractPort should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("adbExec").once().withExactArgs(['forward', 'tcp:' + sysPort, 'localabstract:' + devicePort]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.forwardAbstractPort(sysPort, devicePort));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('ping', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should return true', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(["echo", "ping"]).returns("ping");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.ping());

            case 3:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('restart', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call adb in correct order', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("stopLogcat").once().returns("");
              mocks.adb.expects("restartAdb").once().returns("");
              mocks.adb.expects("waitForDevice").once().returns("");
              mocks.adb.expects("startLogcat").once().returns("");
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.restart());

            case 6:
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('stopLogcat', (0, _appiumTestSupport.withMocks)({ logcat: logcat }, function (mocks) {
      it('should call stopCapture', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              adb.logcat = logcat;
              mocks.logcat.expects("stopCapture").once().returns("");
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.stopLogcat());

            case 4:
              mocks.logcat.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getLogcatLogs', (0, _appiumTestSupport.withMocks)({ logcat: logcat }, function (mocks) {
      it('should call getLogs', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              adb.logcat = logcat;
              mocks.logcat.expects("getLogs").once().returns("");
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.getLogcatLogs());

            case 4:
              mocks.logcat.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getPIDsByName', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell and parse pids correctly', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(["ps", '.contactmanager']).returns(psOutput);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getPIDsByName(contactManagerPackage));

            case 3:
              context$4$0.sent[0].should.equal(5078);

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('killProcessesByName', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call getPIDsByName and kill process correctly', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getPIDsByName").once().withExactArgs(contactManagerPackage).returns([5078]);
              mocks.adb.expects("killProcessByPID").once().withExactArgs(5078).returns("");
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.killProcessesByName(contactManagerPackage));

            case 4:
              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('killProcessByPID', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call kill process correctly', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['kill', 5078]).returns();
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.killProcessByPID(5078));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('broadcastProcessEnd', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should broadcast process end', function callee$3$0() {
        var intent, processName;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              intent = 'intent', processName = 'processName';

              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', intent]).returns("");
              mocks.adb.expects("processExists").once().withExactArgs(processName).returns(false);
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.broadcastProcessEnd(intent, processName));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('broadcast', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should broadcast intent', function callee$3$0() {
        var intent;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              intent = 'intent';

              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', intent]).returns("");
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.broadcast(intent));

            case 4:
              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('instrument', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct arguments', function callee$3$0() {
        var intent;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              intent = 'intent';

              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', intent]).returns("");
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.broadcast(intent));

            case 4:
              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('androidCoverage', (0, _appiumTestSupport.withMocks)({ adb: adb, teen_process: teen_process }, function (mocks) {
      it('should call shell with correct arguments', function callee$3$0() {
        var conn, instrumentClass, waitPkg, waitActivity, args;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              adb.executable.defaultArgs = [];
              adb.executable.path = "dummy_adb_path";
              conn = new _events2['default'].EventEmitter();

              conn.start = function () {}; // do nothing
              instrumentClass = 'instrumentClass', waitPkg = 'waitPkg', waitActivity = 'waitActivity';
              args = adb.executable.defaultArgs.concat(['shell', 'am', 'instrument', '-e', 'coverage', 'true', '-w']).concat([instrumentClass]);

              mocks.teen_process.expects("SubProcess").once().withExactArgs('dummy_adb_path', args).returns(conn);
              mocks.adb.expects("waitForActivity").once().withExactArgs(waitPkg, waitActivity).returns("");
              context$4$0.next = 10;
              return _regeneratorRuntime.awrap(adb.androidCoverage(instrumentClass, waitPkg, waitActivity));

            case 10:
              mocks.teen_process.verify();
              mocks.adb.verify();

            case 12:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
  });
  describe('sendTelnetCommand', (0, _appiumTestSupport.withMocks)({ adb: adb, net: _net2['default'] }, function (mocks) {
    it('should call shell with correct args', function callee$2$0() {
      var port, conn, commands, p;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            port = 54321;
            conn = new _events2['default'].EventEmitter();
            commands = [];

            conn.write = function (command) {
              commands.push(command);
            };
            mocks.adb.expects("getEmulatorPort").once().withExactArgs().returns(port);
            mocks.net.expects("createConnection").once().withExactArgs(port, 'localhost').returns(conn);
            p = adb.sendTelnetCommand('avd name');

            setTimeout(function () {
              conn.emit('connect');
              conn.emit('data', 'OK');
              conn.emit('data', 'OK');
              conn.emit('close');
            }, 0);
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(p);

          case 10:
            commands[0].should.equal("avd name\n");
            commands[1].should.equal("quit\n");
            mocks.adb.verify();
            mocks.net.verify();

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return the last line of the output only', function callee$2$0() {
      var port, conn, commands, expected, p, actual;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            port = 54321;
            conn = new _events2['default'].EventEmitter();
            commands = [];
            expected = "desired_command_output";

            conn.write = function (command) {
              commands.push(command);
            };
            mocks.adb.expects("getEmulatorPort").once().withExactArgs().returns(port);
            mocks.net.expects("createConnection").once().withExactArgs(port, 'localhost').returns(conn);
            p = adb.sendTelnetCommand('avd name');

            setTimeout(function () {
              conn.emit('connect');
              conn.emit('data', 'OK');
              conn.emit('data', 'OK\nunwanted_echo_output\n' + expected);
              conn.emit('close');
            }, 0);
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(p);

          case 11:
            actual = context$3$0.sent;

            actual.should.equal(expected);

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  it('isValidClass should correctly validate class names', function () {
    adb.isValidClass('some.package/some.package.Activity').index.should.equal(0);
    should.not.exist(adb.isValidClass('illegalPackage#/adsasd'));
  });
  it('getAdbPath should correctly return adbPath', function () {
    adb.getAdbPath().should.equal(adb.executable.path);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hZGItY29tbWFuZHMtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQzdCLE9BQU87Ozs7bUJBQ1AsS0FBSzs7OztzQkFDRixRQUFROzs7OzJCQUNSLHFCQUFxQjs7OzsyQkFDeEIscUJBQXFCOzs7OzRCQUNQLGNBQWM7O0lBQWhDLFlBQVk7O2lDQUNFLHFCQUFxQjs7QUFHL0Msa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQztBQUN6QixJQUFNLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUM3QixJQUFNLFFBQVEsR0FBRyxJQUFJO0lBQ2YsZUFBZSxHQUFHLE9BQU87SUFDekIsUUFBUSxHQUFHLElBQUk7SUFDZixPQUFPLEdBQUcsSUFBSTtJQUNkLE1BQU0sR0FBRyxPQUFPO0lBQ2hCLEdBQUcsR0FBRyx5Q0FBeUM7SUFDL0MsT0FBTyx5a0JBV0c7SUFDVixRQUFRLHNKQUM0RTtJQUNwRixxQkFBcUIsR0FBRyxvQ0FBb0MsQ0FBQzs7QUFFbkUsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFNO0FBQzdCLE1BQUksR0FBRyxHQUFHLG1CQUFTLENBQUM7QUFDcEIsTUFBSSxNQUFNLEdBQUcsNkJBQVc7QUFDdEIsT0FBRyxFQUFFLEdBQUc7QUFDUixTQUFLLEVBQUUsS0FBSztBQUNaLGNBQVUsRUFBRSxLQUFLO0dBQ2xCLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBTTtBQUN0QixZQUFRLENBQUMsYUFBYSxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ2xELFFBQUUsQ0FBQyxxQ0FBcUMsRUFBRTs7OztBQUN4QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsRUFB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LEVBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsa0JBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLDRCQUE0QixHQUFHLFFBQVEsQ0FBQyxDQUFDO0FBQzFELGtCQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzZDQUNhLENBQUM7OztBQUFoQixrQkFBTTs7QUFDVixBQUFDLGtCQUFNLENBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7OztLQUNqQyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLElBQUUsQ0FBQyxvREFBb0QsRUFBRSxZQUFNO0FBQzdELE9BQUcsQ0FBQyxZQUFZLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RSxVQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztHQUM5RCxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNENBQTRDLEVBQUUsWUFBTTtBQUNyRCxPQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3BELENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvYWRiLWNvbW1hbmRzLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQURCIGZyb20gJy4uLy4uJztcbmltcG9ydCBuZXQgZnJvbSAnbmV0JztcbmltcG9ydCBldmVudHMgZnJvbSAnZXZlbnRzJztcbmltcG9ydCBMb2djYXQgZnJvbSAnLi4vLi4vbGliL2xvZ2NhdC5qcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4uLy4uL2xpYi9sb2dnZXIuanMnO1xuaW1wb3J0ICogYXMgdGVlbl9wcm9jZXNzIGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgeyB3aXRoTW9ja3MgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcblxuXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5jb25zdCBzaG91bGQgPSBjaGFpLnNob3VsZCgpO1xuY29uc3QgYXBpTGV2ZWwgPSAnMjEnLFxuICAgICAgcGxhdGZvcm1WZXJzaW9uID0gJzQuNC40JyxcbiAgICAgIGxhbmd1YWdlID0gJ2VuJyxcbiAgICAgIGNvdW50cnkgPSAnVVMnLFxuICAgICAgbG9jYWxlID0gJ2VuLVVTJyxcbiAgICAgIElNRSA9ICdjb20uYW5kcm9pZC5pbnB1dG1ldGhvZC5sYXRpbi8uTGF0aW5JTUUnLFxuICAgICAgaW1lTGlzdCA9IGBjb20uYW5kcm9pZC5pbnB1dG1ldGhvZC5sYXRpbi8uTGF0aW5JTUU6XG4gIG1JZD1jb20uYW5kcm9pZC5pbnB1dG1ldGhvZC5sYXRpbi8uTGF0aW5JTUUgbVNldHRpbmdzQWN0aXZpdHlOYW1lPWNvbS5hbmRyb2lkXG4gIG1Jc0RlZmF1bHRSZXNJZD0weDdmMDcwMDAwXG4gIFNlcnZpY2U6XG4gICAgcHJpb3JpdHk9MCBwcmVmZXJyZWRPcmRlcj0wIG1hdGNoPTB4MTA4MDAwIHNwZWNpZmljSW5kZXg9LTEgaXNEZWZhdWx0PWZhbHNlXG4gICAgU2VydmljZUluZm86XG4gICAgICBuYW1lPWNvbS5hbmRyb2lkLmlucHV0bWV0aG9kLmxhdGluLkxhdGluSU1FXG4gICAgICBwYWNrYWdlTmFtZT1jb20uYW5kcm9pZC5pbnB1dG1ldGhvZC5sYXRpblxuICAgICAgbGFiZWxSZXM9MHg3ZjBhMDAzNyBub25Mb2NhbGl6ZWRMYWJlbD1udWxsIGljb249MHgwIGJhbm5lcj0weDBcbiAgICAgIGVuYWJsZWQ9dHJ1ZSBleHBvcnRlZD10cnVlIHByb2Nlc3NOYW1lPWNvbS5hbmRyb2lkLmlucHV0bWV0aG9kLmxhdGluXG4gICAgICBwZXJtaXNzaW9uPWFuZHJvaWQucGVybWlzc2lvbi5CSU5EX0lOUFVUX01FVEhPRFxuICAgICAgZmxhZ3M9MHgwYCxcbiAgICAgIHBzT3V0cHV0ID0gYFVTRVIgICAgIFBJRCAgIFBQSUQgIFZTSVpFICBSU1MgICAgIFdDSEFOICAgIFBDICAgTkFNRVxudTBfYTEwMSAgIDUwNzggIDMxMjkgIDQ4NzQwNCAzNzA0NCBmZmZmZmZmZiBiNzZjZTU2NSBTIGNvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXJgLFxuICAgICAgY29udGFjdE1hbmFnZXJQYWNrYWdlID0gJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInO1xuXG5kZXNjcmliZSgnYWRiIGNvbW1hbmRzJywgKCkgPT4ge1xuICBsZXQgYWRiID0gbmV3IEFEQigpO1xuICBsZXQgbG9nY2F0ID0gbmV3IExvZ2NhdCh7XG4gICAgYWRiOiBhZGJcbiAgLCBkZWJ1ZzogZmFsc2VcbiAgLCBkZWJ1Z1RyYWNlOiBmYWxzZVxuICB9KTtcbiAgZGVzY3JpYmUoJ3NoZWxsJywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCdnZXRBcGlMZXZlbCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3JvLmJ1aWxkLnZlcnNpb24uc2RrJ10pXG4gICAgICAgICAgLnJldHVybnMoYXBpTGV2ZWwpO1xuICAgICAgICAoYXdhaXQgYWRiLmdldEFwaUxldmVsKCkpLnNob3VsZC5lcXVhbChhcGlMZXZlbCk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnZ2V0UGxhdGZvcm1WZXJzaW9uJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2dldHByb3AnLCAncm8uYnVpbGQudmVyc2lvbi5yZWxlYXNlJ10pXG4gICAgICAgICAgLnJldHVybnMocGxhdGZvcm1WZXJzaW9uKTtcbiAgICAgICAgKGF3YWl0IGFkYi5nZXRQbGF0Zm9ybVZlcnNpb24oKSkuc2hvdWxkLmVxdWFsKHBsYXRmb3JtVmVyc2lvbik7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnZ2V0RGV2aWNlU3lzTGFuZ3VhZ2UnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdwZXJzaXN0LnN5cy5sYW5ndWFnZSddKVxuICAgICAgICAgIC5yZXR1cm5zKGxhbmd1YWdlKTtcbiAgICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VTeXNMYW5ndWFnZSgpKS5zaG91bGQuZXF1YWwobGFuZ3VhZ2UpO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gICAgZGVzY3JpYmUoJ3NldERldmljZVN5c0xhbmd1YWdlJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3NldHByb3AnLCAncGVyc2lzdC5zeXMubGFuZ3VhZ2UnLCBsYW5ndWFnZV0pXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VTeXNMYW5ndWFnZShsYW5ndWFnZSk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnZ2V0RGV2aWNlU3lzQ291bnRyeScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3BlcnNpc3Quc3lzLmNvdW50cnknXSlcbiAgICAgICAgICAucmV0dXJucyhjb3VudHJ5KTtcbiAgICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VTeXNDb3VudHJ5KCkpLnNob3VsZC5lcXVhbChjb3VudHJ5KTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdzZXREZXZpY2VTeXNDb3VudHJ5Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3NldHByb3AnLCAncGVyc2lzdC5zeXMuY291bnRyeScsIGNvdW50cnldKVxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlU3lzQ291bnRyeShjb3VudHJ5KTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdnZXREZXZpY2VTeXNMb2NhbGUnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdwZXJzaXN0LnN5cy5sb2NhbGUnXSlcbiAgICAgICAgICAucmV0dXJucyhsb2NhbGUpO1xuICAgICAgICAoYXdhaXQgYWRiLmdldERldmljZVN5c0xvY2FsZSgpKS5zaG91bGQuZXF1YWwobG9jYWxlKTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdzZXREZXZpY2VTeXNMb2NhbGUnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc2V0cHJvcCcsICdwZXJzaXN0LnN5cy5sb2NhbGUnLCBsb2NhbGVdKVxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlU3lzTG9jYWxlKGxvY2FsZSk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnZ2V0RGV2aWNlUHJvZHVjdExhbmd1YWdlJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2dldHByb3AnLCAncm8ucHJvZHVjdC5sb2NhbGUubGFuZ3VhZ2UnXSlcbiAgICAgICAgICAucmV0dXJucyhsYW5ndWFnZSk7XG4gICAgICAgIChhd2FpdCBhZGIuZ2V0RGV2aWNlUHJvZHVjdExhbmd1YWdlKCkpLnNob3VsZC5lcXVhbChsYW5ndWFnZSk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnZ2V0RGV2aWNlUHJvZHVjdENvdW50cnknLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdyby5wcm9kdWN0LmxvY2FsZS5yZWdpb24nXSlcbiAgICAgICAgICAucmV0dXJucyhjb3VudHJ5KTtcbiAgICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VQcm9kdWN0Q291bnRyeSgpKS5zaG91bGQuZXF1YWwoY291bnRyeSk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnZ2V0RGV2aWNlUHJvZHVjdExvY2FsZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3JvLnByb2R1Y3QubG9jYWxlJ10pXG4gICAgICAgICAgLnJldHVybnMobG9jYWxlKTtcbiAgICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VQcm9kdWN0TG9jYWxlKCkpLnNob3VsZC5lcXVhbChsb2NhbGUpO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gICAgZGVzY3JpYmUoJ2F2YWlsYWJsZUlNRXMnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnaW1lJywgJ2xpc3QnLCAnLWEnXSlcbiAgICAgICAgICAucmV0dXJucyhpbWVMaXN0KTtcbiAgICAgICAgKGF3YWl0IGFkYi5hdmFpbGFibGVJTUVzKCkpLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdlbmFibGVkSU1FcycsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydpbWUnLCAnbGlzdCddKVxuICAgICAgICAgIC5yZXR1cm5zKGltZUxpc3QpO1xuICAgICAgICAoYXdhaXQgYWRiLmVuYWJsZWRJTUVzKCkpLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdkZWZhdWx0SU1FJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGxldCBkZWZhdWx0SU1FID0gJ2NvbS5hbmRyb2lkLmlucHV0bWV0aG9kLmxhdGluLy5MYXRpbklNRSc7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydzZXR0aW5ncycsICdnZXQnLCAnc2VjdXJlJywgJ2RlZmF1bHRfaW5wdXRfbWV0aG9kJ10pXG4gICAgICAgICAgLnJldHVybnMoZGVmYXVsdElNRSk7XG4gICAgICAgIChhd2FpdCBhZGIuZGVmYXVsdElNRSgpKS5zaG91bGQuZXF1YWwoZGVmYXVsdElNRSk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnZGlzYWJsZUlNRScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydpbWUnLCAnZGlzYWJsZScsIElNRV0pXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICAgIGF3YWl0IGFkYi5kaXNhYmxlSU1FKElNRSk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnZW5hYmxlSU1FJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2ltZScsICdlbmFibGUnLCBJTUVdKVxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgICBhd2FpdCBhZGIuZW5hYmxlSU1FKElNRSk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgna2V5ZXZlbnQnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQga2V5Y29kZSA9ICcyOSc7XG4gICAgICAgIGxldCBjb2RlID0gcGFyc2VJbnQoa2V5Y29kZSwgMTApO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnaW5wdXQnLCAna2V5ZXZlbnQnLCBjb2RlXSlcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLmtleWV2ZW50KGtleWNvZGUpO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gICAgZGVzY3JpYmUoJ2lucHV0VGV4dCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCB0ZXh0ID0gJ3NvbWUgdGV4dCc7XG4gICAgICAgIGxldCBleHBlY3RlZFRleHQgPSAnc29tZSVzdGV4dCc7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydpbnB1dCcsICd0ZXh0JywgZXhwZWN0ZWRUZXh0XSlcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLmlucHV0VGV4dCh0ZXh0KTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdsb2NrJywgd2l0aE1vY2tzKHthZGIsIGxvZ30sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGlzU2NyZWVuTG9ja2VkLCBrZXlldmVudCBhbmQgZXJyb3JBbmRUaHJvdycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJpc1NjcmVlbkxvY2tlZFwiKVxuICAgICAgICAgIC5hdExlYXN0KDIpLnJldHVybnMoZmFsc2UpO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImtleWV2ZW50XCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKDI2KVxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgICBtb2Nrcy5sb2cuZXhwZWN0cyhcImVycm9yQW5kVGhyb3dcIilcbiAgICAgICAgICAub25jZSgpLnJldHVybnMoXCJcIik7XG4gICAgICAgIGF3YWl0IGFkYi5sb2NrKCk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnYmFjaycsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwga2V5ZXZlbnQgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwia2V5ZXZlbnRcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoNClcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLmJhY2soKTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdnb1RvSG9tZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwga2V5ZXZlbnQgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwia2V5ZXZlbnRcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoMylcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLmdvVG9Ib21lKCk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZS5za2lwKCdpc1NjcmVlbkxvY2tlZCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwga2V5ZXZlbnQgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwia2V5ZXZlbnRcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoMylcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLmdvVG9Ib21lKCk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnaXNTb2Z0S2V5Ym9hcmRQcmVzZW50Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBhbmQgc2hvdWxkIHJldHVybiBmYWxzZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2R1bXBzeXMnLCAnaW5wdXRfbWV0aG9kJ10pXG4gICAgICAgICAgLnJldHVybnMoXCJtSW5wdXRTaG93bj1mYWxzZVwiKTtcbiAgICAgICAgbGV0IHtpc0tleWJvYXJkU2hvd24sIGNhbkNsb3NlS2V5Ym9hcmR9ID0gYXdhaXQgYWRiLmlzU29mdEtleWJvYXJkUHJlc2VudCgpO1xuICAgICAgICBjYW5DbG9zZUtleWJvYXJkLnNob3VsZC5iZS5mYWxzZTtcbiAgICAgICAgaXNLZXlib2FyZFNob3duLnNob3VsZC5iZS5mYWxzZTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHNob3VsZCByZXR1cm4gdHJ1ZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2R1bXBzeXMnLCAnaW5wdXRfbWV0aG9kJ10pXG4gICAgICAgICAgLnJldHVybnMoXCJtSW5wdXRTaG93bj10cnVlIG1Jc0lucHV0Vmlld1Nob3duPXRydWVcIik7XG4gICAgICAgIGxldCB7aXNLZXlib2FyZFNob3duLCBjYW5DbG9zZUtleWJvYXJkfSA9IGF3YWl0IGFkYi5pc1NvZnRLZXlib2FyZFByZXNlbnQoKTtcbiAgICAgICAgaXNLZXlib2FyZFNob3duLnNob3VsZC5iZS50cnVlO1xuICAgICAgICBjYW5DbG9zZUtleWJvYXJkLnNob3VsZC5iZS50cnVlO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gICAgZGVzY3JpYmUoJ2lzQWlycGxhbmVNb2RlT24nLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzIGFuZCBzaG91bGQgYmUgdHJ1ZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3NldHRpbmdzJywgJ2dldCcsICdnbG9iYWwnLCAnYWlycGxhbmVfbW9kZV9vbiddKVxuICAgICAgICAgIC5yZXR1cm5zKFwiMVwiKTtcbiAgICAgICAgKGF3YWl0IGFkYi5pc0FpcnBsYW5lTW9kZU9uKCkpLnNob3VsZC5iZS50cnVlO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBhbmQgc2hvdWxkIGJlIGZhbHNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc2V0dGluZ3MnLCAnZ2V0JywgJ2dsb2JhbCcsICdhaXJwbGFuZV9tb2RlX29uJ10pXG4gICAgICAgICAgLnJldHVybnMoXCIwXCIpO1xuICAgICAgICAoYXdhaXQgYWRiLmlzQWlycGxhbmVNb2RlT24oKSkuc2hvdWxkLmJlLmZhbHNlO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gICAgZGVzY3JpYmUoJ3NldEFpcnBsYW5lTW9kZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydzZXR0aW5ncycsICdwdXQnLCAnZ2xvYmFsJywgJ2FpcnBsYW5lX21vZGVfb24nLCAxXSlcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLnNldEFpcnBsYW5lTW9kZSgxKTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdicm9hZGNhc3RBaXJwbGFuZU1vZGUnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnYW0nLCAnYnJvYWRjYXN0JywgJy1hJywgJ2FuZHJvaWQuaW50ZW50LmFjdGlvbi5BSVJQTEFORV9NT0RFJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICctLWV6JywgJ3N0YXRlJywgJ3RydWUnXSlcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLmJyb2FkY2FzdEFpcnBsYW5lTW9kZSh0cnVlKTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdpc1dpZmlPbicsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHNob3VsZCBiZSB0cnVlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc2V0dGluZ3MnLCAnZ2V0JywgJ2dsb2JhbCcsICd3aWZpX29uJ10pXG4gICAgICAgICAgLnJldHVybnMoXCIxXCIpO1xuICAgICAgICAoYXdhaXQgYWRiLmlzV2lmaU9uKCkpLnNob3VsZC5iZS50cnVlO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBhbmQgc2hvdWxkIGJlIGZhbHNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc2V0dGluZ3MnLCAnZ2V0JywgJ2dsb2JhbCcsICd3aWZpX29uJ10pXG4gICAgICAgICAgLnJldHVybnMoXCIwXCIpO1xuICAgICAgICAoYXdhaXQgYWRiLmlzV2lmaU9uKCkpLnNob3VsZC5iZS5mYWxzZTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdzZXRXaWZpU3RhdGUnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnYW0nLCAnc3RhcnQnLCAnLW4nLCAnaW8uYXBwaXVtLnNldHRpbmdzLy5TZXR0aW5ncycsICctZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnd2lmaScsICdvbiddKVxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgICBhd2FpdCBhZGIuc2V0V2lmaVN0YXRlKHRydWUpO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gICAgZGVzY3JpYmUoJ2lzRGF0YU9uJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBhbmQgc2hvdWxkIGJlIHRydWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydzZXR0aW5ncycsICdnZXQnLCAnZ2xvYmFsJywgJ21vYmlsZV9kYXRhJ10pXG4gICAgICAgICAgLnJldHVybnMoXCIxXCIpO1xuICAgICAgICAoYXdhaXQgYWRiLmlzRGF0YU9uKCkpLnNob3VsZC5iZS50cnVlO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBhbmQgc2hvdWxkIGJlIGZhbHNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc2V0dGluZ3MnLCAnZ2V0JywgJ2dsb2JhbCcsICdtb2JpbGVfZGF0YSddKVxuICAgICAgICAgIC5yZXR1cm5zKFwiMFwiKTtcbiAgICAgICAgKGF3YWl0IGFkYi5pc0RhdGFPbigpKS5zaG91bGQuYmUuZmFsc2U7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnc2V0RGF0YVN0YXRlJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2FtJywgJ3N0YXJ0JywgJy1uJywgJ2lvLmFwcGl1bS5zZXR0aW5ncy8uU2V0dGluZ3MnLCAnLWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnLCAnb24nXSlcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLnNldERhdGFTdGF0ZSh0cnVlKTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdzZXRXaWZpQW5kRGF0YScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3Mgd2hlbiB0dXJuaW5nIG9ubHkgd2lmaSBvbicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2FtJywgJ3N0YXJ0JywgJy1uJywgJ2lvLmFwcGl1bS5zZXR0aW5ncy8uU2V0dGluZ3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICctZScsICd3aWZpJywgJ29uJ10pXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICAgIGF3YWl0IGFkYi5zZXRXaWZpQW5kRGF0YSh7d2lmaTogdHJ1ZX0pO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyB3aGVuIHR1cm5pbmcgb25seSB3aWZpIG9mZicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2FtJywgJ3N0YXJ0JywgJy1uJywgJ2lvLmFwcGl1bS5zZXR0aW5ncy8uU2V0dGluZ3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICctZScsICd3aWZpJywgJ29mZiddKVxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgICBhd2FpdCBhZGIuc2V0V2lmaUFuZERhdGEoe3dpZmk6IGZhbHNlfSk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzIHdoZW4gdHVybmluZyBvbmx5IGRhdGEgb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydhbScsICdzdGFydCcsICctbicsICdpby5hcHBpdW0uc2V0dGluZ3MvLlNldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLWUnLCAnZGF0YScsICdvbiddKVxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgICBhd2FpdCBhZGIuc2V0V2lmaUFuZERhdGEoe2RhdGE6IHRydWV9KTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3Mgd2hlbiB0dXJuaW5nIG9ubHkgZGF0YSBvZmYnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydhbScsICdzdGFydCcsICctbicsICdpby5hcHBpdW0uc2V0dGluZ3MvLlNldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLWUnLCAnZGF0YScsICdvZmYnXSlcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLnNldFdpZmlBbmREYXRhKHtkYXRhOiBmYWxzZX0pO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyB3aGVuIHR1cm5pbmcgYm90aCB3aWZpIGFuZCBkYXRhIG9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnYW0nLCAnc3RhcnQnLCAnLW4nLCAnaW8uYXBwaXVtLnNldHRpbmdzLy5TZXR0aW5ncycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy1lJywgJ3dpZmknLCAnb24nLCAnLWUnLCAnZGF0YScsICdvbiddKVxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgICBhd2FpdCBhZGIuc2V0V2lmaUFuZERhdGEoe3dpZmk6IHRydWUsIGRhdGE6IHRydWV9KTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3Mgd2hlbiB0dXJuaW5nIGJvdGggd2lmaSBhbmQgZGF0YSBvZmYnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydhbScsICdzdGFydCcsICctbicsICdpby5hcHBpdW0uc2V0dGluZ3MvLlNldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLWUnLCAnd2lmaScsICdvZmYnLCAnLWUnLCAnZGF0YScsICdvZmYnXSlcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLnNldFdpZmlBbmREYXRhKHt3aWZpOiBmYWxzZSwgZGF0YTogZmFsc2V9KTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdwcm9jZXNzRXhpc3RzJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBhbmQgc2hvdWxkIGZpbmQgcHJvY2VzcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhcInBzXCIpXG4gICAgICAgICAgLnJldHVybnMocHNPdXRwdXQpO1xuICAgICAgICAoYXdhaXQgYWRiLnByb2Nlc3NFeGlzdHMoY29udGFjdE1hbmFnZXJQYWNrYWdlKSkuc2hvdWxkLmJlLnRydWU7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzIGFuZCBzaG91bGQgbm90IGZpbmQgcHJvY2VzcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhcInBzXCIpXG4gICAgICAgICAgLnJldHVybnMoXCJmb29cIik7XG4gICAgICAgIChhd2FpdCBhZGIucHJvY2Vzc0V4aXN0cyhjb250YWN0TWFuYWdlclBhY2thZ2UpKS5zaG91bGQuYmUuZmFsc2U7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnZm9yd2FyZFBvcnQnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgICAgY29uc3Qgc3lzUG9ydCA9IDEyMzQ1LFxuICAgICAgICAgICAgZGV2aWNlUG9ydCA9IDU0MzIxO1xuICAgICAgaXQoJ2ZvcndhcmRQb3J0IHNob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImFkYkV4ZWNcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydmb3J3YXJkJywgYHRjcDoke3N5c1BvcnR9YCwgYHRjcDoke2RldmljZVBvcnR9YF0pXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICAgIGF3YWl0IGFkYi5mb3J3YXJkUG9ydChzeXNQb3J0LCBkZXZpY2VQb3J0KTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdCgnZm9yd2FyZEFic3RyYWN0UG9ydCBzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJhZGJFeGVjXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZm9yd2FyZCcsIGB0Y3A6JHtzeXNQb3J0fWAsIGBsb2NhbGFic3RyYWN0OiR7ZGV2aWNlUG9ydH1gXSlcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLmZvcndhcmRBYnN0cmFjdFBvcnQoc3lzUG9ydCwgZGV2aWNlUG9ydCk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgncGluZycsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHNob3VsZCByZXR1cm4gdHJ1ZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbXCJlY2hvXCIsIFwicGluZ1wiXSlcbiAgICAgICAgICAucmV0dXJucyhcInBpbmdcIik7XG4gICAgICAgIChhd2FpdCBhZGIucGluZygpKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdyZXN0YXJ0Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBhZGIgaW4gY29ycmVjdCBvcmRlcicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzdG9wTG9nY2F0XCIpLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInJlc3RhcnRBZGJcIikub25jZSgpLnJldHVybnMoXCJcIik7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwid2FpdEZvckRldmljZVwiKS5vbmNlKCkucmV0dXJucyhcIlwiKTtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzdGFydExvZ2NhdFwiKS5vbmNlKCkucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLnJlc3RhcnQoKTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdzdG9wTG9nY2F0Jywgd2l0aE1vY2tzKHtsb2djYXR9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzdG9wQ2FwdHVyZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYWRiLmxvZ2NhdCA9IGxvZ2NhdDtcbiAgICAgICAgbW9ja3MubG9nY2F0LmV4cGVjdHMoXCJzdG9wQ2FwdHVyZVwiKS5vbmNlKCkucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLnN0b3BMb2djYXQoKTtcbiAgICAgICAgbW9ja3MubG9nY2F0LnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdnZXRMb2djYXRMb2dzJywgd2l0aE1vY2tzKHtsb2djYXR9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBnZXRMb2dzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhZGIubG9nY2F0ID0gbG9nY2F0O1xuICAgICAgICBtb2Nrcy5sb2djYXQuZXhwZWN0cyhcImdldExvZ3NcIikub25jZSgpLnJldHVybnMoXCJcIik7XG4gICAgICAgIGF3YWl0IGFkYi5nZXRMb2djYXRMb2dzKCk7XG4gICAgICAgIG1vY2tzLmxvZ2NhdC52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnZ2V0UElEc0J5TmFtZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgYW5kIHBhcnNlIHBpZHMgY29ycmVjdGx5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFtcInBzXCIsICcuY29udGFjdG1hbmFnZXInXSlcbiAgICAgICAgICAucmV0dXJucyhwc091dHB1dCk7XG4gICAgICAgIChhd2FpdCBhZGIuZ2V0UElEc0J5TmFtZShjb250YWN0TWFuYWdlclBhY2thZ2UpKVswXS5zaG91bGQuZXF1YWwoNTA3OCk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgna2lsbFByb2Nlc3Nlc0J5TmFtZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0UElEc0J5TmFtZSBhbmQga2lsbCBwcm9jZXNzIGNvcnJlY3RseScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRQSURzQnlOYW1lXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKGNvbnRhY3RNYW5hZ2VyUGFja2FnZSlcbiAgICAgICAgICAucmV0dXJucyhbNTA3OF0pO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImtpbGxQcm9jZXNzQnlQSURcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoNTA3OClcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgICAgYXdhaXQgYWRiLmtpbGxQcm9jZXNzZXNCeU5hbWUoY29udGFjdE1hbmFnZXJQYWNrYWdlKTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdraWxsUHJvY2Vzc0J5UElEJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBraWxsIHByb2Nlc3MgY29ycmVjdGx5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsna2lsbCcsIDUwNzhdKVxuICAgICAgICAgIC5yZXR1cm5zKCk7XG4gICAgICAgIGF3YWl0IGFkYi5raWxsUHJvY2Vzc0J5UElEKDUwNzgpO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gICAgZGVzY3JpYmUoJ2Jyb2FkY2FzdFByb2Nlc3NFbmQnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBicm9hZGNhc3QgcHJvY2VzcyBlbmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBpbnRlbnQgPSAnaW50ZW50JyxcbiAgICAgICAgICAgIHByb2Nlc3NOYW1lID0gJ3Byb2Nlc3NOYW1lJztcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2FtJywgJ2Jyb2FkY2FzdCcsICctYScsIGludGVudF0pXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwicHJvY2Vzc0V4aXN0c1wiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhwcm9jZXNzTmFtZSlcbiAgICAgICAgICAucmV0dXJucyhmYWxzZSk7XG4gICAgICAgIGF3YWl0IGFkYi5icm9hZGNhc3RQcm9jZXNzRW5kKGludGVudCwgcHJvY2Vzc05hbWUpO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gICAgZGVzY3JpYmUoJ2Jyb2FkY2FzdCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGJyb2FkY2FzdCBpbnRlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBpbnRlbnQgPSAnaW50ZW50JztcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2FtJywgJ2Jyb2FkY2FzdCcsICctYScsIGludGVudF0pXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICAgIGF3YWl0IGFkYi5icm9hZGNhc3QoaW50ZW50KTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIGRlc2NyaWJlKCdpbnN0cnVtZW50Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJndW1lbnRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgaW50ZW50ID0gJ2ludGVudCc7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydhbScsICdicm9hZGNhc3QnLCAnLWEnLCBpbnRlbnRdKVxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgICBhd2FpdCBhZGIuYnJvYWRjYXN0KGludGVudCk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZSgnYW5kcm9pZENvdmVyYWdlJywgd2l0aE1vY2tzKHthZGIsIHRlZW5fcHJvY2Vzc30sIChtb2NrcykgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmd1bWVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGFkYi5leGVjdXRhYmxlLmRlZmF1bHRBcmdzID0gW107XG4gICAgICAgIGFkYi5leGVjdXRhYmxlLnBhdGggPSBcImR1bW15X2FkYl9wYXRoXCI7XG4gICAgICAgIGxldCBjb25uID0gbmV3IGV2ZW50cy5FdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgY29ubi5zdGFydCA9ICgpID0+IHsgfTsgLy8gZG8gbm90aGluZ1xuICAgICAgICBjb25zdCBpbnN0cnVtZW50Q2xhc3MgPSAnaW5zdHJ1bWVudENsYXNzJyxcbiAgICAgICAgICAgICAgd2FpdFBrZyA9ICd3YWl0UGtnJyxcbiAgICAgICAgICAgICAgd2FpdEFjdGl2aXR5ID0gJ3dhaXRBY3Rpdml0eSc7XG4gICAgICAgIGxldCBhcmdzID0gYWRiLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3NcbiAgICAgICAgICAuY29uY2F0KFsnc2hlbGwnLCAnYW0nLCAnaW5zdHJ1bWVudCcsICctZScsICdjb3ZlcmFnZScsICd0cnVlJywgJy13J10pXG4gICAgICAgICAgLmNvbmNhdChbaW5zdHJ1bWVudENsYXNzXSk7XG4gICAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiU3ViUHJvY2Vzc1wiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnZHVtbXlfYWRiX3BhdGgnLCBhcmdzKVxuICAgICAgICAgIC5yZXR1cm5zKGNvbm4pO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcIndhaXRGb3JBY3Rpdml0eVwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyh3YWl0UGtnLCB3YWl0QWN0aXZpdHkpXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICAgIGF3YWl0IGFkYi5hbmRyb2lkQ292ZXJhZ2UoaW5zdHJ1bWVudENsYXNzLCB3YWl0UGtnLCB3YWl0QWN0aXZpdHkpO1xuICAgICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzZW5kVGVsbmV0Q29tbWFuZCcsIHdpdGhNb2Nrcyh7YWRiLCBuZXR9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwb3J0ID0gNTQzMjE7XG4gICAgICBsZXQgY29ubiA9IG5ldyBldmVudHMuRXZlbnRFbWl0dGVyKCk7XG4gICAgICBsZXQgY29tbWFuZHMgPSBbXTtcbiAgICAgIGNvbm4ud3JpdGUgPSBmdW5jdGlvbiAoY29tbWFuZCkge1xuICAgICAgICBjb21tYW5kcy5wdXNoKGNvbW1hbmQpO1xuICAgICAgfTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0RW11bGF0b3JQb3J0XCIpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXG4gICAgICAgIC5yZXR1cm5zKHBvcnQpO1xuICAgICAgbW9ja3MubmV0LmV4cGVjdHMoXCJjcmVhdGVDb25uZWN0aW9uXCIpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhwb3J0LCAnbG9jYWxob3N0JylcbiAgICAgICAgLnJldHVybnMoY29ubik7XG4gICAgICBsZXQgcCA9IGFkYi5zZW5kVGVsbmV0Q29tbWFuZCgnYXZkIG5hbWUnKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25uLmVtaXQoJ2Nvbm5lY3QnKTtcbiAgICAgICAgY29ubi5lbWl0KCdkYXRhJywnT0snKTtcbiAgICAgICAgY29ubi5lbWl0KCdkYXRhJywnT0snKTtcbiAgICAgICAgY29ubi5lbWl0KCdjbG9zZScpO1xuICAgICAgfSwgMCk7XG4gICAgICBhd2FpdCBwO1xuICAgICAgY29tbWFuZHNbMF0uc2hvdWxkLmVxdWFsKFwiYXZkIG5hbWVcXG5cIik7XG4gICAgICBjb21tYW5kc1sxXS5zaG91bGQuZXF1YWwoXCJxdWl0XFxuXCIpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgbW9ja3MubmV0LnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBsYXN0IGxpbmUgb2YgdGhlIG91dHB1dCBvbmx5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcG9ydCA9IDU0MzIxO1xuICAgICAgbGV0IGNvbm4gPSBuZXcgZXZlbnRzLkV2ZW50RW1pdHRlcigpO1xuICAgICAgbGV0IGNvbW1hbmRzID0gW107XG4gICAgICBsZXQgZXhwZWN0ZWQgPSBcImRlc2lyZWRfY29tbWFuZF9vdXRwdXRcIjtcbiAgICAgIGNvbm4ud3JpdGUgPSBmdW5jdGlvbiAoY29tbWFuZCkge1xuICAgICAgICBjb21tYW5kcy5wdXNoKGNvbW1hbmQpO1xuICAgICAgfTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0RW11bGF0b3JQb3J0XCIpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXG4gICAgICAgIC5yZXR1cm5zKHBvcnQpO1xuICAgICAgbW9ja3MubmV0LmV4cGVjdHMoXCJjcmVhdGVDb25uZWN0aW9uXCIpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhwb3J0LCAnbG9jYWxob3N0JylcbiAgICAgICAgLnJldHVybnMoY29ubik7XG4gICAgICBsZXQgcCA9IGFkYi5zZW5kVGVsbmV0Q29tbWFuZCgnYXZkIG5hbWUnKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25uLmVtaXQoJ2Nvbm5lY3QnKTtcbiAgICAgICAgY29ubi5lbWl0KCdkYXRhJywnT0snKTtcbiAgICAgICAgY29ubi5lbWl0KCdkYXRhJywnT0tcXG51bndhbnRlZF9lY2hvX291dHB1dFxcbicgKyBleHBlY3RlZCk7XG4gICAgICAgIGNvbm4uZW1pdCgnY2xvc2UnKTtcbiAgICAgIH0sIDApO1xuICAgICAgbGV0IGFjdHVhbCA9IGF3YWl0IHA7XG4gICAgICAoYWN0dWFsKS5zaG91bGQuZXF1YWwoZXhwZWN0ZWQpO1xuICAgIH0pO1xuICB9KSk7XG4gIGl0KCdpc1ZhbGlkQ2xhc3Mgc2hvdWxkIGNvcnJlY3RseSB2YWxpZGF0ZSBjbGFzcyBuYW1lcycsICgpID0+IHtcbiAgICBhZGIuaXNWYWxpZENsYXNzKCdzb21lLnBhY2thZ2Uvc29tZS5wYWNrYWdlLkFjdGl2aXR5JykuaW5kZXguc2hvdWxkLmVxdWFsKDApO1xuICAgIHNob3VsZC5ub3QuZXhpc3QoYWRiLmlzVmFsaWRDbGFzcygnaWxsZWdhbFBhY2thZ2UjL2Fkc2FzZCcpKTtcbiAgfSk7XG4gIGl0KCdnZXRBZGJQYXRoIHNob3VsZCBjb3JyZWN0bHkgcmV0dXJuIGFkYlBhdGgnLCAoKSA9PiB7XG4gICAgYWRiLmdldEFkYlBhdGgoKS5zaG91bGQuZXF1YWwoYWRiLmV4ZWN1dGFibGUucGF0aCk7XG4gIH0pO1xufSk7XG4iXX0=