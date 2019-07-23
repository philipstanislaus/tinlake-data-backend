"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.typeDefs = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    last1d: [TinlakeEvent]!\n    last7d: [TinlakeEvent]!\n    last30d: [TinlakeEvent]!\n    last90d: [TinlakeEvent]!\n  }\n\n  type TinlakeEvent {\n    timestamp: Int\n    cvt_supply: Int\n    debt: Int\n    cdp_debt: Int\n    collateral_value: Int\n  }\n"], ["\n  type Query {\n    last1d: [TinlakeEvent]!\n    last7d: [TinlakeEvent]!\n    last30d: [TinlakeEvent]!\n    last90d: [TinlakeEvent]!\n  }\n\n  type TinlakeEvent {\n    timestamp: Int\n    cvt_supply: Int\n    debt: Int\n    cdp_debt: Int\n    collateral_value: Int\n  }\n"])));
exports["default"] = exports.typeDefs;
var templateObject_1;
