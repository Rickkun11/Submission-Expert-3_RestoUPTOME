const assert = require("assert");

Feature('Liking resto');

// scenario success
Before(({ I }) => {
    I.amOnPage("/#/favorite");
});

Scenario("showing empty liked resto", ({ I }) => {
    I.waitForElement('.no-result', 5);
    I.seeElement('.no-result');
    I.see("Empty Result", ".no-result");
});

Scenario("liking one resto card", async ({ I }) => {
    I.waitForElement('.no-result', 5);
    I.see("Empty Result", ".no-result");
    I.amOnPage("/");

    I.waitForElement('.card-body a');
    I.seeElement(".card-body a");

    const sampleResto = locate(".card-body a").first();
    const sampleTitle = await I.grabTextFrom(sampleResto);
    I.click(sampleResto);

    I.waitForElement('#likeButton');
    I.seeElement("#likeButton");
    I.click("#likeButton");

    I.amOnPage("/#/favorite");
    I.waitForElement('.card-body a');
    I.seeElement(".card-body a");
    const likedRestoTitle = await I.grabTextFrom(".card-body a");

    assert.strictEqual(sampleTitle, likedRestoTitle);
});