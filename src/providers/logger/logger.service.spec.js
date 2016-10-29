import { mockPlatform } from 'ionic-angular/util/mock-providers';
import { Logger, LoggerService } from './logger.service';
describe('LoggerService', function () {
    var loggerService;
    beforeEach(function () {
        loggerService = new LoggerService(mockPlatform());
    });
    describe('.create()2', function () {
        it('should create a Logger with prefix', function () {
            var prefix = 'BlackwellAcademy';
            var logger = loggerService.create(prefix);
            expect(logger).toEqual(jasmine.any(Logger), 'returned output is not a Logger');
            expect(logger.prefix).toEqual(prefix, 'returned Logger prefix does not match');
        });
    });
});
//# sourceMappingURL=logger.service.spec.js.map