const Property = require('../models/Property');

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProperty = async (req, res) => {
  const { name, location, price, description } = req.body;
  const newProperty = new Property({ name, location, price, description });

  try {
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProperties, addProperty };
