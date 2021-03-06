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

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].use(_chaiAsPromised2['default']);

describe('android-manifest', function () {
  var adb = new _2['default']();
  describe('processFromManifest', (0, _appiumTestSupport.withMocks)({ adb: adb, teen_process: teen_process }, function (mocks) {
    it('should correctly parse process from manifest', function callee$2$0() {
      var localApk, dummyProcess;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.binaries.aapt = 'dummy_aapt';
            localApk = 'dummyAPK', dummyProcess = 'dummyProcess';

            mocks.adb.expects("initAapt").once().withExactArgs().returns('');
            mocks.teen_process.expects("exec").once().withExactArgs('dummy_aapt', ['dump', 'xmltree', localApk, 'AndroidManifest.xml']).returns({ stdout: ' E: application (line=234)\n                          A: android:process(0x01010011)="' + dummyProcess + '"' });
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.processFromManifest(localApk));

          case 6:
            context$3$0.t0 = dummyProcess;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('packageAndLaunchActivityFromManifest', (0, _appiumTestSupport.withMocks)({ adb: adb, teen_process: teen_process }, function (mocks) {
    it('should correctly parse package and activity from manifest', function callee$2$0() {
      var localApk, dummyPackageName, dummyActivityName, _ref, apkPackage, apkActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.binaries.aapt = 'dummy_aapt';
            localApk = 'dummyAPK', dummyPackageName = 'package', dummyActivityName = 'activity';

            mocks.adb.expects("initAapt").once().withExactArgs().returns('');
            mocks.teen_process.expects("exec").once().withExactArgs('dummy_aapt', ['dump', 'badging', localApk]).returns({ stdout: ' package: name=\'' + dummyPackageName + '\'\n                            launchable-activity: name=\'' + dummyActivityName + '\'' });
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.packageAndLaunchActivityFromManifest(localApk));

          case 6:
            _ref = context$3$0.sent;
            apkPackage = _ref.apkPackage;
            apkActivity = _ref.apkActivity;

            apkPackage.should.equal(dummyPackageName);
            apkActivity.should.equal(dummyActivityName);
            mocks.adb.verify();

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('hasInternetPermissionFromManifest', (0, _appiumTestSupport.withMocks)({ adb: adb, teen_process: teen_process }, function (mocks) {
    it('should correctly parse internet permission from manifest', function callee$2$0() {
      var localApk;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.binaries.aapt = 'dummy_aapt';
            localApk = 'dummyAPK';

            mocks.adb.expects("initAapt").once().withExactArgs().returns('');
            mocks.teen_process.expects("exec").once().withExactArgs('dummy_aapt', ['dump', 'badging', localApk]).returns({ stdout: ' uses-permission:.*\'android.permission.INTERNET\'' });
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.hasInternetPermissionFromManifest(localApk));

          case 6:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hbmRyb2lkLW1hbmlmZXN0LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUM3QixPQUFPOzs7OzRCQUNPLGNBQWM7O0lBQWhDLFlBQVk7O2lDQUNFLHFCQUFxQjs7QUFHL0Msa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDakMsTUFBSSxHQUFHLEdBQUcsbUJBQVMsQ0FBQztBQUNwQixVQUFRLENBQUMscUJBQXFCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLFlBQVksRUFBWixZQUFZLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUN4RSxNQUFFLENBQUMsOENBQThDLEVBQUU7VUFFM0MsUUFBUSxFQUNSLFlBQVk7Ozs7QUFGbEIsZUFBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO0FBQzNCLG9CQUFRLEdBQUcsVUFBVSxFQUNyQixZQUFZLEdBQUcsY0FBYzs7QUFDbkMsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUMxQixJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FDaEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JCLGlCQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FDL0IsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUMxQyxxQkFBcUIsQ0FBQyxDQUFDLENBQzVDLE9BQU8sQ0FBQyxFQUFDLE1BQU0sNkZBQ29DLFlBQVksTUFBRyxFQUFDLENBQUMsQ0FBQzs7NkNBQ2pFLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7Ozs2QkFBZSxZQUFZOzZCQUF6QixNQUFNLENBQUMsS0FBSzs7QUFDdEQsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixVQUFRLENBQUMsc0NBQXNDLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLFlBQVksRUFBWixZQUFZLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUN6RixNQUFFLENBQUMsMkRBQTJELEVBQUU7VUFFeEQsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixpQkFBaUIsUUFRbEIsVUFBVSxFQUFFLFdBQVc7Ozs7O0FBWDVCLGVBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUMzQixvQkFBUSxHQUFHLFVBQVUsRUFDckIsZ0JBQWdCLEdBQUcsU0FBUyxFQUM1QixpQkFBaUIsR0FBRyxVQUFVOztBQUNwQyxpQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQzFCLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUNoQixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckIsaUJBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUMvQixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUNqRSxPQUFPLENBQUMsRUFBQyxNQUFNLHdCQUFxQixnQkFBZ0Isb0VBQ0osaUJBQWlCLE9BQUcsRUFBQyxDQUFDLENBQUM7OzZDQUNuQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsUUFBUSxDQUFDOzs7O0FBQXBGLHNCQUFVLFFBQVYsVUFBVTtBQUFFLHVCQUFXLFFBQVgsV0FBVzs7QUFDNUIsc0JBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDMUMsdUJBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDNUMsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixVQUFRLENBQUMsbUNBQW1DLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLFlBQVksRUFBWixZQUFZLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUN0RixNQUFFLENBQUMsMERBQTBELEVBQUU7VUFFdkQsUUFBUTs7OztBQURkLGVBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUMzQixvQkFBUSxHQUFHLFVBQVU7O0FBQzNCLGlCQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FDMUIsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ2hCLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNyQixpQkFBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQy9CLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQ2pFLE9BQU8sQ0FBQyxFQUFDLE1BQU0sc0RBQW9ELEVBQUMsQ0FBQyxDQUFDOzs2Q0FDbEUsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLFFBQVEsQ0FBQzs7OzZCQUFFLE1BQU0sQ0FBQyxFQUFFOztBQUNqRSxpQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztLQUNwQixDQUFDLENBQUM7R0FDSixDQUFDLENBQUMsQ0FBQztDQUNMLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvYW5kcm9pZC1tYW5pZmVzdC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFEQiBmcm9tICcuLi8uLic7XG5pbXBvcnQgKiBhcyB0ZWVuX3Byb2Nlc3MgZnJvbSAndGVlbl9wcm9jZXNzJztcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xuXG5cbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ2FuZHJvaWQtbWFuaWZlc3QnLCAoKSA9PiB7XG4gIGxldCBhZGIgPSBuZXcgQURCKCk7XG4gIGRlc2NyaWJlKCdwcm9jZXNzRnJvbU1hbmlmZXN0Jywgd2l0aE1vY2tzKHthZGIsIHRlZW5fcHJvY2Vzc30sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IHBhcnNlIHByb2Nlc3MgZnJvbSBtYW5pZmVzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGFkYi5iaW5hcmllcy5hYXB0ID0gJ2R1bW15X2FhcHQnO1xuICAgICAgY29uc3QgbG9jYWxBcGsgPSAnZHVtbXlBUEsnLFxuICAgICAgICAgICAgZHVtbXlQcm9jZXNzID0gJ2R1bW15UHJvY2Vzcyc7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImluaXRBYXB0XCIpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXG4gICAgICAgICAgICAgIC5yZXR1cm5zKCcnKTtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoJ2R1bW15X2FhcHQnLCBbJ2R1bXAnLCAneG1sdHJlZScsIGxvY2FsQXBrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FuZHJvaWRNYW5pZmVzdC54bWwnXSlcbiAgICAgICAgLnJldHVybnMoe3N0ZG91dDogYCBFOiBhcHBsaWNhdGlvbiAobGluZT0yMzQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEE6IGFuZHJvaWQ6cHJvY2VzcygweDAxMDEwMDExKT1cIiR7ZHVtbXlQcm9jZXNzfVwiYH0pO1xuICAgICAgKGF3YWl0IGFkYi5wcm9jZXNzRnJvbU1hbmlmZXN0KGxvY2FsQXBrKSkuc2hvdWxkLmVxdWFsKGR1bW15UHJvY2Vzcyk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3BhY2thZ2VBbmRMYXVuY2hBY3Rpdml0eUZyb21NYW5pZmVzdCcsIHdpdGhNb2Nrcyh7YWRiLCB0ZWVuX3Byb2Nlc3N9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSBwYXJzZSBwYWNrYWdlIGFuZCBhY3Rpdml0eSBmcm9tIG1hbmlmZXN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYWRiLmJpbmFyaWVzLmFhcHQgPSAnZHVtbXlfYWFwdCc7XG4gICAgICBjb25zdCBsb2NhbEFwayA9ICdkdW1teUFQSycsXG4gICAgICAgICAgICBkdW1teVBhY2thZ2VOYW1lID0gJ3BhY2thZ2UnLFxuICAgICAgICAgICAgZHVtbXlBY3Rpdml0eU5hbWUgPSAnYWN0aXZpdHknO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJpbml0QWFwdFwiKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxuICAgICAgICAgICAgICAucmV0dXJucygnJyk7XG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcImV4ZWNcIilcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdkdW1teV9hYXB0JywgWydkdW1wJywgJ2JhZGdpbmcnLCBsb2NhbEFwa10pXG4gICAgICAgIC5yZXR1cm5zKHtzdGRvdXQ6IGAgcGFja2FnZTogbmFtZT0nJHtkdW1teVBhY2thZ2VOYW1lfSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXVuY2hhYmxlLWFjdGl2aXR5OiBuYW1lPScke2R1bW15QWN0aXZpdHlOYW1lfSdgfSk7XG4gICAgICBsZXQge2Fwa1BhY2thZ2UsIGFwa0FjdGl2aXR5fSA9IChhd2FpdCBhZGIucGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0KGxvY2FsQXBrKSk7XG4gICAgICBhcGtQYWNrYWdlLnNob3VsZC5lcXVhbChkdW1teVBhY2thZ2VOYW1lKTtcbiAgICAgIGFwa0FjdGl2aXR5LnNob3VsZC5lcXVhbChkdW1teUFjdGl2aXR5TmFtZSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ2hhc0ludGVybmV0UGVybWlzc2lvbkZyb21NYW5pZmVzdCcsIHdpdGhNb2Nrcyh7YWRiLCB0ZWVuX3Byb2Nlc3N9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSBwYXJzZSBpbnRlcm5ldCBwZXJtaXNzaW9uIGZyb20gbWFuaWZlc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhZGIuYmluYXJpZXMuYWFwdCA9ICdkdW1teV9hYXB0JztcbiAgICAgIGNvbnN0IGxvY2FsQXBrID0gJ2R1bW15QVBLJztcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiaW5pdEFhcHRcIilcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcbiAgICAgICAgICAgICAgLnJldHVybnMoJycpO1xuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoXCJleGVjXCIpXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnZHVtbXlfYWFwdCcsIFsnZHVtcCcsICdiYWRnaW5nJywgbG9jYWxBcGtdKVxuICAgICAgICAucmV0dXJucyh7c3Rkb3V0OiBgIHVzZXMtcGVybWlzc2lvbjouKidhbmRyb2lkLnBlcm1pc3Npb24uSU5URVJORVQnYH0pO1xuICAgICAgKGF3YWl0IGFkYi5oYXNJbnRlcm5ldFBlcm1pc3Npb25Gcm9tTWFuaWZlc3QobG9jYWxBcGspKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xufSk7XG4iXX0=