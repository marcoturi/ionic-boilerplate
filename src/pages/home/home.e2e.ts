import { browser, by, element } from 'protractor';

class HomeObj {
    public title: any;
    public directive: any;

    constructor() {
        this.title = element(by.id('title'));
        this.directive = element(by.css('[ibEcho]'));
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

    it('should see Echo directive', () => {
        expect((home.directive).isDisplayed()).toBeTruthy();
        expect((home.directive).getText()).toBe('Click Me');
    });

    it('should greet by Echo directive', () => {
        home.directive.click();
        expect((home.directive).getText())
          .toBe('Greetings from echo directive.');
    });
});
