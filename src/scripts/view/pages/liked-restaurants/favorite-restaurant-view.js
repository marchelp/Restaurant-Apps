/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <div class="lds-roller" id="loadingContainer"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <input id="query" type="text" placeholder="Cari restaurant">
      <h2 class="explore" tabindex="0">Favorite Restaurant</h2>
      <div class="error-container" id="errorContainer" display="none"></div>
      <div class="restaurant-list" id="restaurants" tabindex="0"></div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)),
        '',
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));

    // Hapus kelas "skeleton" setelah data restoran dimuat
    const restaurantItems = document.querySelectorAll('.restaurant-item');
    restaurantItems.forEach((item) => {
      item.classList.remove('skeleton');
    });
  }

  _getEmptyRestaurantTemplate() {
    return `
    <div class="restaurant-item__not__found">
      Tidak ada restaurant yang ditambahkan
    </div>
    `;
  }
}

export default FavoriteRestaurantView;
