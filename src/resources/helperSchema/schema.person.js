import mongoose from 'mongoose';

const { Schema } = mongoose;
const personSchema = new Schema({
  name: { type: String, trim: true },
  bio: { type: String, trim: true },
  birth: {
    date: { type: Date },
    place: { type: String, trim: true },
  },
  death: {
    date: { type: Date },
    place: { type: String, trim: true },
  },
});

export default personSchema;
