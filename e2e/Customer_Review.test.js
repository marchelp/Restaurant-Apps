/* eslint-disable no-undef */
const assert = require('assert');

Feature('Customer Review');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('customer review from main page', ({ I }) => {
  I.seeElement('.restaurant__title a');
  I.click(locate('.restaurant__title a').first());

  const customerReviewName = 'Marchel [e2e Customer Review]';
  const customerReviewComment = 'Enak banget';

  I.fillField('#name', customerReviewName);
  I.fillField('#comment', customerReviewComment);

  I.click('Submit');

  I.wait(2);

  I.see(customerReviewName, '.name');
  I.see(customerReviewComment, '.comment');
});

Scenario('customer review from favorite restaurant', async ({ I }) => {
  I.amOnPage('/#/favorite');
  I.see('Tidak ada restaurant yang ditambahkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__title a');
  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.seeElement('.restaurant__title a');
  I.click(locate('.restaurant__title a').first());

  const customerReviewName = 'Adias [e2e Customer Review]';
  const customerReviewComment = 'Favorite sekali inimah';

  I.fillField('#name', customerReviewName);
  I.fillField('#comment', customerReviewComment);

  I.click('Submit');

  I.wait(2);

  I.see(customerReviewName, '.name');
  I.see(customerReviewComment, '.comment');
});
