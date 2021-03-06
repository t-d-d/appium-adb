'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this2 = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _libAdbJs = require('../../lib/adb.js');

var _libAdbJs2 = _interopRequireDefault(_libAdbJs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _teen_process = require('teen_process');

var _appiumSupport = require('appium-support');

var _libHelpersJs = require('../../lib/helpers.js');

var selendroidTestApp = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'selendroid-test-app.apk'),
    contactManagerPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'ContactManager.apk'),
    unsignJar = _path2['default'].resolve(_libHelpersJs.rootDir, 'jars', 'unsign.jar'),
    tmp = _appiumSupport.system.isWindows() ? 'C:\\Windows\\Temp' : '/tmp',
    keystorePath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'appiumtest.keystore'),
    keyAlias = 'appiumtest';

_chai2['default'].use(_chaiAsPromised2['default']);

describe('Apk-signing', function callee$0$0() {
  var adb, unsignApk;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        adb = undefined, unsignApk = function unsignApk(apk) {
          return _regeneratorRuntime.async(function unsignApk$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', ['-jar', unsignJar, apk]));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        };

        before(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(_libAdbJs2['default'].createADB());

              case 2:
                adb = context$2$0.sent;

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });
        it('checkApkCert should return false for unsigned apk', function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(unsignApk(selendroidTestApp));

              case 2:
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(adb.checkApkCert(selendroidTestApp, 'io.selendroid.testapp'));

              case 4:
                context$2$0.sent.should.be['false'];

              case 5:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });
        it('checkApkCert should return true for signed apk', function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(adb.checkApkCert(contactManagerPath, 'com.example.android.contactmanager'));

              case 2:
                context$2$0.sent.should.be['true'];

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });
        it('signWithDefaultCert should sign apk', function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(unsignApk(selendroidTestApp));

              case 2:
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(adb.signWithDefaultCert(selendroidTestApp));

              case 4:
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap(adb.checkApkCert(selendroidTestApp, 'io.selendroid.testapp'));

              case 6:
                context$2$0.sent.should.be['true'];

              case 7:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });
        it('signWithCustomCert should sign apk with custom certificate', function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(unsignApk(selendroidTestApp));

              case 2:
                adb.keystorePath = keystorePath;
                adb.keyAlias = keyAlias;
                adb.useKeystore = true;
                adb.keystorePassword = 'android';
                adb.keyPassword = 'android';
                adb.tmpDir = tmp;
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap(adb.signWithCustomCert(selendroidTestApp));

              case 10:
                context$2$0.next = 12;
                return _regeneratorRuntime.awrap(adb.checkCustomApkCert(selendroidTestApp, 'io.selendroid.testapp'));

              case 12:
                context$2$0.sent.should.be['true'];

              case 13:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this2);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hcGstc2lnbmluZy1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3dCQUM3QixrQkFBa0I7Ozs7b0JBQ2pCLE1BQU07Ozs7NEJBQ0YsY0FBYzs7NkJBQ1osZ0JBQWdCOzs0QkFDZixzQkFBc0I7O0FBRzlDLElBQU0saUJBQWlCLEdBQUcsa0JBQUssT0FBTyx3QkFBVSxNQUFNLEVBQ2YsVUFBVSxFQUFFLHlCQUF5QixDQUFDO0lBQ3ZFLGtCQUFrQixHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUNmLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQztJQUNuRSxTQUFTLEdBQUcsa0JBQUssT0FBTyx3QkFBVSxNQUFNLEVBQUUsWUFBWSxDQUFDO0lBQ3ZELEdBQUcsR0FBRyxzQkFBTyxTQUFTLEVBQUUsR0FBRyxtQkFBbUIsR0FBRyxNQUFNO0lBQ3ZELFlBQVksR0FBRyxrQkFBSyxPQUFPLHdCQUFVLE1BQU0sRUFDZixVQUFVLEVBQUUscUJBQXFCLENBQUM7SUFDOUQsUUFBUSxHQUFHLFlBQVksQ0FBQzs7QUFFOUIsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLGFBQWEsRUFBRTtNQUNsQixHQUFHLEVBQ0gsU0FBUzs7Ozs7O0FBRFQsV0FBRyxjQUNILFNBQVMsR0FBRyxTQUFaLFNBQVMsQ0FBVSxHQUFHOzs7OztpREFBYSx3QkFBSyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7O1NBQUc7O0FBRWhGLGNBQU0sQ0FBQzs7Ozs7aURBQ08sc0JBQUksU0FBUyxFQUFFOzs7QUFBM0IsbUJBQUc7Ozs7Ozs7U0FDSixDQUFDLENBQUM7QUFDSCxVQUFFLENBQUMsbURBQW1ELEVBQUU7Ozs7O2lEQUNoRCxTQUFTLENBQUMsaUJBQWlCLENBQUM7Ozs7aURBQzNCLEdBQUcsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsdUJBQXVCLENBQUM7OztpQ0FBRSxNQUFNLENBQUMsRUFBRTs7Ozs7OztTQUMvRSxDQUFDLENBQUM7QUFDSCxVQUFFLENBQUMsZ0RBQWdELEVBQUU7Ozs7O2lEQUM1QyxHQUFHLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLG9DQUFvQyxDQUFDOzs7aUNBQUUsTUFBTSxDQUFDLEVBQUU7Ozs7Ozs7U0FDN0YsQ0FBQyxDQUFDO0FBQ0gsVUFBRSxDQUFDLHFDQUFxQyxFQUFFOzs7OztpREFDbEMsU0FBUyxDQUFDLGlCQUFpQixDQUFDOzs7O2lEQUMzQixHQUFHLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUM7Ozs7aURBQzFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsdUJBQXVCLENBQUM7OztpQ0FBRSxNQUFNLENBQUMsRUFBRTs7Ozs7OztTQUMvRSxDQUFDLENBQUM7QUFDSCxVQUFFLENBQUMsNERBQTRELEVBQUU7Ozs7O2lEQUN6RCxTQUFTLENBQUMsaUJBQWlCLENBQUM7OztBQUNsQyxtQkFBRyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDaEMsbUJBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3hCLG1CQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUN2QixtQkFBRyxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztBQUNqQyxtQkFBRyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFDNUIsbUJBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDOztpREFDVixHQUFHLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUM7Ozs7aURBQ3pDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRSx1QkFBdUIsQ0FBQzs7O2lDQUFFLE1BQU0sQ0FBQyxFQUFFOzs7Ozs7O1NBQ3JGLENBQUMsQ0FBQzs7Ozs7OztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvYXBrLXNpZ25pbmctZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQURCIGZyb20gJy4uLy4uL2xpYi9hZGIuanMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcbmltcG9ydCB7IHN5c3RlbSB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IHJvb3REaXIgfSBmcm9tICcuLi8uLi9saWIvaGVscGVycy5qcyc7XG5cblxuY29uc3Qgc2VsZW5kcm9pZFRlc3RBcHAgPSBwYXRoLnJlc29sdmUocm9vdERpciwgJ3Rlc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpeHR1cmVzJywgJ3NlbGVuZHJvaWQtdGVzdC1hcHAuYXBrJyksXG4gICAgICBjb250YWN0TWFuYWdlclBhdGggPSBwYXRoLnJlc29sdmUocm9vdERpciwgJ3Rlc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmaXh0dXJlcycsICdDb250YWN0TWFuYWdlci5hcGsnKSxcbiAgICAgIHVuc2lnbkphciA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAnamFycycsICd1bnNpZ24uamFyJyksXG4gICAgICB0bXAgPSBzeXN0ZW0uaXNXaW5kb3dzKCkgPyAnQzpcXFxcV2luZG93c1xcXFxUZW1wJyA6ICcvdG1wJyxcbiAgICAgIGtleXN0b3JlUGF0aCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAndGVzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpeHR1cmVzJywgJ2FwcGl1bXRlc3Qua2V5c3RvcmUnKSxcbiAgICAgIGtleUFsaWFzID0gJ2FwcGl1bXRlc3QnO1xuXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdBcGstc2lnbmluZycsIGFzeW5jICgpID0+IHtcbiAgbGV0IGFkYixcbiAgICAgIHVuc2lnbkFwayA9IGFzeW5jIChhcGspID0+IHsgYXdhaXQgZXhlYygnamF2YScsIFsnLWphcicsIHVuc2lnbkphciwgYXBrXSk7IH07XG5cbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICBhZGIgPSBhd2FpdCBBREIuY3JlYXRlQURCKCk7XG4gIH0pO1xuICBpdCgnY2hlY2tBcGtDZXJ0IHNob3VsZCByZXR1cm4gZmFsc2UgZm9yIHVuc2lnbmVkIGFwaycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB1bnNpZ25BcGsoc2VsZW5kcm9pZFRlc3RBcHApO1xuICAgIChhd2FpdCBhZGIuY2hlY2tBcGtDZXJ0KHNlbGVuZHJvaWRUZXN0QXBwLCAnaW8uc2VsZW5kcm9pZC50ZXN0YXBwJykpLnNob3VsZC5iZS5mYWxzZTtcbiAgfSk7XG4gIGl0KCdjaGVja0Fwa0NlcnQgc2hvdWxkIHJldHVybiB0cnVlIGZvciBzaWduZWQgYXBrJywgYXN5bmMgKCkgPT4ge1xuICAgIChhd2FpdCBhZGIuY2hlY2tBcGtDZXJ0KGNvbnRhY3RNYW5hZ2VyUGF0aCwgJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInKSkuc2hvdWxkLmJlLnRydWU7XG4gIH0pO1xuICBpdCgnc2lnbldpdGhEZWZhdWx0Q2VydCBzaG91bGQgc2lnbiBhcGsnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgdW5zaWduQXBrKHNlbGVuZHJvaWRUZXN0QXBwKTtcbiAgICAoYXdhaXQgYWRiLnNpZ25XaXRoRGVmYXVsdENlcnQoc2VsZW5kcm9pZFRlc3RBcHApKTtcbiAgICAoYXdhaXQgYWRiLmNoZWNrQXBrQ2VydChzZWxlbmRyb2lkVGVzdEFwcCwgJ2lvLnNlbGVuZHJvaWQudGVzdGFwcCcpKS5zaG91bGQuYmUudHJ1ZTtcbiAgfSk7XG4gIGl0KCdzaWduV2l0aEN1c3RvbUNlcnQgc2hvdWxkIHNpZ24gYXBrIHdpdGggY3VzdG9tIGNlcnRpZmljYXRlJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHVuc2lnbkFwayhzZWxlbmRyb2lkVGVzdEFwcCk7XG4gICAgYWRiLmtleXN0b3JlUGF0aCA9IGtleXN0b3JlUGF0aDtcbiAgICBhZGIua2V5QWxpYXMgPSBrZXlBbGlhcztcbiAgICBhZGIudXNlS2V5c3RvcmUgPSB0cnVlO1xuICAgIGFkYi5rZXlzdG9yZVBhc3N3b3JkID0gJ2FuZHJvaWQnO1xuICAgIGFkYi5rZXlQYXNzd29yZCA9ICdhbmRyb2lkJztcbiAgICBhZGIudG1wRGlyID0gdG1wO1xuICAgIChhd2FpdCBhZGIuc2lnbldpdGhDdXN0b21DZXJ0KHNlbGVuZHJvaWRUZXN0QXBwKSk7XG4gICAgKGF3YWl0IGFkYi5jaGVja0N1c3RvbUFwa0NlcnQoc2VsZW5kcm9pZFRlc3RBcHAsICdpby5zZWxlbmRyb2lkLnRlc3RhcHAnKSkuc2hvdWxkLmJlLnRydWU7XG4gIH0pO1xufSk7XG4iXX0=