// Try to import models, but don't fail if they don't exist
let Product, User;
try {
  Product = require('../models/Product');
} catch (error) {
  console.warn('Product model not available, using mock data');
  Product = null;
}
try {
  User = require('../models/User');
} catch (error) {
  console.warn('User model not available, using mock data');
  User = null;
}

// Get all products with filtering and pagination
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      search,
      location,
      minPrice,
      maxPrice,
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = req.query;

    // Mock data for now - replace with actual database queries when Product model is ready
    const mockProducts = [
      {
        id: 1,
        title: 'Organic Rice Seeds - Kerala Red Rice',
        description: 'Premium quality organic red rice seeds, suitable for Kerala climate. High yield variety.',
        category: 'seeds',
        price: 150,
        unit: 'kg',
        quantity: 100,
        seller: {
          id: 1,
          name: 'Ravi Kumar',
          location: { district: 'Thrissur', state: 'Kerala' }
        },
        images: [
          { url: '/images/red-rice-seeds.jpg', alt: 'Red rice seeds' }
        ],
        location: { district: 'Thrissur', state: 'Kerala' },
        isNegotiable: true,
        created_at: new Date('2024-01-15')
      },
      {
        id: 2,
        title: 'NPK Fertilizer 19-19-19',
        description: 'Balanced NPK fertilizer suitable for all crops. Increases yield and plant health.',
        category: 'fertilizers',
        price: 450,
        unit: 'packet',
        quantity: 50,
        seller: {
          id: 2,
          name: 'Agri Store Palakkad',
          location: { district: 'Palakkad', state: 'Kerala' }
        },
        images: [
          { url: '/images/npk-fertilizer.jpg', alt: 'NPK Fertilizer' }
        ],
        location: { district: 'Palakkad', state: 'Kerala' },
        isNegotiable: false,
        created_at: new Date('2024-01-10')
      },
      {
        id: 3,
        title: 'Fresh Coconuts - Grade A',
        description: 'Premium quality fresh coconuts from coastal Kerala. Perfect for oil extraction.',
        category: 'crops',
        price: 25,
        unit: 'piece',
        quantity: 500,
        seller: {
          id: 3,
          name: 'Coconut Farmer Kollam',
          location: { district: 'Kollam', state: 'Kerala' }
        },
        images: [
          { url: '/images/coconuts.jpg', alt: 'Fresh Coconuts' }
        ],
        location: { district: 'Kollam', state: 'Kerala' },
        isNegotiable: true,
        created_at: new Date('2024-01-20')
      }
    ];

    // Apply filters
    let filteredProducts = mockProducts;

    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Apply pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const paginatedProducts = filteredProducts.slice(offset, offset + parseInt(limit));

    res.json({
      success: true,
      data: {
        products: paginatedProducts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredProducts.length / parseInt(limit)),
          totalProducts: filteredProducts.length,
          productsPerPage: parseInt(limit)
        },
        filters: {
          category,
          search,
          location,
          priceRange: { min: minPrice, max: maxPrice }
        }
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      error: 'Failed to fetch products',
      details: error.message
    });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Mock data - replace with actual database query
    const mockProduct = {
      id: parseInt(id),
      title: 'Organic Rice Seeds - Kerala Red Rice',
      description: 'Premium quality organic red rice seeds, suitable for Kerala climate. High yield variety with excellent nutritional value.',
      category: 'seeds',
      subCategory: 'rice-seeds',
      price: 150,
      unit: 'kg',
      quantity: 100,
      minOrderQuantity: 5,
      seller: {
        id: 1,
        name: 'Ravi Kumar',
        email: 'ravi@example.com',
        phone: '+91 98765 43210',
        location: { 
          district: 'Thrissur', 
          state: 'Kerala',
          village: 'Kodungallur'
        },
        rating: 4.5,
        totalSales: 156
      },
      images: [
        { url: '/images/red-rice-seeds-1.jpg', alt: 'Red rice seeds pack' },
        { url: '/images/red-rice-seeds-2.jpg', alt: 'Close up of seeds' }
      ],
      specifications: {
        variety: 'Kerala Red Rice',
        organicCertified: true,
        certificationDetails: 'Certified by Kerala Organic Farmers Association',
        harvestDate: '2024-01-01'
      },
      location: { 
        district: 'Thrissur', 
        state: 'Kerala',
        coordinates: { lat: 10.5276, lng: 76.2144 }
      },
      isNegotiable: true,
      deliveryOptions: {
        pickup: true,
        delivery: true,
        maxDeliveryDistance: 50,
        deliveryCharge: 100
      },
      views: 89,
      favorites: 12,
      status: 'active',
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-01-15')
    };

    res.json({
      success: true,
      data: {
        product: mockProduct
      }
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      error: 'Failed to fetch product',
      details: error.message
    });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      subCategory,
      price,
      unit,
      quantity,
      minOrderQuantity,
      images,
      specifications,
      location,
      isNegotiable,
      deliveryOptions,
      tags
    } = req.body;

    // Validation
    if (!title || !description || !category || !price || !unit || !quantity) {
      return res.status(400).json({
        error: 'Required fields: title, description, category, price, unit, quantity'
      });
    }

    // Mock product creation
    const newProduct = {
      id: Date.now(), // Mock ID
      title: title.trim(),
      description: description.trim(),
      category,
      subCategory,
      price: parseFloat(price),
      unit,
      quantity: parseInt(quantity),
      minOrderQuantity: minOrderQuantity || 1,
      seller: {
        id: req.user?.id || 1,
        name: req.user?.name || 'Test User'
      },
      images: images || [],
      specifications: specifications || {},
      location: location || {},
      isNegotiable: isNegotiable !== false,
      deliveryOptions: deliveryOptions || {
        pickup: true,
        delivery: false
      },
      tags: tags || [],
      status: 'active',
      views: 0,
      favorites: 0,
      created_at: new Date(),
      updated_at: new Date()
    };

    res.status(201).json({
      success: true,
      data: {
        product: newProduct
      },
      message: 'Product created successfully'
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      error: 'Failed to create product',
      details: error.message
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Mock update
    const updatedProduct = {
      id: parseInt(id),
      ...updateData,
      updated_at: new Date()
    };

    res.json({
      success: true,
      data: {
        product: updatedProduct
      },
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      error: 'Failed to update product',
      details: error.message
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Mock deletion
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      error: 'Failed to delete product',
      details: error.message
    });
  }
};

