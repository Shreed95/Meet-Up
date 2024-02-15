import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        method: "GET",
        url: URL,
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
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
