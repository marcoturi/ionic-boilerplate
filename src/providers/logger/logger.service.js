var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
export var LoggerService = (function () {
    function LoggerService(platform) {
        this.platform = platform;
    }
    LoggerService.prototype.create = function (prefix) {
        return new Logger(prefix, this.platform);
    };
    LoggerService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Platform])
    ], LoggerService);
    return LoggerService;
}());
export var Logger = (function () {
    function Logger(prefix, platform) {
        this.prefix = prefix;
        this.platform = platform;
    }
    Logger.prototype.log = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i - 0] = arguments[_i];
        }
        this.output.apply(this, ['log'].concat(messages));
    };
    Logger.prototype.error = function (err) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        this.output.apply(this, ['error', err].concat(messages));
    };
    Logger.prototype.output = function (type) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        var strings = ['%c'];
        var style = type === 'error' ? 'color: red' : 'color: black';
        if (!this.platform.is('cordova')) {
            // Android and iOS provide timestamps
            strings.push(this.getTimestamp());
        }
        strings.push("[" + this.prefix + "]");
        if (type !== 'log') {
            strings.push(type.toUpperCase());
        }
        messages.forEach(function (m) {
            if (typeof m === 'string' || typeof m === 'number' || typeof m === 'boolean') {
                strings.push(String(m));
            }
            else if (m instanceof Error || typeof m.message === 'string') {
                strings.push(m.message);
            }
            else {
                strings.push(JSON.stringify(m, undefined, 2));
                strings.push('\n');
            }
        });
        var stack = new Error().stack.split('\n');
        if (stack[0] === 'Error') {
            // Chrome
            console.groupCollapsed(strings.join(' '), style);
            if (messages[0].stack) {
                console.log('%c' + messages[0].stack, style);
            }
            console.log('%c' + stack.slice(3).join('\n'), style);
            console.groupEnd();
        }
        else {
            // Safari
            if (messages[0].stack) {
                console.groupCollapsed(strings.join(' '), style);
                console.log('Error', messages[0].stack);
                console.log('Log', stack.slice(2).join('\n'));
            }
            else {
                console.log(strings.join(' '), style, stack.slice(2).join('\n'));
            }
        }
    };
    Logger.prototype.getTimestamp = function () {
        var date = new Date();
        var hours = ('00' + date.getHours()).slice(-2);
        var minutes = ('00' + date.getMinutes()).slice(-2);
        var seconds = ('00' + date.getSeconds()).slice(-2);
        var milli = ('000' + date.getMilliseconds()).slice(-3);
        return "[" + hours + ":" + minutes + ":" + seconds + "." + milli + "]";
    };
    return Logger;
}());
//# sourceMappingURL=logger.service.js.map