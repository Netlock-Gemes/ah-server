const Property = require('../models/Property');
const User = require('../models/User');
const upload = require('../middleware/upload');

// Admin creates a new property
exports.createProperty = async (req, res) => {
  const { title, description, price, location } = req.body;
  const images = req.files.map(file => file.path); // Assuming files are saved to a specific path

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


// User expresses interest in a property
exports.expressInterest = async (req, res) => {
  const { propertyId } = req.body;

  try {
    // Find the user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Find the property
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Check if the property is already in the user's list
    if (user.interestedProperties.includes(propertyId)) {
      return res.status(400).json({ msg: 'Property already in your interested list' });
    }

    // Add the property to the user's interested list
    user.interestedProperties.push(propertyId);
    await user.save();

    res.json(user);
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
