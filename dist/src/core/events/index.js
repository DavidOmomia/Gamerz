"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emitter_1 = __importDefault(require("./emitter"));
let eventsMap = {
    // User
    'user:created': ['setup_new_user'],
    'user:logged_in': ['logged_in_user'],
    'user:password_changed': ['notify_user_password_changed'],
    'user:email_changed': ['notify_user_email_changed'],
    'user:phone_changed': ['notify_user_phone_changed'],
    'user:password_reset_request': ['send_password_reset_email', 'send_password_reset_sms'],
    // Verification
    'notification:send': ['send_notification']
};
exports.init = () => {
    console.log('Events: Initializing events listeners and subscribers');
    let count = 1;
    for (var event in eventsMap) {
        if (!eventsMap.hasOwnProperty(event)) {
            continue;
        }
        eventsMap[event].forEach((listener) => {
            try {
                let listenerHandler = require('./listeners/' + listener);
                emitter_1.default.on(event, listenerHandler.default);
                console.log(count + ': ' + event + ' => ' + listener);
                count = count + 1;
            }
            catch (err) {
                console.log('Failed: ' + event + ' => ' + listener + '. ' + err.message);
            }
        });
    }
};
