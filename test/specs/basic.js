const assert = require('assert');

describe('webdriver.io page ONE', () => {

    it('test 2', () => {
        browser.url('https://webdriver.io');
        const title = browser.getTitle();
        assert.strictEqual(title, 'WebdriverIO · Next-gen WebDriver test framework for Node 2.js');
    });
});

