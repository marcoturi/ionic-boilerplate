import { mockPlatform } from 'ionic-angular/util/mock-providers';

import { Logger, LoggerService } from './logger.service';

describe('LoggerService', () => {
    let loggerService: LoggerService;

    beforeEach(() => {
        loggerService = new LoggerService(mockPlatform());
    });

    describe('.create()', () => {
        it('should create a Logger with prefix', () => {
            const prefix = 'BlackwellAcademy';
            const logger = loggerService.create(prefix);

            expect(logger).toEqual(jasmine.any(Logger), 'returned output is not a Logger');
            expect(logger.prefix).toEqual(prefix, 'returned Logger prefix does not match');
        });
    });
});
