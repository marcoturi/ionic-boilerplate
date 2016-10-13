import { HomePage } from './home';
import { async } from '@angular/core/testing';
import { ComponentTest } from '../../../config/component-test';

describe('Sales Service', () => {

    let helper = new ComponentTest<HomePage>();
    beforeEach((done) => {
        helper.init(HomePage);
        done();
    });

    it('should load component', async(() => {
        helper.fixture.detectChanges();
        expect(helper.fixture).toBeDefined();
    }));
});
