const mock_categories = [
  {
    id: "mobility",
    name: "Mobility",
    subcategories: [
      {
        id: "rides",
        name: "Rides",
        types: [
          "Economy",
          "Luxury",
          "Shared Rides - Basic",
          "Shared Rides - Tag-Along",
        ],
      },
      {
        id: "car_rentals",
        name: "Car Rentals",
        types: ["Economy", "Luxury"],
      },
      {
        id: "shuttle_bus",
        name: "Shuttle Bus",
        types: ["Standard", "Mini Bus"],
      },
      {
        id: "interstate_travel",
        name: "Interstate Travel",
        types: ["Economy", "Luxury", "Mini Bus"],
      },
      {
        id: "city_travel",
        name: "City Travel",
        types: ["Economy", "Shared"],
      },
    ],
  },

  {
    id: "logistics",
    name: "Logistics",
    subcategories: [
      {
        id: "haulage",
        name: "Haulage",
        types: ["Mini Truck", "Truck", "Heavy-Duty"],
      },
      {
        id: "dispatch_rides",
        name: "Dispatch Rides",
        types: ["Bike", "Express", "Box Bike"],
      },
      {
        id: "trucks",
        name: "Trucks",
        types: ["Truck", "Long Bed", "Open Body"],
      },
    ],
  },

  {
    id: "emergency",
    name: "Emergency",
    subcategories: [
      {
        id: "ambulance",
        name: "Ambulance",
        types: ["Standard", "ICU Equipped"],
      },
      {
        id: "towing_vehicles",
        name: "Towing Vehicles",
        types: ["Flatbed", "Hook & Chain", "Wheel-Lift"],
      },
    ],
  },

  {
    id: "store",
    name: "Store",
    subcategories: [
      {
        id: "bam_store",
        name: "Bam Store",
        types: [
          "Food & Groceries",
          "Household",
          "Essentials",
          "Express Delivery",
        ],
      },
    ],
  },

  {
    id: "agro_rentals",
    name: "Agro Rentals",
    subcategories: [
      {
        id: "tro_tro_rentals",
        name: "Tro Tro Rentals",
        types: ["Tractor", "Mini Truck", "Equipment Transport"],
      },
    ],
  },
];

export default mock_categories;
