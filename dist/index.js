"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOperative = void 0;

var _react = require("react");

var _operativeClient = _interopRequireDefault(require("operative-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useOperative = function useOperative(_ref) {
  var httpClient = _ref.httpClient,
      webSocket = _ref.webSocket,
      handleOutOfOrder = _ref.handleOutOfOrder,
      persister = _ref.persister;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      operative = _useState2[0],
      setOperative = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      records = _useState4[0],
      setRecords = _useState4[1];

  (0, _react.useEffect)(function () {
    _operativeClient["default"].create({
      httpClient: httpClient,
      webSocket: webSocket,
      handleOutOfOrder: handleOutOfOrder,
      persister: persister,
      onChange: setRecords
    }).then(function (newOperative) {
      setOperative(newOperative);
    });
  }, [httpClient, webSocket, handleOutOfOrder, persister]);
  var ready = operative !== null;
  var create = (0, _react.useCallback)(function (attributes) {
    return operative.create(attributes);
  }, [operative]);
  var update = (0, _react.useCallback)(function (record, attributes) {
    return operative.update(record, attributes);
  }, [operative]);
  var destroy = (0, _react.useCallback)(function (recordToDelete) {
    return operative["delete"](recordToDelete);
  }, [operative]);
  var sync = (0, _react.useCallback)(function () {
    return operative.sync();
  }, [operative]);
  (0, _react.useEffect)(function () {
    if (ready) {
      setRecords(operative.records);
      operative.loadAll();
    }
  }, [ready, operative]);
  return {
    ready: ready,
    records: records,
    create: create,
    update: update,
    destroy: destroy,
    sync: sync
  };
};

exports.useOperative = useOperative;
//# sourceMappingURL=index.js.map