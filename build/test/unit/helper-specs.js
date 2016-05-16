'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _libHelpers = require('../../lib/helpers');

var _appiumTestSupport = require('appium-test-support');

var _appiumSupport = require('appium-support');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var should = _chai2['default'].should;

describe('helpers', function () {
  describe('getPossibleActivityNames', function () {
    it('should correctly remove pkg from pkg.activity.name', function () {
      (0, _libHelpers.getPossibleActivityNames)('pkg', 'pkg.activity.name').should.include('.activity.name');
    });
    it('should return .act.name when act.name is passed', function () {
      (0, _libHelpers.getPossibleActivityNames)('pkg', 'act.name').should.include('.act.name');
    });
    it('should not amend a valid activity name', function () {
      (0, _libHelpers.getPossibleActivityNames)('pkg', '.activity.name').should.include('.activity.name');
    });
    it('should handle case where application id is different from package name', function () {
      (0, _libHelpers.getPossibleActivityNames)('com.ga.aaa.android.bbb.activities.local', 'com.ga.aaa.android.bbb.activity.FirstLaunchActivity').should.include('com.ga.aaa.android.bbb.activity.FirstLaunchActivity');
    });
  });

  describe('getDirectories', (0, _appiumTestSupport.withMocks)({ fs: _appiumSupport.fs }, function (mocks) {
    it('should sort the directories', function callee$2$0() {
      var rootPath, directories;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            rootPath = '/path/to/root';
            directories = ['c', 'b', 'a', '1', '2'];

            mocks.fs.expects('readdir').once().withExactArgs(rootPath).returns(directories);
            mocks.fs.expects('lstat').exactly(5).returns(_Promise.resolve({ isDirectory: function isDirectory() {
                return true;
              } }));
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap((0, _libHelpers.getDirectories)(rootPath));

          case 6:
            context$3$0.t0 = ['1', '2', 'a', 'b', 'c'];
            context$3$0.sent.should.eql(context$3$0.t0);

            mocks.fs.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('getAndroidPlatformAndPath', (0, _appiumTestSupport.withMocks)({ fs: _appiumSupport.fs, path: _path2['default'] }, function (mocks) {
    it('should return null if no ANDROID_HOME is set', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _libHelpers.getAndroidPlatformAndPath)());

          case 2:
            context$3$0.t0 = context$3$0.sent;
            should(context$3$0.t0).not.exist;

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get the latest available API', function callee$2$0() {
      var oldAndroidHome, platformAndPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            oldAndroidHome = process.env.ANDROID_HOME;

            process.env.ANDROID_HOME = '/path/to/android/home';
            mocks.fs.expects('exists').exactly(2).onCall(0).returns(false).onCall(1).returns(true);
            mocks.path.expects('resolve').exactly(4).onCall(0).returns('/path/to/apis0').onCall(1).returns('/path/to/apis1').onCall(2).returns('/path/to/apis2').onCall(3).returns('/path/to/apis3');

            context$3$0.next = 6;
            return _regeneratorRuntime.awrap((0, _libHelpers.getAndroidPlatformAndPath)());

          case 6:
            platformAndPath = context$3$0.sent;

            platformAndPath.platform.should.equal('android-23');
            platformAndPath.platformPath.should.equal('/path/to/apis3');

            mocks.fs.verify();
            mocks.path.verify();
            process.env.ANDROID_HOME = oldAndroidHome;

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9oZWxwZXItc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OzswQkFBb0YsbUJBQW1COztpQ0FDN0UscUJBQXFCOzs2QkFDNUIsZ0JBQWdCOztvQkFDbEIsTUFBTTs7OztvQkFDTixNQUFNOzs7O0FBR3ZCLElBQU0sTUFBTSxHQUFHLGtCQUFLLE1BQU0sQ0FBQzs7QUFFM0IsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFNO0FBQ3hCLFVBQVEsQ0FBQywwQkFBMEIsRUFBRSxZQUFNO0FBQ3pDLE1BQUUsQ0FBQyxvREFBb0QsRUFBRSxZQUFNO0FBQzdELGdEQUF5QixLQUFLLEVBQUUsbUJBQW1CLENBQUMsQ0FDakQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3JDLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxpREFBaUQsRUFBRSxZQUFNO0FBQzFELGdEQUF5QixLQUFLLEVBQUUsVUFBVSxDQUFDLENBQ3hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDaEMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHdDQUF3QyxFQUFFLFlBQU07QUFDakQsZ0RBQXlCLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUM5QyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDckMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHdFQUF3RSxFQUFFLFlBQU07QUFDaEYsZ0RBQXlCLHlDQUF5QyxFQUFFLHFEQUFxRCxDQUFDLENBQ3ZILE1BQU0sQ0FBQyxPQUFPLENBQUMscURBQXFELENBQUMsQ0FBQztLQUMxRSxDQUFDLENBQUM7R0FDTCxDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGdCQUFnQixFQUFFLGtDQUFVLEVBQUMsRUFBRSxtQkFBQSxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDcEQsTUFBRSxDQUFDLDZCQUE2QixFQUFFO1VBQzVCLFFBQVEsRUFDUixX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ZXRQb3NzaWJsZUFjdGl2aXR5TmFtZXMsIGdldERpcmVjdG9yaWVzLCBnZXRBbmRyb2lkUGxhdGZvcm1BbmRQYXRoIH0gZnJvbSAnLi4vLi4vbGliL2hlbHBlcnMnO1xuaW1wb3J0IHsgd2l0aE1vY2tzIH0gZnJvbSAnYXBwaXVtLXRlc3Qtc3VwcG9ydCc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5cblxuY29uc3Qgc2hvdWxkID0gY2hhaS5zaG91bGQ7XG5cbmRlc2NyaWJlKCdoZWxwZXJzJywgKCkgPT4ge1xuICBkZXNjcmliZSgnZ2V0UG9zc2libGVBY3Rpdml0eU5hbWVzJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IHJlbW92ZSBwa2cgZnJvbSBwa2cuYWN0aXZpdHkubmFtZScsICgpID0+IHtcbiAgICAgIGdldFBvc3NpYmxlQWN0aXZpdHlOYW1lcygncGtnJywgJ3BrZy5hY3Rpdml0eS5uYW1lJylcbiAgICAgICAgLnNob3VsZC5pbmNsdWRlKCcuYWN0aXZpdHkubmFtZScpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIC5hY3QubmFtZSB3aGVuIGFjdC5uYW1lIGlzIHBhc3NlZCcsICgpID0+IHtcbiAgICAgIGdldFBvc3NpYmxlQWN0aXZpdHlOYW1lcygncGtnJywgJ2FjdC5uYW1lJylcbiAgICAgICAgLnNob3VsZC5pbmNsdWRlKCcuYWN0Lm5hbWUnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBhbWVuZCBhIHZhbGlkIGFjdGl2aXR5IG5hbWUnLCAoKSA9PiB7XG4gICAgICBnZXRQb3NzaWJsZUFjdGl2aXR5TmFtZXMoJ3BrZycsICcuYWN0aXZpdHkubmFtZScpXG4gICAgICAgIC5zaG91bGQuaW5jbHVkZSgnLmFjdGl2aXR5Lm5hbWUnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGhhbmRsZSBjYXNlIHdoZXJlIGFwcGxpY2F0aW9uIGlkIGlzIGRpZmZlcmVudCBmcm9tIHBhY2thZ2UgbmFtZScsICgpID0+IHtcbiAgICAgICBnZXRQb3NzaWJsZUFjdGl2aXR5TmFtZXMoJ2NvbS5nYS5hYWEuYW5kcm9pZC5iYmIuYWN0aXZpdGllcy5sb2NhbCcsICdjb20uZ2EuYWFhLmFuZHJvaWQuYmJiLmFjdGl2aXR5LkZpcnN0TGF1bmNoQWN0aXZpdHknKVxuICAgICAgICAgLnNob3VsZC5pbmNsdWRlKCdjb20uZ2EuYWFhLmFuZHJvaWQuYmJiLmFjdGl2aXR5LkZpcnN0TGF1bmNoQWN0aXZpdHknKTtcbiAgICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXREaXJlY3RvcmllcycsIHdpdGhNb2Nrcyh7ZnN9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIHNvcnQgdGhlIGRpcmVjdG9yaWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJvb3RQYXRoID0gJy9wYXRoL3RvL3Jvb3QnO1xuICAgICAgbGV0IGRpcmVjdG9yaWVzID0gWydjJywgJ2InLCAnYScsICcxJywgJzInXTtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ3JlYWRkaXInKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3Mocm9vdFBhdGgpXG4gICAgICAgIC5yZXR1cm5zKGRpcmVjdG9yaWVzKTtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2xzdGF0JylcbiAgICAgICAgLmV4YWN0bHkoNSlcbiAgICAgICAgLnJldHVybnMoUHJvbWlzZS5yZXNvbHZlKHtpc0RpcmVjdG9yeTogKCkgPT4ge3JldHVybiB0cnVlO319KSk7XG4gICAgICAoYXdhaXQgZ2V0RGlyZWN0b3JpZXMocm9vdFBhdGgpKS5zaG91bGQuZXFsKFsnMScsICcyJywgJ2EnLCAnYicsICdjJ10pO1xuICAgICAgbW9ja3MuZnMudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcblxuICBkZXNjcmliZSgnZ2V0QW5kcm9pZFBsYXRmb3JtQW5kUGF0aCcsIHdpdGhNb2Nrcyh7ZnMsIHBhdGh9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGlmIG5vIEFORFJPSURfSE9NRSBpcyBzZXQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBzaG91bGQoYXdhaXQgZ2V0QW5kcm9pZFBsYXRmb3JtQW5kUGF0aCgpKS5ub3QuZXhpc3Q7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGxhdGVzdCBhdmFpbGFibGUgQVBJJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IG9sZEFuZHJvaWRIb21lID0gcHJvY2Vzcy5lbnYuQU5EUk9JRF9IT01FO1xuICAgICAgcHJvY2Vzcy5lbnYuQU5EUk9JRF9IT01FID0gJy9wYXRoL3RvL2FuZHJvaWQvaG9tZSc7XG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdleGlzdHMnKVxuICAgICAgICAuZXhhY3RseSgyKVxuICAgICAgICAub25DYWxsKDApLnJldHVybnMoZmFsc2UpXG4gICAgICAgIC5vbkNhbGwoMSkucmV0dXJucyh0cnVlKTtcbiAgICAgIG1vY2tzLnBhdGguZXhwZWN0cygncmVzb2x2ZScpXG4gICAgICAgIC5leGFjdGx5KDQpXG4gICAgICAgIC5vbkNhbGwoMCkucmV0dXJucygnL3BhdGgvdG8vYXBpczAnKVxuICAgICAgICAub25DYWxsKDEpLnJldHVybnMoJy9wYXRoL3RvL2FwaXMxJylcbiAgICAgICAgLm9uQ2FsbCgyKS5yZXR1cm5zKCcvcGF0aC90by9hcGlzMicpXG4gICAgICAgIC5vbkNhbGwoMykucmV0dXJucygnL3BhdGgvdG8vYXBpczMnKTtcblxuICAgICAgbGV0IHBsYXRmb3JtQW5kUGF0aCA9IGF3YWl0IGdldEFuZHJvaWRQbGF0Zm9ybUFuZFBhdGgoKTtcbiAgICAgIHBsYXRmb3JtQW5kUGF0aC5wbGF0Zm9ybS5zaG91bGQuZXF1YWwoJ2FuZHJvaWQtMjMnKTtcbiAgICAgIHBsYXRmb3JtQW5kUGF0aC5wbGF0Zm9ybVBhdGguc2hvdWxkLmVxdWFsKCcvcGF0aC90by9hcGlzMycpO1xuXG4gICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLnBhdGgudmVyaWZ5KCk7XG4gICAgICBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUUgPSBvbGRBbmRyb2lkSG9tZTtcbiAgICB9KTtcbiAgfSkpO1xufSk7XG4iXX0=