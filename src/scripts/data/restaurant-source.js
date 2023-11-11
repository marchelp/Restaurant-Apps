import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async listRestaurant() {
    const loadingAnimation = document.querySelector('#loadingContainer');
    const errorMessage = document.querySelector('#errorContainer');
    try {
      const response = await fetch(API_ENDPOINT.HOME);

      if (!response.ok) {
        loadingAnimation.style.display = 'none';
        errorMessage.innerHTML = 'Gagal mengambil data restoran. Silakan coba lagi nanti.';
        errorMessage.style.display = 'block';
        return null;
      }

      const responseJson = await response.json();
      loadingAnimation.style.display = 'none';
      return responseJson.restaurants;
    } catch (error) {
      loadingAnimation.style.display = 'none';
      errorMessage.style.display = 'block';
      errorMessage.innerHTML = 'Terjadi kesalahan saat memuat data. Silakan periksa koneksi internet Anda dan coba lagi.';
      return null;
    }
  }

  static async detailRestaurant(id) {
    const loadingAnimation = document.querySelector('#loadingContainer');
    const errorMessage = document.querySelector('#errorContainer');
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));

      if (!response.ok) {
        loadingAnimation.style.display = 'none';
        errorMessage.innerHTML = 'Gagal mengambil data restoran. Silakan coba lagi nanti.';
        errorMessage.style.display = 'block';
        return null;
      }

      const responseJson = await response.json();
      loadingAnimation.style.display = 'none';
      return responseJson.restaurant;
    } catch (error) {
      loadingAnimation.style.display = 'none';
      errorMessage.style.display = 'block';
      errorMessage.innerHTML = 'Terjadi kesalahan saat memuat data. Silakan periksa koneksi internet Anda dan coba lagi.';
      return null;
    }
  }

  static async submitReviewRestaurant({ restaurantId, name, review }) {
    const url = API_ENDPOINT.REVIEW;
    const data = {
      id: restaurantId,
      name,
      review,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseJson = await response.json();
        return responseJson.customerReviews;
      }

      return null;
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      throw error;
    }
  }
}

export default RestaurantSource;
