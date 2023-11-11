/* eslint-disable no-new */
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantView from './liked-restaurants/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    const loadingAnimation = document.querySelector('#loadingContainer');
    const errorMessage = document.querySelector('#errorContainer');

    // eslint-disable-next-line no-undef
    if (restaurants.length === 0) {
      loadingAnimation.style.display = 'none';
      errorMessage.innerHTML = 'Tidak ada restaurant yang ditambahkan';
    } else {
      loadingAnimation.style.display = 'none';
      new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
      new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    }
  },
};

export default Favorite;
