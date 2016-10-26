import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class LoggerService {
    constructor(private platform: Platform) {}

    create(prefix: string): Logger {
        return new Logger(prefix, this.platform);
    }
}

export class Logger {
    constructor(public prefix: string,
                private platform: Platform) {}

    log(...messages: any[]) {
        this.output('log', ...messages);
    }

    error(err: Error|string, ...messages: any[]) {
        this.output('error', err, ...messages);
    }

    private output(type: string, ...messages: any[]) {
        const strings = ['%c'];
        const style = type === 'error' ? 'color: red' : 'color: black';

        if (!this.platform.is('cordova')) {
            // Android and iOS provide timestamps
            strings.push(this.getTimestamp());
        }

        strings.push(`[${this.prefix}]`);
        if (type !== 'log') {
            strings.push(type.toUpperCase());
        }

        messages.forEach(m => {
            if (typeof m === 'string' || typeof m === 'number' || typeof m === 'boolean') {
                strings.push(String(m));
            } else if (m instanceof Error || typeof m.message === 'string') {
                strings.push(m.message);
            } else {
                strings.push(JSON.stringify(m, undefined, 2));
                strings.push('\n');
            }
        });

        const stack = new Error().stack.split('\n');
        if (stack[0] === 'Error') {
            // Chrome
            (<any>console.groupCollapsed)(strings.join(' '), style);
            if (messages[0].stack) {
                console.log('%c' + messages[0].stack, style);
            }

            console.log('%c' + stack.slice(3).join('\n'), style);
            console.groupEnd();
        } else {
            // Safari
            if (messages[0].stack) {
                (<any>console.groupCollapsed)(strings.join(' '), style);
                console.log('Error', messages[0].stack);
                console.log('Log', stack.slice(2).join('\n'));
            } else {
                console.log(strings.join(' '), style, stack.slice(2).join('\n'));
            }
        }
    }

    private getTimestamp(): string {
        const date = new Date();
        const hours = ('00' + date.getHours()).slice(-2);
        const minutes = ('00' + date.getMinutes()).slice(-2);
        const seconds = ('00' + date.getSeconds()).slice(-2);
        const milli = ('000' + date.getMilliseconds()).slice(-3);
        return `[${hours}:${minutes}:${seconds}.${milli}]`;
    }
}
