import { browser, by, element } from 'protractor';
var HomeObj = (function () {
    function HomeObj() {
        this.title = element(by.id('title'));
    }
    return HomeObj;
}());
describe('App', function () {
    beforeEach(function () {
        browser.get('/');
    });
    var home = new HomeObj();
    it('should have a title', function () {
        expect((home.title).isDisplayed()).toBeTruthy();
    });
});
