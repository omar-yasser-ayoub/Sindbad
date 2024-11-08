import axios from 'axios';
const clientId = import.meta.env.VITE_AMADEUS_CLIENT_ID;
const clientSecret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

const getAccessToken = async () => {
  const tokenEndpoint = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  try {
    const response = await axios.post(tokenEndpoint, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

const getHotelsByCity = async (cityCode, radius) => {
  const endpoint = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city";
  const accessToken = await getAccessToken();

  try {
    const response = await axios.get(endpoint, {
      params: {
        cityCode,
        radius,
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });


    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

const getHotelsByGeocode = async (latitude, longitude, radius) => {
  const endpoint = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode";
  const accessToken = await getAccessToken();

  try {
    const response = await axios.get(endpoint, {
      params: { latitude, longitude, radius },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

// Most hotels here don't seem to have ratings from the API, so this is currently unused
const appendRatings = async (hotels) => {
  console.log("Hotels:", hotels);
  const hotelIds = hotels.map(hotel => hotel.hotelId);
  console.log("Hotel IDs:", hotelIds);
  const ratings = await getHotelRatings(hotelIds);

  return hotels.map(hotel => {
    const rating = ratings.find(rating => rating.hotelId === hotel.hotelId);
    return { ...hotel, rating };
  });
}

const getHotelRatings = async (hotelIds) => {
  const endpoint = "https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments";
  const accessToken = await getAccessToken();
  const maxIdsPerCall = 3;
  let allRatings = [];

  for (let i = 0; i < hotelIds.length; i += maxIdsPerCall) {
    const hotelIdsSubset = hotelIds.slice(i, i + maxIdsPerCall).join(',');

    try {
      const response = await axios.get(endpoint, {
        params: { hotelIds: hotelIdsSubset },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Hotel ratings:', response.data);
      allRatings = allRatings.concat(response.data);
    } catch (error) {
      console.error('Error fetching hotel ratings:', error);
      throw error;
    }
  }

  return allRatings;
};

const bookHotel = async (bookingData) => {
  const endpoint = "https://test.api.amadeus.com/v2/booking/hotel-orders";
  const accessToken = await getAccessToken();

  try {
    const response = await axios.post(endpoint, bookingData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Booking response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error booking hotel:', error);
    throw error;
  }
};

export { getHotelsByCity, getHotelsByGeocode, bookHotel };