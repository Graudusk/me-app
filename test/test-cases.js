"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;


// Does not work with WSL!! Use cygwin



// Test suite
test.describe("Me-app", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("https://me-app.graudusk.me/#");
        done();
    });

    test.afterEach(function(done) {
        this.timeout(20000);
        browser.quit();
        done();
    });


    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertElement(element, target) {
        browser.findElement(By.css(element)).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    test.it("Test index", function(done) {
        browser.getTitle().then(function(title) {
            assert.equal(title, "me-app");
        });

        assertElement("h1", "Me");
        matchUrl("#/");

        done();
    });



    test.it("Test go to kmom01", function(done) {
        // try use nav link
        goToNavLink("kmom01");

        assertElement("h2", "KMOM01");
        matchUrl("report/kmom01" );

        done();
    });

    test.it("Test log in with credentials", async function(done) {
        // try use nav link

        goToNavLink("Login");
        browser.findElement(By.name("email")).sendKeys("test");
        browser.findElement(By.name("password")).sendKeys("test");
        browser.findElement(By.id("loginBtn")).click();
        // this.timeout(20000);

        setTimeout(() => {
            assertElement("h1", "Me");
        }, 1000);

        setTimeout(() => {
            done();
            // browser.quit();
        }, 1000);
    });
});
