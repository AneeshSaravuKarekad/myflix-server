import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const genreSchema = new Schema({
  name: { type: String, trim: true },
  description: { type: String, time: true },
  note: { type: String, trim: true },
  examples: [String],
});

export default model('Genre', genreSchema);
