"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var SignerProvider = require('ethjs-provider-signer');
var sign = require('ethjs-signer').sign;
var rpcUrl = 'https://kovan.infura.io/v3/092108ec6aea46ab97b2175b45130455';
var eth_pr_key = '0x30934837cdc94b93a7142122338784b6c73183c8aa1d279b47e84f85c5d7367f';
var EthFromAddress = "0x54b7ffd4ae11b0896b4fc2cf59e5570dbdf18abd";
var tinlake_1 = __importDefault(require("tinlake"));
var addresses_tinlake_json_1 = __importDefault(require("./addresses_tinlake.json"));
function getTinlake() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new tinlake_1["default"](new SignerProvider(rpcUrl, {
                    signTransaction: function (rawTx, cb) {
                        return cb(null, sign(rawTx, eth_pr_key));
                    },
                    accounts: function (cb) { return cb(null, [EthFromAddress]); }
                }), addresses_tinlake_json_1["default"], {
                    ethConfig: { from: EthFromAddress }
                })];
        });
    });
}
exports.getTinlake = getTinlake;
function getTinlakeData() {
    return __awaiter(this, void 0, void 0, function () {
        var tinlake, TotalDebt, TotalValueofNFTs, totalSupply, NumberOfLoans, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTinlake()];
                case 1:
                    tinlake = _a.sent();
                    return [4 /*yield*/, tinlake.contracts.pile.Debt()];
                case 2:
                    TotalDebt = _a.sent();
                    return [4 /*yield*/, tinlake.contracts.shelf.bags()];
                case 3:
                    TotalValueofNFTs = _a.sent();
                    totalSupply = null;
                    return [4 /*yield*/, tinlake.contracts.title.count()];
                case 4:
                    NumberOfLoans = _a.sent();
                    data = {
                        Debt: TotalDebt[0].toString(),
                        TotalValueofNFTs: TotalValueofNFTs[0].toString(),
                        totalSupply: 0,
                        NumberOfLoans: NumberOfLoans[0].toString()
                    };
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.getTinlakeData = getTinlakeData;
;
