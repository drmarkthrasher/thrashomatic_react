import mongoose from 'mongoose';

const liquorSchema = new mongoose.Schema(
  {
    index: { type: Number, required: true },
    title: { type: String, required: true },
    isChecked: { type: Boolean, required: true },
    amount: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true },
    type: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, //provides for createdAt, updatedAt
  }
);

export default mongoose.model('Liquor', liquorSchema, 'liquors');
