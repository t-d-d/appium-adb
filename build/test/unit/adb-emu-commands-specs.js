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
_chai2['default'].should();

var emulators = [{ udid: 'emulator-5554', state: 'device', port: 5554 }, { udid: 'emulator-5556', state: 'device', port: 5556 }];
var fingerprint = 1111;

describe('adb emulator commands', function () {
  var adb = new _2['default']();
  describe("emu", function () {
    describe("isEmulatorConnected", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should check emulator is connected", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getConnectedEmulators").atLeast(1).withExactArgs().returns(emulators);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isEmulatorConnected("emulator-5554"));

            case 3:
              context$4$0.sent.should.equal(true);
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.isEmulatorConnected("emulator-5556"));

            case 6:
              context$4$0.sent.should.equal(true);
              context$4$0.next = 9;
              return _regeneratorRuntime.awrap(adb.isEmulatorConnected("emulator-5558"));

            case 9:
              context$4$0.sent.should.equal(false);

              mocks.adb.verify();

            case 11:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe("fingerprint", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should emit fingerprint without error", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getConnectedEmulators").atLeast(1).withExactArgs().returns(emulators);
              mocks.adb.expects("getApiLevel").atLeast(1).withExactArgs().returns("23");
              mocks.adb.expects("setDeviceId").once().withExactArgs("emulator-5554").returns();
              mocks.adb.expects("setDeviceId").once().withExactArgs("emulator-5556").returns();
              mocks.adb.expects("adbExec").atLeast(1).withExactArgs(["emu", "finger", "touch", fingerprint]).returns("");
              context$4$0.next = 7;
              return _regeneratorRuntime.awrap(adb.fingerprint(fingerprint));

            case 7:
              context$4$0.next = 9;
              return _regeneratorRuntime.awrap(adb.fingerprint(fingerprint, "emulator-5554"));

            case 9:
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(adb.fingerprint(fingerprint, "emulator-5556"));

            case 11:
              mocks.adb.verify();

            case 12:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should throw an error on fingerprint argument undefined", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(adb.fingerprint().should.eventually.be.rejected);

            case 2:
              mocks.adb.verify();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should throw an error on emulator not connected", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getApiLevel").atLeast(1).withExactArgs().returns("23");
              mocks.adb.expects("getConnectedEmulators").once().withExactArgs().returns(emulators);
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.fingerprint(1111, "emulator-5558").should.eventually.be.rejected);

            case 4:
              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should throw an error on no emulators connected", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getApiLevel").atLeast(1).withExactArgs().returns("23");
              mocks.adb.expects("getConnectedEmulators").atLeast(1).withExactArgs().returns([]);
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.fingerprint(1111).should.eventually.be.rejected);

            case 4:
              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should throw an error on emulator Api Level < 23", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getApiLevel").once().withExactArgs().returns("22");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.fingerprint(1111).should.eventually.be.rejected);

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hZGItZW11LWNvbW1hbmRzLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDN0IsT0FBTzs7OztpQ0FDRyxxQkFBcUI7O0FBRy9DLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7QUFDekIsa0JBQUssTUFBTSxFQUFFLENBQUM7O0FBRWQsSUFBTSxTQUFTLEdBQUcsQ0FDaEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUN0RCxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQ3ZELENBQUM7QUFDRixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxZQUFNO0FBQ3RDLE1BQUksR0FBRyxHQUFHLG1CQUFTLENBQUM7QUFDcEIsVUFBUSxDQUFDLEtBQUssRUFBRSxZQUFNO0FBQ3BCLFlBQVEsQ0FBQyxxQkFBcUIsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUMxRCxRQUFFLENBQUMsb0NBQW9DLEVBQUU7Ozs7QUFDdkMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQ3ZDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FDMUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzsrQ0FDZixHQUFHLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDOzs7K0JBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJOzsrQ0FDM0QsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQzs7OytCQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTs7K0NBQzNELEdBQUcs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QyxDQUFDO0FBQ2pCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUN2QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQzFCLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7QUFDekQsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLGtEQUFrRCxFQUFFOzs7O0FBQ3JELG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FDN0IsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7K0NBQ1gsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7QUFDekQsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7R0FDTCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2FkYi1lbXUtY29tbWFuZHMtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBREIgZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHsgd2l0aE1vY2tzIH0gZnJvbSAnYXBwaXVtLXRlc3Qtc3VwcG9ydCc7XG5cblxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuY2hhaS5zaG91bGQoKTtcblxuY29uc3QgZW11bGF0b3JzID0gW1xuICB7IHVkaWQ6ICdlbXVsYXRvci01NTU0Jywgc3RhdGU6ICdkZXZpY2UnLCBwb3J0OiA1NTU0IH0sXG4gIHsgdWRpZDogJ2VtdWxhdG9yLTU1NTYnLCBzdGF0ZTogJ2RldmljZScsIHBvcnQ6IDU1NTYgfSxcbl07XG5jb25zdCBmaW5nZXJwcmludCA9IDExMTE7XG5cbmRlc2NyaWJlKCdhZGIgZW11bGF0b3IgY29tbWFuZHMnLCAoKSA9PiB7XG4gIGxldCBhZGIgPSBuZXcgQURCKCk7XG4gIGRlc2NyaWJlKFwiZW11XCIsICgpID0+IHtcbiAgICBkZXNjcmliZShcImlzRW11bGF0b3JDb25uZWN0ZWRcIiwgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICAgIGl0KFwic2hvdWxkIGNoZWNrIGVtdWxhdG9yIGlzIGNvbm5lY3RlZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0Q29ubmVjdGVkRW11bGF0b3JzXCIpXG4gICAgICAgICAgLmF0TGVhc3QoMSkud2l0aEV4YWN0QXJncygpXG4gICAgICAgICAgLnJldHVybnMoZW11bGF0b3JzKTtcbiAgICAgICAgKGF3YWl0IGFkYi5pc0VtdWxhdG9yQ29ubmVjdGVkKFwiZW11bGF0b3ItNTU1NFwiKSkuc2hvdWxkLmVxdWFsKHRydWUpO1xuICAgICAgICAoYXdhaXQgYWRiLmlzRW11bGF0b3JDb25uZWN0ZWQoXCJlbXVsYXRvci01NTU2XCIpKS5zaG91bGQuZXF1YWwodHJ1ZSk7XG4gICAgICAgIChhd2FpdCBhZGIuaXNFbXVsYXRvckNvbm5lY3RlZChcImVtdWxhdG9yLTU1NThcIikpLnNob3VsZC5lcXVhbChmYWxzZSk7XG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkZXNjcmliZShcImZpbmdlcnByaW50XCIsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgICBpdChcInNob3VsZCBlbWl0IGZpbmdlcnByaW50IHdpdGhvdXQgZXJyb3JcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldENvbm5lY3RlZEVtdWxhdG9yc1wiKVxuICAgICAgICAgIC5hdExlYXN0KDEpLndpdGhFeGFjdEFyZ3MoKVxuICAgICAgICAgIC5yZXR1cm5zKGVtdWxhdG9ycyk7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0QXBpTGV2ZWxcIilcbiAgICAgICAgICAuYXRMZWFzdCgxKS53aXRoRXhhY3RBcmdzKClcbiAgICAgICAgICAucmV0dXJucyhcIjIzXCIpO1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNldERldmljZUlkXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFwiZW11bGF0b3ItNTU1NFwiKVxuICAgICAgICAgIC5yZXR1cm5zKCk7XG4gICAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzZXREZXZpY2VJZFwiKVxuICAgICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFwiZW11bGF0b3ItNTU1NlwiKVxuICAgICAgICAgICAgLnJldHVybnMoKTtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJhZGJFeGVjXCIpXG4gICAgICAgICAgLmF0TGVhc3QoMSlcbiAgICAgICAgICAud2l0aEV4YWN0QXJncyhbXCJlbXVcIiwgXCJmaW5nZXJcIiwgXCJ0b3VjaFwiLCBmaW5nZXJwcmludF0pXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICAgIGF3YWl0IGFkYi5maW5nZXJwcmludChmaW5nZXJwcmludCk7XG4gICAgICAgIGF3YWl0IGFkYi5maW5nZXJwcmludChmaW5nZXJwcmludCwgXCJlbXVsYXRvci01NTU0XCIpO1xuICAgICAgICBhd2FpdCBhZGIuZmluZ2VycHJpbnQoZmluZ2VycHJpbnQsIFwiZW11bGF0b3ItNTU1NlwiKTtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdChcInNob3VsZCB0aHJvdyBhbiBlcnJvciBvbiBmaW5nZXJwcmludCBhcmd1bWVudCB1bmRlZmluZWRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBhZGIuZmluZ2VycHJpbnQoKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdChcInNob3VsZCB0aHJvdyBhbiBlcnJvciBvbiBlbXVsYXRvciBub3QgY29ubmVjdGVkXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKVxuICAgICAgICAgIC5hdExlYXN0KDEpLndpdGhFeGFjdEFyZ3MoKVxuICAgICAgICAgIC5yZXR1cm5zKFwiMjNcIik7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0Q29ubmVjdGVkRW11bGF0b3JzXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcbiAgICAgICAgICAucmV0dXJucyhlbXVsYXRvcnMpO1xuICAgICAgICBhd2FpdCBhZGIuZmluZ2VycHJpbnQoMTExMSwgXCJlbXVsYXRvci01NTU4XCIpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KFwic2hvdWxkIHRocm93IGFuIGVycm9yIG9uIG5vIGVtdWxhdG9ycyBjb25uZWN0ZWRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpXG4gICAgICAgICAgLmF0TGVhc3QoMSkud2l0aEV4YWN0QXJncygpXG4gICAgICAgICAgLnJldHVybnMoXCIyM1wiKTtcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRDb25uZWN0ZWRFbXVsYXRvcnNcIilcbiAgICAgICAgICAuYXRMZWFzdCgxKS53aXRoRXhhY3RBcmdzKClcbiAgICAgICAgICAucmV0dXJucyhbXSk7XG4gICAgICAgIGF3YWl0IGFkYi5maW5nZXJwcmludCgxMTExKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdChcInNob3VsZCB0aHJvdyBhbiBlcnJvciBvbiBlbXVsYXRvciBBcGkgTGV2ZWwgPCAyM1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0QXBpTGV2ZWxcIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxuICAgICAgICAgIC5yZXR1cm5zKFwiMjJcIik7XG4gICAgICAgIGF3YWl0IGFkYi5maW5nZXJwcmludCgxMTExKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9KTtcbn0pO1xuIl19