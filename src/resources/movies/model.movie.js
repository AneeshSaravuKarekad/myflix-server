import mongoose from 'mongoose';
import reviewSchema from '../helperSchema/schema.review.js';
import personSchema from '../helperSchema/schema.person.js';

const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  storyLine: { type: String, trim: true },
  rating: { type: Number },
  reviews: [reviewSchema],
  runTime: { type: String, trim: true },
  director: personSchema,
  actors: [personSchema],
  genres: [
    {
      name: { type: String, trim: true },
    },
  ],
  imagePath: { type: String, trim: true },
  featured: { type: Boolean },
});

export default model('Movie', movieSchema);
