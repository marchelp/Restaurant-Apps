import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant restaurant-item skeleton">
    <div class="thumb">
    <img data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" class="restaurant-image lazyload">
      <p class="city">Kota ${restaurant.city || '-'}</p>
    </div>
    <div class="description">
      <p class="rate">Rating: ⭐️${restaurant.rating || '-'}</p>
      <h3 class="restaurant__title"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h3>
      <p class="desc">${restaurant.description || '-'}</p>
    </div>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => {
  let categoriesHtml = '';
  if (restaurant.categories) {
    categoriesHtml = `${restaurant.categories.map((category) => `${category.name}`).join(', ')}`;
  }

  let foodsHtml = '';
  if (restaurant.menus && restaurant.menus.foods) {
    foodsHtml = `<ul class="restaurant-foods">${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}</ul>`;
  }

  let drinksHtml = '';
  if (restaurant.menus && restaurant.menus.drinks) {
    drinksHtml = `<ul class="restaurant-drinks">${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}</ul>`;
  }

  let reviewsHtml = '';
  if (restaurant.customerReviews) {
    reviewsHtml = `<ul class="restaurant-reviews-list">${restaurant.customerReviews.map((review) => `
      <li>
        <p class="name">${review.name}</p> 
        <p class="comment">${review.review}</p> 
        <p class="date">Tanggal: ${review.date}</p>
      </li>`).join('')}</ul>`;
  }

  return `
    <div class="restaurant-detail" tabindex="0">
      <div class="restaurant-title">
        <h2 class="restaurant-name">${restaurant.name}</h2>
        <p class="restaurant-address">📌${restaurant.address}, ${restaurant.city}</p>
        <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" class="restaurant-image">
        <p class="restaurant-rating">Rating: ⭐️${restaurant.rating}</p>
        <p class="restaurant-category">Kategori: ${categoriesHtml}</p>
      </div>
      <div class="restaurant-content" tabindex="0">
        <div class="content-title">
          <h2>Detail</h2>
          <hr/>
        </div>
        <div class="restaurant-about">
          <div class="restaurant-description">
              <h3>Tentang</h3>
              <p>${restaurant.description}</p>
          </div>
          <div class="restaurant-menus">
              <div class="container-menu">
                <div class="food">
                    <h4>Makanan</h4>
                    <p class="foods">${foodsHtml}</p>
                </div>
                <div class="drink">
                    <h4>Minuman</h4>
                    <p class="drinks">${drinksHtml}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="restaurant-review" tabindex="0">
        <h2>Komentar</h2>
        <hr/>
        <div class="add-comment">
          <h3>Tambahkan komentar</h3>
          <p id="fail">Gagal menambahkan komentar, periksa koneksi internet anda dan coba lagi...</p>
          <form id="review-form">
            <label for="name" class="hidden">Nama</label>
            <input type="text" class="text name" id="name" placeholder="Tuliskan nama kamu..." required><br>
            
            <label for="comment" class="hidden">Komentar</label>
            <textarea id="comment" class="text comment" rows="4" placeholder="Tambahkan komentar baru..." required></textarea><br>
          
            <button type="submit">Submit</button>
          </form>
        </div>
        <hr/>
        <div class="review-list">${reviewsHtml}</div>
      </div>
    </div>
    `;
};

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createLikedRestaurantButtonTemplate,
};
