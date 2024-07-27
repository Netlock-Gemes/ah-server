const Property = require('../models/Property');
const User = require('../models/User');
const upload = require('../middleware/upload');

exports.createProperty = async (req, res) => {
  const { title, description, price, location } = req.body;
  const images = req.files.map(file => file.path);

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

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


exports.toggleInterest = async (req, res) => {
  const { propertyId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const property = await Property.findById(propertyId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    const isInterested = user.interestedProperties.includes(propertyId);

    if (isInterested) {
      user.interestedProperties = user.interestedProperties.filter(id => id.toString() !== propertyId);
      property.interestedBy = property.interestedBy.filter(id => id.toString() !== userId);
    } else {
      user.interestedProperties.push(propertyId);
      property.interestedBy.push(userId);
    }

    await user.save();
    await property.save();

    res.json({ user, property });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getInterestedProperties = async (req, res) => {
  try {
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

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
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

exports.updateProperty = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, images } = req.body;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    let property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    property.title = title || property.title;
    property.description = description || property.description;
    property.price = price || property.price;
    property.location = location || property.location;
    property.images = images || property.images;

    await property.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};