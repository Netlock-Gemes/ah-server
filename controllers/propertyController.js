const Property = require('../models/Property');
const User = require('../models/User');
const upload = require('../middleware/upload');

// Admin creates a new property
exports.createProperty = async (req, res) => {
  const { title, description, price, location } = req.body;
  const images = req.files.map(file => file.path);

  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    // Create a new property
    const property = new Property({
      title,
      description,
      price,
      location,
      images
    });

    await property.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Toggle interest in a property
exports.toggleInterest = async (req, res) => {
  const { propertyId } = req.body;
  const userId = req.user.id;

  try {
    // Find the user and the property
    const user = await User.findById(userId);
    const property = await Property.findById(propertyId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Check if the user is already interested
    const isInterested = user.interestedProperties.includes(propertyId);

    if (isInterested) {
      // Remove from interested properties
      user.interestedProperties = user.interestedProperties.filter(id => id.toString() !== propertyId);
      property.interestedBy = property.interestedBy.filter(id => id.toString() !== userId);
    } else {
      // Add to interested properties
      user.interestedProperties.push(propertyId);
      property.interestedBy.push(userId);
    }

    // Save both documents
    await user.save();
    await property.save();

    // Return updated user
    res.json({ user, property });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Get properties a user is interested in
exports.getInterestedProperties = async (req, res) => {
  try {
    // Find the user and populate interested properties
    const user = await User.findById(req.user.id).populate('interestedProperties');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.interestedProperties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    // Fetch all properties
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Fetch a property by its ID
exports.getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the property by its ID
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
