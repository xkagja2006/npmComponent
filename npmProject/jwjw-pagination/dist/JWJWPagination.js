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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
var JWJWPagination = function (props) {
    var _a = useState(1), curPage = _a[0], setCurPage = _a[1];
    var _b = useState([1]), result = _b[0], setResult = _b[1];
    var totalPage = Math.ceil(props.totalListCnt / props.perPage);
    var _c = useState(true), canNext = _c[0], setCanNext = _c[1];
    var _d = useState(false), canPrev = _d[0], setCanPrev = _d[1];
    var setList = function () {
        var listLastIdx = curPage + props.paginationsRange - (curPage % props.paginationsRange) <= totalPage ?
            curPage + props.paginationsRange - (curPage % props.paginationsRange) : totalPage;
        var listFirstIdx = curPage - (curPage % props.paginationsRange) + 1 >= 1 ?
            curPage - (curPage % props.paginationsRange) + 1 : 1;
        if (curPage % props.paginationsRange == 0) {
            listLastIdx = curPage;
            listFirstIdx = curPage - props.paginationsRange + 1;
        }
        setResult([]);
        var tmp = [];
        for (var i = listFirstIdx; i <= listLastIdx; i++) {
            tmp.push(i);
        }
        setResult(tmp);
    };
    useEffect(function () {
        if (curPage <= props.paginationsRange)
            setCanPrev(false);
        else
            setCanPrev(true);
        if (curPage >= totalPage - props.paginationsRange + 1)
            setCanNext(false);
        else
            setCanNext(true);
        setList();
        props.result({
            curPage: curPage,
            startIdx: (curPage - 1) * props.perPage + 1,
            endIdx: curPage * props.perPage,
        });
    }, [curPage]);
    var start = function () {
        setCurPage(1);
    };
    var prev = function () {
        var newIdx = curPage % props.paginationsRange == 0 ?
            curPage - props.paginationsRange :
            curPage - (curPage % props.paginationsRange);
        setCurPage(newIdx);
    };
    var next = function () {
        var newIdx = curPage % props.paginationsRange == 0 ?
            curPage - (curPage % props.paginationsRange) + 1 :
            curPage + props.paginationsRange - (curPage % props.paginationsRange) + 1;
        setCurPage(newIdx);
    };
    var end = function () {
        setCurPage(totalPage - props.paginationsRange + 1);
    };
    return (_jsxs("div", { children: [canPrev ? (_jsxs(_Fragment, { children: [_jsx("span", __assign({ onClick: function () { return start(); } }, { children: " << " })), _jsx("span", __assign({ onClick: function () { return prev(); } }, { children: " < " }))] })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: " << " }), _jsx("span", { children: " < " })] })), _jsx("ul", { children: result.map(function (n) {
                    return (n == curPage ? (_jsxs("span", __assign({ className: "active" }, { children: [n, " "] }))) : (_jsxs("span", __assign({ onClick: function () { return setCurPage(n); } }, { children: [n, " "] }))));
                }) }), canNext ? (_jsxs(_Fragment, { children: [_jsx("span", __assign({ onClick: function () { return next(); } }, { children: " > " })), _jsx("span", __assign({ onClick: function () { return end(); } }, { children: " >> " }))] })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: " > " }), _jsx("span", { children: " >> " })] }))] }));
};
export default JWJWPagination;
