import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <introduction-app></introduction-app>
      <advantage-app></advantage-app>
      <div class="lds-roller" id="loadingContainer"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <h2 class="explore" tabindex="0">Explore Restaurant</h2>
      <div class="error-container" id="errorContainer" display="none"></div>
      <div class="restaurant-list" id="restaurants" tabindex="0"></div>
      `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurant();

    const restaurantList = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantList.innerHTML += createRestaurantItemTemplate(restaurant);
    });

    // Hapus kelas "skeleton" setelah data restoran dimuat
    const restaurantItems = document.querySelectorAll('.restaurant-item');
    restaurantItems.forEach((item) => {
      item.classList.remove('skeleton');
    });
  },
};

export default Home;
