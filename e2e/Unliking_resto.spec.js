const assert = require("assert");

Feature("Unliking resto");

Before(({ I }) => {
    I.amOnPage("/");
})

Scenario("unliking one resto", async ({ I }) => {
    I.waitForElement('.card-body a');
    I.seeElement(".card-body a");

    const sampleResto = locate(".card-body a").first();
    const sampleTitle = await I.grabTextFrom(sampleResto);
    I.click(sampleResto);

    I.waitForElement('#likeButton');
    I.seeElement("#likeButton");
    I.click("#likeButton");

    I.amOnPage("/#/favorite");
    I.seeElement(".card-body a");
    const likeResto = locate(".card-body a").first();
    const likeTitle = await I.grabTextFrom(".card-body a");

    assert.strictEqual(sampleTitle, likeTitle);

    I.click(likeResto);
    
    I.waitForElement('#likeButton');
    I.seeElement("#likeButton");
    I.click("#likeButton");

    I.amOnPage("/#/favorite");
    I.see("Empty Result", ".no-result");
});