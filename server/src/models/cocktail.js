import mongoose from 'mongoose';

const cocktailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    otherIngredients: { type: String },
    liquors: [
      {
        index: { type: Number, required: true },
        title: { type: String, required: true },
        isChecked: { type: Boolean, required: true },
        amount: { type: Number, required: true },
      },
    ],
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

export default mongoose.model('Cocktail', cocktailSchema, 'cocktails');
