// Mock data for marketplace
export const mockProducts = [
  {
    id: 1,
    title: "Fresh Coconuts - Premium Quality",
    description: "Premium quality fresh coconuts from organic farms. Perfect for cooking and drinking. Harvested at optimal maturity.",
    price: 25,
    unit: "piece",
    quantity: 100,
    category: "Fruits & Vegetables",
    location: {
      district: "Thrissur",
      state: "Kerala"
    },
    seller: {
      name: "Ramesh Kumar",
      rating: 4.5
    },
    isNegotiable: true,
    images: []
  },
  {
    id: 2,
    title: "Organic Black Pepper - 1kg",
    description: "High quality organic black pepper, sun-dried and hand-picked. No chemicals or pesticides used.",
    price: 450,
    unit: "kg",
    quantity: 50,
    category: "Spices",
    location: {
      district: "Wayanad",
      state: "Kerala"
    },
    seller: {
      name: "Kerala Spice Farm",
      rating: 4.8
    },
    isNegotiable: false,
    images: []
  },
  {
    id: 3,
    title: "Basmati Rice - Premium Grade",
    description: "Long grain basmati rice, aged for perfect aroma and taste. Ideal for biriyani and pulao.",
    price: 120,
    unit: "kg",
    quantity: 500,
    category: "Grains & Pulses",
    location: {
      district: "Palakkad",
      state: "Kerala"
    },
    seller: {
      name: "Golden Harvest Co.",
      rating: 4.6
    },
    isNegotiable: true,
    images: []
  },
  {
    id: 4,
    title: "Farm Fresh Banana - Robusta",
    description: "Fresh robusta bananas directly from farm. Rich in nutrients and perfect ripeness.",
    price: 40,
    unit: "dozen",
    quantity: 200,
    category: "Fruits & Vegetables",
    location: {
      district: "Kottayam",
      state: "Kerala"
    },
    seller: {
      name: "Green Valley Farms",
      rating: 4.3
    },
    isNegotiable: true,
    images: []
  },
  {
    id: 5,
    title: "Organic Fertilizer - 50kg",
    description: "100% organic fertilizer made from cow dung and natural compost. Enhances soil fertility.",
    price: 1250,
    unit: "bag",
    quantity: 30,
    category: "Farm Inputs",
    location: {
      district: "Ernakulam",
      state: "Kerala"
    },
    seller: {
      name: "EcoGrow Solutions",
      rating: 4.7
    },
    isNegotiable: false,
    images: []
  },
  {
    id: 6,
    title: "Hybrid Tomato Seeds",
    description: "High-yield hybrid tomato seeds. Disease resistant variety with excellent fruit quality.",
    price: 280,
    unit: "packet",
    quantity: 100,
    category: "Seeds",
    location: {
      district: "Kollam",
      state: "Kerala"
    },
    seller: {
      name: "AgroTech Seeds",
      rating: 4.4
    },
    isNegotiable: false,
    images: []
  },
  {
    id: 7,
    title: "Fresh Mangoes - Alphonso",
    description: "Premium Alphonso mangoes, sweet and juicy. Handpicked at perfect ripeness.",
    price: 150,
    unit: "kg",
    quantity: 80,
    category: "Fruits & Vegetables",
    location: {
      district: "Malappuram",
      state: "Kerala"
    },
    seller: {
      name: "Mango Paradise",
      rating: 4.9
    },
    isNegotiable: true,
    images: []
  },
  {
    id: 8,
    title: "Organic Turmeric Powder",
    description: "Pure organic turmeric powder, freshly ground. High curcumin content for maximum health benefits.",
    price: 180,
    unit: "kg",
    quantity: 40,
    category: "Spices",
    location: {
      district: "Idukki",
      state: "Kerala"
    },
    seller: {
      name: "Spice Garden Kerala",
      rating: 4.6
    },
    isNegotiable: false,
    images: []
  }
];

export const mockCategories = [
  { id: 1, name: "All Categories", count: 8 },
  { id: 2, name: "Fruits & Vegetables", count: 3 },
  { id: 3, name: "Grains & Pulses", count: 1 },
  { id: 4, name: "Spices", count: 2 },
  { id: 5, name: "Farm Inputs", count: 1 },
  { id: 6, name: "Seeds", count: 1 }
];