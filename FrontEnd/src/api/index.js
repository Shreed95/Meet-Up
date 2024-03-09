import axios from "axios";

export const getPlacesData1 = async (category, lat, lng, radius) => {
  try {
    const accessToken = process.env.REACT_APP_GEOAPIFY_KEY;
    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lng},${lat},${radius}&bias=proximity:${lng},${lat}&lang=en&limit=3&apiKey=${accessToken}`
    );
    const data = await response.json();
    return data.features;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getAddress = async (lng, lat) => {
  const accessToken = process.env.REACT_APP_MAPBOX_KEY;
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;

  try {
    const response = await axios.get(apiUrl);
    const placeName = response.data.features[1].place_name;
    return placeName;
  } catch (error) {
    console.error("Error fetching data from Mapbox API:", error);
  }
};

export const getPlacesName = async (search_text) => {
  const accessToken = process.env.REACT_APP_MAPBOX_KEY;
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text}.json?country=in&fuzzyMatch=true&routing=false&limit=3&proximity=ip&types=locality&language=en&autocomplete=true&access_token=${accessToken}`;
  try {
    const response = await axios.get(apiUrl);
    const placeName = response.data.features;
    return placeName;
  } catch (error) {
    console.error("Error fetching data from Mapbox API:", error);
  }
};
