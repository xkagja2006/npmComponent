var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { jwjwSearchApi } from "./JWJWSearch";
var JWJWSearchBox = function (props) {
    var _a = useState(""), param = _a[0], setParam = _a[1];
    var _b = useState(""), debouncedParam = _b[0], setDebouncedParam = _b[1];
    var listRef = useRef(null);
    var _c = useState([]), list = _c[0], setList = _c[1];
    var success = function (data) {
        setList(function () { return data; });
    };
    var requestSearchApi = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jwjwSearchApi(props.baseApi, props.getFlag, props.url, debouncedParam, success, props.fail != null ? props.fail : function (error) { return console.log(error); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    //값이 바뀌었을 때 연관검색어 api 요청 보내기
    useEffect(function () {
        var timer = setTimeout(function () {
            setDebouncedParam(param);
        }, 200);
        return function () {
            clearTimeout(timer); //이전의 타이머를 clear
        };
    }, [param]);
    useEffect(function () {
        if (debouncedParam != null && debouncedParam != "")
            requestSearchApi();
    }, [debouncedParam]);
    //검색어 리스트가 바뀌었을 때 연관검색어를 보여줄 ul 업데이트
    useEffect(function () {
        var _a;
        if (list.length > 0) {
            list.forEach(function (string) {
                var _a;
                var LiElement = document.createElement("li");
                LiElement.style.cursor = "pointer";
                LiElement.addEventListener("click", function () {
                    returnResult(string);
                });
                LiElement.textContent = string;
                (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.appendChild(LiElement);
            });
        }
        else if (param != "") {
            //검색어가 있는데 리스트가 비어있을 때 -> 연관된 검색어 결과가 나타나지 않을 때
            var LiElement = document.createElement("li");
            LiElement.textContent = props.noDataText != null ? props.noDataText : "연관 검색어가 없어요";
            (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.appendChild(LiElement);
        }
        return function () {
            var _a, _b, _c;
            while ((_a = listRef.current) === null || _a === void 0 ? void 0 : _a.hasChildNodes()) {
                if (((_b = listRef.current) === null || _b === void 0 ? void 0 : _b.firstChild) != null)
                    (_c = listRef.current) === null || _c === void 0 ? void 0 : _c.removeChild(listRef.current.firstChild);
            }
        };
    }, [list]);
    //최종 검색 값을 보내주는 함수
    function returnResult(finalParam) {
        if (finalParam === void 0) { finalParam = param; }
        finalParam = finalParam.trim();
        if (finalParam == null || finalParam == "") {
            //값이 비어있으면
            alert("값이 비어있어요!");
            return;
        }
        props.result(finalParam);
    }
    return (_jsxs("div", __assign({ className: "".concat(props.containerClassName != null ? props.containerClassName : "JWJWSearchContainer") }, { children: [_jsx("input", { type: "text", onChange: function (e) {
                    setParam(e.target.value);
                }, onKeyUp: function (e) {
                    if (e.key == "Enter")
                        returnResult();
                }, value: param }), props.buttonFlag == null || props.buttonFlag ? (_jsx("button", __assign({ onClick: function () {
                    returnResult();
                } }, { children: "\uBC84\uD2BC" }))) : null, _jsx("ul", { ref: listRef })] })));
};
export default JWJWSearchBox;
