"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const app_live_1 = require("./http-requests/app-live");
const api_app_live_1 = __importDefault(require("./utils/api-app-live"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appPath = core.getInput('app-path');
            if (!appPath)
                core.setFailed('app-path is required');
            const bsUserName = core.getInput('browserstack-username');
            if (!bsUserName)
                core.setFailed('browserstack-username is required');
            const bsAccessKey = core.getInput('browserstack-accesskey');
            if (!bsAccessKey)
                core.setFailed('browserstack-accesskey is required');
            if (appPath && bsUserName && bsAccessKey) {
                api_app_live_1.default.defaults.auth = {
                    username: bsUserName,
                    password: bsAccessKey
                };
                const appToReplace = core.getInput("app-to-replace");
                console.log(`appPath -  ${appPath}!`);
                if (appToReplace) {
                    const apps = yield (0, app_live_1.getRecentApps)();
                    if (apps && apps.length > 0) {
                        const app = apps.find(app => app.app_name === appToReplace);
                        if (app)
                            yield (0, app_live_1.removeApp)({ appId: app.app_id });
                        else
                            console.log("reported app-to-replace not found for the user in question reported not found for the user in question!");
                    }
                }
                yield (0, app_live_1.uploadApp)({ appPath });
            }
            // Get the JSON webhook payload for the event that triggered the workflow
            const payload = JSON.stringify(github.context.payload, undefined, 2);
            console.log(`The event payload: ${payload}`);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
})();
