// export type IpLocation = {
//   city?: string;
//   latitude: number;
//   longitude: number;
// };
// export async function getIpLocation() {
//   try {
//     const response = await fetch("https://ipapi.co/json/");
//     const data = await response.json();
//     return {
//       coords: {
//         latitude: data.latitude,
//         longitude: data.longitude,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching IP location:", error);
//     return null;
//   }
// }

export type IpLocation = {
  city?: string;
  region?: string;
  country?: string;
  latitude: number;
  longitude: number;
};

export async function getIpLocation(): Promise<IpLocation | null> {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    if (!data.latitude || !data.longitude) {
      throw new Error("Location data is missing.");
    }

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city, // Optional field
      region: data.region, // Optional field
      country: data.country, // Optional field
    };
  } catch (error) {
    console.error("Error fetching IP location:", error);
    return null;
  }
}
