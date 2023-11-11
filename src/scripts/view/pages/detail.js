import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
      <div class="lds-roller" id="loadingContainer"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <div class="error-container" id="errorContainer" display="none"></div>
      <div id="restaurant" class="restaurant" tabindex="0"></div>
      <div class="error-container" id="errorContainer" style="display:none;">
        <p>Anda sedang offline. Proses add review tidak dapat dilakukan dalam mode offline.</p>
      </div>
      <div id="likeButtonContainer" tabindex="0"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);

    const restaurantDetail = document.querySelector('#restaurant');
    restaurantDetail.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });

    const sendReviewButton = document.querySelector('#review-form button[type="submit"]');
    const nameInput = document.querySelector('#name');
    const commentInput = document.querySelector('#comment');
    const reviewList = document.querySelector('.restaurant-reviews-list');

    const restaurantId = restaurant.id; // Ambil ID restoran dari data yang diterima

    function renderReviews(reviews) {
      let reviewsHtml = '';
      if (reviews) {
        reviewsHtml = reviews
          .map((review) => `
          <li>
            <p class="name">${review.name}</p>
            <p class="comment">${review.review}</p>
            <p class="date">Tanggal: ${review.date}</p>
          </li>
          `)
          .join('');
      }

      reviewList.innerHTML = reviewsHtml;
    }

    sendReviewButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const name = nameInput.value;
      const review = commentInput.value;

      try {
        // Kirim komentar pengguna ke server
        // eslint-disable-next-line max-len
        const newReviews = await RestaurantSource.submitReviewRestaurant({ restaurantId, name, review });

        renderReviews(newReviews);

        const failAddingComment = document.querySelector('#fail');
        failAddingComment.style.display = 'none';

        nameInput.value = '';
        commentInput.value = '';
      } catch (error) {
        const failAddingComment = document.querySelector('#fail');
        failAddingComment.style.display = 'block';
        console.error('Error sending review:', error);
      }
    });
  },
};

export default Detail;
