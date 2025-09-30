const mongoose = require('mongoose');

// Forum Thread Schema
const forumThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['crop-advice', 'pest-disease', 'weather', 'market-prices', 'government-schemes', 'technology', 'general', 'success-stories']
  },
  tags: [String],
  images: [{
    url: String,
    alt: String
  }],
  location: {
    state: String,
    district: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'pinned', 'archived'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  totalPosts: {
    type: Number,
    default: 0
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  lastPost: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: Date
  },
  isAnswered: {
    type: Boolean,
    default: false
  },
  bestAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumPost'
  }
}, {
  timestamps: true
});

// Forum Post Schema
const forumPostSchema = new mongoose.Schema({
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumThread',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumPost',
    default: null
  },
  images: [{
    url: String,
    alt: String
  }],
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reports: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isAcceptedAnswer: {
    type: Boolean,
    default: false
  },
  editHistory: [{
    content: String,
    editedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
forumThreadSchema.index({ category: 1, status: 1 });
forumThreadSchema.index({ author: 1 });
forumThreadSchema.index({ createdAt: -1 });
forumThreadSchema.index({ lastActivity: -1 });
forumThreadSchema.index({ title: 'text', description: 'text', tags: 'text' });
forumThreadSchema.index({ 'location.coordinates': '2dsphere' });

forumPostSchema.index({ thread: 1, createdAt: 1 });
forumPostSchema.index({ author: 1 });
forumPostSchema.index({ parentPost: 1 });

// Virtuals
forumThreadSchema.virtual('score').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

forumPostSchema.virtual('score').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

// Middleware to update thread stats
forumPostSchema.post('save', async function(doc) {
  if (this.isNew) {
    await mongoose.model('ForumThread').findByIdAndUpdate(doc.thread, {
      $inc: { totalPosts: 1 },
      $set: {
        lastActivity: new Date(),
        'lastPost.user': doc.author,
        'lastPost.createdAt': doc.createdAt
      }
    });
  }
});

const ForumThread = mongoose.model('ForumThread', forumThreadSchema);
const ForumPost = mongoose.model('ForumPost', forumPostSchema);

module.exports = { ForumThread, ForumPost };