// Get product categories
const getCategories = async (req, res) => {
  try {
    const categories = [
      {
        id: 'seeds',
        name: 'Seeds',
        subcategories: [
          { id: 'rice-seeds', name: 'Rice Seeds' },
          { id: 'vegetable-seeds', name: 'Vegetable Seeds' },
          { id: 'fruit-seeds', name: 'Fruit Seeds' }
        ]
      },
      {
        id: 'fertilizers',
        name: 'Fertilizers',
        subcategories: [
          { id: 'organic', name: 'Organic Fertilizers' },
          { id: 'chemical', name: 'Chemical Fertilizers' },
          { id: 'npk', name: 'NPK Fertilizers' }
        ]
      },
      {
        id: 'tools',
        name: 'Tools & Equipment',
        subcategories: [
          { id: 'hand-tools', name: 'Hand Tools' },
          { id: 'machinery', name: 'Machinery' },
          { id: 'irrigation', name: 'Irrigation Equipment' }
        ]
      },
      {
        id: 'crops',
        name: 'Fresh Produce',
        subcategories: [
          { id: 'vegetables', name: 'Vegetables' },
          { id: 'fruits', name: 'Fruits' },
          { id: 'grains', name: 'Grains' }
        ]
      }
    ];

    res.json({
      success: true,
      data: {
        categories
      }
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      error: 'Failed to fetch categories',
      details: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
};