const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['seeds', 'fertilizers', 'pesticides', 'tools', 'machinery', 'crops', 'organic', 'dairy', 'livestock']
  },
  subCategory: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'gram', 'liter', 'piece', 'quintal', 'ton', 'packet', 'box']
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  minOrderQuantity: {
    type: Number,
    default: 1,
    min: 1
  },
  images: [{
    url: String,
    alt: String
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    state: String,
    district: String,
    village: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  specifications: {
    brand: String,
    model: String,
    manufactureDate: Date,
    expiryDate: Date,
    organicCertified: {
      type: Boolean,
      default: false
    },
    certificationDetails: String
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'inactive', 'pending'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  tags: [String],
  isNegotiable: {
    type: Boolean,
    default: true
  },
  deliveryOptions: {
    pickup: {
      type: Boolean,
      default: true
    },
    delivery: {
      type: Boolean,
      default: false
    },
    maxDeliveryDistance: {
      type: Number,
      default: 0
    },
    deliveryCharge: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for better search performance
productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ 'location.coordinates': '2dsphere' });
productSchema.index({ seller: 1 });
productSchema.index({ createdAt: -1 });

// Virtual for average rating calculation
productSchema.pre('save', function(next) {
  if (this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    this.averageRating = sum / this.ratings.length;
    this.totalRatings = this.ratings.length;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);