import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    caption: { type: String, required: true, trim: true },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default reviewSchema;
