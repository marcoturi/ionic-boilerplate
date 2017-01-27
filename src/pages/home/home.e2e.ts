import { browser, by, element } from 'protractor';

class HomeObj {
    public title: any;
    constructor() {
        this.title = element(by.id('title'));
    }
}

describe('App', () => {

    beforeEach(() => {
        browser.get('/');
    });

    const home: HomeObj = new HomeObj();

    it('should have a title', () => {
        expect((home.title).isDisplayed()).toBeTruthy();
    });
});
