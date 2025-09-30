// Forum Posts Controller
const getForumPosts = async (req, res) => {
  try {
    const { location, category, language, search } = req.query;
    
    // Mock forum posts data
    const posts = [
      {
        id: 1,
        author: { id: 1, name: 'Rajesh Kumar', location: 'Bhiwani, Haryana' },
        title: 'गेहूं में पीला रतुआ रोग',
        content: 'मेरे गेहूं की फसल में पीला रतुआ रोग लग गया है। कृपया उपचार बताएं।',
        category: 'crop-disease',
        language: 'hi',
        likes: 12,
        comments: 8,
        timestamp: new Date('2024-01-15T10:30:00'),
        imageUrl: null
      },
      // More posts...
    ];

    // Apply filters
    let filteredPosts = posts;
    if (location) {
      filteredPosts = filteredPosts.filter(post => 
        post.author.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }
    if (language) {
      filteredPosts = filteredPosts.filter(post => post.language === language);
    }

    res.json({
      success: true,
      data: filteredPosts,
      total: filteredPosts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch forum posts'
    });
  }
};

const createForumPost = async (req, res) => {
  try {
    const { title, content, category, language } = req.body;
    const userId = req.body.userId || 'guest';
    
    // In real app, save to database
    const newPost = {
      id: Date.now(),
      author: { id: userId, name: 'Current User', location: 'User Location' },
      title,
      content,
      category,
      language,
      likes: 0,
      comments: 0,
      timestamp: new Date()
    };

    res.status(201).json({
      success: true,
      data: newPost,
      message: 'Post created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create post'
    });
  }
};

// Expert Connect Controller
const getExperts = async (req, res) => {
  try {
    const { expertise, search } = req.query;
    
    // Mock experts data
    const experts = [
      {
        id: 1,
        name: 'Dr. Rajesh Sharma',
        expertise: ['Crop Protection', 'Organic Farming'],
        languages: ['Hindi', 'English'],
        experience: '15 years',
        rating: 4.8,
        consultations: 250,
        rate: {
          video: 500,
          audio: 300,
          free: '15 min free consultation on first call'
        },
        availability: ['Mon-Fri: 10AM-6PM', 'Sat: 10AM-2PM'],
        verified: true,
        bio: 'Specialized in sustainable farming practices and integrated pest management.'
      },
      // More experts...
    ];

    let filteredExperts = experts;
    if (expertise) {
      filteredExperts = filteredExperts.filter(expert =>
        expert.expertise.some(exp => exp.toLowerCase().includes(expertise.toLowerCase()))
      );
    }

    res.json({
      success: true,
      data: filteredExperts,
      total: filteredExperts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch experts'
    });
  }
};

const bookExpertConsultation = async (req, res) => {
  try {
    const { expertId, date, time, consultationType, issue } = req.body;
    const userId = req.body.userId || 'guest';
    
    // In real app, save booking to database and send notifications
    const booking = {
      id: Date.now(),
      expertId,
      userId,
      date,
      time,
      consultationType,
      issue,
      status: 'pending',
      createdAt: new Date()
    };

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Consultation booked successfully. You will receive confirmation soon.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to book consultation'
    });
  }
};

// Success Stories Controller
const getSuccessStories = async (req, res) => {
  try {
    const { category } = req.query;
    
    // Mock success stories
    const stories = [
      {
        id: 1,
        farmerName: 'Ramesh Kumar',
        location: 'Bhiwani, Haryana',
        title: 'From Loss to Profit: My Organic Farming Journey',
        summary: 'Switched to organic farming and increased profit by 200% in 2 years',
        story: 'Full story content...',
        category: 'organic-farming',
        beforeIncome: '₹2,00,000/year',
        afterIncome: '₹6,00,000/year',
        cropTypes: ['Vegetables', 'Wheat', 'Pulses'],
        videoUrl: '/videos/story1.mp4',
        thumbnailUrl: '/images/story1.jpg',
        date: new Date('2024-01-10'),
        likes: 156,
        views: 1250
      },
      // More stories...
    ];

    let filteredStories = stories;
    if (category) {
      filteredStories = filteredStories.filter(story => story.category === category);
    }

    res.json({
      success: true,
      data: filteredStories,
      total: filteredStories.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch success stories'
    });
  }
};

const likeContent = async (req, res) => {
  try {
    const { contentType, contentId } = req.params;
    const userId = req.body.userId || 'guest';
    
    // In real app, update likes in database
    res.json({
      success: true,
      message: 'Content liked successfully',
      likes: Math.floor(Math.random() * 300) + 50
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to like content'
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { contentType, contentId } = req.params;
    const { comment, userId } = req.body;
    
    const newComment = {
      id: Date.now(),
      contentId,
      userId,
      comment,
      author: 'Current User',
      timestamp: new Date()
    };

    res.status(201).json({
      success: true,
      data: newComment,
      message: 'Comment added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add comment'
    });
  }
};

module.exports = {
  getForumPosts,
  createForumPost,
  getExperts,
  bookExpertConsultation,
  getSuccessStories,
  likeContent,
  addComment
};