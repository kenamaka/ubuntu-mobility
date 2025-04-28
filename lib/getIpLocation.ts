export async function getIpLocation() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return {
      coords: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    };
  } catch (error) {
    console.error("Error fetching IP location:", error);
    return null;
  }
}
