const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  economics: {
    type: Number,
    default: 0,
  },
  it: {
    type: Number,
    default: 0,
  },
  history: {
    type: Number,
    default: 0,
  },
  science: {
    type: Number,
    default: 0,
  },
  gk: {
    type: Number,
    default: 0,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: ScoreSchema,
    default: () => ({}),
  },
});

module.exports = mongoose.model('User', UserSchema);
