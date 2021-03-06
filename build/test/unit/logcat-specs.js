'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this2 = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _libLogcat = require('../../lib/logcat');

var _libLogcat2 = _interopRequireDefault(_libLogcat);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].use(_chaiAsPromised2['default']);

describe('logcat', function callee$0$0() {
  var adb, logcat;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        adb = { path: 'dummyPath', defaultArgs: [] };
        logcat = new _libLogcat2['default']({ adb: adb, debug: false, debugTrace: false });

        describe('startCapture', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process }, function (mocks) {
          it('should correctly call subprocess and should resolve promise', function callee$2$0() {
            var conn, logs;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  conn = new _events2['default'].EventEmitter();

                  conn.start = function () {};
                  mocks.teen_process.expects("SubProcess").once().withExactArgs('dummyPath', ['logcat', '-v', 'threadtime']).returns(conn);
                  setTimeout(function () {
                    conn.emit('lines-stdout', ['- beginning of system\r']);
                  }, 0);
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(logcat.startCapture());

                case 6:
                  logs = logcat.getLogs();

                  logs.should.have.length.above(0);
                  mocks.teen_process.verify();

                case 9:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });
          it('should correctly call subprocess and should reject promise', function callee$2$0() {
            var conn;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  conn = new _events2['default'].EventEmitter();

                  conn.start = function () {};
                  mocks.teen_process.expects("SubProcess").once().withExactArgs('dummyPath', ['logcat', '-v', 'threadtime']).returns(conn);
                  setTimeout(function () {
                    conn.emit('lines-stderr', ['execvp()']);
                  }, 0);
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(logcat.startCapture().should.eventually.be.rejectedWith('Logcat'));

                case 6:
                  mocks.teen_process.verify();

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });
        }));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this2);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9sb2djYXQtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7NEJBQ2YsY0FBYzs7SUFBaEMsWUFBWTs7c0JBQ0wsUUFBUTs7Ozt5QkFDUixrQkFBa0I7Ozs7aUNBQ1gscUJBQXFCOztBQUcvQyxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsUUFBUSxFQUFFO01BQ2IsR0FBRyxFQUNILE1BQU07Ozs7OztBQUROLFdBQUcsR0FBRyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBQztBQUMxQyxjQUFNLEdBQUcsMkJBQVcsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDOztBQUNwRSxnQkFBUSxDQUFDLGNBQWMsRUFBRSxrQ0FBVSxFQUFDLFlBQVksRUFBWixZQUFZLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUM1RCxZQUFFLENBQUMsNkRBQTZELEVBQUU7Z0JBQzVELElBQUksRUFTSixJQUFJOzs7O0FBVEosc0JBQUksR0FBRyxJQUFJLG9CQUFPLFlBQVksRUFBRTs7QUFDcEMsc0JBQUksQ0FBQyxLQUFLLEdBQUcsWUFBTSxFQUFHLENBQUM7QUFDdkIsdUJBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUNyQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUNqRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsNEJBQVUsQ0FBQyxZQUFZO0FBQ3JCLHdCQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQzttQkFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQzs7bURBQ0EsTUFBTSxDQUFDLFlBQVksRUFBRTs7O0FBQ3ZCLHNCQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRTs7QUFDM0Isc0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsdUJBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7V0FDN0IsQ0FBQyxDQUFDO0FBQ0gsWUFBRSxDQUFDLDREQUE0RCxFQUFFO2dCQUMzRCxJQUFJOzs7O0FBQUosc0JBQUksR0FBRyxJQUFJLG9CQUFPLFlBQVksRUFBRTs7QUFDcEMsc0JBQUksQ0FBQyxLQUFLLEdBQUcsWUFBTSxFQUFHLENBQUM7QUFDdkIsdUJBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUNyQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUNqRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsNEJBQVUsQ0FBQyxZQUFZO0FBQ3JCLHdCQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7bUJBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O21EQUNBLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDOzs7QUFDdkUsdUJBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7V0FDN0IsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Q0FDTCxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2xvZ2NhdC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0ICogYXMgdGVlbl9wcm9jZXNzIGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgZXZlbnRzIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgTG9nY2F0IGZyb20gJy4uLy4uL2xpYi9sb2djYXQnO1xuaW1wb3J0IHsgd2l0aE1vY2tzIH0gZnJvbSAnYXBwaXVtLXRlc3Qtc3VwcG9ydCc7XG5cblxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnbG9nY2F0JywgYXN5bmMgKCkgPT4ge1xuICBsZXQgYWRiID0ge3BhdGg6ICdkdW1teVBhdGgnLCBkZWZhdWx0QXJnczogW119O1xuICBsZXQgbG9nY2F0ID0gbmV3IExvZ2NhdCh7YWRiOiBhZGIsIGRlYnVnOiBmYWxzZSwgZGVidWdUcmFjZTogZmFsc2V9KTtcbiAgZGVzY3JpYmUoJ3N0YXJ0Q2FwdHVyZScsIHdpdGhNb2Nrcyh7dGVlbl9wcm9jZXNzfSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgY2FsbCBzdWJwcm9jZXNzIGFuZCBzaG91bGQgcmVzb2x2ZSBwcm9taXNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNvbm4gPSBuZXcgZXZlbnRzLkV2ZW50RW1pdHRlcigpO1xuICAgICAgY29ubi5zdGFydCA9ICgpID0+IHsgfTtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiU3ViUHJvY2Vzc1wiKVxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoJ2R1bW15UGF0aCcsIFsnbG9nY2F0JywgJy12JywgJ3RocmVhZHRpbWUnXSlcbiAgICAgICAgLnJldHVybnMoY29ubik7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29ubi5lbWl0KCdsaW5lcy1zdGRvdXQnLFsnLSBiZWdpbm5pbmcgb2Ygc3lzdGVtXFxyJ10pO1xuICAgICAgfSwgMCk7XG4gICAgICBhd2FpdCBsb2djYXQuc3RhcnRDYXB0dXJlKCk7XG4gICAgICBsZXQgbG9ncyA9IGxvZ2NhdC5nZXRMb2dzKCk7XG4gICAgICBsb2dzLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSBjYWxsIHN1YnByb2Nlc3MgYW5kIHNob3VsZCByZWplY3QgcHJvbWlzZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjb25uID0gbmV3IGV2ZW50cy5FdmVudEVtaXR0ZXIoKTtcbiAgICAgIGNvbm4uc3RhcnQgPSAoKSA9PiB7IH07XG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcIlN1YlByb2Nlc3NcIilcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdkdW1teVBhdGgnLCBbJ2xvZ2NhdCcsICctdicsICd0aHJlYWR0aW1lJ10pXG4gICAgICAgIC5yZXR1cm5zKGNvbm4pO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbm4uZW1pdCgnbGluZXMtc3RkZXJyJyxbJ2V4ZWN2cCgpJ10pO1xuICAgICAgfSwgMCk7XG4gICAgICBhd2FpdCBsb2djYXQuc3RhcnRDYXB0dXJlKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKCdMb2djYXQnKTtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xufSk7XG4iXX0=