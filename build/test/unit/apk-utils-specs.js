'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].use(_chaiAsPromised2['default']);
var should = _chai2['default'].should(),
    pkg = 'com.example.android.contactmanager',
    uri = 'content://contacts/people/1',
    act = '.ContactManager',
    startAppOptions = { stopApp: true, action: 'action', category: 'cat',
  flags: 'flags', pkg: 'pkg', activity: 'act',
  optionalIntentArguments: '-x options -y option argument -z option arg with spaces' },
    cmd = ['am', 'start', '-n', 'pkg/act', '-S', '-a', 'action', '-c', 'cat', '-f', 'flags', '-x', 'options', '-y', 'option', 'argument', '-z', 'option', 'arg with spaces'],
    language = 'en',
    country = 'US',
    locale = 'en-US';

describe('Apk-utils', function () {
  var adb = new _2['default']();
  describe('isAppInstalled', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should parse correctly and return true', function callee$2$0() {
      var pkg;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            pkg = 'dummy.package';

            mocks.adb.expects('getApiLevel').once().withExactArgs().returns("17");
            mocks.adb.expects('shell').once().withExactArgs(['pm', 'list', 'packages', '-3', pkg]).returns('package:' + pkg);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.isAppInstalled(pkg));

          case 5:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should parse correctly and return false', function callee$2$0() {
      var pkg;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            pkg = 'dummy.package';

            mocks.adb.expects('getApiLevel').once().withExactArgs().returns("17");
            mocks.adb.expects('shell').once().withExactArgs(['pm', 'list', 'packages', '-3', pkg]).returns("");
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.isAppInstalled(pkg));

          case 5:
            context$3$0.sent.should.be['false'];

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getFocusedPackageAndActivity', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should parse correctly and return package and activity', function callee$2$0() {
      var _ref, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/' + act + ' t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

          case 3:
            _ref = context$3$0.sent;
            appPackage = _ref.appPackage;
            appActivity = _ref.appActivity;

            appPackage.should.equal(pkg);
            appActivity.should.equal(act);
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should parse correctly and return package and activity when a comma is present', function callee$2$0() {
      var _ref2, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{20fe217e token=Token{21878739 ' + ('ActivityRecord{16425300 u0 ' + pkg + '/' + act + ', isShadow:false t10}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

          case 3:
            _ref2 = context$3$0.sent;
            appPackage = _ref2.appPackage;
            appActivity = _ref2.appActivity;

            appPackage.should.equal(pkg);
            appActivity.should.equal(act);
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should parse correctly and return null', function callee$2$0() {
      var _ref3, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=null');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

          case 3:
            _ref3 = context$3$0.sent;
            appPackage = _ref3.appPackage;
            appActivity = _ref3.appActivity;

            should.not.exist(appPackage);
            should.not.exist(appActivity);
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('waitForActivityOrNot', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell once and should return', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/' + act + ' t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, act, false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell multiple times and return', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').onCall(0).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2c7c4318 u0 foo/bar t181}}}');
            mocks.adb.expects('shell').returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2c7c4318 u0 com.example.android.contactmanager/.ContactManager t181}}}');

            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, act, false));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell once return for not', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{c 0 foo/bar t181}}}');

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, act, true));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell multiple times and return for not', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').onCall(0).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/' + act + ' t181}}}'));
            mocks.adb.expects('shell').returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2c7c4318 u0 foo/bar t181}}}');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, act, true));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to get first of a comma-separated list of activities', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/.ContactManager t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, '.ContactManager, .OtherManager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to get second of a comma-separated list of activities', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/.OtherManager t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, '.ContactManager, .OtherManager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fail if no activity in a comma-separated list is available', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').atLeast(1).withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/' + act + ' t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, '.SuperManager, .OtherManager', false, 1000).should.eventually.be.rejected);

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('waitForActivity', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call waitForActivityOrNot with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('waitForActivityOrNot').once().withExactArgs(pkg, act, false, 20000).returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivity(pkg, act));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('waitForNotActivity', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call waitForActivityOrNot with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('waitForActivityOrNot').once().withExactArgs(pkg, act, true, 20000).returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForNotActivity(pkg, act));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('uninstallApk', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call forceStop and adbExec with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('forceStop').once().withExactArgs(pkg).returns('');
            mocks.adb.expects('adbExec').once().withExactArgs(['uninstall', pkg], { timeout: 20000 }).returns('Success');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.uninstallApk(pkg));

          case 4:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('installFromDevicePath', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call forceStop and adbExec with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['pm', 'install', '-r', 'foo'], {}).returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.installFromDevicePath('foo'));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('install', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call forceStop and adbExec with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('adbExec').once().withExactArgs(['install', '-r', 'foo'], { timeout: 60000 }).returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.install('foo'));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('startUri', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should fail if uri or pkg are not provided', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(adb.startUri().should.eventually.be.rejectedWith(/arguments are required/));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.startUri('foo').should.eventually.be.rejectedWith(/arguments are required/));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should build a call to a VIEW intent with the uri', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['am', 'start', '-W', '-a', 'android.intent.action.VIEW', '-d', uri, pkg]);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.startUri(uri, pkg));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('startApp', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call getApiLevel and shell with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').once().withExactArgs().returns('17');
            mocks.adb.expects('shell').once().withExactArgs(cmd).returns('');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.startApp(startAppOptions));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call getApiLevel and shell with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').twice().returns('17');
            mocks.adb.expects('shell').onCall(0).returns('Error: Activity class foo does not exist');
            mocks.adb.expects('shell').returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.startApp(startAppOptions));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getDeviceLanguage', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell one time with correct args and return language when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").returns(18);
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.language']).returns(language);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.getDeviceLanguage());

          case 4:
            context$3$0.t0 = language;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell two times with correct args and return language when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").returns(18);
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.language']).returns('');
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale.language']).returns(language);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.getDeviceLanguage());

          case 5:
            context$3$0.t0 = language;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell one time with correct args and return language when API = 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").returns(23);
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.locale']).returns(locale);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.getDeviceLanguage());

          case 4:
            context$3$0.t0 = language;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell two times with correct args and return language when API = 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").returns(23);
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.locale']).returns('');
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale']).returns(locale);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.getDeviceLanguage());

          case 5:
            context$3$0.t0 = language;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('setDeviceLanguage', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell one time with correct args when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['setprop', 'persist.sys.language', language]).returns("");
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.setDeviceLanguage(language));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getDeviceCountry', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell one time with correct args and return country', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.country']).returns(country);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getDeviceCountry());

          case 3:
            context$3$0.t0 = country;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell two times with correct args and return country', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.country']).returns('');
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale.region']).returns(country);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.getDeviceCountry());

          case 4:
            context$3$0.t0 = country;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('setDeviceCountry', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell one time with correct args', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['setprop', 'persist.sys.country', country]).returns("");
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.setDeviceCountry(country));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getDeviceLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell one time with correct args and return locale', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.locale']).returns(locale);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getDeviceLocale());

          case 3:
            context$3$0.t0 = locale;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell two times with correct args and return locale', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.locale']).returns('');
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale']).returns(locale);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.getDeviceLocale());

          case 4:
            context$3$0.t0 = locale;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('setDeviceLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell one time with correct args', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['setprop', 'persist.sys.locale', locale]).returns("");
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.setDeviceLocale(locale));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hcGstdXRpbHMtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUM3QixPQUFPOzs7O2lDQUNHLHFCQUFxQjs7QUFHL0Msa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQztBQUN6QixJQUFNLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUU7SUFDdEIsR0FBRyxHQUFHLG9DQUFvQztJQUMxQyxHQUFHLEdBQUcsNkJBQTZCO0lBQ25DLEdBQUcsR0FBRyxpQkFBaUI7SUFDdkIsZUFBZSxHQUFHLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLO0FBQ2hELE9BQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSztBQUMzQyx5QkFBdUIsRUFBRSx5REFBeUQsRUFBQztJQUN0RyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFDakUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUMxRCxJQUFJLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixDQUFDO0lBQ3pDLFFBQVEsR0FBRyxJQUFJO0lBQ2YsT0FBTyxHQUFHLElBQUk7SUFDZCxNQUFNLEdBQUcsT0FBTyxDQUFDOztBQUV2QixRQUFRLENBQUMsV0FBVyxFQUFFLFlBQU07QUFDMUIsTUFBSSxHQUFHLEdBQUcsbUJBQVMsQ0FBQztBQUNwQixVQUFRLENBQUMsZ0JBQWdCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDckQsTUFBRSxDQUFDLHdDQUF3QyxFQUFF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QUFDLENBQUMsQ0FDdkQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2YsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUN0RCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7OzZDQUNaLEdBQUcsQ0FBQyxlQUFlLEVBQUU7Ozs2QkFBZSxNQUFNOzZCQUFuQixNQUFNLENBQUMsS0FBSzs7QUFDMUMsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixVQUFRLENBQUMsaUJBQWlCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDdEQsTUFBRSxDQUFDLDhDQUE4QyxFQUFFOzs7O0FBQ2pELGlCQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQy9ELE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7NkNBQ1QsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7OztBQUNqQyxpQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztLQUNwQixDQUFDLENBQUM7R0FDSixDQUFDLENBQUMsQ0FBQztDQUNMLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvYXBrLXV0aWxzLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQURCIGZyb20gJy4uLy4uJztcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xuXG5cbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcbmNvbnN0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCksXG4gICAgICBwa2cgPSAnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicsXG4gICAgICB1cmkgPSAnY29udGVudDovL2NvbnRhY3RzL3Blb3BsZS8xJyxcbiAgICAgIGFjdCA9ICcuQ29udGFjdE1hbmFnZXInLFxuICAgICAgc3RhcnRBcHBPcHRpb25zID0ge3N0b3BBcHA6IHRydWUsIGFjdGlvbjogJ2FjdGlvbicsIGNhdGVnb3J5OiAnY2F0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnczogJ2ZsYWdzJywgcGtnOiAncGtnJywgYWN0aXZpdHk6ICdhY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzOiAnLXggb3B0aW9ucyAteSBvcHRpb24gYXJndW1lbnQgLXogb3B0aW9uIGFyZyB3aXRoIHNwYWNlcyd9LFxuICAgICAgY21kID0gWydhbScsICdzdGFydCcsICctbicsICdwa2cvYWN0JywgJy1TJywgJy1hJywgJ2FjdGlvbicsICctYycsICdjYXQnLFxuICAgICAgICAgICAgICctZicsICdmbGFncycsICcteCcsICdvcHRpb25zJywgJy15JywgJ29wdGlvbicsICdhcmd1bWVudCcsXG4gICAgICAgICAgICAgJy16JywgJ29wdGlvbicsICdhcmcgd2l0aCBzcGFjZXMnXSxcbiAgICAgIGxhbmd1YWdlID0gJ2VuJyxcbiAgICAgIGNvdW50cnkgPSAnVVMnLFxuICAgICAgbG9jYWxlID0gJ2VuLVVTJztcblxuZGVzY3JpYmUoJ0Fway11dGlscycsICgpID0+IHtcbiAgbGV0IGFkYiA9IG5ldyBBREIoKTtcbiAgZGVzY3JpYmUoJ2lzQXBwSW5zdGFsbGVkJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIHBhcnNlIGNvcnJlY3RseSBhbmQgcmV0dXJuIHRydWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwa2cgPSAnZHVtbXkucGFja2FnZSc7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxuICAgICAgICAucmV0dXJucyhcIjE3XCIpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsncG0nLCAnbGlzdCcsICdwYWNrYWdlcycsICctMycsIHBrZ10pXG4gICAgICAgIC5yZXR1cm5zKGBwYWNrYWdlOiR7cGtnfWApO1xuICAgICAgKGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChwa2cpKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHBhcnNlIGNvcnJlY3RseSBhbmQgcmV0dXJuIGZhbHNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcGtnID0gJ2R1bW15LnBhY2thZ2UnO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJylcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcbiAgICAgICAgLnJldHVybnMoXCIxN1wiKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3BtJywgJ2xpc3QnLCAncGFja2FnZXMnLCAnLTMnLCBwa2ddKVxuICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgIChhd2FpdCBhZGIuaXNBcHBJbnN0YWxsZWQocGtnKSkuc2hvdWxkLmJlLmZhbHNlO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdnZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIHBhcnNlIGNvcnJlY3RseSBhbmQgcmV0dXJuIHBhY2thZ2UgYW5kIGFjdGl2aXR5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKVxuICAgICAgICAucmV0dXJucyhgbUZvY3VzZWRBcHA9QXBwV2luZG93VG9rZW57Mzg2MDBiNTYgdG9rZW49VG9rZW57OWVhMTE3MSBgICtcbiAgICAgICAgICAgICAgICAgYEFjdGl2aXR5UmVjb3JkezIgdSAke3BrZ30vJHthY3R9IHQxODF9fX1gKTtcblxuICAgICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCBhZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgICAgYXBwUGFja2FnZS5zaG91bGQuZXF1YWwocGtnKTtcbiAgICAgIGFwcEFjdGl2aXR5LnNob3VsZC5lcXVhbChhY3QpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcGFyc2UgY29ycmVjdGx5IGFuZCByZXR1cm4gcGFja2FnZSBhbmQgYWN0aXZpdHkgd2hlbiBhIGNvbW1hIGlzIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXG4gICAgICAgIC5yZXR1cm5zKGBtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnsyMGZlMjE3ZSB0b2tlbj1Ub2tlbnsyMTg3ODczOSBgICtcbiAgICAgICAgICAgICAgICAgYEFjdGl2aXR5UmVjb3JkezE2NDI1MzAwIHUwICR7cGtnfS8ke2FjdH0sIGlzU2hhZG93OmZhbHNlIHQxMH19fWApO1xuXG4gICAgICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IGFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgICBhcHBQYWNrYWdlLnNob3VsZC5lcXVhbChwa2cpO1xuICAgICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKGFjdCk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBwYXJzZSBjb3JyZWN0bHkgYW5kIHJldHVybiBudWxsJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKVxuICAgICAgICAucmV0dXJucygnbUZvY3VzZWRBcHA9bnVsbCcpO1xuICAgICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCBhZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgICAgc2hvdWxkLm5vdC5leGlzdChhcHBQYWNrYWdlKTtcbiAgICAgIHNob3VsZC5ub3QuZXhpc3QoYXBwQWN0aXZpdHkpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCd3YWl0Rm9yQWN0aXZpdHlPck5vdCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIG9uY2UgYW5kIHNob3VsZCByZXR1cm4nLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXG4gICAgICAgIC5yZXR1cm5zKGBtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnszODYwMGI1NiB0b2tlbj1Ub2tlbns5ZWExMTcxIGAgK1xuICAgICAgICAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1ICR7cGtnfS8ke2FjdH0gdDE4MX19fWApO1xuXG4gICAgICBhd2FpdCBhZGIud2FpdEZvckFjdGl2aXR5T3JOb3QocGtnLCBhY3QsIGZhbHNlKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgbXVsdGlwbGUgdGltZXMgYW5kIHJldHVybicsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm9uQ2FsbCgwKVxuICAgICAgICAucmV0dXJucygnbUZvY3VzZWRBcHA9QXBwV2luZG93VG9rZW57Mzg2MDBiNTYgdG9rZW49VG9rZW57OWVhMTE3MSAnICtcbiAgICAgICAgICAgICAgICAgJ0FjdGl2aXR5UmVjb3JkezJjN2M0MzE4IHUwIGZvby9iYXIgdDE4MX19fScpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcbiAgICAgICAgLnJldHVybnMoJ21Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgJyArXG4gICAgICAgICAgICAgICAgICdBY3Rpdml0eVJlY29yZHsyYzdjNDMxOCB1MCBjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyLy5Db250YWN0TWFuYWdlciB0MTgxfX19Jyk7XG5cbiAgICAgIGF3YWl0IGFkYi53YWl0Rm9yQWN0aXZpdHlPck5vdChwa2csIGFjdCwgZmFsc2UpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCBvbmNlIHJldHVybiBmb3Igbm90JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKVxuICAgICAgICAucmV0dXJucygnbUZvY3VzZWRBcHA9QXBwV2luZG93VG9rZW57Mzg2MDBiNTYgdG9rZW49VG9rZW57OWVhMTE3MSAnICtcbiAgICAgICAgICAgICAgICAgJ0FjdGl2aXR5UmVjb3Jke2MgMCBmb28vYmFyIHQxODF9fX0nKTtcblxuICAgICAgYXdhaXQgYWRiLndhaXRGb3JBY3Rpdml0eU9yTm90KHBrZywgYWN0LCB0cnVlKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgbXVsdGlwbGUgdGltZXMgYW5kIHJldHVybiBmb3Igbm90JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykub25DYWxsKDApXG4gICAgICAgIC5yZXR1cm5zKGBtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnszODYwMGI1NiB0b2tlbj1Ub2tlbns5ZWExMTcxIGAgK1xuICAgICAgICAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1ICR7cGtnfS8ke2FjdH0gdDE4MX19fWApO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcbiAgICAgICAgLnJldHVybnMoJ21Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgJyArXG4gICAgICAgICAgICAgICAgICdBY3Rpdml0eVJlY29yZHsyYzdjNDMxOCB1MCBmb28vYmFyIHQxODF9fX0nKTtcbiAgICAgIGF3YWl0IGFkYi53YWl0Rm9yQWN0aXZpdHlPck5vdChwa2csIGFjdCwgdHJ1ZSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCBmaXJzdCBvZiBhIGNvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIGFjdGl2aXRpZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXG4gICAgICAgIC5yZXR1cm5zKGBtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnszODYwMGI1NiB0b2tlbj1Ub2tlbns5ZWExMTcxIGAgK1xuICAgICAgICAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1ICR7cGtnfS8uQ29udGFjdE1hbmFnZXIgdDE4MX19fWApO1xuXG4gICAgICBhd2FpdCBhZGIud2FpdEZvckFjdGl2aXR5T3JOb3QocGtnLCAnLkNvbnRhY3RNYW5hZ2VyLCAuT3RoZXJNYW5hZ2VyJywgZmFsc2UpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBnZXQgc2Vjb25kIG9mIGEgY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgYWN0aXZpdGllcycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2R1bXBzeXMnLCAnd2luZG93JywgJ3dpbmRvd3MnXSlcbiAgICAgICAgLnJldHVybnMoYG1Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgYCArXG4gICAgICAgICAgICAgICAgIGBBY3Rpdml0eVJlY29yZHsyIHUgJHtwa2d9Ly5PdGhlck1hbmFnZXIgdDE4MX19fWApO1xuXG4gICAgICBhd2FpdCBhZGIud2FpdEZvckFjdGl2aXR5T3JOb3QocGtnLCAnLkNvbnRhY3RNYW5hZ2VyLCAuT3RoZXJNYW5hZ2VyJywgZmFsc2UpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZmFpbCBpZiBubyBhY3Rpdml0eSBpbiBhIGNvbW1hLXNlcGFyYXRlZCBsaXN0IGlzIGF2YWlsYWJsZScsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXG4gICAgICAgIC5hdExlYXN0KDEpXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKVxuICAgICAgICAucmV0dXJucyhgbUZvY3VzZWRBcHA9QXBwV2luZG93VG9rZW57Mzg2MDBiNTYgdG9rZW49VG9rZW57OWVhMTE3MSBgICtcbiAgICAgICAgICAgICAgICAgYEFjdGl2aXR5UmVjb3JkezIgdSAke3BrZ30vJHthY3R9IHQxODF9fX1gKTtcblxuICAgICAgYXdhaXQgYWRiLndhaXRGb3JBY3Rpdml0eU9yTm90KHBrZywgJy5TdXBlck1hbmFnZXIsIC5PdGhlck1hbmFnZXInLCBmYWxzZSwgMTAwMClcbiAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pOyAgICBcbiAgfSkpO1xuICBkZXNjcmliZSgnd2FpdEZvckFjdGl2aXR5Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgd2FpdEZvckFjdGl2aXR5T3JOb3Qgd2l0aCBjb3JyZWN0IGFyZ3VtZW50cycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCd3YWl0Rm9yQWN0aXZpdHlPck5vdCcpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhwa2csIGFjdCwgZmFsc2UsIDIwMDAwKVxuICAgICAgICAucmV0dXJucygnJyk7XG4gICAgICBhd2FpdCBhZGIud2FpdEZvckFjdGl2aXR5KHBrZywgYWN0KTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnd2FpdEZvck5vdEFjdGl2aXR5Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgd2FpdEZvckFjdGl2aXR5T3JOb3Qgd2l0aCBjb3JyZWN0IGFyZ3VtZW50cycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCd3YWl0Rm9yQWN0aXZpdHlPck5vdCcpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhwa2csIGFjdCwgdHJ1ZSwgMjAwMDApXG4gICAgICAgIC5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGFkYi53YWl0Rm9yTm90QWN0aXZpdHkocGtnLCBhY3QpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCd1bmluc3RhbGxBcGsnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgY2FsbCBmb3JjZVN0b3AgYW5kIGFkYkV4ZWMgd2l0aCBjb3JyZWN0IGFyZ3VtZW50cycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmb3JjZVN0b3AnKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MocGtnKVxuICAgICAgICAucmV0dXJucygnJyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnYWRiRXhlYycpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3VuaW5zdGFsbCcsIHBrZ10sIHt0aW1lb3V0OiAyMDAwMH0pXG4gICAgICAgIC5yZXR1cm5zKCdTdWNjZXNzJyk7XG4gICAgICAoYXdhaXQgYWRiLnVuaW5zdGFsbEFwayhwa2cpKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnaW5zdGFsbEZyb21EZXZpY2VQYXRoJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgZm9yY2VTdG9wIGFuZCBhZGJFeGVjIHdpdGggY29ycmVjdCBhcmd1bWVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydwbScsICdpbnN0YWxsJywgJy1yJywgJ2ZvbyddLCB7fSlcbiAgICAgICAgLnJldHVybnMoJycpO1xuICAgICAgKGF3YWl0IGFkYi5pbnN0YWxsRnJvbURldmljZVBhdGgoJ2ZvbycpKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnaW5zdGFsbCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIGZvcmNlU3RvcCBhbmQgYWRiRXhlYyB3aXRoIGNvcnJlY3QgYXJndW1lbnRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2FkYkV4ZWMnKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydpbnN0YWxsJywgJy1yJywgJ2ZvbyddLCB7dGltZW91dDogNjAwMDB9KVxuICAgICAgICAucmV0dXJucygnJyk7XG4gICAgICAoYXdhaXQgYWRiLmluc3RhbGwoJ2ZvbycpKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnc3RhcnRVcmknLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1cmkgb3IgcGtnIGFyZSBub3QgcHJvdmlkZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBhZGIuc3RhcnRVcmkoKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2FyZ3VtZW50cyBhcmUgcmVxdWlyZWQvKTtcbiAgICAgIGF3YWl0IGFkYi5zdGFydFVyaSgnZm9vJykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9hcmd1bWVudHMgYXJlIHJlcXVpcmVkLyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBidWlsZCBhIGNhbGwgdG8gYSBWSUVXIGludGVudCB3aXRoIHRoZSB1cmknLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydhbScsICdzdGFydCcsICctVycsICctYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQuaW50ZW50LmFjdGlvbi5WSUVXJywgJy1kJywgdXJpLCBwa2ddKTtcbiAgICAgIGF3YWl0IGFkYi5zdGFydFVyaSh1cmksIHBrZyk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3N0YXJ0QXBwJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0QXBpTGV2ZWwgYW5kIHNoZWxsIHdpdGggY29ycmVjdCBhcmd1bWVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxuICAgICAgICAucmV0dXJucygnMTcnKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhjbWQpXG4gICAgICAgIC5yZXR1cm5zKCcnKTtcbiAgICAgIChhd2FpdCBhZGIuc3RhcnRBcHAoc3RhcnRBcHBPcHRpb25zKSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIGdldEFwaUxldmVsIGFuZCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJndW1lbnRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJylcbiAgICAgICAgLnR3aWNlKClcbiAgICAgICAgLnJldHVybnMoJzE3Jyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxuICAgICAgICAub25DYWxsKDApXG4gICAgICAgIC5yZXR1cm5zKCdFcnJvcjogQWN0aXZpdHkgY2xhc3MgZm9vIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxuICAgICAgICAucmV0dXJucygnJyk7XG4gICAgICAoYXdhaXQgYWRiLnN0YXJ0QXBwKHN0YXJ0QXBwT3B0aW9ucykpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdnZXREZXZpY2VMYW5ndWFnZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIG9uZSB0aW1lIHdpdGggY29ycmVjdCBhcmdzIGFuZCByZXR1cm4gbGFuZ3VhZ2Ugd2hlbiBBUEkgPCAyMycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0QXBpTGV2ZWxcIikucmV0dXJucygxOCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2dldHByb3AnLCAncGVyc2lzdC5zeXMubGFuZ3VhZ2UnXSlcbiAgICAgICAgLnJldHVybnMobGFuZ3VhZ2UpO1xuICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VMYW5ndWFnZSgpKS5zaG91bGQuZXF1YWwobGFuZ3VhZ2UpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB0d28gdGltZXMgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHJldHVybiBsYW5ndWFnZSB3aGVuIEFQSSA8IDIzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS5yZXR1cm5zKDE4KTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdwZXJzaXN0LnN5cy5sYW5ndWFnZSddKVxuICAgICAgICAucmV0dXJucygnJyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2dldHByb3AnLCAncm8ucHJvZHVjdC5sb2NhbGUubGFuZ3VhZ2UnXSlcbiAgICAgICAgLnJldHVybnMobGFuZ3VhZ2UpO1xuICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VMYW5ndWFnZSgpKS5zaG91bGQuZXF1YWwobGFuZ3VhZ2UpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCBvbmUgdGltZSB3aXRoIGNvcnJlY3QgYXJncyBhbmQgcmV0dXJuIGxhbmd1YWdlIHdoZW4gQVBJID0gMjMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpLnJldHVybnMoMjMpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3BlcnNpc3Quc3lzLmxvY2FsZSddKVxuICAgICAgICAucmV0dXJucyhsb2NhbGUpO1xuICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VMYW5ndWFnZSgpKS5zaG91bGQuZXF1YWwobGFuZ3VhZ2UpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB0d28gdGltZXMgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHJldHVybiBsYW5ndWFnZSB3aGVuIEFQSSA9IDIzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS5yZXR1cm5zKDIzKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdwZXJzaXN0LnN5cy5sb2NhbGUnXSlcbiAgICAgICAgLnJldHVybnMoJycpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3JvLnByb2R1Y3QubG9jYWxlJ10pXG4gICAgICAgIC5yZXR1cm5zKGxvY2FsZSk7XG4gICAgICAoYXdhaXQgYWRiLmdldERldmljZUxhbmd1YWdlKCkpLnNob3VsZC5lcXVhbChsYW5ndWFnZSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3NldERldmljZUxhbmd1YWdlJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgb25lIHRpbWUgd2l0aCBjb3JyZWN0IGFyZ3Mgd2hlbiBBUEkgPCAyMycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc2V0cHJvcCcsICdwZXJzaXN0LnN5cy5sYW5ndWFnZScsIGxhbmd1YWdlXSlcbiAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlTGFuZ3VhZ2UobGFuZ3VhZ2UpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdnZXREZXZpY2VDb3VudHJ5Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgb25lIHRpbWUgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHJldHVybiBjb3VudHJ5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3BlcnNpc3Quc3lzLmNvdW50cnknXSlcbiAgICAgICAgLnJldHVybnMoY291bnRyeSk7XG4gICAgICAoYXdhaXQgYWRiLmdldERldmljZUNvdW50cnkoKSkuc2hvdWxkLmVxdWFsKGNvdW50cnkpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB0d28gdGltZXMgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHJldHVybiBjb3VudHJ5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3BlcnNpc3Quc3lzLmNvdW50cnknXSlcbiAgICAgICAgLnJldHVybnMoJycpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3JvLnByb2R1Y3QubG9jYWxlLnJlZ2lvbiddKVxuICAgICAgICAucmV0dXJucyhjb3VudHJ5KTtcbiAgICAgIChhd2FpdCBhZGIuZ2V0RGV2aWNlQ291bnRyeSgpKS5zaG91bGQuZXF1YWwoY291bnRyeSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3NldERldmljZUNvdW50cnknLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCBvbmUgdGltZSB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc2V0cHJvcCcsICdwZXJzaXN0LnN5cy5jb3VudHJ5JywgY291bnRyeV0pXG4gICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgYXdhaXQgYWRiLnNldERldmljZUNvdW50cnkoY291bnRyeSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ2dldERldmljZUxvY2FsZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIG9uZSB0aW1lIHdpdGggY29ycmVjdCBhcmdzIGFuZCByZXR1cm4gbG9jYWxlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3BlcnNpc3Quc3lzLmxvY2FsZSddKVxuICAgICAgICAucmV0dXJucyhsb2NhbGUpO1xuICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VMb2NhbGUoKSkuc2hvdWxkLmVxdWFsKGxvY2FsZSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHR3byB0aW1lcyB3aXRoIGNvcnJlY3QgYXJncyBhbmQgcmV0dXJuIGxvY2FsZScsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdwZXJzaXN0LnN5cy5sb2NhbGUnXSlcbiAgICAgICAgLnJldHVybnMoJycpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3JvLnByb2R1Y3QubG9jYWxlJ10pXG4gICAgICAgIC5yZXR1cm5zKGxvY2FsZSk7XG4gICAgICAoYXdhaXQgYWRiLmdldERldmljZUxvY2FsZSgpKS5zaG91bGQuZXF1YWwobG9jYWxlKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnc2V0RGV2aWNlTG9jYWxlJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgb25lIHRpbWUgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3NldHByb3AnLCAncGVyc2lzdC5zeXMubG9jYWxlJywgbG9jYWxlXSlcbiAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlTG9jYWxlKGxvY2FsZSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbn0pO1xuIl19