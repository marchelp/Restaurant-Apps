/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant yang ditambahkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
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
});

Scenario('Unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant yang ditambahkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__title a');
  I.click(locate('.restaurant__title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  I.seeElement('.restaurant__title a');
  I.click(locate('.restaurant__title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.see('Tidak ada restaurant yang ditambahkan', '.restaurant-item__not__found');
  I.dontSeeElement('.restaurant-item');
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant yang ditambahkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__title a');

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__title a').at(i));

    I.seeElement('#likeButton');
    I.click('#likeButton');

    // eslint-disable-next-line no-await-in-loop
    titles.push(await I.grabTextFrom('.restaurant-name'));

    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(titles.length, visibleLikedRestaurants);

  const searchQuery = titles[1].substring(1, 3);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  // mendapatkan daftar restaurant yang sesuai dengan searchQuery
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1);
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');

  assert.strictEqual(matchingRestaurants.length, visibleSearchedLikedRestaurants);

  for (let i = 0; i < matchingRestaurants.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleTitle = await I.grabTextFrom(locate('.restaurant__title').at(i + 1));

    assert.strictEqual(matchingRestaurants[i], visibleTitle);
  }
});
